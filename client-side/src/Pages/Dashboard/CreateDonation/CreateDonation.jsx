import {
  Autocomplete,
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import SectionTitle from "../../../Components/Shared/SectionTitle/SectionTitle";

import useUserProfile from "../../../hooks/useUserProfile";
import useDistricts from "../../../hooks/useDistricts";
import useUpazilas from "../../../hooks/useUpazilas";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import blockedAnimation from '../../../assets/blocked.json'

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

const CreateDonation = () => {
  // const {user} = useContext(AuthContext);
  const [userInfo, isLoading] = useUserProfile();
  const [districts, disLoading] = useDistricts();
  const [upazilas, upLoading] = useUpazilas();
  const { register, handleSubmit, reset} = useForm();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  
  
  if (isLoading || disLoading || upLoading)
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
    )

  if(userInfo?.status === 'blocked') {
    return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh', flexDirection: 'column'}}>
    <Typography variant="h3" sx={{color: 'rgba(0, 51, 102, 1)'}}>Blocked User</Typography>
    <Lottie animationData={blockedAnimation}/>
</div>
  }

    const onSubmit = async (data) => {
      console.log(data)
      const res = await axiosSecure.post('/api/v1/donationRequests', {...data, status: 'pending'})
      
      if(res.data.insertedId) {
        console.log(res.data)
        toast.success('Donation Request created successfully!');
        reset();
        navigate('/dashboard/myDonationRequestsPage')
      }
    };
  return (
    <div>
      <Paper elevation={7} sx={{ px: 8, py: 10, width: 'fit-content', mx: 'auto' }}>
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
                value={`${userInfo?.name}`}
              />
              <TextField
                required
                id="standard-required"
                type="email"
                label="Requester Email"
                {...register("requesterEmail")}
                size="small"
                sx={{ minWidth: "300px", width: "100%" }}
                value={`${userInfo?.email}`}
              />
            </Grid>
            <TextField
              required
              id="standard-required"
              label="Recipient Name"
              {...register("recipientName")}
              size="small"
              sx={{ minWidth: "300px", width: "100%" }}
            />
            <Grid
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 2,
              }}
            >
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={districts}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Recipient District"
                    {...register("recipientDistrict")}
                    size="small"
                    required
                  />
                )}
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={upazilas}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Recipient Upazila"
                    {...register('recipientUpazila')}
                    size="small"
                    required
                  />
                )}
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
                required
                id="standard-required"
                label="Hospital Name"
                {...register("hospitalName")}
                size="small"
                sx={{ minWidth: "300px", width: "100%" }}
              />
              <TextField
                required
                id="standard-required"
                label="Full Address"
                {...register("fullAddress")}
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
              placeholder="Request message"
              style={textareaStyle}
            />
            <Button type="submit" variant="contained">Request</Button>
          </form>
        </Grid>
      </Paper>
    </div>
  );
};

export default CreateDonation;
