const pool = require("../config/db")
const getCarts = async (req, res, next) => {
    console.log(888, req.user)
    try {
        const [cart] = await pool.query("select * from cart where user_id=?", req.user.user_id);
        res.json({
            code: 200,
            message: "获取成功",
            success: true,
            data: cart
        })
    } catch (error) {
        next(error)
    }
}

//获取商品规格接口
/*
spec_attribute sa 表示将spec_attribute重命名为sa
sa.id AS attr_id 表示将sa表的id字段重命名为attr_id
join spec_value sv 连接spec_value表并将表名重命名为sv
ON sa.id = sv.attr_id ON 表示连接条件,SA表的id等于sv表的attr_id
 {
    attr_id: 2,
    attr_name: '口味',
    value_id: 9,
    value: '三文鱼味',
    multiple: '1.00'
  }
   {
    attr_id: 2,
    attr_name: '口味',
    value_id: 7,
    value: '牛肉味',
    multiple: '1.00'
  },
  {
    attr_id: 1,
    attr_name: '重量',
    value_id: 11,
    value: '5kg',
    multiple: '2.00'
  },
*/
const getSpec = async (req, res, next) => {
    const productId = req.query.id;
    try {
        const [rows] = await pool.query(`
            select sa.id AS attr_id,
            sa.attr_name,
            sv.id AS value_id,
            sv.value,
            sv.multiple
            from spec_attribute sa
            join spec_value sv ON sa.id = sv.attr_id
            where sv.product_id=?
            order by sa.id,sv.id
        `, [productId]);
        const grouped = {};
        rows.forEach(row => {
            if (!grouped[row.attr_id]) {
                grouped[row.attr_id] = {
                    attr_id: row.attr_id,
                    attr_name: row.attr_name,
                    values: []
                }
            }
            /*
             grouped={
                1:{
                    attr_id:1,
                    attr_name:重量,
                    values:[]
                }
             }
            */
            grouped[row.attr_id].values.push({
                value_id: row.value_id,
                value: row.value,
                multiple: row.multiple
            })
            /*
             grouped={
                1:{
                    attr_id:1,
                    attr_name:重量,
                    values:[
                        {
                            value_id:4,
                            value:"2kg",
                            multiple:"1.00"
                        },
                        {
                            value_id:5,
                            value:"5kg",
                            multiple:"2.00"
                        }
                    ]
                }
             }
            
            */
        })
        const result = Object.values(grouped)
        console.log("处理之后的数据", result);

        res.json({
            code: 200,
            message: "操作成功",
            success: true,
            data: result
        })

    } catch (error) {
        next(error)
    }
}

//加入购物车接口
const addToCart = async (req, res, next) => {
    //如果是同样的商品，同样的规格，那么应该只改数量和价格，而不应该再重复添加
    const { user_id } = req.user
    console.log("user_id", user_id)
    try {
        const { product_id, name, price, count, spec, main_pic } = req.body;
        const [cart] = await pool.execute("select * from cart where product_id = ? AND spec =? AND user_id=?", [product_id, spec, user_id]);
        if (cart.length > 0) {
            const [result] = await pool.execute("update cart set count=count+?,price=price+? where product_id = ? AND spec =? AND user_id=?", [count, price, product_id, spec, user_id])
            res.json({
                code: 200,
                message: "添加成功",
                success: true,
                data: null
            })
        } else {
            const [result] = await pool.execute("insert into cart (product_id,user_id,name,price,count,main_pic,spec) values (?,?,?,?,?,?,?)", [product_id, user_id, name, price, count, main_pic, spec])
            res.json({
                code: 200,
                message: "添加成功",
                success: true,
                data: null
            })
        }

    } catch (error) {
        next(error)
    }
}

//删除购物车数据接口
const deleteCart = async (req, res, next) => {
    const { cart_id } = req.body;
    try {
        const [result] = await pool.execute("delete from cart where cart_id=?", [cart_id]);
        res.json({
            code: 200,
            message: "删除成功",
            success: true,
            data: null
        })
    } catch (error) {
        next(error)
    }
}

//获取用户地址接口
const getAddress = async (req, res, next) => {
    const { user_id } = req.user
    try {
        const [result] = await pool.query("select * from address where user_id=?", [user_id])
        res.json({
            code: 200,
            message: "获取成功",
            success: true,
            data: result
        })
    } catch (error) {
        next(error)
    }
}

//删除地址接口
const deleteAddress = async (req, res, next) => {
    const { user_id } = req.user
    const { id } = req.body
    try {
        const [result] = await pool.execute("delete from address where id=? AND user_id=?", [id, user_id])
        res.json({
            code: 200,
            message: "删除成功",
            success: true,
            data: null
        })
    } catch (error) {
        next(error)
    }
}
//新增/更改地址接口
const updateAddress = async (req, res, next) => {
    const { user_id } = req.user
    const { id, name, phone, province, city, district, detail, is_default } = req.body //is_default 1默认 0不默认
    try {
        if (is_default === 1) {
            //把之前存在的数据都设置为非默认
            await pool.execute("update address set is_default=0 where user_id=?", [user_id])
        }
        if (id) {
            //执行修改操作
            const [result] = await pool.execute("update address set name=?,phone=?,province=?,city=?,district=?,detail=?,is_default=? where id=?",
                [name, phone, province, city, district, detail, is_default,id]
            )
            res.json({
                code: 200,
                message: "更新成功",
                success: true,
                data: null
            })
        } else {
            //执行新增操作
            const [result]=await pool.execute("insert into address (name, phone, province, city, district, detail, is_default,user_id) values(?,?,?,?,?,?,?,?)",
            [name, phone, province, city, district, detail, is_default,user_id]
            )
            res.json({
                code: 200,
                message: "添加成功",
                success: true,
                data: null
            })    
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getCarts,
    getSpec,
    addToCart,
    deleteCart,
    getAddress,
    deleteAddress,
    updateAddress
}


// [
//     {
//     "attr_id":1,
//     "attr_name":"口味",
//     "values":[
//         {
//             "value_id":1,
//             "value":"牛肉味",
//             "multiple":1
//         },
//         {
//             "value_id":1,
//             "value":"鸡肉味",
//             "multiple":1
//         }
//     ]
// } , {
//     "attr_id":1,
//     "attr_name":"重量",
//     "values":[
//         {
//             "value_id":1,
//             "value":"牛肉味",
//             "multiple":1
//         },
//         {
//             "value_id":1,
//             "value":"鸡肉味",
//             "multiple":1
//         }
//     ]
// }

// ]