import * as React from "react";
// import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import { CircularProgress, Container, Paper } from "@mui/material";
import {
  AddCircle,
  AttachMoney,
  Book,
  BorderColor,
  East,
  Home,
  People,
  Person,
  VolunteerActivism,
} from "@mui/icons-material";
import { NavLink, Outlet } from "react-router-dom";
import "../../Components/Shared/Navbar/Navbar.css";
import useAdmin from "../../hooks/useAdmin";
import useVolunteer from "../../hooks/useVolunteer";

const navStyle = {
  textDecoration: "none",
  color: "white",
  display: "flex",
  justifyContent: "center",
  fontSize: "14px",
  alignItems: "center",
  gap: "5px",
  paddingBottom: "10px",
};

const drawerWidth = 240;

function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [admin, adminLoading] = useAdmin();
  const [volunteer, volunteerLoading] = useVolunteer();

  if (adminLoading || volunteerLoading)
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

  // console.log(admin, volunteer);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      {/* <Divider /> */}
      {admin || volunteer ? (
        <List>
          <ListItem>
            <NavLink
              className="menu"
              style={navStyle}
              to={"/dashboard/adminHome"}
            >
              <Home fontSize="small" />
              {admin ? "Admin" : "Volunteer"} Home
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink
              className="menu"
              style={navStyle}
              to={"/dashboard/profile"}
            >
              <Person fontSize="small" /> {admin ? "Admin" : "Volunteer"}{" "}
              Profile
            </NavLink>
          </ListItem>
          {admin && <ListItem>
            <NavLink
              className="menu"
              style={navStyle}
              to={"/dashboard/allUsers"}
            >
              <People fontSize="small" /> All Users
            </NavLink>
          </ListItem>}
          
          <ListItem>
            <NavLink
              className="menu"
              style={navStyle}
              to={"/dashboard/allDonationRequests"}
            >
              <VolunteerActivism fontSize="small" /> All Donation Requests
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink
              className="menu"
              style={navStyle}
              to={"/dashboard/contentManagement"}
            >
              <Book fontSize="small" /> Content Management
            </NavLink>
          </ListItem>
        </List>
      ) : (
        <List>
          <ListItem>
            <NavLink
              className="menu"
              style={navStyle}
              to={"/dashboard/userHome"}
            >
              <Home fontSize="small" /> User Home
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink
              className="menu"
              style={navStyle}
              to={"/dashboard/profile"}
            >
              <Person fontSize="small" /> User Profile
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink
              className="menu"
              style={navStyle}
              to={"/dashboard/myDonationRequestsPage"}
            >
              <AddCircle fontSize="small" /> My Donation Requests
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink
              className="menu"
              style={navStyle}
              to={"/dashboard/createDonation"}
            >
              <BorderColor fontSize="small" /> Create Donation Request
            </NavLink>
          </ListItem>
        </List>
      )}

      <Divider sx={{ bgcolor: "lightgray" }} variant="middle" />
      <List>
        <ListItem>
          <NavLink className="menu" style={navStyle} to={"/"}>
            <Home fontSize="small" /> Home
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink className="menu" style={navStyle} to={"/allBlogs"}>
            <Book fontSize="small" /> Blogs
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink className="menu" style={navStyle} to={"/funding"}>
            <AttachMoney fontSize="small" /> Funding
          </NavLink>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Container maxWidth="xl">
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            bgcolor: "#fff",
          }}
        >
          <Toolbar>
            <IconButton
              color="primary.main"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <BloodtypeIcon
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                color: "primary.main",
              }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: "flex",
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "black",
                textDecoration: "none",
              }}
            >
              Life
              <Typography variant="h6" noWrap sx={{ color: "primary.main" }}>
                Flow
              </Typography>
            </Typography>
            <Typography
              variant="h6"
              noWrap
              sx={{
                color: "black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
              }}
            >
              <East /> Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Paper elevation={10}>
            <Drawer
              //   container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                  border: "none",
                  bgcolor: "secondary.main",
                },
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", sm: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                  border: "none",
                  bgcolor: "secondary.main",
                  color: "#fff",
                },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Paper>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            // width: {md: '100%'}
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </Container>
  );
}

export default DashboardLayout;
