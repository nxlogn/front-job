const pool = require("../config/db")

const getTagNames = async (req, res, next) => {
    try {
        const [tagNames] = await pool.query("select * from category");
        res.json({
            code: 200,
            message: "获取成功",
            success: true,
            data: {
                tag: tagNames
            }
        })
    } catch (error) {
        next(error)
    }

}


const getProducts = async (req, res, next) => {
    try {
        const { category_id, page } = req.query;
        const pageSize = 6;
        const offset = (page - 1) * pageSize
        const [products] = await pool.query("select * from products where category_id= ? limit ? offset ?", [category_id, pageSize, offset])
        const [countResult] = await pool.query("select COUNT(*) as total from products where category_id=?", [category_id]);
        const total = countResult[0].total
        const totalPages = Math.ceil(total / pageSize) //一共几页
        res.json({
            code: 200,
            message: "获取成功",
            success: true,
            data: {
                list: products,
                pagination: {
                    current: page,
                    pageSize: pageSize,
                    total: total,
                    totalPages: totalPages
                }
            }
        })
    } catch (error) {
        next(error)
    }
}

//获取商品详情图接口
const getDetail=async (req,res,next)=>{
    const {id}=req.query;
    try {
        let [detail]=await pool.query("select * from product_images where product_id=?",[id]);
        if(detail.length===0){
            detail=await pool.query("select * from product_images where product_id=1");
        }
        res.json({
            code:200,
            message:"获取成功",
            success:true,
            data:detail
        })

    } catch (error) {
        next(error)
    }
  
}
module.exports = {
    getTagNames,
    getProducts,
    getDetail
}