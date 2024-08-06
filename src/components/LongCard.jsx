import React from "react";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import deleteAPI from "../pterodactyl/functions/deleteAPI";
import ConfirmModal from "./ConfirmModal";
function LongCard({
  img,
  name,
  description,
  price,
  country,
  city,
  cpu,
  ram,
  disk,
  databases,
  ports,
  backups,
  onClick,
  id,
  onDelete,
  onOpen,
  onEdit,
}) {
  const navigate  = useNavigate()

  return (
    <div onClick={onClick} className="cursor-pointer w-[345px] hover:shadow-sm  hover:shadow-gray-600 rounded-[82px]">
      <Card className="shadow-gray-300" sx={{ maxWidth: 345 }}>
        <CardMedia sx={{ height: 140 }} image={img} title="green iguana" />
        <CardContent>
          <div className="flex flex-col">
            <div>{name && name}</div>
            <div>
              {description} ({price})
            </div>
            <div>
              {country && country}, {city}
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <div>CPU: {cpu}</div>
                <div>RAM: {ram}</div>
                <div>Disk: {disk}</div>
              </div>
              <div className="flex flex-col">
                <div>Databases: {databases}</div>
                <div>Ports: {ports}</div>
                <div>Backups: {backups}</div>
              </div>
            </div>
            <div className="ml-auto mt-2">
              <Button size="small" onClick={() => onEdit(id)}>Edit</Button>
              <Button size="small" onClick={() => onOpen(id)}>Open</Button>
              <Button size="small" onClick={() => onDelete(id)}>Delete</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default LongCard;
