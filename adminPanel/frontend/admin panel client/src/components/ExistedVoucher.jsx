import React, { useEffect, useState } from "react";
import voucherObj from "../appwrite/voucher.appwrite";
import { Button, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
const Modalbuilder = ({ voucher, setVoucher, open, setOpen }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "1px solid #fff",
    boxShadow: 24,
    p: 4,
    borderRadius: 10,
  };
  const updateVoucher = async () => {
    await voucherObj.updateVoucher(voucher.$id, {
      coins: voucher.coins,
      expiry: voucher.expiry,
      use: voucher.use,
    });
    setOpen(false);
  };
  const handleClose = () => setOpen(false);
  return (
    <Modal open={open} onClose={handleClose}>
      <div
        style={style}
        className="w-[800px] h-[350px] bg-[#eee]  p-3 shadow shadow-gray-500"
      >
        <div className="flex flex-row text-2xl mb-4 bg-neutral-800 bg-opacity-30 p-2 rounded-lg">
          <div className=" text-black font-semibold">Update the voucher</div>
          <div className="font-bold text-neutral-800">&nbsp;${voucher.$id}</div>
        </div>
        <div className="flex items-center gap-4 flex-row">
          <div className="text-black font-bold  w-36"> Amount of Coins </div>
          <div className="w-[95%] ">
            <TextField
              size="small"
              fullWidth
              value={voucher?.coins}
              type="number"
              onChange={(e) =>
                setVoucher((v) => ({ ...v, coins: e.target.value }))
              }
            />
          </div>
        </div>
        <div className="flex items-center gap-4 flex-row mt-4">
          <div className="text-black font-bold w-36"> Expiry Date</div>
          <div className="w-[95%] ">
            <TextField
              size="small"
              fullWidth
              value={voucher?.date}
              type="date"
              onChange={(e) =>
                setVoucher((v) => ({ ...v, expiry: e.target.value }))
              }
            />
          </div>
        </div>
        <div className="flex items-center gap-4 flex-row mt-4">
          <div className="text-black font-bold   w-36"> Amount of Uses </div>
          <div className="w-[95%] ">
            <TextField
              size="small"
              fullWidth
              value={voucher?.use}
              type="number"
              onChange={(e) =>
                setVoucher((v) => ({ ...v, use: e.target.value }))
              }
            />
          </div>
        </div>
        <div className="w-full flex flex-row justify-end gap-4 mt-5">
          <Button variant="contained" color="success" onClick={updateVoucher}>
            Update
          </Button>
          <Button variant="contained" color="error">
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

const ExistedVoucher = ({ id, index, setVouchers, showVoucherToast }) => {
  const [voucher, setVoucher] = useState(null);
  const [open, setOpen] = useState(false);

  const fetchAllVouchers = async () => {
    const allVouchers = await voucherObj.getAllVouchers()
    
    setVouchers(allVouchers.documents)
  }
  const fetchVoucher = async () => {
    const voucherInfo = await voucherObj.getVoucher(id);
  
    setVoucher(voucherInfo);
  };
  const deleteVoucher = async () => {
    await voucherObj.deleteVoucher(voucher.$id);
    showVoucherToast()
    fetchAllVouchers()
  };
  useEffect(() => {
    fetchVoucher();
  }, []);
  return (
    <div className="flex flex-row text-black p-0.5  mb-2 gap-10 border-b border-black h-auto items-center py-2  cursor-pointer">
      <div className="font-semibold text-xl -translate-y-0.5 w-10">{index}.</div>
      <div className="  w-60">{id}</div>
      {voucher && <div className="text-black  w-10"> {voucher.coins} </div>}
      {voucher && (
        <div className="text-black  w-40"> {voucher.$updatedAt.slice(0, 10)} </div>
      )}
      {voucher && (
        <div className="text-black w-40"> {voucher.expiry.slice(0, 10)} </div>
      )}
      {voucher && <div className="w-10"> {voucher.use} </div>}
      <Button
        variant="contained"
        color="success"
        onClick={(e) => setOpen(true)}
      >
        Edit
      </Button>
      <Button variant="contained" color="error" onClick={deleteVoucher}>
        Delete
      </Button>

      {open && (
        <Modalbuilder
          voucher={voucher}
          setVoucher={setVoucher}
          open={open}
          setOpen={setOpen}
        />
      )}
    </div>
  );
};

export default ExistedVoucher;
