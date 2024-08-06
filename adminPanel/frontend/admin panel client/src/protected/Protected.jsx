import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../functions";
import { useNavigate } from "react-router-dom";
import { login, logout, removeUserId, setUserId } from "../store/userSlice";
import { userAuthService } from "../appwrite";
import useLogout from "../customHooks/logout";

const Protected = ({ children }) => {
  const authStatus = useSelector((state) => state.user.status);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const logout = useLogout()
  const checkAuth = async () => {
    if (localStorage.email && localStorage.password ) {
      try {
        const session = await userLogin({
          email: localStorage.email,
          password: localStorage.password,
        });
        if (session) {
          const loggedInUser = await userAuthService.getAccount()
          console.log('log user' , loggedInUser)
            dispatch(login(loggedInUser))
            dispatch(setUserId(loggedInUser.$id))
            navigate("/");
        }
      } catch (error) {
        throw error;
      }
    } else {
      
      logout()
      navigate('/admin/login')
    }
  };
  useEffect(() => {
    (async () => {
      await checkAuth();
      setLoading(false);
    })();
  }, []);

  return  loading ? <div>Loading</div> : children
};

export default Protected;
