import { Input } from "@mui/material";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import RTE from "./RTE";

const PostForm = ({ post }) => {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const editor = useRef(null);
  const navigate = useNavigate();

const submit = async(data) => {
    if(post){
        
    }else{

    }
}



  return (
    <form onSubmit={handleSubmit(submit)} className=" flex flex-wrap">
      <div>
        <input
          type="text"
          className="mb-3"
          placeholder="Enter title."
          {...register("title", { required: true })}
        />
        <input
          type="text"
          className="mb-3"
          placeholder="Slug"
          {...register("slug", { required: true })}
        />
        <RTE
          control={control}
          name={content}
          defaultvalue={getValues(content)}
          label="Content: "
          ref={editor}
        />
      </div>
      <div>
        <input type="submit" value={post ? "Update" : "Submit"} />
      </div>
    </form>
  );
};

export default PostForm;
