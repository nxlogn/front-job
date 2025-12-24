const errorHandler=(err, req, res, next) => {
    console.log("cuowu",err)
    const status = err.status || 500;
    res.status(status).json({
        code: status,
        message: err.message || "服务器内部错误",
        success:false,
        data: null
    });
}

module.exports=errorHandler

