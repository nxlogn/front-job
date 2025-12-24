const express=require("express")
const router=express.Router();
const {wxLogin,sendSmsCode,verifySmsCode}=require("../controllers/authController")

//微信手机号一键登录
router.post("/wxLogin",wxLogin)
//手机验证码登录
router.post("/sendSmsCode",sendSmsCode)

//验证短信验证码
router.post("/verifySmsCode",verifySmsCode)
module.exports=router

