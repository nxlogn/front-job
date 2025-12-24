const express=require("express")
const router = express.Router();
const {getAdopt}=require("../controllers/serviceController")
router.get("/list",getAdopt)
module.exports=router