
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';
import SectionTitle from '../../Shared/SectionTitle/SectionTitle';

const AboutUs = () => {
  return (
    <Container maxWidth="lg"sx={{my: 16}}>
    <SectionTitle title="About Us" subtitle="Here goes about us, our mission, our vision"/>
      <Grid container spacing={3} mt={5}>
        <Grid item xs={12} sm={4}>
          <Card elevation={4} sx={{minHeight: '250px'}}>
            <CardContent>
              <Typography variant="h4" fontWeight={700} color={"primary"} gutterBottom>
                Our Mission
              </Typography>
              <Typography variant="body1"  color={'rgba(128, 128, 128, 0.9)'}>
                We are dedicated to facilitating blood donation by connecting donors with those in need. Our mission is to ensure a steady and safe blood supply for hospitals and medical centers.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card elevation={4} sx={{minHeight: '250px'}}>
            <CardContent>
              <Typography variant="h4" fontWeight={700} color={"primary"} gutterBottom>
                Our Vision
              </Typography>
              <Typography variant="body1"  color={'rgba(128, 128, 128, 0.9)'}>
                Our vision is to create a community where every individual understands the importance of donating blood and feels empowered to contribute to saving lives through regular donations.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card elevation={4} sx={{minHeight: '250px'}}>
            <CardContent>
              <Typography variant="h4" fontWeight={700} color={"primary"} gutterBottom>
                About Us
              </Typography>
              <Typography variant="body1" color={'rgba(128, 128, 128, 0.9)'}>
                Our platform aims to streamline the blood donation process, making it easier for donors to find donation centers, schedule appointments, and contribute to the noble cause of saving lives.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutUs;
