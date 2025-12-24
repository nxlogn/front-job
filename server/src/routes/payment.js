const express=require("express")
const router=express.Router();
const {createOrder,paymentCallback} = require("../controllers/paymentController")

//创建订单接口
router.post("/createOrder",createOrder)

//微信支付回调
router.post("/callback",paymentCallback)
module.exports=router