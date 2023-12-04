import {
  Button,
  ButtonGroup,
  Chip,
  CircularProgress,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import SectionTitle from "../../../Components/Shared/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";
import { DriveFileRenameOutline } from "@mui/icons-material";
import useAllBlogs from "../../../hooks/useAllBlogs";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TablePagination } from "@mui/material";

import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAdmin from "../../../hooks/useAdmin";
import swal from "sweetalert";

const ContentManagement =  () => {
  const [allUnfilteredBlogs, blogsLoading, refetch] = useAllBlogs();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const axiosSecure = useAxiosSecure();
  const [admin, adminLoading] = useAdmin();
  let [allBlogs, setAllBlogs] = useState(allUnfilteredBlogs);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (blogsLoading || adminLoading) {
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
  }
 

  
  

  // setAllBlogs(allUnfilteredBlogs);

  const handleFilter = (options) => {
    if (options === "all") {
      setAllBlogs(allUnfilteredBlogs);
    } else {
      if (options === "draft") {
        const drafted = allUnfilteredBlogs.filter(
          (blog) => {return blog.status === "draft"}
        );
        // console.log(drafted);
        setAllBlogs(drafted);
      } else {
        const published = allUnfilteredBlogs.filter(
          (blog) => { return blog.status === "published"}
        );
        // console.log(published);
        setAllBlogs(published);
      }
    }
  };

  const handleChangeStatus = async (blog, status) => {
    swal({
      title: `${status}?`,
     
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(async (willDelete) => {
      if (willDelete) {
        const res = await axiosSecure.patch(
          `/api/v1/updateBlogStatus/${blog._id}`,
          { status }
        );
        if (res.data.modifiedCount) {
          toast.success("Content status updated");
          refetch();
        }
      } else {
        toast.error("Update Cancelled!");
      }
    })
    // console.log(blog, status);
    
  };
  const handleDeleteBlog = async (_id) => {
    swal({
      title: "Delete Blog?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(async (willDelete) => {
      if (willDelete) {
        const res = await axiosSecure.delete(`/api/v1/deleteBlog/${_id}`);
        if (res.data.deletedCount) {
          toast.success("Content deleted successfully!");
          refetch();
        }
      } else {
        toast.error("Content deletion cancelled!");
      }
    });
    
  };

  return (
    <div>
      <Grid
        mt={7}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <SectionTitle
          title="Content Management"
          subtitle="Manage all the contents here"
        />
        <Link to={"/dashboard/addBlog"}>
          <Button variant="contained" startIcon={<DriveFileRenameOutline />}>
            Add Blog
          </Button>
        </Link>
      </Grid>
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
              handleFilter("draft");
            }}
            value="draft"
          >
            Drafted
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleFilter("published");
            }}
            value="published"
          >
            Published
          </MenuItem>
        </TextField>
      </Grid>
      <Grid>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ bgcolor: "secondary.main", color: "white" }}>
                <TableCell
                  sx={{ color: "white", fontWeight: "700" }}
                ></TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: "700" }}
                  align="left"
                >
                  Blog Title
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "700" }}>
                  Creation Time
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: "700" }}
                  align="center"
                >
                  Status
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
              { allBlogs?.length > 0 ?
              allBlogs
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row, idx) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {idx + 1}
                    </TableCell>
                    <TableCell align="left">{row.blogTitle}</TableCell>
                    <TableCell>{row.creationTime}</TableCell>
                    <TableCell align="center">
                      {row.status === "draft" ? (
                        <Chip label="Drafted" size="small" />
                      ) : (
                        <Chip label="Published" size="small" color="success" />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {admin ? (
                        <ButtonGroup
                          size="small"
                          aria-label="small button group"
                        >
                          {row.status === "draft" ? (
                            <Button
                              onClick={() => {
                                handleChangeStatus(row, "published");
                              }}
                              variant="contained"
                              size="small"
                              color="success"
                            >
                              Publish
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              onClick={() => {
                                handleChangeStatus(row, "draft");
                              }}
                              size="small"
                              color="inherit"
                            >
                              Draft
                            </Button>
                          )}
                          <Button
                            onClick={() => handleDeleteBlog(row._id)}
                            variant="contained"
                            color="error"
                          >
                            Delete
                          </Button>
                        </ButtonGroup>
                      ) : (
                        <Typography variant="button" color={"red"}>
                          No action allowed
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                )): allUnfilteredBlogs
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row, idx) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {idx + 1}
                    </TableCell>
                    <TableCell align="left">{row.blogTitle}</TableCell>
                    <TableCell>{row.creationTime}</TableCell>
                    <TableCell align="center">
                      {row.status === "draft" ? (
                        <Chip label="Drafted" size="small" />
                      ) : (
                        <Chip label="Published" size="small" color="success" />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {admin ? (
                        <ButtonGroup
                          size="small"
                          aria-label="small button group"
                        >
                          {row.status === "draft" ? (
                            <Button
                              onClick={() => {
                                handleChangeStatus(row, "published");
                              }}
                              variant="contained"
                              size="small"
                              color="success"
                            >
                              Publish
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              onClick={() => {
                                handleChangeStatus(row, "draft");
                              }}
                              size="small"
                              color="inherit"
                            >
                              Draft
                            </Button>
                          )}
                          <Button
                            onClick={() => handleDeleteBlog(row._id)}
                            variant="contained"
                            color="error"
                          >
                            Delete
                          </Button>
                        </ButtonGroup>
                      ) : (
                        <Typography variant="button" color={"red"}>
                          No action allowed
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[4, 8, 10]}
          component="div"
          count={allBlogs?.length > 0 ? allBlogs?.length : allUnfilteredBlogs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Grid>
    </div>
  );
};

export default ContentManagement;
