//wechatpay-node-v3 是微信官方提供的微信支付v3版本的node sdk
const WxPay=require("wechatpay-node-v3");
const fs=require("fs")
const path=require("path")
/*
支付功能需要用到的一些信息参数：
    appid 小程序密钥 商户号 商户api证书序列号 证书的公钥和私钥文件 apiV3密钥

*/
const wxConfig={
    appid:process.env.WECHAT_APPID,
    secret:process.env.WECHAT_SECRET,
    mchid:process.env.WECHAT_MCHID,
    serial_no:process.env.WECHAT_SERIAL_NO,
    publicKey:fs.readFileSync(path.join(__dirname,"../../certificate/apiclient_cert.pem")).toString(),//公钥 验证微信返回的数据
    privateKey:fs.readFileSync(path.join(__dirname,"../../certificate/apiclient_key.pem")).toString(),//私钥 签名你发送的数据
    apiV3Key:process.env.WECHAT_API_V3_KEY
}

//初始化微信支付示例，创建一个微信支付工具
const wechatPay=new WxPay({
    appid:wxConfig.appid,
    mchid:wxConfig.mchid,
    publicKey:wxConfig.publicKey,
    privateKey:wxConfig.privateKey
})

//创建商品订单
const createOrder=async (req,res,next)=>{
    try {
        let {openId,productId,productName,productPrice,productNum}=req.body;
        if(!openId|| !productId || !productName || !productNum || !productPrice){
            return res.status(400).json({
                code:400,
                success:false,
                message:"缺少请求参数"
            })
        }
        if(typeof productPrice ==="string"){
            productPrice=Number(productPrice)
        }
        productPrice=Math.round(productPrice*100);
        const params={
            appid:wxConfig.appid,
            description:`购买商品 ${productName} ×${productNum}`,//商品描述
            out_trade_no:Date.now().toString(),//商品订单号
            notify_url:process.env.WECHAT_NOTIFY_URL,//通知回调地址,必须是公网可访问。微信服务器必须能访问到这个地址，post请求，必须是https协议
            amount:{
                total:productPrice
            },
            payer:{
                openid:openId,//用户openid
            },
            scene_info:{
                payer_client_ip:req.ip || "127.0.0.1" //客户端ip地址
            }
        }
        const result = await wechatPay.transactions_jsapi(params) //微信支付v3版本的核心方法，用于创建小程序订单
        res.json({
            code:200,
            message:"订单创建成功",
            success:true,
            data:result
        })


    } catch (error) {
        next(error)
    }
}

//回调处理
const paymentCallback=async (req,res,next)=>{
    try {
        const result=req.body;
        if(result.event_type==="TRANSACTION.SUCCESS"){
            const decryptedData=wechatPay.decrypt(
                result.resource.ciphertext,wxConfig.apiV3Key
            );
            console.log("支付成功，解密后的数据是",decryptedData)
            console.log("订单号",decryptedData.out_trade_no)
            console.log("微信支付交易号",decryptedData.transaction_id )
            console.log("支付金额",decryptedData.total )
            console.log("支付完成时间",decryptedData.success_time)
        }
        res.json({
            code:"SUCCESS",
            message:"成功"
        })
    } catch (error) {
        next(error)
    }
}
module.exports={
    createOrder,
    paymentCallback
}
