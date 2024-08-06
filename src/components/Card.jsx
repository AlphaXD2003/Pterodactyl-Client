import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function MediaCard({
  label,
  children,
  current,
  max,
  text = null,
  ...props
}) {
  let progress = (current / max) * 100;
  let color = "white"; // Default color

  if (progress < 50) {
    color = "primary";
  } else if (progress < 80) {
    color = "success";
  } else {
    color = "error";
  }
  return (
    <Card
      className="border border-gray-600 mx-2 my-4 rounded-lg  w-[900px] h-[136px] flex flex-col justfcy-center "
      sx={{ maxWidth: 900 }}
    >
      <CardContent>
        <div className="flex flex-row gap-1">
          {children}
          <Typography gutterBottom variant="h5" component="div">
            {label}
          </Typography>
        </div>

        <Typography variant="body2" color="text.secondary">
          <div className="flex flex-row">
            <div className="text-[40px]">
              {current}
              {text && text}
            </div>
            <div className="flex flex-col">
              <div className="h-5"></div>
              <div className="font-bold text-xl ">
                {" "}
                / {max}
                {text && text}
              </div>
            </div>
          </div>
        </Typography>
      </CardContent>
      <Box sx={{ width: "100%" }}>
        <LinearProgress variant="determinate" value={progress} color={color} />
      </Box>
    </Card>
  );
}
