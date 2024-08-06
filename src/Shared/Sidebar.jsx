import React from "react";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import {
  Sidebar_Bottom_Items,
  Sidebar_Top_Items,
} from "../lib/constants/navigation";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import authServices from "../services/user.appwrite";
import { useDispatch } from "react-redux";
import { logout as authlogout, removeUserId } from "../store/userSlice";

const linkClass =
  "flex cursor-pointer items-center gap-2 font-light px-3 py-2 hover:bg-neutral-800 hover:text-white hover:no-underline transition-colors duration-300 ease-in-out active:bg-neutral-700 active:text-white rounded-sm text-base";

function Sidebar({ className = "" }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await authServices.logout();
      dispatch(authlogout());
      dispatch(removeUserId());

      localStorage.removeItem("email");
      localStorage.removeItem("password");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`px-3 flex flex-col h-screen bg-black  w-60 ${className} overflow-hidden `}
    >
      <div className="flex items-center gap-2 px-3 py-5 ">
        <Link to="/">
          <AcUnitIcon fontSize="large" htmlColor="cyan" />
          <span className="text-neutral-100 text-lg">How2MC Client</span>
        </Link>
      </div>
      <div className="ml-auto mr-auto mb-4 bg-[#222] bg-opacity-80 py-1 rounded-lg px-4  shadow-sm shadow-white">
        <Button
          // style={{ color: "white", fontWeight: "bold" }}
          className="  hover:bg-neutral-200 hover:text-black hover:font-bold text-white"
        >
          <Link
            to="/create-server"
            className="hover:no-underline text-neutral-50 hover:text-neutral-50 hover:border-x-slate-200"
          >
            Create Server
          </Link>
        </Button>
      </div>
      <div className="flex-1 flex flex-col gap-0.5 px-1 mt-2 ">
        {Sidebar_Top_Items.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
      </div>
      <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
        {Sidebar_Bottom_Items.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
        <div
          className={classNames(
            linkClass,
            "text-red-600  hover:text-indigo-500"
          )}
        >
          <div
            onClick={() => {
              logout();
            }}
          >
            <span className="text-xl">
              <LogoutIcon />
            </span>
            Logout
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarLink({ item }) {
  const { pathname } = useLocation();
  return (
    <Link
      to={item.path}
      className={classNames(
        pathname === item.path
          ? "text-white bg-neutral-700"
          : "text-neutral-400",
        linkClass
      )}
    >
      <span className="text-xl">{item.icon}</span>
      {item.label}
    </Link>
  );
}

export default Sidebar;
