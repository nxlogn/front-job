import {RequestConfig} from "./types"

const getToken = () => uni.getStorageSync("token") || ""

//请求拦截器
export const requestInterceptor=(config:RequestConfig)=>{
	const token = getToken()
	if(token){
		config.header={
			...config.header,
			Authorization:`Bearer ${token}`
		}
	}
	return config
}

/*
{
	code:200,
	message:"请求成功",
	success:true
	data:数据
}
*/

//响应拦截器
export const transformResponse=(res:any)=>{
	if(res.statusCode !==200) { 
		uni.showToast({
			title:res.data.message,
			icon:"none"
		})
		return 
	}
	if(!res.data.success) {
		uni.showToast({
			title:res.data.message,
			icon:"none"
		})
	}
	return res.data.data
}