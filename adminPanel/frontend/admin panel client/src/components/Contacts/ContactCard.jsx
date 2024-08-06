import React, { useState } from "react";
import { Button } from "@mui/material";
import { contactDetais } from "../../appwrite";
import emailjs from "@emailjs/browser";
import {  toast , Flip} from "react-toastify";
const ContactCard = ({
  $id,
  content,
  userId,
  $updatedAt,
  email,
  index,
  fetchAllContact,
  ToastContainer
}) => {
  // Email Service
  const sendEmail = (message) => {
    emailjs
      .send(
        import.meta.env.VITE_MAIL_SERVICE_ID,
        import.meta.env.VITE_EMAIL_TEMPLATE_ID,
        { to_email: email, message: message },
        import.meta.env.VITE_EMAIL_PUBLIC_KEY
      )
      .then((response) => console.log("Email sent successfully"))
      .catch((error) => console.log(`Failed to send email to ${email}`, error));
    fetchAllContact();
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const toogleContent = () => {
    setIsExpanded(!isExpanded);
  };
  const deleteContact = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const res = await contactDetais.deleteContact($id);
    if (res) {
      sendEmail(
        `Your contact or suggestion is discarded.\nYour message was: ${content} `
      );
      toast.error('🦄 Discarded Successfully!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Flip,
        });
    }
  };

  const acceptContact = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const res = await contactDetais.deleteContact($id);
    if (res) {
      sendEmail(
        `Your contact or suggestion is accepted.\nYour message was: ${content} `
      );
      toast.success("🦄 Accepted Successfully!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Flip,
      });
    }
  };

  return (
    <div
      onClick={toogleContent}
      className="container w-full text-xl bg-gray-200 mt-4 flex flex-wrap justify-between items-center h-auto rounded-lg hover:shadow-black cursor-pointer hover:shadow-sm overflow-auto px-4 py-3"
    >
      <div className="font-bold ml-2">
        {isExpanded ? null : `${index + 1}.`}
      </div>
      <div className="text-neutral-500 font-bold"> {email} </div>
      <div className="text-neutral-800 font-bolder bg-neutral-50 px-2 rounded-lg py-1.5">
        {" "}
        {isExpanded ? content : `${content.substring(0, 50)}...`}{" "}
      </div>
      <div> {$updatedAt} </div>
      <div className="mr-3 px-3 flex flex-row mt-1.5">
        <div className="mr-3">
          <Button
            variant="contained"
            color="success"
            onClick={(e) => acceptContact(e)}
          >
            Accepted
          </Button>
        </div>
        <Button
          variant="contained"
          color="error"
          onClick={(e) => deleteContact(e)}
        >
          Rejected
        </Button>
      </div>
      
    </div>
  );
};

export default ContactCard;
