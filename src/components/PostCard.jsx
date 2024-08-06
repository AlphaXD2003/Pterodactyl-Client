import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser"
export default function PostCard({ title = "Title", image, slug , description}) {
  const navigate = useNavigate();
  console.log('Slug: ', slug  )
  console.log('description: ', parse(description).$$typeof  )
  const tagparser = new DOMParser()
  console.log('description: ', tagparser.parseFromString(description, 'text/html').querySelector("body").textContent )
  const content = `${tagparser.parseFromString(description, 'text/html').querySelector("body").textContent.slice( 0, 170)}...`
  return (
    
    <div className="h-[350px] bg-transparent shadow-lg w-[345px] cursor-pointer shadow-blue-300">
      <Card color="" className="mt-4 h-[350px] flex flex-col" sx={{ maxWidth: 345, bgcolor: "transparent"}}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={image}
          style={{ maxHeight: '170px', }} // Replace '200px' with your desired value
        />
        <div className="mt-2"></div>
        <CardContent >
          <div className="flex flex-col">
            <Typography variant="h6" component="div" color="white">
              {title.toUpperCase()}
            </Typography>
            <p  className="text-neutral-300">{content}</p>

            <div className="mt-auto translate-y-6 text-slate-700 font-light"></div>
          </div>
        </CardContent>
        <div className="mt-auto mb-2 ">
        <CardActions >
          <Button 
          
          color="success"
          variant="contained"
          size="small" onClick={
            () => navigate(`/blogs/${slug}`)
          
          }>
            View
          </Button>
        </CardActions>
        </div>
      </Card>
    </div>
  );
}
