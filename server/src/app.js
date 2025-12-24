const express=require("express")
const path=require("path")
const cors=require("cors")
const errorHandler=require("./middleware/errorHandler")
require("dotenv").config({
    path:path.join(__dirname,`../.env.${process.env.NODE_ENV}`)
})
const app=express()
const homeRoutes=require("./routes/home")
const selectedRoutes=require("./routes/selected")
const authRoutes=require("./routes/auth")
const cartRoutes=require("./routes/cart")
const serviceRoutes=require("./routes/service")
const paymentRoutes=require("./routes/payment")
app.use(cors())
app.use(express.json()) //解析json请求体
app.get("/",(req,res)=>{
    res.send("你好 express")
})
app.use("/img",express.static(path.join(__dirname,"../public/images")))
app.use("/home",homeRoutes)
app.use("/sel",selectedRoutes)
app.use("/adopt",serviceRoutes)
app.use("/auth",authRoutes)
app.use("/cart",cartRoutes)
app.use("/payment",paymentRoutes)

//错误处理中间件
app.use(errorHandler)
//处理404路由
app.use((req,res)=>{
    res.status(404).json({
        success:false,
        code:404,
        message:"请求资源不存在",
        data:null
    })
})
app.listen(3000,()=>{
    console.log("服务已经运行在3000端口了")
})