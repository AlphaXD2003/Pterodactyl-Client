import React, { useEffect, useState } from "react";
import { userDetails } from "../../appwrite";
import { Button } from "@mui/material";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
const OrderCard = ({
  $id,
  buyerId,
  orderId,
  $updatedAt,
  success,
  total,
  amount,
  productId,
  index,
  setCount
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [user, setUser] = useState(null);
  const fetchUserDetails = async () => {
    const [res, err] = await userDetails.getUserDetails(buyerId);
    if (res && !err) {
      console.log("User: ", res);
      setUser(res);
      
    }
    setCount(prevCount => prevCount + 1);
   
  };

  useEffect(() => {
    console.log('mounted  ')
    fetchUserDetails();
    
  }, []);

  const generateInvoice = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["Order ID", "Product ID", "Total", "Amount", "Success"]],
      body: [[orderId, productId, total, amount, success]],
    });
    doc.save("invoice.pdf");
  };

  return (
    <div className=" w-full mt-3 hover:bg-neutral-100 text-gray-800 h-auto font-semibold m-2 p-2 flex flex-wrap justify-between bg-gray-300 rounded-lg hover:shadow-sm hover:shadow-gray-600 cursor-pointer">
      <div className="font-bold">{index + 1}</div>
      <div> {orderId} </div>
      <div className="w-[200px]">{user ? user?.user_name.toUpperCase() : 'Loading...'}</div>
      <div> {productId} </div>
      <div> {total} </div>
      <div> {amount} </div>
      <div> {success} </div>
      <div className="flex flex-row ">
        {/*<div className="mr-2" ><Button variant="contained" color="success">Open</Button></div>*/}
        <div className="mr-2">
          <Button variant="contained" color="warning" onClick={generateInvoice}>
            Invoice
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
