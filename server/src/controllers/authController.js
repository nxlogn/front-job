const axios = require("axios");
const pool = require("../config/db")
const jwt=require("jsonwebtoken")
const SMS=require("@alicloud/sms-sdk")
const {  encryptPhoneNumber,decryptPhoneNumber}=require("../utils/phoneNumber")
//根据loginCode获取openid
const getOpenid = async (code, appid, secret) => {
    try {
        const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`
        const response = await axios.get(url);
        if (response.data && response.data.openid) {
            return response.data.openid
        } else {
            console.error("openid获取失败")
            return null
        }
    } catch (error) {
        console.error("获取openid失败")
        return null
    }

}
//获取用户手机号
const getPhoneNumber = async (code, appid, secret) => {
    try {
        const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`
        const res = await axios.get(url);
        if (res.data && res.data.access_token) {
            const access_token = res.data.access_token;
            const phoneUrl = `https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=${access_token}`
            const phoneRes = await axios.post(phoneUrl, { code })
            if (phoneRes.data && phoneRes.data.phone_info) {
                return phoneRes.data.phone_info.phoneNumber
            } else {
                console.error("手机号获取失败")
                return null
            }
        } else {
            console.error("获取access_token失败")
            return null
        }
    } catch (error) {
        console.log("出错了", error)
    }
}

const wxLogin = async (req, res, next) => {
    try {
        const { loginCode, phoneCode, appid, secret } = req.body
        //如果缺少参数，返回错误提示
        if (!loginCode || !appid || !secret) {
            return res.status(400).json({
                code: 400,
                message: "缺少参数",
                success: false,
                data: null
            })
        }
        //根据loginCode获取openid
        const openid = await getOpenid(loginCode, appid, secret);
        if (!openid) {
            return res.status(500).json({
                code: 500,
                message: "openid获取失败",
                success: false,
                data: null
            })
        }
        const [existUser] = await pool.execute("select * from users where openid=?", [openid])
        let user //存储用户信息
        if (existUser.length > 0) {
            console.log("老用户登录")
            //老用户登录
            user = existUser[0]
        } else {
            console.log("新用户注册")
            //新用户注册
            if (!phoneCode) {
                return res.status(400).json({
                    code: 400,
                    message: "新用户注册必须提供phoneCode",
                    success: false,
                    data: null
                })
            }
            // 获取手机号
            const phoneNumber = await getPhoneNumber(phoneCode, appid, secret)
            if (!phoneNumber) {
                return res.status(500).json({
                    code: 500,
                    message: "手机号获取失败",
                    success: false,
                    data: null
                })
            }
            //将用户信息插入数据库
            const [result] = await pool.execute("insert into users (openid,phone) values (?,?)", [openid, encryptPhoneNumber(phoneNumber)])
            const [newUser]=await pool.execute("select * from users where openid=?",[openid])
            user=newUser[0]
        }
        //生成token
        const SECRET=process.env.TOKEN_SECRET
        const token=jwt.sign({
            user_id:user.user_id,
            openid:user.openid,
            phone:user.phone
        },SECRET, { expiresIn: '2h' })
        res.json({
            code:200,
            message:"登陆成功",
            success:true,
            data:{
                user:{
                    user_id:user.user_id,
                    username:user.nickname,
                    avatar:user.avatar,
                    openid:user.openid,
                    phone:decryptPhoneNumber(user.phone) 
                },
                token
            }

        })


    } catch (error) {
        next(error)
    }

}

//手机验证码登录
const sendSmsCode=async (req,res,next)=>{
    try {
        const {phone}=req.body;
        if(!phone){
            return res.status(400).json({
                code:400,
                message:"手机号不能为空",
                success:false
            })
        }
        //生成6位随机数字验证码
        const code=Math.floor(100000+Math.random()*900000).toString();
        //创建短信客户端
        const sms=new SMS({
            accessKeyId:process.env.ALIYUN_ACCESS_KEY_ID,
            secretAccessKey:process.env.ALIYUN_SECRET_ACCESS_KEY
        })
        //发送短信
        const result=await sms.sendSMS({
            PhoneNumbers:phone, //用户电话
            SignName:process.env.ALIYUN_SMS_SIGN_NAME, //签名名称
            TemplateCode:process.env.ALIYUN_SMS_TEMPLATE_CODE,//模板代码
            TemplateParam:JSON.stringify({code:code}) //随机验证码
        })
        if(result.Code==="OK"){
            //将数据存储到数据库，为了后续与前端传过来的数据做对比/验证
            await pool.execute("insert into sms_codes (phone,code,created_at,expires_at,used) values (?,?,NOW(),DATE_ADD(NOW(),INTERVAL 5 MINUTE),0)",[phone,code])
            res.json({
                code:200,
                message:"验证码发送成功",
                success:true,
                data:{
                    phone,
                    expiresIn:300 //5分钟内有效
                }
            })
        }else{
            res.status(500).json({
                code:500,
                message:"验证码发送失败",
                success:false
            })
        }
    } catch (error) {
        next(error)
    }
}

//验证短信验证码
const verifySmsCode=async (req,res,next)=>{
    try {
        const {phone,code}=req.body;
        if(!phone || !code){
            return res.status(400).json({
                code:400,
                message:"手机号或者验证码不能为空",
                success:false
            })
        }
        //查询验证码
        const [codes]=await pool.execute("select * from sms_codes where phone=? AND code=? AND expires_at>NOW() AND used=0 ORDER BY created_at DESC LIMIT 1",[phone,code]);
        if(codes.length===0){
            return res.status(400).json({
                code:400,
                message:"验证码错误或已过期",
                success:false
            })
        }
        //标记验证码位已使用
        await pool.execute(
            "update sms_codes set used=1 where id=?",[codes[0].id]
        )
        //判断新老用户
        const [existUser] = await pool.execute("select * from users where phone=?", [phone])
        let user //存储用户信息
        if (existUser.length > 0) {
            console.log("老用户登录")
            //老用户登录
            user = existUser[0]
        } else {
            console.log("新用户注册")
            //新用户注册
            //将用户信息插入数据库
            const [result] = await pool.execute("insert into users (openid,phone) values (?,?)", ["",phone])
            const [newUser]=await pool.execute("select * from users where phone=?",[phone])
            user=newUser[0]
        }
        //生成token
        const SECRET=process.env.TOKEN_SECRET
        const token=jwt.sign({
            user_id:user.user_id,
            phone:user.phone
        },SECRET, { expiresIn: '2h' })

        res.json({
            code:200,
            message:"验证码验证成功",
            success:true,
            data:{
                user:{
                    user_id:user.user_id,
                    username:user.nickname,
                    avatar:user.avatar,
                    openid:user.openid,
                    phone:user.phone 
                },
                token
            }
        })

    } catch (error) {
        next(error)
    }
}

module.exports = {
    wxLogin,
    sendSmsCode,
    verifySmsCode

}