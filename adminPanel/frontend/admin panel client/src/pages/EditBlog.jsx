import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { blogDetails, blogImage } from "../appwrite";
import { RTE } from "../components";
import { useForm } from "react-hook-form";
import { Button, MenuItem, Select, TextField } from "@mui/material";

const EditBlog = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [content, setContent] = useState(null);
  const { control } = useForm();
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(null);
  const fetchPost = async () => {
    const [response, error] = await blogDetails.getBlogDetails(id);
    setPost(response);
    setContent(response.content)
    setStatus(response.status);
    console.log(response);
  };
  const ref = useRef(null);
  const navigate = useNavigate();
  const updateBlog = async () => {
    if (file) {
      await blogImage.deleteFile(post.featuredImage);
      const fileUpload = await blogImage.uploadFile(file);
      const fileId = fileUpload.$id;
      const [res, err] = await blogDetails.updateBlog(id, {
        title: post.title,
        content: content,
        featuredImage: fileId,
        status: status,
      });
      if (res) {
        console.log("Updated blog: ", res);
        navigate("/admin/blogs");
      }
    } else {
      const [res, err] = await blogDetails.updateBlog(id, {
        title: post.title,
        content: content,
        featuredImage: post.featuredImage,
        status: status,
      });
      if (res) {
        console.log("Updated blog: ", res);
        navigate("/admin/blogs");
      }
      else{
        console.log(err)
      }
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);
  useEffect(() => {
    console.log("File: ", file);
  }, [file]);
  return (
    <div className="m-4">
      {post && (
        <RTE
          content={post.content}
          control={control}
          name={post.title}
          label={post.title}
          defaultvalue={post}
          setContent={setContent}
        />
      )}
      {post && (
        <div className="flex flex-row">
          <div className="flex flex-col">
            <div className="w-[850px] mt-4">
              <TextField
                color="warning"
                variant="outlined"
                fullWidth
                placeholder="Slug"
                label="Slug"
                value={id}
              />
            </div>
            <div className="w-[850px] mt-4">
              <TextField
                color="warning"
                variant="outlined"
                fullWidth
                placeholder="Enter the title"
                label="Title"
                value={post.title}
              />
            </div>
            <div className="mt-4">
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Status"
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </div>
          </div>
          <div className="ml-4 mt-4 flex flex-col">
            <div
              className="m-auto"
              onClick={() => ref.current && ref.current.click()}
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div className="ml-auto mr-auto mt-5">
              <img
                src={blogImage.getFilePreview(post.featuredImage)}
                width="400px"
              />
            </div>
          </div>
        </div>
      )}
      <Button variant="contained" color="success" onClick={updateBlog}>
        Update
      </Button>
    </div>
  );
};

export default EditBlog;
