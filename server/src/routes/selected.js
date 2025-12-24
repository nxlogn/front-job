const express = require("express")
const router = express.Router();
const {getTagNames,getProducts,getDetail} = require("../controllers/selectedController")

router.get("/tag",getTagNames)

router.get("/products",getProducts)

router.get("/detail",getDetail)

module.exports = router