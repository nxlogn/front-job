const express=require("express")
const router = express.Router();
const {getCarts,getSpec,addToCart,deleteCart,getAddress,deleteAddress,updateAddress}=require("../controllers/cartController")
const {authenticateToken} =require("../middleware/authenticateToken")
router.use(authenticateToken);
//获取购物车商品数据
router.get("/list",getCarts);

//获取商品规格接口
router.get("/getSpec",getSpec);

//加入购物车
router.post("/addCart",addToCart)
//删除购物车数据
router.post("/deleteCart",deleteCart)

//获取用户地址
router.get("/address",getAddress)

//删除地址
router.post("/deleteAddress",deleteAddress)

//新增/修改地址
router.post("/addOrUpdate",updateAddress)
module.exports=router