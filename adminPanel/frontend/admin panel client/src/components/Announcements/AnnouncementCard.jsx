import { Button } from "@mui/material";
import React from "react";
import announcementDetails from "../../appwrite/announcemet.appwrite";

const AnnouncementCard = ({ content, count, id, fetchAllAnnouncements }) => {
    const deleteAnnouncement = async() => {
        const res = await announcementDetails.deleteAnnouncement(id)
        fetchAllAnnouncements()
    }
  return (
    <div className="flex flex-row  border border-black mt-4 px-4  items-center justify-between cursor-pointer hover:bg-gray-300">
      <div className=" flex flex-row w-[800px]">
        <div className="font-bolder ">{count + 1}.</div>
        <div className="ml-10 font-bold">{content}</div>
      </div>
      <div className="flex flex-row gap-2">
        <div className="ml-auto">
          <Button
            onClick={() => deleteAnnouncement()}
          >Delete</Button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;
