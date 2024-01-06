import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  CardActionArea,
  CardActions,
  Container,
  Grid,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";

const OurTeam = () => {
  return (
    <div>
      <Container sx={{ py: 8 }}>
        <Grid sx={{ textAlign: "center", maxWidth: 700, mx: 'auto' }}>
          <Typography variant="h4" mb={2} fontWeight={700} color='rgba(220, 20, 60, 1)'>
            Pioneers of Compassion
          </Typography>
          <Typography variant="body" color="gray" >
            Meet the Visionaries, Medical Experts, and Advocates Whose
            Unwavering Dedication and Forward-Thinking Approach Are Redefining
            Lifesaving Practices
          </Typography>
        </Grid>
        <Grid>
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Autoplay, Navigation]}
            className="mySwiper"
            style={{ width: "70%", margin: "0 auto" }}
          >
            <SwiperSlide
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card elevation={0} sx={{ p: 5 }}>
                <CardMedia
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src="data:image/jpeg;base64,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"
                    sx={{ width: 100, height: 100 }}
                  />
                </CardMedia>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    fontWeight={700}
                    component="div"
                  >
                    Sarah Johnson
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h6"
                    fontWeight={500}
                    color="rgba(220, 20, 60, 1)"
                  >
                    Chief Executive Officer (CEO)
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Sarah leads our mission to save lives through blood
                    donations, bringing visionary leadership to our cause.
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    gap: "8px",
                  }}
                >
                  <FacebookIcon fontSize="large" cursor="pointer" />
                  <InstagramIcon fontSize="large" cursor="pointer" />
                  <LinkedInIcon fontSize="large" cursor="pointer" />
                </CardActions>
              </Card>
            </SwiperSlide>
            <SwiperSlide
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card elevation={0} sx={{ p: 5 }}>
                <CardMedia
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src="data:image/jpeg;base64,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"
                    sx={{ width: 100, height: 100 }}
                  />
                </CardMedia>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    fontWeight={700}
                    component="div"
                  >
                    Dr. Michael Patel
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h6"
                    fontWeight={500}
                    color="rgba(220, 20, 60, 1)"
                  >
                    Chief Medical Officer (CMO)
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Dr. Patel ensures the highest medical standards,
                    safeguarding donors and recipients with expertise in
                    hematology.
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    gap: "8px",
                  }}
                >
                  <FacebookIcon fontSize="large" cursor="pointer" />
                  <InstagramIcon fontSize="large" cursor="pointer" />
                  <LinkedInIcon fontSize="large" cursor="pointer" />
                </CardActions>
              </Card>
            </SwiperSlide>
            <SwiperSlide
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card elevation={0} sx={{ p: 5 }}>
                <CardMedia
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src="https://plus.unsplash.com/premium_photo-1690407617686-d449aa2aad3c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d29tYW4lMjBhdmF0YXJ8ZW58MHx8MHx8fDA%3D"
                    sx={{ width: 100, height: 100 }}
                  />
                </CardMedia>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    fontWeight={700}
                    component="div"
                  >
                    Emily Davis
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h6"
                    fontWeight={500}
                    color="rgba(220, 20, 60, 1)"
                  >
                    Volunteer Coordinator
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Emily guides and supports our dedicated volunteers,
                    fostering a strong community for blood donation.
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    gap: "8px",
                  }}
                >
                  <FacebookIcon fontSize="large" cursor="pointer" />
                  <InstagramIcon fontSize="large" cursor="pointer" />
                  <LinkedInIcon fontSize="large" cursor="pointer" />
                </CardActions>
              </Card>
            </SwiperSlide>
            <SwiperSlide
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card elevation={0} sx={{ p: 5 }}>
                <CardMedia
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src="https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fG1hbiUyMGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D"
                    sx={{ width: 100, height: 100 }}
                  />
                </CardMedia>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    fontWeight={700}
                    component="div"
                  >
                    Alex Rodriguez
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h6"
                    fontWeight={500}
                    color="rgba(220, 20, 60, 1)"
                  >
                    Community Outreach Manager
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Alex spearheads community engagement, spreading awareness
                    and encouraging participation in our lifesaving missio
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    gap: "8px",
                  }}
                >
                  <FacebookIcon fontSize="large" cursor="pointer" />
                  <InstagramIcon fontSize="large" cursor="pointer" />
                  <LinkedInIcon fontSize="large" cursor="pointer" />
                </CardActions>
              </Card>
            </SwiperSlide>
          </Swiper>
        </Grid>
      </Container>
    </div>
  );
};

export default OurTeam;
