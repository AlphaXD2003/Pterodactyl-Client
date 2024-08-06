import React, { useEffect } from "react";
import { blogDetails, blogImage, userDetails } from "../../appwrite";
import parse from "html-react-parser";
import classNames from "classnames";
const BlogPost = ({ slug }) => {
  const [post, setPost] = React.useState(null);
  const [author, setAuthor] = React.useState(null);
  useEffect(() => {
    const fetchDetails = async () => {
        console.log('Slug is ' , slug)
      const [response, error] = await blogDetails.getBlogDetails(slug);
      if (error) {
        throw error;
      }
      setPost(response);
      console.log("Blog details", response);
      console.log("Feature: ", response.featuredImage);
      if (response) {
        const [userResponse, userResError] = await userDetails.getUserDetails(
          response.userId
        );
        if (!userResError) {
          console.log("User is ", userResponse);
          setAuthor(userResponse.user_name);
        }
      }
    };
    fetchDetails();
  }, []);
  return (
    <div className="flex flex-col bg-gray-200 m-4">
      <div className="font-bold text-3xl ml-auto mr-auto text-black">
        {post && post.title}
      </div>
      <div className="w-[500px] ml-auto mr-auto mt-4">
        {post && <img src={blogImage.getFilePreview(post.featuredImage)} />}
      </div>
      <div className="mt-3 font-semibold text-lg text-neutral-700 ">
        {post && parse(post.content)}
      </div>
      <div className="flex flex-row justify-between">
        <div>{post && author && <div> Written by {author} </div>}</div>
        <div
          className={classNames(
            (post && post.status )=== "active" ? "text-green-500" : "text-red-500",
            "font-bold mr-3"
          )}
        >
          {post && post.status.toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
