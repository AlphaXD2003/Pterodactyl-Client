import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import authService from "../services/user.appwrite";
import {
  login as authlogin,
  logout as authLogout,
  setUserId,
} from "../store/userSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Bars, RotatingTriangles } from "react-loader-spinner";
import getUserByEmail from "../pterodactyl/functions/getUserByEmail";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const authStatus = useSelector((state) => state.user.status);

  async function checkAuth() {
    const email = localStorage?.email;
    console.log("Email login: ", email);

    try {
      if (localStorage?.password && localStorage?.email) {
        const password = localStorage.password;
        const currentUser = await authService.getUser();
  
        if (currentUser) {
          const loggedInUser = await getUserByEmail(email);
          const id = loggedInUser[0].attributes.id;
          if (!id) {
            localStorage.removeItem("email");
            localStorage.removeItem("password");
            dispatch(setUserId(null));
            dispatch(authLogout());
            navigate("/login");
            return;
          }
          dispatch(setUserId(id));
          dispatch(authlogin(currentUser));
          localStorage.setItem("password", password);
          localStorage.setItem("email", email);
          const redirectPath = location.pathname || "/";
          navigate(redirectPath);
          return;
        }
        try {
          const session = await authService.login({
            email,
            password,
          });
  
          const user = await authService.getUser();
  
          if (session) {
            const loggedInUser = await getUserByEmail(email);
            const id = loggedInUser[0].attributes.id;
            if (!id || !user) {
              console.log("User not found in ptero");
              localStorage.removeItem("email");
              localStorage.removeItem("password");
              dispatch(setUserId(null));
              dispatch(authLogout());
              navigate("/login");
              return;
            }
            dispatch(setUserId(id));
            dispatch(authlogin(user));
            localStorage.setItem("password", password);
            localStorage.setItem("email", email);
            const redirectPath = location.pathname || "/";
            navigate(redirectPath);
          }
        } catch (error) {
          console.error("Error during authentication", error);
        }
      } else {
        console.log("No email or password found");
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        dispatch(setUserId(null));
        dispatch(authLogout());
        const currentPath = location.pathname;
  
        const joinPattern = /^\/join\/.+/;
        const isJoinPath = joinPattern.test(currentPath);
        const redirectPath =
          currentPath === "/login" || currentPath === "/signup" || isJoinPath
            ? currentPath
            : "/login";
        navigate("/login");
      }
    } catch (error) {
      navigate("/login")
    }
  }

  useEffect(() => {
    (async () => {
      await checkAuth();
      setLoaded(true);
    })();
  }, []);

  return !loaded ? (
    <div className="flex flex-row h-screen justify-center items-center">
      <RotatingTriangles
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="rotating-triangles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  ) : (
    children
  );
}

function LoadingIndicator() {
  // Implement your custom loading indicator component or message
  return (
    <div>
      <Skeleton
        variant="rectangular"
        width={1920}
        height={300}
        animation="wave"
      />
    </div>
  );
}
