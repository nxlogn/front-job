const { getImages } = require("../utils/imageUtils")
const pool = require("../config/db")
const getBannerImages = async (req, res, next)=>{
    try {
        const bannerImages = await getImages("banner");
        res.json({
            code: 200,
            message: "banner获取成功",
            success: true,
            data: {
                banner: bannerImages
            }
        })
    } catch (error) {
        next(error)
    }
}

const getPartImages=async (req, res,next) => {
    try {
        const partImages = await getImages("part");
        res.json({
            code: 200,
            message: "banner获取成功",
            success: true,
            data: {
                part: partImages
            }
        })
    } catch (error) {
        next(error)
    }
}

const getAllBusiness= async(req,res,next)=>{
    try {
      const {page=1,merchantName,keyword,sortBy}=req.query //page分页,merchantName商家名称模糊查询,keyword关键词分类模糊查询 ,sortBy好评度排序
      const currentPage=parseInt(page);
      const pageSize=10;//每页多少条
      const offset=(currentPage-1)*pageSize;//计算偏移量
      //构建where条件
      let whereConditions=[];
      let queryParams=[]  

      //服务关键词分类
      if(keyword){
        whereConditions.push(" service like ? ")
        queryParams.push(`%${keyword}%`)
      }
      //商家名称
      if(merchantName){
        whereConditions.push(" merchant_name like ? ")
        queryParams.push(`%${merchantName}%`)
      }
      //构建完整where子句
       let whereClause=""
       if(whereConditions.length){
            whereClause="where" + whereConditions.join(' AND ')
       }

       //构建order by子句
       let orderClause=""
       if(sortBy === "rating"){
            orderClause="order by rating desc"
       }else if(sortBy==="rating_asc"){
            orderClause="order by rating asc"
       }
       //查询数据最终方法
      
       const [rows]=await pool.query(`
       select * from merchants ${whereClause} ${orderClause} limit ? offset ?`,[...queryParams,pageSize,offset])
       //查询总条数
       const [countResult]=await pool.query(`select count(*) as total from merchants ${whereClause}`,queryParams)
       const total=countResult[0].total;
       const totalPages=Math.ceil(total/pageSize)
       res.json({
        code:200,
        message:"请求成功",
        success:true,
        data:{
            list:rows,
            pagination:{
                current:currentPage,
                pageSize:pageSize,
                total:total,
                totalPages:totalPages
            }
        }
       })

    } catch (error) {
        next(error)
    }
}

const getServiceList = async (req,res,next)=>{
    const {merchant_id}=req.query;
    try {
        const [row] = await pool.query("select * from service_list where merchant_id=?",[merchant_id])
        res.json({
            code: 200,
            message: "获取成功",
            success: true,
            data: row
        })
    } catch (error) {
        next(error)
    }
}

module.exports={
    getBannerImages,
    getPartImages,
    getAllBusiness,
    getServiceList
}