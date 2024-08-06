import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import blogDetails from "../appwrite/blog.appwrite";
import BlogCard from "../components/Blogs/BlogCard";
import { Dialog } from "@headlessui/react";
import { Modal, Typography, Box } from "@mui/material";
import { ColorRing } from "react-loader-spinner";
const AllBlogs = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = React.useState([]);
  const [open, setOpen] = useState(false);
  const [deleteBlogId, setDeleteBlogId] = useState(null);

  const [loading, setLoading] = useState(true);
  const blogDelete = async () => {
    console.log("The blog that will be deleted: ", deleteBlogId);
    const [response, error] = await blogDetails.deleteBlog(deleteBlogId);
    console.log("DElete blog:", response);
    (async () => {
      const [response, error] = await blogDetails.getAllBlogs();
      console.log(response);
      if (response) {
        setPosts(response.documents);
      }
    })();
    setDeleteBlogId(null);
    setOpen(false);
  };

  useEffect(() => {
    (async () => {
      const [response, error] = await blogDetails.getAllBlogs();
      console.log(response);
      if (response) {
        setPosts(response.documents);
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    console.log("Delete blog id: ", deleteBlogId);
  }, [deleteBlogId]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return loading ? (
    <div className="flex flex-row justify-center items-center w-full h-full">
      <div className="m-auto">
        <ColorRing
          visible={true}
          height="280"
          width="280"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-col ml-4 mt-4">
      <div className="ml-auto mr-8">
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate("/admin/add-blog")}
        >
          {" "}
          Add Blogs
        </Button>
      </div>
      <div className=" flex flex-wrap gap-4">
        {posts &&
          posts.map((post) => (
            <BlogCard
              key={post.$id}
              title={post.title}
              content={post.content}
              imageId={post.featuredImage}
              status={post.status}
              user={post.userId}
              $id={post.$id}
              open={open}
              setOpen={setOpen}
              setDeleteBlogId={setDeleteBlogId}
            />
          ))}
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <Box sx={style}>
            <Typography>Are you sure you want to delete the server?</Typography>
            <div className="flex flex-row gap-4 mt-3">
              <Button variant="contained" color="success" onClick={blogDelete}>
                Yes
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  setOpen(false);
                  setDeleteBlogId(null);
                }}
              >
                No
              </Button>
            </div>
          </Box>
        </div>
      </Modal>
    </div>
  );
};

export default AllBlogs;
