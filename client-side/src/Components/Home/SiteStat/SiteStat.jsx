import { Container, Grid, Typography } from "@mui/material";
import CountUp from "react-countup";

const SiteStat = () => {
  return (
    <Grid
      data-aos="fade-up"
      data-aos-duration="1500"
      bgcolor="rgba(220, 20, 60, 1)"
      py={8}
    >
      <Container>
        <Grid sx={{ color: "white", textAlign: "center" }}>
          <Typography variant="h4" fontWeight={700}>
            Connection, Donation, Impact
          </Typography>
          <Typography variant="body" color="lightgray">
            Impactful Blood Donations Redefining Health, Healing, and Humanity
          </Typography>
        </Grid>
        <Grid container mt={5}>
          <Grid
            item
            data-aos="fade-up"
     data-aos-duration="500"
            p={3}
            borderRight={{ xs: "none", md: "2px solid white" }}
            xs={12}
            md={6}
            lg={3}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            color={"white"}
            gap={2}
          >
            <Typography variant="h5" fontWeight={700}>
              <CountUp duration={5} end={50000} />+ / year
            </Typography>
            <Typography variant="body" fontWeight={500}>
              Successful Donation
            </Typography>
          </Grid>
          <Grid
            item
            p={3}
            data-aos="fade-up"
     data-aos-duration="1000"
            borderRight={{ xs: "none", md: "2px solid white" }}
            xs={12}
            md={6}
            lg={3}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            color={"white"}
            gap={2}
          >
            <Typography variant="h5" fontWeight={700}>
              <CountUp duration={5} end={1000} />+ / month
            </Typography>
            <Typography variant="body" fontWeight={500}>
              Active Donor
            </Typography>
          </Grid>
          <Grid
            item
            p={3}
            data-aos="fade-up"
     data-aos-duration="1500"
            borderRight={{ xs: "none", md: "2px solid white" }}
            xs={12}
            md={6}
            lg={3}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            color={"white"}
            gap={2}
          >
            <Typography variant="h5" fontWeight={700}>
              <CountUp duration={5} end={30} />+
            </Typography>
            <Typography variant="body" fontWeight={500}>
              Affiliated Hospitals
            </Typography>
          </Grid>
          <Grid
            item
            data-aos="fade-up"
     data-aos-duration="2000"
            p={3}
            xs={12}
            md={6}
            lg={3}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            color={"white"}
            gap={2}
          >
            <Typography variant="h5" fontWeight={700}>
              <CountUp duration={5} end={70} />%
            </Typography>
            <Typography variant="body" fontWeight={500}>
              Emergency Response
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};

export default SiteStat;
