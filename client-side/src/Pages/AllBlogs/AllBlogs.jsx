import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { East } from "@mui/icons-material";
import SectionTitle from "../../Components/Shared/SectionTitle/SectionTitle";

const AllBlogs = () => {
  const axiosPublic = useAxiosPublic();
  const { data: blogs, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/v1/publishedBlog");
      return res.data;
    },
  });
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
    <div>
      <Container maxWidth="lg">
        <Grid my={7}>
          <SectionTitle title="Blog Posts" subtitle="Increase your knowledge by reading blog"/>
        </Grid>
        <Grid container spacing={3} my={5}>
          {blogs.map((data, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
              <Card sx={{ maxWidth: 345 }} elevation={5}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={data.blogCover}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {data.blogTitle}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Created at: {data.creationTime}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                    <Link to={`/blogDetails/${data._id}`}>
                    <Button size="small" color="primary" endIcon={<East/>}>
                    See Details
                  </Button>
                    </Link>
                  
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default AllBlogs;
