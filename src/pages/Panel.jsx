import { Button } from "@mui/material";
import React from "react";
import { WiDirectionUpRight } from "react-icons/wi";
import { useSelector } from "react-redux";
import { Link, json } from "react-router-dom";
import patchAPI from "../pterodactyl/functions/patchAPI";
import apiCall from "../pterodactyl/functions/getAPI";
import { FaCopy } from "react-icons/fa";
function Panel() {
  const email = useSelector((state) => state.user.userData.email);
  const userId = useSelector((state) => state.user.userId);
  const [newPassword, setNewPassword] = React.useState(null);
  const [isCopied, setIsCopied] = React.useState(false);
  console.log(email);
  function randomPassword() {
    let length = 8;
    let charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }
  async function resetPass() {
    const [userResponse, userError] = await apiCall.get(
      `${import.meta.env.VITE_PTERODACTYL_URL}/users/${userId}`
    );
    if (userError) {
      console.error("Error while getting user", userError);
      return;
    }
    const user = userResponse.data.attributes;
    console.log("User: ", user);
    let password = randomPassword();
    console.log("Password: ", password);
    const [response, error] = await patchAPI.patch(
      `${import.meta.env.VITE_PTERODACTYL_URL}/users/${userId}`,
      
        {
          email: user.email,
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
          language: user.language,
          password: `${password}`,
        }
      
    );
    if (error) {
      console.error("Error while resetting password", error);
      return;
    }
    setNewPassword(password);
    console.log("Response: ", response);
  }
  return (
    <div className="flex flex-col ml-2 mr-2 bg-transparent h-[750px] p-2 rounded-lg text-white  bg-dot-white/[0.2] relative   mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] ">
      <div className="">
        <div>
          <h1 className="text-3xl font-bold">Game panel credentials</h1>
        </div>
        <div>
          <p className="mt-2 font-semibold text-neutral-700 text-lg">
            Here are your game panel credentials. You can use them to access
            your game panel.
          </p>
        </div>
        <div className="flex flex-col mt-4 justify-center items-center">
          <div className="w-[300px] ml-auto mr-auto">
            <img src="./public/panelImage.png" />
            {/* <img src="https://i.imgur.com/m9zVHCj.png" /> */}
          </div>
          <div className="w-[400px] bg-slate-600 p-3 rounded-lg text-white  shadow-lg shadow-gray-700">
            <div className="flex flex-row gap-4 ">
              <p className="font-bold">Email: </p>
              <p className="text-neutral-200">{email}</p>
            </div>
          </div>
          <div className="mt-4 text-neutral-600 text-bolder">
            <p>
              For your password, if you forgot it or never generated it, you can
              reset it by clicking the button below.
            </p>
          </div>
          <div className="flex flex-row gap-3 mt-2 cursor-pointer">
            <div>
              <Link to="http://192.168.0.120" target="_blank">
                <Button variant="contained">↗ &nbsp;Open game panel.</Button>
              </Link>
            </div>
            <div>
              <Button variant="contained" color="error" onClick={resetPass}>
                🗒 &nbsp;Reset password
              </Button>
            </div>
          </div>
          {newPassword && (
            <div className="flex flex-row gap-2">
              {" "}
              <div className="flex flex-row gap-2">
                Your new password is:{" "}
                <div className={ isCopied ? "text-yellow-500 font-bold" : 'text-black'}>
                  {" "}
                  {newPassword}
                </div>{" "}
              </div>{" "}
              <div className="translate-y-1 cursor-pointer">
                {" "}
                <FaCopy
                  onClickCapture={() => {
                    navigator.clipboard.writeText(newPassword);
                    setIsCopied(true);
                  }}
                />
              </div>{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Panel;
