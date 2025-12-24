const pool=require("../config/db")

const getAdopt=async (req,res,next)=>{
    try {
        const [result]=await pool.query("select * from adoption");
        res.json({
            code:200,
            message:"获取成功",
            success:true,
            data:result
        })
    } catch (error) {
        next(error)
    }
}

module.exports={
    getAdopt
}