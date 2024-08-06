
import { useState, useEffect } from "react";
import userdata from "../services/userData.appwrite.js";
import Avatar from "react-avatar";
import avatarFileServiceInstance from "../services/avatar.files.appwrite.js";
const ReferralCard = ({ id }) => {
  const [userInfo, setUserInfo] = useState(null);

  const fetchUserDetails = async () => {
    // const [referralUserInfo, error] = await referral.getReferralDocument(id)
    const userData = await userdata.getUserData(id);
    if (userData) setUserInfo(userData);
    console.log("Referred User is: ", userData);
  };
  useEffect(() => {
    fetchUserDetails();
  }, []);
  return userInfo ? (
    <div className="rounded-lg min-w-[390px] h-28 border  border-white mr-4  mb-4 p-2 bg-black bg-opacity-65 flex flex-row">
      <div className="max-w-8 ml-2 h-auto my-auto mr-10 rounded-full border border-white shadow-white shadow cursor-pointer">
        {userInfo.avatar ? (
          <img
            className="rounded-full"
            src={avatarFileServiceInstance.getFilePreview(userInfo.avatar)}
          />
        ) : (
          <Avatar name={userInfo.user_name} size="35" round={true} />
        )}
      </div>
      <div className="flex flex-col gap-2 font-bold text-white z-10">
        <div>{userInfo.user_name.toUpperCase()}</div>
        <div className="flex flex-row gap-2">
          <div>{userInfo.email}</div>
          <div> • {`(${userInfo.coins} Coins)`} </div>
        </div>
        <div>
          {
            new Date(userInfo.$createdAt).toLocaleString()
          }
        </div>
      </div>
    </div>
  ) : null;
};

export default ReferralCard;
