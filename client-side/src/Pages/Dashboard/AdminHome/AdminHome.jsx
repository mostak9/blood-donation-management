import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider/AuthProvider";
import { TypeAnimation } from "react-type-animation";
import SectionTitle from "../../../Components/Shared/SectionTitle/SectionTitle";
import useAdminStats from "../../../hooks/useAdminStats";
import { CircularProgress, Grid, Paper, Typography } from "@mui/material";
import usersIcon from '../../../assets/users.png'
import fundingIcon from '../../../assets/funding.png'
import requestsIcon from '../../../assets/requests.png'
import CountUp from 'react-countup';

const AdminHome = () => {
  const { user } = useContext(AuthContext);
  const [adminStats, statsLoading] = useAdminStats();

  if (statsLoading)
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
  console.log(adminStats)
  return (
    <div>
      <div>
        <TypeAnimation
          sequence={[
            // Same substring at the start will only be typed out once, initially
            `Welcome! ${user.displayName}`,
            1500,
            `Bienvenue! ${user.displayName}`,
            1500,
            `Yōkoso!  ${user.displayName}`,
            1500,
            `Bienvenido!  ${user.displayName}`,
            1500,
            `Willkommen!  ${user.displayName}`,
            1500,
            `Benvenuto!  ${user.displayName}`,
            1500,
            `Dobro pozhalovat'!  ${user.displayName}`,
            1500,
          ]}
          wrapper="span"
          speed={50}
          style={{
            fontSize: "3em",
            display: "inline-block",
            fontWeight: "700",
          }}
          repeat={Infinity}
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        <SectionTitle
          title="Statistics"
          subtitle="Here goes user traffic, total funding, total requests"
        />
      </div>
      <Grid component={Paper} display={"flex"} flexDirection={{xs: "column", md: 'row', }} width={"fit-content"} mx={'auto'} mt={7}>
        <Grid display='flex'  alignItems='center' gap={2} px={5} py={3} bgcolor={'rgba(220, 20, 60, 0.2)'}> 
            <Grid><img src={usersIcon} style={{maxWidth: '60px'}}  alt="" /></Grid>
            <Grid >
                <Typography variant="h6" color='primary.main' fontWeight={700}>Total Users</Typography>
                <Typography variant="h3" fontFamily={"monospace"}><CountUp duration={5} end={adminStats.users}/></Typography>
            </Grid>
        </Grid>
        <Grid display='flex'  alignItems='center' gap={2} px={5} py={3} bgcolor={'rgb(50,205,50, 0.3)'}> 
            <Grid><img src={fundingIcon} style={{maxWidth: '60px'}}  alt="" /></Grid>
            <Grid >
                <Typography variant="h6" color='rgb(50,205,50, 1)' fontWeight={700}>Total Funding</Typography>
                <Typography variant="h3" fontFamily={"monospace"}>$<CountUp duration={5} end={adminStats.totalFunding}/></Typography>
            </Grid>
        </Grid>
        <Grid display='flex'  alignItems='center' gap={2} px={5} py={3} bgcolor={'rgba(75, 0, 130, 0.3)'}> 
            <Grid><img src={requestsIcon} style={{maxWidth: '60px'}}  alt="" /></Grid>
            <Grid >
                <Typography variant="h6" color='rgba(75, 0, 130, 1)' fontWeight={700}>Total Donation Requests</Typography>
                <Typography variant="h3" fontFamily={"monospace"}><CountUp duration={5} end={adminStats.requests}/></Typography>
            </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminHome;
