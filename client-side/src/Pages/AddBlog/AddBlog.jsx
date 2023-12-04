import { Button, CircularProgress, Grid, TextField } from "@mui/material";
import SectionTitle from "../../Components/Shared/SectionTitle/SectionTitle";
import  { useState, useRef,  } from "react";
import JoditEditor from "jodit-react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAllBlogs from "../../hooks/useAllBlogs";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddBlog = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [pending, setPending] = useState(false) 
  const [,,refetch] = useAllBlogs();
  

  const onSubmit = async (data) => {
    setPending(true)
    const imageFile = { image: data.blogCover[0] };
    const imgRes = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (imgRes.data.success) {
      const date = new Date();
      const blogInfo = {
        blogTitle: data.blogTitle,
        blogCover: imgRes.data.data.display_url,
        blogContent: content,
        creationTime: `${date.getHours()}:${date.getMinutes()} ${date.getUTCDate()}/${
          date.getUTCMonth() + 1
        }/${date.getUTCFullYear()}`,
        status: 'draft'
      };
      const res = await axiosSecure.post('/api/v1/addBlog', blogInfo) 
      if(res.data.insertedId) {
        setPending(false)
        toast.success('Blog created successfully!');
        refetch();
        reset();
        navigate('/dashboard/contentManagement')
      }
    }
  };

  return (
    <div>
      <Grid mt={7}>
        <SectionTitle
          title="Add a blog"
          subtitle="here have editor to add a blog"
        />
      </Grid>
      <Grid mx={"auto"}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <Grid display={"flex"} flexDirection={"column"} gap={1}>
            <h2 style={{ marginBottom: 0 }}>Blog Title:</h2>
            <TextField
              id="standard-basic"
              type="text"
              {...register("blogTitle")}
              sx={{ width: "100%", mt: 0 }}
              required
            />
          </Grid>
          <Grid display={"flex"} flexDirection={"column"} gap={1}>
            <h2 style={{ marginBottom: 0 }}>Blog Cover:</h2>
            <TextField
              id="standard-basic"
              type="file"
              {...register("blogCover")}
              sx={{ width: "100%", mt: 0 }}
              required
            />
          </Grid>
          <Grid display={"flex"} flexDirection={"column"} gap={1}>
            <h2 style={{ marginBottom: 0 }}>Blog Content:</h2>
            <JoditEditor
              ref={editor}
              // id="editor"
              value={content}
              tabIndex={1} // tabIndex of textarea
              className="jodit-editor"
              onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
              onChange={(newContent) => setContent(newContent)}
            />
          </Grid>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: "26px", width: "60%", mx: "auto" }}
            startIcon={pending && <CircularProgress sx={{color: 'black'}} size={20}/>}
          >
            Create Blog
          </Button>
        </form>
      </Grid>
      {/* <Grid>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Grid> */}
    </div>
  );
};

export default AddBlog;
