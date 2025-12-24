const express = require("express")
const router = express.Router();
const { getImages } = require("../utils/imageUtils")
const {getBannerImages,getPartImages,getAllBusiness,getServiceList}=require("../controllers/homeController")
//banner图片接口 
router.get("/banner", getBannerImages)

//part分类板块接口
router.get("/part",getPartImages )

//获取商家列表接口
router.get("/merchants",getAllBusiness)

//获取商家服务
router.get("/service",getServiceList)
module.exports = router