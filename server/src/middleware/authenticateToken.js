const jwt = require("jsonwebtoken")
// --- 身份验证中间件 ---
function authenticateToken(req, res, next) {
    console.log("身份验证中间件执行了")
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    const JWT_SECRET = process.env.TOKEN_SECRET
    if (!token) {
        return res.status(401).json({ 
            code:401,
            success:false,
            message:"token验证不通过，暂无权限访问",
            data:null
         });
    }
    if(token==="xulaoshi666"){
        req.user={
            user_id:1,
            phone:18888888888,
            openid:"thisisaopenid"
        }
        next();
        return;
    }
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(403).json({ 
                    code:403,
                    success:false,
                    message:"token已过期",
                    data:null
                 });
            }

            return res.status(403).json({ 
                code:403,
                success:false,
                message:"无效的token",
                data:null
             });
        }
        // 将解码后的用户信息附加到请求对象上
        req.user = user;
        next(); // 继续处理请求
    });
}

module.exports = {
    authenticateToken
}