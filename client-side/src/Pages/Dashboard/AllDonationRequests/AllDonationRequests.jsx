import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SectionTitle from "../../../Components/Shared/SectionTitle/SectionTitle";
import {
  Button,
  ButtonGroup,
  Chip,
  CircularProgress,
  Grid,
  MenuItem,
  // IconButton,
  TablePagination,
  TextField,
  Tooltip,
  Typography,
  // Tooltip,
} from "@mui/material";
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import { useState } from "react";
import useAllDonationRequests from "../../../hooks/useAllDonationRequests";
import useAdmin from "../../../hooks/useAdmin";
import useDeleteDonReqByAdmin from "../../../hooks/useDeleteDonReqByAdmin";
import { Link } from "react-router-dom";
import useUpdateDonReqStat from "../../../hooks/useUpdateDonReqStat";

const AllDonationRequests = () => {
  const [unFilteredDonationRequests, donationLoading] =
    useAllDonationRequests();
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [admin, adminLoading] = useAdmin();
  const [handleDeleteDonReq] = useDeleteDonReqByAdmin();
  const [handleUpdateStatus] = useUpdateDonReqStat();
  const [donationRequests, setDonationRequests] = useState(
    unFilteredDonationRequests
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (donationLoading || adminLoading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress sx={{ color: "rgba(220, 20, 60, 1)" }} />
      </div>
    );

  const handleFilter = (options) => {
    if (options === "all") {
      setDonationRequests(unFilteredDonationRequests);
    } else {
      if (options === "pending") {
        const pending = unFilteredDonationRequests.filter((blog) => {
          return blog.status === "pending";
        });
        // console.log(pending);
        setDonationRequests(pending);
      } else if (options === "inprogress") {
        const inprogress = unFilteredDonationRequests.filter((blog) => {
          return blog.status === "inprogress";
        });
        console.log(inprogress);
        setDonationRequests(inprogress);
      } else if (options === "done") {
        const done = unFilteredDonationRequests.filter((blog) => {
          return blog.status === "done";
        });
        console.log(done);
        setDonationRequests(done);
      } else {
        const cancelled = unFilteredDonationRequests.filter((blog) => {
          return blog.status === "cancelled";
        });
        console.log(cancelled);
        setDonationRequests(cancelled);
      }
    }
  };
  return (
    <div>
      <SectionTitle
        title="All  Donation Requests"
        subtitle="Here goes all the donation requests"
      />
      <Grid mt={7} display={"flex"} alignItems={"center"} gap={2}>
        <Typography variant="h5" fontSize={"20px"} fontWeight={"700"}>
          Filter:{" "}
        </Typography>

        <TextField
          id="outlined-select-currency"
          select
          // onChange={() => handleFilter()}
          sx={{ minWidth: "150px" }}
          defaultValue="all"
          size="small"
        >
          <MenuItem
            onClick={() => {
              handleFilter("all");
            }}
            value="all"
          >
            All
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleFilter("pending");
            }}
            value="pending"
          >
            Pending
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleFilter("inprogress");
            }}
            value="inprogress"
          >
            Inprogress
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleFilter("done");
            }}
            value="done"
          >
            Done
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleFilter("cancelled");
            }}
            value="cancelled"
          >
            Cancelled
          </MenuItem>
        </TextField>
      </Grid>
      <TableContainer component={Paper} sx={{ mt: 7 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ bgcolor: "secondary.main", color: "white" }}>
              <TableCell sx={{ color: "white", fontWeight: "700" }}>
                Recipient name
              </TableCell>
              <TableCell
                sx={{ color: "white", fontWeight: "700" }}
                align="left"
              >
                Recipient Location
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "700" }}>
                Donation Time
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "700" }}>
                Donation Date
              </TableCell>
              <TableCell
                sx={{ color: "white", fontWeight: "700" }}
                align="center"
              >
                Status
              </TableCell>
              <TableCell
                sx={{ color: "white", fontWeight: "700" }}
                align="left"
              >
                Donor Info
              </TableCell>
              <TableCell
                sx={{ color: "white", fontWeight: "700" }}
                align="center"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {donationRequests?.length > 0
              ? donationRequests
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.recipientName}
                      </TableCell>
                      <TableCell align="left">
                        {row.hospitalName}, {row.fullAddress},{" "}
                        {row.recipientUpazila}, {row.recipientDistrict}
                      </TableCell>
                      <TableCell>{row.donationTime}</TableCell>
                      <TableCell>{row.donationDate}</TableCell>
                      <TableCell align="right">
                        <Chip
                          size="small"
                          color={
                            (row?.status === "pending" && "info") ||
                            (row?.status === "inprogress" && "warning") ||
                            (row?.status === "done" && "success") ||
                            (row?.status === "cancelled" && "error")
                          }
                          label={row?.status}
                        />
                      </TableCell>
                      <TableCell>
                        {" "}
                        {row?.status === "inprogress" ? (
                          <div>
                            <Typography fontSize={"12px"}>
                              Donor name: {row?.donorName}
                            </Typography>
                            <Typography fontSize={"12px"}>
                              Donor email: {row?.donorEmail}
                            </Typography>
                          </div>
                        ) : (
                          <Typography color="red">Empty</Typography>
                        )}
                      </TableCell>
                      <TableCell
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "3px",
                        }}
                      >
                        <ButtonGroup
                          size="small"
                          aria-label="small button group"
                        >
                          {row.status === "inprogress" && (
                            <Button
                              onClick={() =>
                                handleUpdateStatus(row._id, "done")
                              }
                              variant="contained"
                              color="success"
                            >
                              Done
                            </Button>
                          )}
                          {row.status === "inprogress" && (
                            <Button
                              onClick={() =>
                                handleUpdateStatus(row._id, "cancelled")
                              }
                              variant="contained"
                              color="error"
                            >
                              Cancel
                            </Button>
                          )}

                          {admin && (
                            <Button
                              size="small"
                              variant="contained"
                              color="warning"
                              onClick={() => handleDeleteDonReq(row._id)}
                            >
                              <Delete fontSize="inherit" />
                            </Button>
                          )}
                          {admin && (
                            <Link
                              to={`/dashboard/updateDonationRequest/${row._id}`}
                            >
                              <Button variant="contained" color="inherit">
                                <Tooltip title="Edit" arrow>
                                  {" "}
                                  <Edit fontSize="inherit" color="secondary" />
                                </Tooltip>
                              </Button>
                            </Link>
                          )}
                          <Link to={`/donationDetails/${row._id}`}>
                            <Button variant="contained" color="info">
                              <Tooltip title="See Details" arrow>
                                {" "}
                                <RemoveRedEye
                                  fontSize="inherit"
                                  color="secondary"
                                />
                              </Tooltip>
                            </Button>
                          </Link>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  ))
              : unFilteredDonationRequests
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.recipientName}
                      </TableCell>
                      <TableCell align="left">
                        {row.hospitalName}, {row.fullAddress},{" "}
                        {row.recipientUpazila}, {row.recipientDistrict}
                      </TableCell>
                      <TableCell>{row.donationTime}</TableCell>
                      <TableCell>{row.donationDate}</TableCell>
                      <TableCell align="right">
                        <Chip
                          size="small"
                          color={
                            (row?.status === "pending" && "info") ||
                            (row?.status === "inprogress" && "warning") ||
                            (row?.status === "done" && "success") ||
                            (row?.status === "cancelled" && "error")
                          }
                          label={row?.status}
                        />
                      </TableCell>
                      <TableCell>
                        {" "}
                        {row?.status === "inprogress" ? (
                          <div>
                            <Typography fontSize={"12px"}>
                              Donor name: {row?.donorName}
                            </Typography>
                            <Typography fontSize={"12px"}>
                              Donor email: {row?.donorEmail}
                            </Typography>
                          </div>
                        ) : (
                          <Typography color="red">Empty</Typography>
                        )}
                      </TableCell>
                      <TableCell
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "3px",
                        }}
                      >
                        <ButtonGroup
                          size="small"
                          aria-label="small button group"
                        >
                          {row.status === "inprogress" && (
                            <Button
                              onClick={() =>
                                handleUpdateStatus(row._id, "done")
                              }
                              variant="contained"
                              color="success"
                            >
                              Done
                            </Button>
                          )}
                          {row.status === "inprogress" && (
                            <Button
                              onClick={() =>
                                handleUpdateStatus(row._id, "cancelled")
                              }
                              variant="contained"
                              color="error"
                            >
                              Cancel
                            </Button>
                          )}

                          {admin && (
                            <Button
                              size="small"
                              variant="contained"
                              color="warning"
                              onClick={() => handleDeleteDonReq(row._id)}
                            >
                              <Delete fontSize="inherit" />
                            </Button>
                          )}
                          {admin && (
                            <Link
                              to={`/dashboard/updateDonationRequest/${row._id}`}
                            >
                              <Button variant="contained" color="inherit">
                                <Tooltip title="Edit" arrow>
                                  {" "}
                                  <Edit fontSize="inherit" color="secondary" />
                                </Tooltip>
                              </Button>
                            </Link>
                          )}
                          <Link to={`/donationDetails/${row._id}`}>
                            <Button variant="contained" color="info">
                              <Tooltip title="See Details" arrow>
                                {" "}
                                <RemoveRedEye
                                  fontSize="inherit"
                                  color="secondary"
                                />
                              </Tooltip>
                            </Button>
                          </Link>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[4, 8, 10]}
        component="div"
        count={donationRequests?.length || unFilteredDonationRequests.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default AllDonationRequests;
