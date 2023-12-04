import { useContext } from "react";
import { TypeAnimation } from "react-type-animation";
import { AuthContext } from "../../../providers/AuthProvider/AuthProvider";
import useUserDonationRequests from "../../../hooks/useUserDonationRequests";
import {
    Button,
  ButtonGroup,
  Chip,
  CircularProgress,
  Grid,

  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import SectionTitle from "../../../Components/Shared/SectionTitle/SectionTitle";
import {  Delete, East, Edit, RemoveRedEye } from "@mui/icons-material";
import { Link } from "react-router-dom";


import useDeleteDonReqByUser from "../../../hooks/useDeleteDonReqByUser";

import useUpdateDonReqStat from "../../../hooks/useUpdateDonReqStat";
import Empty from '../../../Components/Shared/Empty/Empty';

const UserHome = () => {
  const { user } = useContext(AuthContext);
  const [donationRequests, donationLoading] = useUserDonationRequests();
  const [handleDeleteDonationRequest] = useDeleteDonReqByUser();
  const [handleUpdateStatus] = useUpdateDonReqStat();
  

  if (donationLoading)
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
  return (
    <div>
      <div>
        <TypeAnimation
          sequence={[
            // Same substring at the start will only be typed out once, initially
            `Welcome! ${user.displayName}`,
            1500,
            `Bienvenue! ${user.displayName}`,
            1500,
            `Yōkoso!  ${user.displayName}`,
            1500,
            `Bienvenido!  ${user.displayName}`,
            1500,
            `Willkommen!  ${user.displayName}`,
            1500,
            `Benvenuto!  ${user.displayName}`,
            1500,
            `Dobro pozhalovat'!  ${user.displayName}`,
            1500,
          ]}
          wrapper="span"
          speed={50}
          style={{
            fontSize: "3em",
            display: "inline-block",
            fontWeight: "700",
          }}
          repeat={Infinity}
        />
      </div>
      {donationRequests?.length > 0 ? (
        <Grid sx={{ mt: 7 }}>
          <SectionTitle
            title="Recent Donation Requests"
            subtitle="Here goes recent donation requests by me"
          />
          <TableContainer component={Paper} sx={{ mt: 4, mb:2 }}>
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
                    align="left"
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {donationRequests.slice(0, 3).map((row) => (
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
                    <TableCell align="right"><Chip
                      size="small"
                      color={
                        (row?.status === "pending" && "info") ||
                        (row?.status === "inprogress" && "warning") ||
                        (row?.status === "done" && "success") ||
                        (row?.status === "cancelled" && "error")
                      }
                      label={row?.status}
                    /></TableCell>
                    <TableCell>{row?.status === "inprogress" ? <div>
                      <Typography fontSize={"12px"}>Donor name: {row?.donorName}</Typography>
                      <Typography fontSize={"12px"}>Donor email: {row?.donorEmail}</Typography>
                    </div>:
                    <Typography color='red'>Empty</Typography>
                    }</TableCell>
                    <TableCell
                    
                    >
                     <ButtonGroup size="small" aria-label="small button group">
                    {row.status === "inprogress" && <Button onClick={() => handleUpdateStatus(row._id, 'done')} variant="contained" color="success">Done</Button>}
                      {row.status === "inprogress" && <Button onClick={() => handleUpdateStatus(row._id, 'cancelled')} variant="contained" color="error">Cancel</Button>}
                     
                      <Button size="small" variant="contained" color="warning" onClick={() => handleDeleteDonationRequest(row._id)}><Delete fontSize="inherit"  /></Button>
                      <Link to={`/dashboard/updateDonationRequest/${row._id}`}>
                        <Button variant="contained" color="inherit">
                          <Tooltip title="Edit" arrow>
                            {" "}
                            <Edit fontSize="inherit" color="secondary" />
                          </Tooltip>
                        </Button>
                      </Link>
                      <Link to={`/donationDetails/${row._id}`}>
                        <Button variant="contained" color="info">
                          <Tooltip title="See Details" arrow>
                            {" "}
                            <RemoveRedEye fontSize="inherit" color="secondary" />
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
          <Link  to={'/dashboard/myDonationRequestsPage'}><Button endIcon={<East/>}>View all my requests</Button></Link>
        </Grid>
      ): <Grid mt={7}>
        <Empty title="No Donation Request yet"/>
        </Grid>}
    </div>
  );
};

export default UserHome;
