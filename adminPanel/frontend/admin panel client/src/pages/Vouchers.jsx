import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import voucherObj from "../appwrite/voucher.appwrite";
import ExistedVoucher from "../components/ExistedVoucher";
import { ToastContainer, toast } from "react-toastify";
const Vouchers = () => {
  const addVoucher = async () => {
    await voucherObj.createVoucher(parseInt(coins), parseInt(use), date);
    success()
    fetchAllVouchers();
  };
  const [vouchers, setVouchers] = useState(null);
  const fetchAllVouchers = async () => {
    const allVouchers = await voucherObj.getAllVouchers();
    console.log(allVouchers);
    setVouchers(allVouchers.documents);
  };
  const [coins, setCoins] = useState(null);
  const [use, setUse] = useState(null);
  const [date, setDate] = useState(null);

  const showVoucherToast = () => {
    toast.error("🦄 Voucher Deleted", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",

    });
  };
  const success = () => {
    toast.success("🦄 Voucher Created", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",

    });
  };
  useEffect(() => {
    fetchAllVouchers();
  }, []);

  return (
    <div className="flex flex-col w-full p-4">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col p-2  rounded-lg bg-opacity-50 float-right bg-[#dedede] w-96 h-80  hover:shadow hover:shadow-gray-600 ">
          <div className="text-black text-xl font-bold mb-4 mt-2 ">
            Create a code
          </div>
          <div className="mt-1 ">
            <TextField
              type="number"
              fullWidth
              size="small"
              placeholder="Amount of coins"
              onChange={(e) => setCoins(parseInt(e.target.value))}
            />
          </div>
          <div className="mt-1">
            <TextField
              type="number"
              fullWidth
              size="small"
              placeholder="Number of uses"
              onChange={(e) => setUse(parseInt(e.target.value))}
            />
          </div>
          <div className="mt-1">
            <TextField
              type="date"
              fullWidth
              size="small"
              onChange={(e) => {
                const date = new Date(e.target.value);
                const day = String(date.getDate()).padStart(2, "0");
                const month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
                const year = date.getFullYear();

                const formattedDate = `${day}-${month}-${year}`;
                setDate(formattedDate);
              }}
            />
          </div>
          <div className="mt-14">
            <Button
              variant="contained"
              fullWidth
              color="success"
              onClick={addVoucher}
            >
              Create
            </Button>
          </div>
        </div>
        <div className=" bg-[#dedede] w-full h-80 ml-4 bg-opacity-50 hover:shadow hover:shadow-gray-600  overflow-y-auto p-2 relative">
          <div className="text-black text-2xl font-bold fixed mb-2">
            Created Vouchers
          </div>
          <div className="mt-8">
            {vouchers &&
              vouchers.map((voucher, i) => (
                <ExistedVoucher
                  key={voucher.$id}
                  id={voucher.$id}
                  index={i}
                  setVouchers={setVouchers}
                  showVoucherToast={showVoucherToast}
                />
              ))}
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="animate-bounce"
      />
    </div>
  );
};

export default Vouchers;
