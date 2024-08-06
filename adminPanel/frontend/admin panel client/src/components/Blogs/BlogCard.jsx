import React, { useEffect, useState } from "react";
import blogImage from "../../appwrite/blogImage.appwrite";
import parse from "html-react-parser";
import classNames from "classnames";
import userDetails from "../../appwrite/user.appwrite";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const BlogCard = ({ title, content, imageId, status, user, $id , open, setOpen,  setDeleteBlogId}) => {
  console.log("Image id: ", blogImage.getFilePreview(imageId));
  const [author, setAuthor] = useState("");
  
  function truncateContent(content) {
    return content.length > 100 ? content.substring(0, 100) + "..." : content;
  }
  console.log("User Id: ", user);


  const handleDelete = async(e) => {
    e.preventDefault()
    setOpen(true)
    setDeleteBlogId($id)
  }

  const navigate = useNavigate()
  

  useEffect(() => {
    (async () => {
      const [response, error] = await userDetails.getUserDetails(user);
      console.log(response);
      if (!error) setAuthor(response.user_name);
    })();
    console.log('Type of handledel', typeof handleDelete)
  }, []);

  return (
    <Link
      to={`/admin/post/${$id}`}
    >
      <div className="flex flex-col w-[300px] h-[300px] bg-gray-300 rounded-bg p-2 mt-6">
        <div className="justify-center items-center h-auto w-[180px] ml-auto mr-auto">
          <img
            className="mb-auto mt-auto"
            src={blogImage.getFilePreview(imageId)}
            alt={title}
            width="200px"
            height="300px"
          />
        </div>
        <div className="flex flex-col ml-4 mt-auto mb-auto">
          <div className="text-black text-2xl font-bold">{title}</div>

          <div
            className={classNames(
              status === "active" ? "text-green-500" : "text-red-500",
              "font-bold mt-auto"
            )}
          >
            {" "}
            &nbsp;{status.toUpperCase()}
          </div>
          <div className="mt-auto mb-2">Written by {author}</div>
        </div>
        <div className="flex flex-wrap ">
        <Button onClick={(e) =>{
          e.preventDefault()
          navigate(`/admin/edit/blog/${$id}`)
        }} >Edit</Button>
        <Button onClick={(e) => handleDelete(e)}>Delete</Button>
          </div>
      </div>

    </Link>

  );
};

export default BlogCard;
