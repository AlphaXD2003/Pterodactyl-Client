import { Dvr } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { GoCpu } from "react-icons/go";
import Divider from "@mui/material/Divider";
import { Button, Dialog, TextField } from "@mui/material";
import GooglePayButton from "@google-pay/button-react";
import productService from "../services/products.appwrite";
import classNames from "classnames";
import axios from "axios";
import { set } from "react-hook-form";
import { FaBullseye } from "react-icons/fa6";
import userdata from "../services/userData.appwrite";
import { useSelector } from "react-redux";
import orderDetails from "../services/order.appwrite";
function Card({ text, children, coins, resource, param , onCardClick , type , setType, setAmount}) {
  

  return (
    <div onClick={ () =>{
      setType(type)
      setAmount(coins)
      onCardClick( coins)
    }}>
      <div className=" bg-dot-white/[0.2] relative  mt-2 flex flex-row bg-slate-700 bg-opacity-20 shadow-neutral-700 border border-white w-[350px] h-[85px] rounded-lg cursor-pointer hover:shadow-md hover:shadow-gray-600">
        <div className="mt-auto mb-auto ml-4 text-white ">{children}</div>
        <div className="flex flex-col mr-auto mt-auto mb-auto ml-4">
          <div className="font-bold text-neutral-100  shadow-gray-300">
            {text}
          </div>
          <div className="flex flex-row m-auto font-bold text-neutral-300 text-lg">
            <div> {coins}💎 </div>
            <div className=" -translate-y-0.5 text-[16px] text-fuchsia-200">
              &nbsp; for {resource}
              {param}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SaleCard({
  img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-Ztwi9-pKGPKh8edWZYNuu2vtiDlO2d2hQA&usqp=CAU",
  coinAmout ,
  economy = "Coins",
  price ,
  oneTime = false,
  pid,
  id,
  onSuccess,
  onError
}) {
  
  
  const handleSubmitPayment = async(e) => {
    console.log('clicked')
   const receipt = `${pid}`
   const currency = 'INR'
   const amount = price * 100
    const body = JSON.stringify({
      amount,
      currency,
      receipt,
    })

   try {
    const response = await axios.post('http://localhost:5000/order', body , {
       headers: {
         'Content-Type': 'application/json'
       }
     
    } )
    console.log(response)
    

    // ----------------------------------------------


    var options = {
      "key": String(import.meta.env.VITE_RAZORPAY_KEY_ID), // Enter the Key ID generated from the Dashboard
      "amount": amount , // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "How2MC Client", //your business name
      "description": "Test Transaction",
      "image": "https://cdn.freebiesupply.com/logos/large/2x/spider-man-3-logo-png-transparent.png",
      "order_id": response.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler":async function(response){
          // alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature)

        const body = {
          ...response
        };

        const  validateResponse = await axios.post('http://localhost:5000/order/validate' , JSON.stringify(body), { 
        headers:{
          'Content-Type': 'application/json'
        }

        })
        console.log(validateResponse)
        if(validateResponse.status === 200){
          
          onSuccess(coinAmout, pid, price)
        }
        else{
          onError(coinAmout, pid, price)
        }


      },
      "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
          "name": "", //your customer's name
          "email": localStorage?.email, 
          "contact": ""  //Provide the customer's phone number for better conversion rates 
      },
      "notes": {
          "address": "Razorpay Corporate Office"
      },
      "theme": {
          "color": "#3399cc"
      }
  };
  var rzp1 = new window.Razorpay(options);
  rzp1.on('payment.failed', function (response){
          // alert(response.error.code);
          // alert(response.error.description);
          // alert(response.error.source);
          // alert(response.error.step);
          // alert(response.error.reason);
          // alert(response.error.metadata.order_id);
          // alert(response.error.metadata.payment_id);
          onError(coinAmout, pid, price)
  });
  rzp1.open();
    e.preventDefault();
 



   } catch (error) {
    console.log(error)
   }


  }
  return (
    <div
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: "0.9",
      }}
      className=   ' w-[300px] m-1 h-auto bg-opacity-30 bg-sky-300 mt-2 p-2 rounded-lg cursor-pointer hover:shadow hover:shadow-gray-400 hover:border-gray-500 ' 
    >
      <div className="container relative">
        <div className="content rounded-lg ">
          <div className="flex flex-row  p-2">
            <div className="font-bold  text-black text-2xl mt-[200px]">
              {coinAmout} {economy}
            </div>
            <div className="text-neutral-800 font-bold text-lg mt-[200px]">
              &nbsp;for {price}₹
            </div>
          </div>
        </div>
        {
          oneTime ?  <div className="overlay absolute top-0  right-0 bg-gray-800  p-2 rounded-lg border border-neutral-200 shadow-orange-200 text-neutral-200">
          One-time
          </div> : null
        }
        <div className="mb-2 ml-auto">
        <Button onClick={handleSubmitPayment} fullWidth variant="contained" className="  text-neutral-200">Buy Now</Button>
        </div>
      </div>
    </div>
  );
}

