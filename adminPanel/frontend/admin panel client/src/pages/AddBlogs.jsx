import React, { useEffect, useRef } from "react";
import { RTE } from "../components";
import { TextField, Button, Select, MenuItem } from "@mui/material";
import slugify from "slugify";
import { useForm } from "react-hook-form";
import { blogDetails, blogImage } from "../appwrite";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const AddBlogs = () => {
  const [title, setTitle] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [content, setContent] = React.useState("");
  const [file, setFile] = React.useState(null)
  const [error, setError] = React.useState('')
  const ref = useRef(null);
  const { control } = useForm();
  const uploadRef = useRef(null);
  const [status, setStatus] = React.useState("active");
  const navigate = useNavigate()
  const userDetails = useSelector(state => state.user.userData)
  console.log('User details:' , userDetails)
  // function to add blog
  const addBlog = async() => {
    setError('')
    if(!file || !title || !content){
        setError('All fields are required.')
        return;
    }
    const imageresponse = await  blogImage.uploadFile(file)
    if(!imageresponse){
      setError('Error while uploading image , please try some some after')
      return
    }
    const [blogresponse, blogError] = await blogDetails.createBlog(
      {
        title, status, content, slug, featuredImage: imageresponse.$id, userId : userDetails.$id
      }
    ) 
    if(blogError){
      setError(blogDetails.message)
      throw blogError
    }
    console.log(blogresponse)
    navigate('/admin/blogs')
  }



  useEffect(() => {
    setSlug(slugify(title, { lower: true }));
  }, [title]);

  useEffect(() => {
    if(file){
      console.log(file)
    }
  }, [file])

  return (
    <div className="text-black m-6 flex flex-wrap flex-row ">
      <div className="w-[850px] flex flex-col">
        <div className="font-bold mb-4 text-3xl text-neutral-700">
          {" "}
          Add new blogs for cutomers
        </div>
        <div className="w-[850px]">
          <TextField
            color="secondary"
            variant="outlined"
            fullWidth
            placeholder="Enter the title..."
            label="Enter the title of the blog"
            id="outlined-basic"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="w-[850px] mt-4">
          <TextField
            color="warning"
            variant="outlined"
            fullWidth
            placeholder="Slug"
            label="Slug"
            value={slug}
          />

          <div className="mt-4">
            <RTE
              control={control}
              setContent={setContent}
              name="Add Blog"
              label="Add blogs"
              content={content}
            />
          </div>
        </div>
        <div className="w-[110px] mt-4 ml-auto">
          <Button
            onClick={addBlog}
            variant="contained"
          >
            Submit
          </Button>
        </div>
      </div>
      <div className="w-[600px] ml-16 flex flex-col">
        <div
          className=" border  border-dashed border-blue-700 h-[150px] flex rounded-lg cursor-pointer mt-10"
          onClick={() => uploadRef.current && uploadRef.current.click()}
        >
          <input
            type="file"
            accept="image/*"
            className="m-auto "
            ref={uploadRef}
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />
          <div className="m-auto text-black font-semibold">
            Click here to upload the image
          </div>
          
        </div>
        {
          file ? (<img
              src={URL.createObjectURL(file) }
              alt="uploaded"
            />) :null
        }
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
    </div>
  );
};

export default AddBlogs;
