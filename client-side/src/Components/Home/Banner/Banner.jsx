import { Button, Container, Grid, Typography } from "@mui/material";
import "./Banner.css";
import { HowToReg, Search } from "@mui/icons-material";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";
const Banner = () => {
  return (
    <div className="banner-container">
      <Container
        className="banner-content"
        maxWidth="lg"
        sx={{ display: "flex", alignItems: "center", height: "700px" }}
      >
        <div className="banner-text">
          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed out once, initially
              "Sharing Life, One Donation at a Time",
              1500, // wait 1s before replacing "Mice" with "Hamsters"
              "Connect, Donate, Impact",
              1500,
              "Together, We Can Save Lives",
              1500,
              "Make a Difference: Give the Gift of Life",
              1500,
            ]}
            wrapper="span"
            speed={50}
            style={{ fontSize: "2em", display: "inline-block", fontWeight: '700' }}
            repeat={Infinity}
          />
          <Typography variant="h3" sx={{ fontWeight: "700" }} gutterBottom>
            <Typography
              variant="inherit"
              sx={{
                color: "primary.main",
                fontWeight: "700",
                display: "inline",
              }}
            >
              Saving
            </Typography>{" "}
            Lives, <br />
            One Drop at a Time
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ maxWidth: "650px", color: "#333333", fontWeight: '500' }}
            gutterBottom
          >
            Welcome to{" "}
            <Typography
              sx={{
                color: "primary.main",
                display: "inline",
                fontWeight: "700",
                fontStyle: "italic",
              }}
            >
              LifeFlow
            </Typography>
            . Join us in saving lives through blood donation. Find nearby
            centers, connect with donors, and be a hero. Your contribution
            matters—save lives and be part of our caring community.
          </Typography>
          <Grid
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 2,
              mt: 4,
            }}
          >
            <Link to={'/searchPage'}>
            <Button variant="contained" startIcon={<Search />}>
              Search Donor
            </Button>
            </Link>
            <Link to={'/registration'}>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<HowToReg />}
            >
              Join as a donor
            </Button>
            </Link>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default Banner;
