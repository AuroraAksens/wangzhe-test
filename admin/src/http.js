import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({
    // baseURL: 'http://localhost:3000/admin/api'
    baseURL: process.env.VUE_APP_API_URL || '/admin/api'
})

// 给http加一个interceptors为拦截器，全局捕获错误信息
http.interceptors.response.use(res=>{
    // 正常成功请求进入这里
    return res
}, err=>{
    // 错误或者状态码信息大于等于400的进入这里
    // err.response为错误返回的对象信息  data.message为后台返回的message信息
    if(err.response.data.message){
        // $message为element里的方法显示
        Vue.prototype.$message({
            type:'error',
            message: err.response.data.message
        })
    }
    if(err.response.status === 401){
        router.push('/login')
    }
    return Promise.reject(err)
})

//处理token
http.interceptors.request.use((config)=>{
    //如果登录了或者有后端传过来的token才写入请求头
    if(localStorage.token){
    // Authorization为请求头的授权信息（token）
    config.headers.Authorization = 'Bearer ' +localStorage.token
}
    return config
},(error)=>{
    return Promise.reject(error)
})

export default  http