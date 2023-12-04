import {  Container, Grid, Typography } from "@mui/material";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import { Link } from "react-router-dom";

const footerStyle = {
  backgroundColor: "#333",
  color: "#fff",
  padding: "32px 0",
};

const logoStyle = {
  width: 100, // Adjust the width of the logo as needed
  marginBottom: 16,
};

const linkStyle = {
  marginRight: 16,
  color: "#fff",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
};

const Footer = () => {
  return (
    <div>
      {/* <Box
        sx={{
          width: "100%",
          minHeight: "15rem",
          backgroundColor: "rgb(40, 40, 43)",
          paddingTop: "1rem",
          color: "#fff",
          paddingBottom: "1rem",
        }}
      >
        <Container maxWidth="lg">
          <Grid container direction="column" alignItems="center">
            <Grid
              item
              xs={12}
              sx={{ display: "flex", alignItems: "center", gap: "3px" }}
            >
              <BloodtypeIcon
                sx={{
                  mr: 1,
                  fontSize: "3rem",
                  color: "primary.main",
                }}
              />
              <Typography
                variant="h4"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "white",

                  textDecoration: "none",
                }}
              >
                Life
                <Typography variant="h4" noWrap sx={{ color: "primary.main" }}>
                  Flow
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography color="textSecondary" variant="subtitle1">
                {`${new Date().getFullYear()} | React | Material UI | React Router`}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box> */}
      <footer style={footerStyle}>
        <Container maxWidth="lg" sx={{display: 'flex', justifyContent: "center"}}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={12} sm={4} style={logoStyle}>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", alignItems: "center", gap: "3px" }}
                
              >
                <BloodtypeIcon
                  sx={{
                    mr: 1,
                    fontSize: "3rem",
                    color: "primary.main",
                  }}
                />
                <Typography
                  variant="h4"
                  noWrap
                  component="a"
                  href="#app-bar-with-responsive-menu"
                  sx={{
                    mr: 2,
                    display: "flex",
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "white",

                    textDecoration: "none",
                  }}
                >
                  Life
                  <Typography
                    variant="h4"
                    noWrap
                    sx={{ color: "primary.main" }}
                  >
                    Flow
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant="body2" align="center">
                <Link to="/" style={linkStyle}>
                  Home
                </Link>
                <Link to="/about" style={linkStyle}>
                  About Us
                </Link>
                <Link to="/donationRequests" style={linkStyle}>
                  Donate
                </Link>
                <Link to="/" style={linkStyle}>
                  Receive
                </Link>
                <Link to="/" style={linkStyle}>
                  Contact Us
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" align="center">
                © {new Date().getFullYear()} LifeFlow Blood Donation Website
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </footer>
    </div>
  );
};

export default Footer;
