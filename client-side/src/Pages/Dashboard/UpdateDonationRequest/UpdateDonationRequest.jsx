import {

  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  TextField,
} from "@mui/material";
import SectionTitle from "../../../Components/Shared/SectionTitle/SectionTitle";

import useUserProfile from "../../../hooks/useUserProfile";
import useDistricts from "../../../hooks/useDistricts";
import useUpazilas from "../../../hooks/useUpazilas";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const textareaStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "2px solid #ccc",
  fontFamily: "Arial, sans-serif",
  fontSize: "16px",
  lineHeight: "1.6",
  width: "100%",
  minHeight: "150px",
  resize: "vertical",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  boxSizing: "border-box",
  outline: "none",
};

const UpdateDonationRequest = () => {
  // const {user} = useContext(AuthContext);
  const [userInfo, isLoading] = useUserProfile();
  const [districts, disLoading] = useDistricts();
  const [upazilas, upLoading] = useUpazilas();
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {id} = useParams();
  
  
  const {data: donationRequest, isLoading: infoLoading} = useQuery({
    queryKey: ['donationRequest', id],
    queryFn: async () => {
        const res = await axiosSecure(`/api/v1/donationRequest/${id}`)
        return res.data;
        
       
    }
  })

  if (isLoading || disLoading || upLoading || infoLoading)
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
    console.log(data);
    const res = await axiosSecure.patch(`/api/v1/updateDonRequest/${id}`, data)
    if(res.data.modifiedCount) {
        toast.success('Donation Request updated successfully!');
        reset();
        navigate(userInfo.role === 'admin'? '/dashboard/allDonationRequests': '/dashboard/myDonationRequestsPage')
    }
  };
  return (
    <div>
      <Paper
        elevation={7}
        sx={{ px: 8, py: 10, width: "fit-content", mx: "auto" }}
      >
        <SectionTitle
          title="Create Donation Request"
          subtitle="Fill the form to create a request"
        />
        <Grid sx={{ mt: 7, maxWidth: "700px" }}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            <Grid
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 2,
              }}
            >
              <TextField
                required
                id="standard-required"
                label="Requester Name"
                {...register("requesterName")}
                size="small"
                sx={{ minWidth: "300px", width: "100%" }}
                value={donationRequest.requesterName}
              />
              <TextField
                required
                id="standard-required"
                type="email"
                label="Requester Email"
                {...register("requesterEmail")}
                size="small"
                sx={{ minWidth: "300px", width: "100%" }}
                value={donationRequest.requesterEmail}
              />
            </Grid>
            <TextField
              required
              id="standard-required"
              label="Recipient Name"
              {...register("recipientName")}
              size="small"
              defaultValue={donationRequest.recipientName}
              sx={{ minWidth: "300px", width: "100%" }}
            />
            <Grid
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 2,
              }}
            >
            <TextField
                id="outlined-select-currency"
                select
                label="Upazila"
                {...register("recipientUpazila")}
                required
                defaultValue={donationRequest?.recipientUpazila}
                sx={{ minWidth: "300px" }}
              >
                {upazilas.map((upazila) => (
                  <MenuItem key={upazila._id} value={upazila.label}>
                    {upazila.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="outlined-select-currency"
                select
                label="District"
                {...register("recipientDistrict")}
                required
                defaultValue={donationRequest?.recipientDistrict}
                sx={{ minWidth: "300px" }}
              >
                {districts.map((district) => (
                  <MenuItem key={district._id} value={district.label}>
                    {district.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 2,
              }}
            >
              <TextField
                required
                id="standard-required"
                label="Hospital Name"
                {...register("hospitalName")}
                size="small"
                defaultValue={donationRequest.hospitalName}
                sx={{ minWidth: "300px", width: "100%" }}
              />
              <TextField
                required
                id="standard-required"
                label="Full Address"
                {...register("fullAddress")}
                defaultValue={donationRequest.fullAddress}
                size="small"
                sx={{ minWidth: "300px", width: "100%" }}
              />
            </Grid>
            <Grid
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 2,
              }}
            >
              <TextField
                id="outlined-start-adornment"
                type="time"
                size="small"
                defaultValue={donationRequest.donationTime}
                {...register("donationTime")}
                sx={{ minWidth: "300px", width: "100%" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      Donation Time
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                id="outlined-start-adornment"
                type="date"
                {...register("donationDate")}
                defaultValue={donationRequest.donationDate}
                size="small"
                sx={{ minWidth: "300px", width: "100%" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      Donation Date
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <textarea
              required
              {...register("requestMessage")}
              defaultValue={donationRequest.requestMessage}
              placeholder="Request message"
              style={textareaStyle}
            />
            <Button type="submit" variant="contained">
              Request
            </Button>
          </form>
        </Grid>
      </Paper>
    </div>
  );
};

export default UpdateDonationRequest;
