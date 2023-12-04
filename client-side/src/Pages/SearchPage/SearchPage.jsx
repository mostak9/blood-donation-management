import {
  Autocomplete,
  Avatar,
  Button,
  CircularProgress,
  Container,
  Grid,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import SectionTitle from "../../Components/Shared/SectionTitle/SectionTitle";
import useUpazilas from "../../hooks/useUpazilas";
import useDistricts from "../../hooks/useDistricts";
import { Search } from "@mui/icons-material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Empty from '../../Components/Shared/Empty/Empty'

const SearchPage = () => {
  const [upazilas, upLoading] = useUpazilas();
  const [districts, disLoading] = useDistricts();

  const { register, handleSubmit } = useForm();
  const axiosPublic = useAxiosPublic();
  const [searchResults, setSearchResults] = useState(null);
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

  const handleSearch = async (data) => {
    const searchObj = Object.entries(data).reduce((obj, [key, value]) => {
      if (value) {
        obj[key] = value;
      }
      return obj;
    }, {});
    console.log(searchObj);

    if (!Object.keys(searchObj).length) {
      return toast.error("No search text entered!!!");
    }
    const searchData = encodeURIComponent(JSON.stringify(searchObj));
    const res = await axiosPublic.get(
      `/api/searchUsers?key=${searchData}`,
      searchObj
    );
    if(res.data) {
      setSearchResults(res.data);
      console.log(res.data)
    }
  };
  return (
    <div>
      <Container>
        <Paper elevation={4} sx={{ my: 7, px: 5, py: 6 }}>
          <Grid>
            <SectionTitle
              title="Search Donors"
              subtitle="Fill up the required fields to search donor"
            />
            <form onSubmit={handleSubmit(handleSearch)}>
              <Grid
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                flexDirection={"column"}
                gap={2}
                mt={6}
              >
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  {/* <TextField
                    id="standard-basic"
                    label="Email"
                    type="email"
                    {...register("email")}
                    sx={{ width: 300 }}
                  /> */}
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Blood Group"
                    // defaultValue={"a+"}
                    {...register("bloodGroup")}
                    sx={{ minWidth: "300px" }}
                  >
                    <MenuItem value="a+">A+</MenuItem>
                    <MenuItem value="a-">A-</MenuItem>
                    <MenuItem value="b+">B+</MenuItem>
                    <MenuItem value="b-">B-</MenuItem>
                    <MenuItem value="ab+">AB+</MenuItem>
                    <MenuItem value="ab-">AB-</MenuItem>
                    <MenuItem value="o+">O+</MenuItem>
                    <MenuItem value="o-">O-</MenuItem>
                  </TextField>
                </Grid>
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={upazilas}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        key={params._id}
                        {...register("upazila")}
                        label="Upazila"
                      />
                    )}
                  />
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={districts}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        key={params._id}
                        {...register("district")}
                        label="District"
                      />
                    )}
                  />
                </Grid>

                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<Search />}
                >
                  Search
                </Button>
              </Grid>
            </form>
          </Grid>
        </Paper>
        <Grid my={8}>
        {
           
           searchResults !== null &&(searchResults?.length > 0 ?   <TableContainer component={Paper} sx={{ mt: 4, mb:2 }}>
           <Table sx={{ minWidth: 650 }} aria-label="simple table">
             <TableHead>
               <TableRow sx={{ bgcolor: "secondary.main", color: "white" }}>
                 <TableCell sx={{ color: "white", fontWeight: "700" }}>
                   Profile Picture
                 </TableCell>
                 <TableCell
                   sx={{ color: "white", fontWeight: "700" }}
                   align="left"
                 >
                  Donor Name
                 </TableCell>
                 <TableCell sx={{ color: "white", fontWeight: "700" }}>
                   Donor Email
                 </TableCell>
                 <TableCell sx={{ color: "white", fontWeight: "700" }}>
                   Donor Address
                 </TableCell>
                 
               </TableRow>
             </TableHead>
             <TableBody>
               {searchResults?.map((row) => (
                 <TableRow
                   key={row._id}
                   sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                 >
                   <TableCell component="th" scope="row">
                   <Avatar alt={row.name} src={row.image} />
                   </TableCell>
                   <TableCell>
                    {row.name}
                   </TableCell>
                   <TableCell>
                    {row.email}
                   </TableCell>
                   <TableCell>
                    {row.upazila}, {row.district}
                   </TableCell>
                   
                 </TableRow>
               ))}
             </TableBody>
           </Table>
         </TableContainer>: <Grid>
          <Empty title="No donor found!"/>
         </Grid>)
        } </Grid>
      </Container>
    </div>
  );
};

export default SearchPage;
