import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import {adminEmails} from "../contstants";
import { userLogin } from "../functions";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, setUserId, login as storeLogin } from "../store/userSlice";
import { userAuthService } from "../appwrite";

const Login =  () => {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogin = async() =>{
    
    if(adminEmails.includes(email)){
        setError(null)
        localStorage.setItem('email',  email)
        localStorage.setItem('password', password)

        // const session = await userLogin({email, password})
        
        // if(session){
        //     console.log(session)
        //     localStorage.setItem('email',  email)
        //     localStorage.setItem('password', password)
        //     const loggedInUser = await userAuthService.getAccount()
        //     dispatch(storeLogin(loggedInUser))
        //     dispatch(setUserId(loggedInUser?.$id))
            navigate('/')
        // }
    }
    else{
        setError('The email is invalid for admin login')
        setTimeout(() => {
            setError(null)
        }, 3000)
    }
  }
  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="m-auto justify-center items-center bg-gray-200 rounded-lg">
        <div className="flex fitems-center justify-center w-[600px] flex-col m-2">
        <div className="font-bold mt-4  ml-2 mb-4 text-2xl">Enter the admin details</div>
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Enter your admin email "
            placeholder="Enter your email here..."
            variant="outlined"
            fullWidth
            color="success"
          />
        </div>
        <div className="flex items-center justify-center w-[600px] flex-col m-2">
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Enter your password "
            placeholder="Enter your password..."
            variant="outlined"
            fullWidth
            color="secondary"
          />
        </div>
        <div className="mr-6  mb-4  mt-2 float-right justify-center items-center">
            <Button  onClick={handleLogin} variant="contained">Submit</Button>
        </div>
        {error &&  <div className="text-red-700">{error}</div>}
      </div>
    </div>
  );
};

export default Login;
