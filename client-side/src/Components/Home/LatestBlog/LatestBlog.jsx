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
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { East } from "@mui/icons-material";
import "./LatestBlog.css";

const LatestBlog = () => {
  const axiosPublic = useAxiosPublic();
  const { data: latestBlog, isLoading } = useQuery({
    queryKey: ["latestBlogs"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/v1/latestBlogs");
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
  // console.log(latestBlog);
  return (
    <div className="cover">
      
      <div className="content">
      <Container>
        <Grid py={7}>
          <SectionTitle
            title="Latest Blog"
            subtitle="Read Our Latest Blog Entries"
          />
        </Grid>
        <Grid display={"flex"} justifyContent={"center"} pb={6}>
          <Grid container pb={6} spacing={2}>
            {/* Large device: Show 4 columns */}
            {latestBlog?.map((blog) => (
              <Grid key={blog._id} item  xs={12} sm={6} md={4} lg={4}>
                <Card sx={{ maxWidth: 345 }} elevation={5}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={blog.blogCover}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {blog.blogTitle}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Created at: {blog.creationTime}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Link to={`/blogDetails/${blog._id}`}>
                      <Button size="small" color="primary" endIcon={<East />}>
                        See Details
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>
      </div>
    </div>
  );
};

export default LatestBlog;
