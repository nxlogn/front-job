const fs = require("fs")
const path = require("path")
const getImages = (folderName) => {
    return new Promise((resolve, reject) => {
        console.log("开始获取banner图片")
        const imagesPath = path.join(__dirname, `../../public/images/${folderName}`)
        fs.readdir(imagesPath, (err, files) => {
            if (err) {
               reject(err);
               return
            }
            //过滤出所有的图片文件
            console.log("图片文件", files)
            const bannerFiles = files.filter(file => {
                const ext = path.extname(file).toLowerCase()
                return [".png", ".jpg", "jpeg"].includes(ext)
            })
            bannerFiles.sort();
            const serverUrl = process.env.SERVER_URL
            const images = bannerFiles.map(item => ({
                url:`${serverUrl}/img/${folderName}/${item}`,
                title:path.parse(item).name
            }))
            resolve(images)
        }) 
    })
}
module.exports={
    getImages
}