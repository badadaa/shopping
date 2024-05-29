// 对axios进行二次封装
import axios from 'axios';

import nprogress from 'nprogress';
// console.log(nprogress);
// 引入进度条样式
import'nprogress/nprogress.css'

// 1.利用axios对象的方法creat，去创建一个axios实例
// 2.request就是axios，只不过稍微配置一下

const requests=axios.create({
    // 配置对象
    // 基础路径，发请求时，路径中会出现api
    baseURL:'/api',

    // 代表请求超时的时间5s
    timeout:5000, 
});
// 请求拦截器：在发请求之前，请求拦截器可以监测到，可以在请求发生之前做一些事情
requests.interceptors.request.use((config)=>{
    // config：配置对象，对象里面有一个对象很重要，headers请求头
    // start表开始，，done表结束
    nprogress.start()
    return config
});
// 响应拦截器
requests.interceptors.response.use((res)=>{
    // 成功的回调函数：服务器相应的数据回来以后，响应拦截器可以检测到可以做一些事情
    nprogress.done()
    return res.data
},(error)=>{
    // 响应式失败的回调函数
    return Promise.reject(new Error('faile'))
})

// 对外暴露
export default requests;                                                  