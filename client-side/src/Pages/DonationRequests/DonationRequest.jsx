import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import SectionTitle from "../../Components/Shared/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const DonationRequest = () => {
  const axiosPublic = useAxiosPublic();
  const { data: donationRequests, isLoading } = useQuery({
    queryKey: ["donationRequests"],
    queryFn: async () => {
      const res = await axiosPublic("/api/v1/pendingDonationRequests");
      return res.data;
    },
  });
  if (isLoading)
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
      <Container>
        <Grid mt={7}>
          <SectionTitle
            title="Blood Donation Requests"
            subtitle="All pending blood donation requests needed your help"
          />
        </Grid>
        <Grid mb={7}>
          <TableContainer component={Paper} elevation={4} sx={{ mt: 7 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ bgcolor: "secondary.main", color: "white" }}>
                  <TableCell sx={{ color: "white", fontWeight: "700" }}>
                    Requester name
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
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {donationRequests?.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.requesterName}
                    </TableCell>
                    <TableCell align="left">
                      {row.hospitalName}, {row.fullAddress},{" "}
                      {row.recipientUpazila}, {row.recipientDistrict}
                    </TableCell>
                    <TableCell>{row.donationTime}</TableCell>
                    <TableCell>{row.donationDate}</TableCell>
                    <TableCell>
                      <Link to={`/donationDetails/${row._id}`}>
                      <Button size="small" color="primary" variant="contained">
                        View Details
                      </Button></Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Container>
    </div>
  );
};

export default DonationRequest;