function Shops() {

  const [limitUpgrade, setLimitUpgrade] = useState(false)

  const onBuy = async (type , amount) => {
    
    const user = await userdata.getUserData(userState.$id)

    console.log('User Data: ', user)
    
    const limits = JSON.parse(user.limits)
    let newLimits = undefined;
    if(type === 'cpu'){
       newLimits = {...limits , cpu: limits.cpu + 100}
    console.log('11111 222 Limits: ', newLimits)
  
   
    }
    else if (type === 'ram'){
       newLimits = {...limits , memory: limits.memory + 1024}
    console.log('11111 222 Limits: ', newLimits)
    

    }
    else if (type === 'disk'){
       newLimits = {...limits , disk: limits.disk + 1024}
    console.log('11111 222 Limits: ', newLimits)

    }
    else if (type === 'port'){
        newLimits = {...limits , allocation: limits.allocation + 1}
    console.log('11111 222 Limits: ', newLimits)
    
    }
    else if (type === 'server'){
        newLimits = {...limits , serverAmount: limits.serverAmount + 1}
    console.log('11111 222 Limits: ', newLimits)
    
    }
    else if (type === 'backup'){
        newLimits = {...limits , backup: limits.backup + 1}
    console.log('11111 222 Limits: ', newLimits)

    }
    else if (type === 'database'){
        newLimits = {...limits , database: limits.database + 1}
    console.log('11111 222 Limits: ', newLimits)
    }



    const updateLimitResponse = await userdata.updateDocument(userState.$id, {
      username: user.username,
      email: user.email,
      referral_code : user.referral_code,
      userId : user.userId,
      rank : user.rank,
      refererUserId : user.refererUserId,
      avatar : user.avatar,
      limits: JSON.stringify(newLimits),
      coins: String(parseInt(user.coins) - parseInt(amount))
    })
    if(updateLimitResponse){
      console.log('Limits Updated Successfully')
    }
    else{
      console.log('Limits Update Failed')
    }
    setLimitUpgrade(false)
    setIncreaseLimitDialoge(false)
    setAmount(0)
    setType('')
    setCoins(parseInt(user.coins) - parseInt(amount))
  }

  const [increaseLimitDialoge, setIncreaseLimitDialoge] = useState(false)
  const onCardClick = () => {
    setIncreaseLimitDialoge(true)
    

    
  }
  const [type, setType] = useState('')
  const [amount, setAmount] = useState(0)
  useEffect(() => {
    if (limitUpgrade && type && amount){
      onBuy(type , amount)
    }
  }, [limitUpgrade , type , amount]);
  const [products, setProducts] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userState = useSelector(state => state.user.userData)
  const [open, setopen] = useState(false);

  async function onSuccess(coinAmount, pid, price){
    try {
      setopen(true)
      const user = await userdata.getUserData(userState.$id)
      const updatedCoins = parseInt(user.coins) + parseInt(coinAmount)
      await userdata.updateDocument(userState.$id, {
        coins: String(updatedCoins)
      })
      setCoins(updatedCoins)
  
     const orderResponse =  await orderDetails.createOrder({
        orderId: `order-${userState.$id}-${Date.now()}-${coinAmount}`,
        productId: pid,
        buyerId: userState.$id,
        amount: coinAmount,
        total: price,
        success: true
      })
      setSuccess(true)
      if (orderResponse) {
        console.log('Order Created Successfully')
      }
      else{
        console.log('Order Creation Failed')
      }
    } catch (error) {
      console.log(error)
      setError(error)
    }
  }

  async function getAllProducts() {
    const products = await productService.getProducts();
    if (!products) return;
    console.log(products);
    setProducts(products.documents);
  }
  const [perror, setPerror] = useState(false);
  async function  onError(coinAmount, pid, price){
      
      setPerror(true)
      try {
        
  
     const orderResponse =  await orderDetails.createOrder({
        orderId: `order-${userState.$id}-${Date.now()}-${coinAmount}`,
        productId: pid,
        buyerId: userState.$id,
        amount: coinAmount,
        total: price,
        success: false
      })
      setSuccess(true)
      if (orderResponse) {
        console.log('Order is declined')
      }
      else{
        console.log('Order Creation Failed')
      }
      } catch (error) {
        console.error(error)
      }
  }
  const [coins, setCoins] = useState(0)
  async function getUser(){
    console.log('User State: ', userState)
    
    const user = await userdata.getUserData(userState.$id)
    
    console.log('User Data: ', user)
    console.log('Coins: ' , user.coins)
    setCoins(user.coins)
  }

  // This function updates the server limits
const updateServerLimits = async (newLimits) => {
  try {
    const user = await userdata.getUserData(userState.$id)
    console.log('User Data: ', user)
    const userData = await userdata.getUserData(userState.$id)
    // Call your API to update the server limits
    await userdata.updateDocument(userState.$id,
      {
        ...userData,
        limits: JSON.stringify(newLimits),
      
      } )

    
    // Update the local state
    setLimits(newLimits);
  } catch (error) {
    console.error('Error updating server limits:', error);
  }
};


  useEffect(() => {
    getAllProducts();
    getUser()
    setLoading(false);
  }, []);

  return (
    <div className="flex flex-col ml-2 mr-2 bg-transparent flex-1 rounded-lg mb-2 pb-6 ">
      <div className="flex flex-row justify-between mr-2 mt-2 rounded-lg">
      
      <p className="font-bold text-3xl ml-2 mt-2 translate-y-8 text-white">Shops</p>
      <div className="w-[400px] h-[130px] bg-slate-700 bg-opacity-10 flex flex-col rounded-lg items-center justify-center border border-neutral-200"> 
        <div className="text-white ml-4 text-2xl">
          Total Coins
        </div>
        <div className="text-white mt-1.5 ml-4 text-xl">
          {
            coins && coins 
          }&nbsp;🤑
        </div>
        
      </div>
      </div>
      <div>
        <p className="text-neutral-100 ml-2 mt-2 font-bold text-xl">
          Coin items
        </p>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row gap-2">
          <Card
            text="Upgrade for CPU"
            coins="100"
            resource="100%"
            children={<GoCpu fontSize={"40px"} />}
            onCardClick={onCardClick}
            type="cpu"
            setType={setType}
            setAmount={setAmount}
            
          />
          <Card
            text="Upgrade your RAM"
            coins="300"
            resource="1024MB"
            children={<GoCpu fontSize={"40px"} />}
            onCardClick={onCardClick}
            type="ram"
            setType={setType}
            setAmount={setAmount}
          />
          <Card
            text="Upgrade your Disk"
            coins="100"
            resource="1024MB"
            children={<GoCpu fontSize={"40px"} />}
            onCardClick={onCardClick}
            type="disk"
            setType={setType}
            setAmount={setAmount}
          />
          <Card
            text="Additional ports"
            coins="20"
            resource="1 port"
            children={<GoCpu fontSize={"40px"} />}
            onCardClick={onCardClick}
            type="port"
            setType={setType}
            setAmount={setAmount}
          />
        </div>
        <div className="flex flex-row gap-2">
          <Card
            text="Additional servers"
            coins="250"
            resource="1 server slot"
            children={<GoCpu fontSize={"40px"} />}
            onCardClick={onCardClick}
            type="server"
            setType={setType}
            setAmount={setAmount}
          />
          <Card
            text="Additional backups"
            coins="50"
            resource="1 backup slot"
            children={<GoCpu fontSize={"40px"} />}
            onCardClick={onCardClick}
            type="backup"
            setType={setType}
            setAmount={setAmount}
          />
          <Card
            text="Additional databases"
            coins="25"
            resource="1 database slot"
            children={<GoCpu fontSize={"40px"} />}
            onCardClick={onCardClick}
            type="database"
            setType={setType}
            setAmount={setAmount}
          />
        </div>
        <div className="flex flex-col mt-4">
          <div className="flex flex-row justify-center items-center">
            <div>
              {" "}
              <p className="mr-4 font-bold text-neutral-100 text-[30px] hover:random">
                Coins
              </p>
            </div>

            <div className="bg-gradient-to-t bg-neutral-300 w-full flex-1 h-[2px] mr-8 hover:bg-red-700"></div>
          </div>
          <div className="flex flex-col ">
            <div className="flex flex-row">
              {products &&
                products.map((product, index) => {
                  return (
                    <SaleCard
                      key={index}
                      coinAmout={product.coins}
                      economy="Coins"
                      price={product.price}
                      pid={product.$id}
                      id={product.productId}
                      onSuccess={onSuccess}
                      onError={onError}
                    />
                  );
                })}
            </div>
            
          </div>
        </div>
        
        <div className="flex flex-row gap-4"></div>
      </div>
      {
        open  ?
          <div>
            <Dialog open={open}  >
              <div className=" rounded-lg w-[500px] h-[150px] flex flex-col items-center justify-center bg-neutral-200">
                <div className="text-xl font-bold text-black">Payment Successful</div>
                <div className="mt-4">
                  <Button onClick={() => 
                    {
                      setopen(false)
                      setSuccess(false)
                    }
                  } variant="contained" className="bg-green-500 text-white">Close</Button>
                </div>
              </div>
            </Dialog>
          </div>
        : null
      }
      {
        perror  ?
          <div>
            <Dialog open={perror}  >
              <div className=" rounded-lg w-[500px] h-[150px] flex flex-col items-center justify-center bg-neutral-200">
                <div className="text-xl font-bold text-black">Payment Unsuccessful</div>
                <div className="mt-4">
                  <Button onClick={() => 
                    {
                      setPerror(false)
                    }
                  } variant="contained" className="bg-green-500 text-white">Close</Button>
                </div>
              </div>
            </Dialog>
          </div>
        : null
      }
      {
        increaseLimitDialoge ?
        <div>
            <Dialog open={increaseLimitDialoge}  >
              <div className=" rounded-lg w-[500px] h-[150px] flex flex-col items-center justify-center bg-neutral-200">
                <div className="text-xl font-bold text-black">Want to proceed ? </div>
                <div className=" flex flex-row justify-between mt-4 gap-4 pr-4" >
                  <Button onClick={() => 
                    {
                      setLimitUpgrade(true)
                      setIncreaseLimitDialoge(false)
                    }
                  } variant="contained" color="success" className="bg-green-500 text-white">Proceed ?</Button>
                  <Button onClick={() => 
                    {
                      setLimitUpgrade(false)
                      setIncreaseLimitDialoge(false)
                    }
                  } variant="contained" color="error" className="bg-red-500 text-white ">Close</Button>
                </div>
              </div>
            </Dialog>
          </div>
        :null
      }
    </div>
  );
}

export default Shops;
