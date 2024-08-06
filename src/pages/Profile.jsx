import React from "react";
import avatarFileServiceInstance from "../services/avatar.files.appwrite";
import userdata from "../services/userData.appwrite";
import { useSelector } from "react-redux";
import Avatar from "react-avatar";
import { set } from "react-hook-form";
export const Profile = () => {
  const userState = useSelector((state) => state.user.userData);
  const inputRef = React.useRef(null);
  const onInputFileClick = () => {
    inputRef.current.click();
  };
  const [image, setImage] = React.useState(null);
  const onFileChange = async (event) => {
    const file = event.target.files[0];
    console.log(file);
    //setImage(URL.createObjectURL(file));
    const result = await avatarFileServiceInstance.uploadFile(file);
    console.log(result);
    if (result) {
      const fileId = result.$id;
      const user = await userdata.updateDocument(userState.$id, {
        avatar: fileId,
      });
      console.log(user);
      const filePreview = await avatarFileServiceInstance.getFilePreview(
        fileId
      );
      console.log("File Preview:  ", filePreview);
      if (!filePreview.href) {
        return;
      }
      setImage(filePreview.href);
    }
  };
  const [user, setUser] = React.useState({}); //[userData, setUserData
  const getUserData = async () => {
    try {
      const user = await userdata.getUserData(userState.$id);
      setUser(user);
      console.log("User2:", user);
      const imageId = user.avatar;
      console.log("Image ID:", imageId);
      if (!imageId) {
        return;
      }
      const filePreview = await avatarFileServiceInstance.getFilePreview(
        imageId
      );
      console.log(filePreview);
      setImage(filePreview.href);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getUserData();
  }, []);
  return (
    <div className="flex flex-col ml-2 mt-2">
      <div className="">
        <h1 className="text-3xl font-bold">Profile</h1>
      </div>
      <div className="flex flex-col  ml-auto mr-auto mt-4">
        <Avatar
          src={image}
          alt="profile"
          name={userState.name}
          size="100"
          className=" rounded-full w-32 h-32"
          onClick={onInputFileClick}
          round={true}
        />

        <input
          accept="image/*"
          type="file"
          ref={inputRef}
          className="hidden"
          onChange={onFileChange}
        />
        <div className="mt-6 -translate-x-16">
          Click the image to upload new image.
        </div>
      </div>

      <div className="ml-8 mt-4 mr-8 rounded-lg  bg-neutral-300 p-4">
        <div className="mt-4">
          <label className="font-bold">Name</label>
          <div className="mt-2">{userState.name}</div>
        </div>
        <div className="mt-4">
          <label className="font-bold">Email</label>
          <div className="mt-2">{userState.email}</div>
        </div>
        <div className="mt-4">
          <label className="font-bold">Coins</label>
          <div className="mt-2">{user.coins}</div>
        </div>
        {/*<div className="mt-4">
          <label className="font-bold">Rank</label>
          <div className="mt-2">{userState.rank}</div>
  </div>*/}
        <div className="mt-4">
          <label className="font-bold">Referral Code</label>
          <div className="mt-2">{userState.$id}</div>
        </div>
      </div>
    </div>
  );
};
