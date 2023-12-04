import {
  Autocomplete,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Lottie from "lottie-react";
import authAnimation from "../../assets/authentication.json";
import { useForm } from "react-hook-form";

import { useContext, useState } from "react";
import useDistricts from "../../hooks/useDistricts";
import useUpazilas from "../../hooks/useUpazilas";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../providers/AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import "./Registration.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Registration = () => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [districts, disLoading] = useDistricts();
  const [upazilas, upLoading] = useUpazilas();
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [passError, setPassError] = useState("");
  const [pending, setPending] = useState(false) 

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = async (data) => {
    
    if (data.password.length < 6 || data.confirmPassword.length < 6) {
      setPassError("⚠️Password must be at least 6 characters.");
      return;
    } else if (data.password !== data.confirmPassword) {
      setPassError("⚠️Password does not match");
      return;
    }

    const imageFile = { image: data.photo[0] };
    const imgRes = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    setPending(true);
    if (imgRes.data.success) {
      const userInfo = {
        name: data.name,
        email: data.email,
        status: "active",
        image: imgRes.data.data.display_url,
        district: data.district,
        upazila: data.upazila,
        role: "donor",
        bloodGroup: data.bloodGroup,
      };
      console.log(userInfo);

      createUser(data.email, data.password)
        .then((res) => {
          console.log(res.user);
          if (res.user) {
            updateUser(data.name, userInfo.image)
              .then(async () => {
                const res = await axiosPublic.post("/api/v1/user", userInfo);
                if (res.data.insertedId) {
                  toast.success(`Welcome to LifeFlow ${data.name}`);
                  navigate(location.state || "/");
                  reset();
                  
                }
              })
              .catch(() => {
                setPending(false)
                toast.error("Something went wrong!");
              });
          }
        })
        .catch((err) => {
          setPending(false);
          toast.error("Something went wrong!");
          console.log(err);
          setPassError("User already exists!");
        });
    }

    setPassError("");
    console.log(data);
  };

  if (disLoading || upLoading)
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

  const handleChange = (event) => {
    setBloodGroup(event.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="lg" sx={{ minHeight: "70vh", display: "flex" }}>
        <Paper
          elevation={5}
          sx={{
            px: 5,
            py: 6,
            width: "100%",
            heigh: "70vh",
            display: "flex",
            flexDirection: { xs: "column", md: "row-reverse" },
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 5,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h3"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "black",
                textDecoration: "none",
              }}
            >
              Life
              <Typography
                variant="h3"
                noWrap
                sx={{ color: "rgba(220, 20, 60, 1)", display: "inline" }}
              >
                Flow
              </Typography>
            </Typography>
            <Typography variant="h5">Register To Join</Typography>
            <Lottie animationData={authAnimation} loop={true} />
          </div>
          <Grid sx={{ width: { md: "350px" } }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  justifyContent: "flex-start",
                }}
              >
                <Grid sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <TextField
                    id="standard-basic"
                    label="Full Name"
                    type="text"
                    {...register("name")}
                    variant="standard"
                    required
                  />
                  <TextField
                    id="standard-basic"
                    label="Email"
                    type="email"
                    {...register("email")}
                    variant="standard"
                    required
                  />
                </Grid>

                <Grid sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <TextField
                    id="standard-basic"
                    label="Profile Picture"
                    type="file"
                    {...register("photo")}
                    variant="standard"
                    required
                  />
                  <FormControl
                    required
                    variant="standard"
                    sx={{ m: 1, minWidth: 120 }}
                  >
                    <InputLabel id="demo-simple-select-standard-label">
                      Blood Group
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={bloodGroup}
                      {...register("bloodGroup")}
                      onChange={handleChange}
                      label="Blood Group"
                      required
                    >
                      <MenuItem value="a+">A+</MenuItem>
                      <MenuItem value="a-">A-</MenuItem>
                      <MenuItem value="b+">B+</MenuItem>
                      <MenuItem value="b-">B-</MenuItem>
                      <MenuItem value="ab+">AB+</MenuItem>
                      <MenuItem value="ab-">AB-</MenuItem>
                      <MenuItem value="o+">O+</MenuItem>
                      <MenuItem value="o-">O-</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={districts}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="District"
                      {...register("district")}
                      variant="standard"
                      required
                    />
                  )}
                />
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={upazilas}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Upazila"
                      {...register("upazila")}
                      variant="standard"
                      required
                    />
                  )}
                />
                <FormControl sx={{ m: 1 }} variant="standard">
                  <InputLabel htmlFor="standard-adornment-password">
                    Password
                  </InputLabel>
                  <Input
                    id="standard-adornment-password"
                    type={showPassword ? "text" : "password"}
                    {...register("password", { required: true })}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl sx={{ m: 1 }} variant="standard">
                  <InputLabel htmlFor="standard-adornment-password">
                    Confirm Password
                  </InputLabel>
                  <Input
                    id="standard-adornment-password"
                    type={showPassword ? "text" : "password"}
                    {...register("confirmPassword", { required: true })}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                {passError && (
                  <span
                    style={{
                      fontSize: "12px",
                      fontStyle: "italic",
                      color: "red",
                    }}
                  >
                    {passError}
                  </span>
                )}

                <Button disabled = {pending}  type="submit" variant="contained" startIcon={pending && <CircularProgress sx={{color: 'black'}} size={20}/>}>
                  
                  Register
                </Button>
              </Grid>
            </form>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default Registration;
