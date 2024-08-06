import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCopy } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { CiCoins1 } from "react-icons/ci";
import { CiMoneyBill } from "react-icons/ci";
import { CiWallet } from "react-icons/ci";
import referral from "../services/referral.appwrite";
import { useSelector } from "react-redux";
import userAccountService from "../services/user.appwrite";
import { Pagination } from "@mui/material";
import { InfinitySpin } from "react-loader-spinner";
import { TypewriterEffect } from "../components/TypeWritterText";
import ReferralCard from "../components/ReferralCard";

function ReferalCard({ text1, text2, children = <HiOutlineUserGroup /> }) {
  return (
    <div className="translate-y-[80px] shadow-md shadow-neutral-700 ring-1 ring-neutral-400 mt-2 mb-2 mr-4">
      <div className="w-[300px] h-[100px] bg-slate-600 bg-opacity-30 flex flex-row rounded-lg place-content-around">
        <div className="text-3xl text-white  mt-auto mb-auto pl-1 ml-6 mr-1  ">
          {children}
        </div>
        <div className="flex flex-col ml-6 justify-center text-neutral-200 items-center text-[20px]  w-[280px]  ">
          <div className="text-neutral-100 font-light">{text1}</div>
          <div className="font-extrabold">{text2}</div>
        </div>
      </div>
    </div>
  );
}

function RefreadlTransparentCard({
  img = "https://source.unsplash.com/80x80?face",
  username,
  email,
  className = "m-2",
}) {
  return (
    <div
      className={` ${className} cursor-pointer hover:shadow hover:shadow-blue-800 w-[350px] h-[80px] flex flex-row justify-start items-center bg-sky-700 rounded-lg`}
    >
      <div>
        <img src={img} className="rounded-full w-10 h-10 ml-2 mr-2" />
      </div>
      <div className="flex flex-col gap-1 ml-2 text-white">
        <div>{username}</div>
        <div>{email}</div>
      </div>
    </div>
  );
}

function Referrals() {
  const itemsPerPage = 10; // Set the number of items per page
  const [page, setPage] = useState(1); // Set the initial page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const [loading, setLoading] = React.useState(true);
  const [referalInfo, setReferralInfo] = React.useState([]);
  const userData = useSelector((state) => state.user.userData);
  console.log("Userdata: ", userData);
  async function referralData() {
    const referralData = await referral.getReferralDocument(userData.$id);
    console.log(referralData[0]);
    setReferralInfo(referralData[0]);
  }

  async function getUserEmail(uid) {
    console.log("UID: ", uid);
    const user = await userAccountService.getUser(uid);
    console.log("Called user: ", user);
    return [user.email, user.name];
  }
  const [userEmails, setUserEmails] = React.useState([]);
  useEffect(() => {
    referralData();
    getUserEmail();

    return () => {
      setReferralInfo([]);
    };
  }, []);
  const [pteroLink, setPteroLink] = useState(null);
  const [referredUserId, setReferredUserId] = useState(null);
  React.useEffect(() => {
    if (referalInfo && referalInfo.refferedUserId) {
      console.log("Referral Info: ", referalInfo);
      setReferredUserId(referalInfo.refferedUserId);
      const fetchUserEmails = async () => {
        for (const referral of referalInfo.refferedUserId) {
          console.log("Referral: ", referral);
          const [email, name] = await getUserEmail(referral);
          setUserEmails((prevEmails) => [...prevEmails, { email, name }]);
        }
        const words = [
          {
            text: "https://ptero.how2mc.xyz/join/",
          },
          {
            text: referalInfo.referralCode,
          },
        ];
        setPteroLink(words);
        console.log("ptero link: ", pteroLink);
        setLoading(false);
      };

      fetchUserEmails();
    }

    return () => {
      setUserEmails([]);
    };
  }, [referalInfo]);

  React.useEffect(() => {
    console.log("userEmails:", userEmails);
  }, [userEmails]);
  const [isCopied, setIsCopied] = React.useState(false);

  //https://ptero.how2mc.xyz/join/{referalInfo.referralCode }

  return loading ? (
    <div className="flex flex-row justify-center h-full items-center overflow-hodden">
      <InfinitySpin />
    </div>
  ) : referalInfo && referalInfo.length === 0 ? (
    <div>Loading...</div>
  ) : (
    <div className="flex flex-col ml-2 mr-2 bg-transparent h-auto rounded-lg mb-auto text-white ">
      <div className="px-2 ">
        <div>
          <h2 className="font-bold text-3xl">Referrals</h2>
        </div>
        <p className="text-neutral-300 shadow-sm">
          Share your referral link to earn coins every time a user registers
          using your link.
        </p>
        <div className="mt-4">
          <div className="text-neutral-200 mb-1 font-semibold underline">
            Your referral link. Click to copy and earn coins!.
          </div>
          <div className="flex flex-row gap-2">
            <p className="text-xl font-bold">
              <Link className="hidden">
                https://ptero.how2mc.xyz/join/{referalInfo.referralCode}
              </Link>
              {pteroLink && (
                <TypewriterEffect
                  words={pteroLink}
                  className="text-white text-[5px]"
                />
              )}
            </p>

            <FaCopy
              className={` text-${
                isCopied ? "green" : "neutral-200"
              } cursor-pointer translate-y-5 pl-1 text-neutral-200 text-[20px]`}
              onClick={async () => {
                await navigator.clipboard.writeText(
                  `https://ptero.how2mc.xyz/join/${referalInfo.referralCode}`
                );
                setIsCopied(true);
                setTimeout(() => {
                  setIsCopied(false);
                }, 3000);
              }}
            />
            {isCopied && (
              <div className="text-blue-600 ml-3 translate-y-1">Copied!</div>
            )}
          </div>
          <div className="mt-1.5 ">
            <p className="text-neutral-400">
              Earned coins canbe used to excahnge for premium services and
              resources.
            </p>
          </div>
          <div className="flex flex-row justify-between ">
            <div className="flex flex-col">
              <div className="mt-6 font-extrabold text-3xl">Your referrals</div>
              <div className="h-[480px] w-[1250px] bg-[#111] bg-opacity-70 p-4  mt-4 rounded-lg bg-dot-white/[0.2] relative  ">
                <div className="flex flex-wrap justify-start mt-10 items-center my-auto">

                    {referredUserId ? (
                      referredUserId
                        .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                        .map((id) => {
                          return <ReferralCard key={id} id={id} />;
                        })
                    ) : (
                      <div>Loading...</div>
                    )}
            
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <ReferalCard
                text1={"Total referrals"}
                text2={
                  referalInfo && referalInfo.refferedUserId
                    ? referalInfo.refferedUserId.length
                    : 10
                }
              />
              <ReferalCard
                text1={"Coins per referral"}
                text2={"10"}
                children={<CiCoins1 />}
              />
              <ReferalCard
                text1={"Earned from purchases"}
                text2={"10"}
                children={<CiMoneyBill />}
              />
              <ReferalCard
                text1={"Coins earned"}
                text2={
                  referalInfo && referalInfo.refferedUserId
                    ? referalInfo.refferedUserId.length * 10
                    : 0
                }
                children={<CiWallet />}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="ml-auto mt-1 mr-auto mb-auto p-2 rounded-lg  bg-blue-500 bg-opacity-60">
        {userEmails.length && (
          <Pagination
            count={Math.ceil(userEmails.length / itemsPerPage)}
            page={page}
            onChange={handleChangePage}
            color="secondary"
            variant="text" 
            className="text-white "
            
          />
        )}
      </div>
      {/*<Meteors number={20} />*/}
    </div>
  );
}

export default Referrals;
