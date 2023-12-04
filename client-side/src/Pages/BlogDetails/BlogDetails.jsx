import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { CircularProgress, Container, Grid } from "@mui/material";

const BlogDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const { data: blog, isLoading } = useQuery({
    queryKey: ["blogDetails", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/v1/blogDetails/${id}`);
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
  return <div>
    <Container sx={{my:8}}>
      <Grid sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <img src={blog.blogCover} width={'70%'} alt="" />
      </Grid>
    <div dangerouslySetInnerHTML={{ __html: blog.blogContent }} />
    </Container>
    
  </div>;
};

export default BlogDetails;
