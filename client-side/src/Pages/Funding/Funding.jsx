import { CircularProgress, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../Components/Shared/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../Components/CheckoutForm/CheckoutForm";
import useUserFunding from "../../hooks/useUserFunding";
import Empty from '../../Components/Shared/Empty/Empty';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const Funding = () => {
  const [userFunding, isLoading] = useUserFunding();

  if (isLoading)
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

    
  return (
    <Container>
      <Grid my={8}>
        <Paper elevation={5} sx={{ px: 5, py: 6 }}>
          <SectionTitle
            title="Funding Way"
            subtitle="Donate here to those need"
          />
          <Grid className="AppWrapper" mt={5}>
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </Grid>
        </Paper>
      </Grid>
      <Grid my={6}>
        
        {
            userFunding.length ? <Grid>
                <SectionTitle title="My Funding History"/>
                <TableContainer  component={Paper} sx={{ mt: 5, mb:2 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ bgcolor: "secondary.main", color: "white" }}>
                  <TableCell sx={{ color: "white", fontWeight: "700" }}>
                    
                  </TableCell>
                  <TableCell
                    sx={{ color: "white", fontWeight: "700" }}
                    align="left"
                  >
                    Transaction ID
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "700" }}>
                    Pay Time
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "700" }}>
                    Email
                  </TableCell>
                  <TableCell
                    sx={{ color: "white", fontWeight: "700" }}
                    align="center"
                  >
                    Amount
                  </TableCell>
                 
                </TableRow>
              </TableHead>
              <TableBody>
                {userFunding.map((row, idx) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {idx+1}
                    </TableCell>
                    <TableCell align="left">
                      {row.transactionId}
                    </TableCell>
                    <TableCell align="left">
                      {row.created}
                    </TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell align="center">${row.amount}</TableCell>
                   
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
            </Grid> : <Grid>
              <Empty title="Funding not made yet"/>
            </Grid>
        }
      </Grid>
    </Container>
  );
};

export default Funding;
