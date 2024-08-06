import React, { useEffect, useState } from "react";
import { contactDetais } from "../appwrite";
import ContactCard from "../components/Contacts/ContactCard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MutatingDots } from "react-loader-spinner";

const AllContacts = () => {
  const [contacts, setContacts] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchAllContact = async () => {
    const res = await contactDetais.fetchAllCOntacts();
    if (res) setContacts(res.documents);
    console.log(res);
    setLoading(false);
  };
  useEffect(() => {
    fetchAllContact();
  }, []);
  return loading ? (
    <div className="flex flex-row justify-center items-center w-full h-full">
      <div className="m-auto">
        <MutatingDots
          visible={true}
          height="100"
          width="100"
          color="#4fa94d"
          secondaryColor="#4fa94d"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </div>
  ) : (
    <div className="m-3">
      <ToastContainer />
      <div className="font-bold text-3xl underline">All Contacts &nbsp;</div>
      {contacts &&
        contacts.map((contact, index) => (
          <div className="text-black" key={contact.$id}>
            <ContactCard
              index={index}
              $id={contact.$id}
              content={contact.content}
              userId={contact.userId}
              email={contact.email}
              fetchAllContact={fetchAllContact}
              ToastContainer={ToastContainer}
            />
          </div>
        ))}
    </div>
  );
};

export default AllContacts;
