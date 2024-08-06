import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {login as authlogin, setUserId} from '../store/userSlice'
import authService from '../services/user.appwrite'
import postAPI from '../pterodactyl/functions/postAPI'
import getUserByEmail from "../pterodactyl/functions/getUserByEmail";
import userdata from "../services/userData.appwrite";
import referral from "../services/referral.appwrite";
import {BackgroundBeams} from "../components/BackgroundBeam"
function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const {referralCode} = useParams()
  console.log('Referal Code: ', referralCode)

  const signup = async (data) => {
    console.log(data);
    let referral_code = data.referralCode;
    console.log('Referral Code: ',  referral_code)
    
   
    

   
    try {
      const user = await authService.createAccount({
        email: data.email,
        password: data.password,
        name: data.username,
      })
      if(user){
        console.log('User: ', user)
        const email = user.email;
        const password = data.password;
        console.log('Email: ', email)
        console.log('Password :', password)
        //pterodactyl user creation
        const [pteroResponse, pteroError]  = await postAPI.post( `${import.meta.env.VITE_PTERODACTYL_URL}/users` , {email,  username: data.username, first_name: data.username, last_name: data.username}, 'ptla_aap6jlHVZ8XT6EfIN9sRRwuUZ1QgUNcQz59oE2fDtpX');
        if(pteroError) {
          console.error('Error while creating a user account', pteroError)
          await authService.deleteAccount(user.$id);
          setError("Error while creating a user account")
          return
        }
       
        console.log('Ptero Response: ', pteroResponse)
        const session = await authService.login({
          email,
          password,
        })
        if(session){
          console.log('Session: ', session)
          const [userResponse , userDataUplodError] = await userdata.uploadUserData();
          
          // if error delete the account and pterodactyl user
          if(userDataUplodError){
            console.error('Error while creating a user account', userDataUplodError)
            await authService.deleteAccount(user.$id);
            await postAPI.delete(`${import.meta.env.VITE_PTERODACTYL_URL}/users/${pteroResponse.id}`, import.meta.env.VITE_PTERODACTYL_API_KEY);
            setError("Error while creating a user account")

            return
          }
          console.log('userresponse: ', userResponse)
          console.log('User Response: ', userResponse)
          if(!userResponse) {
            setError("Error while creating a user account")
            await authService.deleteAccount(user.$id);
            return;
          }

          const pteroUser = await getUserByEmail(email);
          const pteroUserId = pteroUser[0].attributes.id;
          
          
          localStorage.setItem("email", email);
          localStorage.setItem("password", password);
          dispatch(authlogin(user));
          
          dispatch(setUserId(pteroUserId));
          const [ifReferralCodeExists , referralCodeError] = await referral.getReferralDocument(referral_code);
          console.log('Referral Code Exists: ', ifReferralCodeExists)
          if(referralCodeError || !ifReferralCodeExists){
            referral_code = null;
            navigate("/");
            
          }
          const referralDocument = ifReferralCodeExists
          console.log('Referral Document: ', referralDocument)
          let referedUserId = referralDocument.documents[0].refferedUserId

          referedUserId.push(user.$id);
          const [uploadResponse, uploadError] = await referral.updateReferralDocument(referralDocument.documents[0].$id, {refferedUserId: referedUserId})
          if(uploadError){
            console.error('Error while updating referral document', uploadError)
            navigate("/");
          }
          const [newRefDoc, newRefDocError] = await referral.createReferralDocument(user.$id)
          console.log('New Referral Document: ', newRefDoc)
          if( !newRefDoc){
            console.error('Error while creating referral document', newRefDocError)
            await postAPI.delete(`${import.meta.env.VITE_PTERODACTYL_URL}/users/${pteroResponse.id}`, import.meta.env.VITE_PTERODACTYL_API_KEY);
            await authService.deleteAccount(user.$id);
            return;
          }

          navigate("/");
        }
        else{
          setError("Error while creating a user account")
          console.error("Error during authentication", error);
          navigate("/login");
        }
      }else{
        setError("Error while creating a user account")
      }
    } catch (error) {
      console.log("Error while creating a user account", error.message);
      setError("Error while creating a user account") 
    }
    localStorage.setItem("email", data.email);
    localStorage.setItem("password", data.password);
    // navigate("/");
  };

  const [refCode, setRefCode] = useState('')
  useEffect(() => {
    if(referralCode){
      console.log('Referal Code: ', referralCode)
      setRefCode(referralCode)
    }
  }, [refCode])

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center overflow-hidden text-neutral-50">
    <BackgroundBeams
          className="z-[-3]"
        />
      <div className=" w-[900px]  flex hover:shadow-md flex-col bg-[#131313] bg-opacity-30 rounded-lg  py-10 cursor-pointer">
        <div className="flex flex-col justify-center items-center">
          <div className="w-1/2 h-1/2   rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1602345397613-0934a8812d23?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxfDB8MXxyYW5kb218MHx8c2VydmVyfHx8fHx8MTcxNDI4OTIyNA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=400"
              className="w-full h-full rounded-lg"
            />
          </div>
          <div className="w-1/2 h-1/2  flex flex-col justify-center items-center mt-4">
            <div className="text-4xl font-bold">Sign Up</div>
            <div className="text-lg">Create an account to get started</div>
            <div className="flex flex-col gap-2 mt-4 justify-center items-center">
              <form className="ml-[100px] text-black " onSubmit={handleSubmit(signup)}>
                <input
                  {...register("username", { required: true, unique: true })}
                  type="text"
                  placeholder="Username"
                  className="w-60 h-10 rounded-md border mt-1 border-gray-300 px-2 "
                />
                {errors.username && <span>The field must be uniqe</span>}
                <input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="Email"
                  className="w-60 h-10 rounded-md border mt-1 border-gray-300 px-2"
                />
                {errors.email && <span>Enter valid email address.</span>}
                <input
                  {...register("password", {
                    required: true,
                    minLength: 8,
                  })}
                  type="password"
                  placeholder="Password"
                  className="w-60 h-10 rounded-md border mt-1 border-gray-300 px-2"
                />
                {errors.password && (
                  <div>
                    {" "}
                    <span className="text-red-600">
                      Passwords must be at least 8 characters long
                    </span>{" "}
                    <br />
                  </div>
                )}
                <input
                  {...register("confirmPassword", {
                    required: true,
                    validate: (value) => value === watch("password"),
                  })}
                  type="password"
                  placeholder="Confirm Password"
                  className="w-60 h-10  mt-1 rounded-md border border-gray-300 px-2"
                />
                {errors.confirmPassword && (
                  <div>
                    {" "}
                    <span className="text-red-600">
                      Passwords do not match
                    </span>{" "}
                    <br />
                  </div>
                )}
                <input
                  {...register("referralCode")}
                  value={refCode}
                  type="text"
                  placeholder="Referral Code"
                  className="w-60 h-10 rounded-md border mt-1 border-gray-300 px-2"
                />
                <button className="w-60 mt-3 h-10 rounded-md border border-orange-300 bg-orange-500 font-bold text-xl cursor-pointer text-white">
                  Sign Up
                </button>
              </form>
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-2 mt-4">
            <div className="text-sm mt-4 underline ">
              Already have an account?
            </div>
            <div className="text-sm text-indigo-100 translate-y-2   cursor-pointer">
              <Link to="/login">&nbsp;Login here</Link>
            </div>
          </div>
        </div>
        {/* Continue with Discord */}
        <div className="flex flex-row justify-center items-center gap-2 mt-8">
          <Button variant="contained" className="rounded-lg mt-2">
            Continue with Discord
          </Button>
        </div>
        <div className="flex flex-row justify-center items-center gap-2 mt-2">
          <Button color="error" variant="contained" className="rounded-lg mt-2">
            Continue with Google
          </Button>
        </div>
      </div>
      {
        error && <div className="text-red-600 text-center">{error.message}</div>
      }
     
    </div>
  );
}

export default Signup;