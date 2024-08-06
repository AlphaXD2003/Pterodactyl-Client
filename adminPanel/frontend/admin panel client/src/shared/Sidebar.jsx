import React from "react";
import { RxDividerHorizontal } from "react-icons/rx";
import { sideBarBottomMenu, sideBarTopMenu } from "../contstants";
import Button from "@mui/material/Button";
import { useNavigate , } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout, removeUserId } from "../store/userSlice";
import userAuthService from "../appwrite/auth.appwrite";

const Sidebar = () => {
  const sideBarTopItems = sideBarTopMenu;
  const sideBarBottomItems = sideBarBottomMenu
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = async() => {
    await userAuthService.logout()
    dispatch(logout());
    dispatch(removeUserId());
    localStorage.removeItem('email')
    localStorage.removeItem('password')
    navigate('/admin/login')
  };
  return (
    <div className="bg-neutral-800 w-[260px] text-neutral-100 flex flex-col">
      <div className=" h-[75px] ml-auto mr-auto mt-4 border-b border-gray-600">
        <div className="text-2xl bg-neutral-900 px-6 py-3 rounded-lg uppercase pl-auto pr-auto cursor-pointer"
          onClick={() => navigate('/')}
        >
          Admin Panel
        </div>
      </div>

      <div className="flex mt-6 flex-col flex-1 border-b mb-4 border-neutral-600"  >
        {sideBarTopItems &&
          sideBarTopItems.map((sideBarTopItem, index) => (
            <div className="mt-4 ml-3 mr-3" key={sideBarTopItem.name} >
              <Button
              fullWidth
              onClick={ () => navigate(sideBarTopItem.path)}
              variant="contained" color="secondary">
                {sideBarTopItem.name}
              </Button>
            </div>
          ))}
      </div>
      <div>
            {
              sideBarBottomItems && sideBarBottomItems.map((sideBarBottomItem, index) => (
                <div className="mt-2 ml-3 mr-3 mb-4 " key={sideBarBottomItem.name}>
                  <Button
                    fullWidth
                    
                    variant="outlined" 
                    color="inherit"
                    onClick={sideBarBottomItem.name === 'Logout' ? handleLogout : null}
                    
                  >
                  {sideBarBottomItem.name}
                  </Button>
                </div>
              ))
            }
      </div>
    </div>
  );
};

export default Sidebar;
