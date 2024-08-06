
require('dotenv').config();

const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
const crypto = require('crypto');
const app = express();

app.use(express.json());
app.use(cors())
app.unsubscribe(express.urlencoded({ extended: false }))

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});


app.post('/order', async(req, res) => {
    try {
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });
        const options =  req.body;
    
        const order = await razorpay.orders.create(options);
        
        if(!order) return res.status(500).send('Some error occured');
        
        res.json(order);
    } catch (error) {
        console.error(error);
    }
})

app.post('/order/validate', async(req, res) => {
    const {razorpay_payment_id, razorpay_order_id, razorpay_signature} = req.body;

    const sha = crypto.createHmac("sha256", String(process.env.RAZORPAY_KEY_SECRET));
  //order_id + "|" + razorpay_payment_id
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");
  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legit!" });
  }

  res.json({
    msg: "success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
})

app.listen(5000, () => {
    console .log('Server started on http://localhost:5000');
})