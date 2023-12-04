import {
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SectionTitle from "../../Components/Shared/SectionTitle/SectionTitle";
import { Bloodtype } from "@mui/icons-material";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider/AuthProvider";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const DonationsDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const { data: donationRequest, isLoading } = useQuery({
    queryKey: ["donationRequest", id],
    queryFn: async () => {
      const res = await axiosSecure(`/api/v1/donationRequest/${id}`);
      return res.data;
    },
  });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
  const onSubmit = async (data) => {
    const donorInfo = {...data, status: 'inprogress'};
    console.log(donorInfo);
    const res = await axiosSecure.patch(`/api/v1/updateDonReq/${id}`, donorInfo)
    if(res.data.modifiedCount ) {
      toast.success('Donation process inprogress!')
      navigate('/donationRequests');
      handleClose();
    } else {
      toast.error('Something went wrong!');
    }
    
  };

  return (
    <div>
      <Container>
        <Paper elevation={5} sx={{ px: 4, py: 6, my: 7 }}>
          <Grid>
            <SectionTitle
              title="Blood Donation Details"
              subtitle="Here goes details information about blood donation request"
            />
          </Grid>
          <Grid mt={6} display={"flex"} flexDirection={"column"} gap={3}>
            <Paper sx={{ p: 3 }} elevation={4}>
              <Typography
                sx={{ display: "flex", alignItems: "center", gap: "5px" }}
                variant="body1"
              >
                <Typography fontWeight={700} color={"primary.main"}>
                  Requester Name:{" "}
                </Typography>
                {donationRequest.requesterName}
              </Typography>
              <Typography
                sx={{ display: "flex", alignItems: "center", gap: "5px" }}
                variant="body1"
              >
                <Typography fontWeight={700} color={"primary.main"}>
                  Requester Email:{" "}
                </Typography>
                {donationRequest.requesterEmail}
              </Typography>
            </Paper>

            <Paper sx={{ p: 3 }} elevation={4}>
              <Typography
                sx={{ display: "flex", alignItems: "center", gap: "5px" }}
                variant="body1"
              >
                <Typography fontWeight={700} color={"primary.main"}>
                  Recipient Name:{" "}
                </Typography>
                {donationRequest.recipientName}
              </Typography>
              <Typography
                sx={{ display: "flex", alignItems: "center", gap: "5px" }}
                variant="body1"
              >
                <Typography fontWeight={700} color={"primary.main"}>
                  Recipient District:{" "}
                </Typography>
                {donationRequest.recipientDistrict}
              </Typography>
              <Typography
                sx={{ display: "flex", alignItems: "center", gap: "5px" }}
                variant="body1"
              >
                <Typography fontWeight={700} color={"primary.main"}>
                  Recipient Upazila:{" "}
                </Typography>
                {donationRequest.recipientUpazila}
              </Typography>
            </Paper>

            <Paper sx={{ p: 3 }} elevation={4}>
              <Typography
                sx={{ display: "flex", alignItems: "center", gap: "5px" }}
                variant="body1"
              >
                <Typography fontWeight={700} color={"primary.main"}>
                  Status:{" "}
                </Typography>
                {donationRequest.status}
              </Typography>
              <Typography
                sx={{ display: "flex", alignItems: "center", gap: "5px" }}
                variant="body1"
              >
                <Typography fontWeight={700} color={"primary.main"}>
                  Hospital Name:{" "}
                </Typography>
                {donationRequest.hospitalName}
              </Typography>
              <Typography
                sx={{ display: "flex", alignItems: "center", gap: "5px" }}
                variant="body1"
              >
                <Typography fontWeight={700} color={"primary.main"}>
                  Full Address:{" "}
                </Typography>
                {donationRequest.fullAddress}
              </Typography>
            </Paper>
            <Paper sx={{ p: 3 }} elevation={4}>
              <Typography
                sx={{ display: "flex", alignItems: "center", gap: "5px" }}
                variant="body1"
              >
                <Typography fontWeight={700} color={"primary.main"}>
                  Donation Date:{" "}
                </Typography>
                {donationRequest.donationDate}
              </Typography>
              <Typography
                sx={{ display: "flex", alignItems: "center", gap: "5px" }}
                variant="body1"
              >
                <Typography fontWeight={700} color={"primary.main"}>
                  Donation Time:{" "}
                </Typography>
                {donationRequest.donationTime} (24hrs)
              </Typography>
              <Typography
                sx={{ display: "flex", alignItems: "center", gap: "5px" }}
                variant="body1"
              >
                <Typography fontWeight={700} color={"primary.main"}>
                  Request Message:{" "}
                </Typography>
                {donationRequest.requestMessage}{" "}
              </Typography>
            </Paper>
          </Grid>
          <Grid mt={4} mx={"auto"}>
            {donationRequest.status === 'pending' && <Button
              onClick={handleClickOpen}
              size="lg"
              variant="contained"
              startIcon={<Bloodtype />}
            >
              Donate
            </Button>}
            
          </Grid>
        </Paper>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Confirm Your Donation?</DialogTitle>
              <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
              <DialogContentText>
                Click on the confirm to donate
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
                required
                {...register("donorName")}
                value={user.displayName}
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                required
                {...register("donorEmail")}
                value={user.email}
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button color="error" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="success">
                Confirm
              </Button>
            </DialogActions>
        </form>
          </Dialog>
      </Container>
    </div>
  );
};

export default DonationsDetails;
