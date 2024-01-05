import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
// const formContainerStyle = {
//     marginTop: '20px',
//   };

const textFieldStyle = {
  marginBottom: "20px",
};

const submitButtonStyle = {
  marginTop: "20px",
};

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission goes here
  };
  return (
    <div
      style={{ padding: "80px 0", backgroundColor: "rgb(229, 228, 226, 0.4)" }}
      data-aos="fade-up"
     data-aos-duration="800"
    >
      <Container>
        <SectionTitle
          title="Contact Us"
          subtitle="Contact with us as you needed"
        />
        <Grid container spacing={4} mt={5}>
          {/* Contact details section */}
          <Grid
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1000"
            item
            sm={12}
            md={6}
          >
            <Typography variant="h5" fontWeight={700}>
              Get in touch with us — we are here to help you save lives
            </Typography>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "0.8rem",
                mt: "20px",
              }}
            >
              <Typography variant="body1" sx={{ display: "flex", gap: "2px" }}>
                {" "}
                <AddLocationIcon color="primary" />{" "}
                <Typography fontWeight={700}>Address: </Typography>123 Lifesaver
                Avenue, Bloodville, State, ZIP
              </Typography>
              <Typography variant="body1" sx={{ display: "flex", gap: "2px" }}>
                {" "}
                <PhoneIcon color="primary" />{" "}
                <Typography fontWeight={700}>Phone: </Typography>(+880)
                1734533333
              </Typography>
              <Typography variant="body1" sx={{ display: "flex", gap: "2px" }}>
                {" "}
                <EmailIcon color="primary" />{" "}
                <Typography fontWeight={700}>Email: </Typography>
                support@lifeflow.com
              </Typography>
            </Grid>
          </Grid>
          {/* form section */}
          <Grid item sm={12} md={6}>
            <form onSubmit={handleSubmit}>
              <Grid maxWidth={"80%"} mx={"auto"} container spacing={2}>
                <Grid data-aos="fade-up" item xs={12} sm={6}>
                  <TextField
                    label="First Name"
                    variant="outlined"
                    size="small"
                    fullWidth
                    style={textFieldStyle}
                  />
                </Grid>
                <Grid data-aos="fade-up" item xs={12} sm={6}>
                  <TextField
                    label="Last Name"
                    variant="outlined"
                    size="small"
                    fullWidth
                    style={textFieldStyle}
                  />
                </Grid>
                <Grid data-aos="fade-up" item xs={12}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    size="small"
                    fullWidth
                    style={textFieldStyle}
                  />
                </Grid>
                <Grid data-aos="fade-up" item xs={12}>
                  <TextField
                    label="Message"
                    variant="outlined"
                    size="small"
                    multiline
                    rows={4}
                    fullWidth
                    style={textFieldStyle}
                  />
                </Grid>
                <Grid data-aos="fade-up" item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={submitButtonStyle}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ContactUs;
