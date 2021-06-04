import axios from "axios";
import {Notify, Toast} from 'vant';
import router from '../router'

export function request(config){
    const instance = axios.create({
        baseURL: 'https://api.shop.eduwork.cn',
        timeout:50000,

    })
    //请求拦截
    instance.interceptors.request.use(config =>{
        //token认证
        const token = window.localStorage.getItem('token');

        if (token){
            config.headers.Authorization = 'Bearer ' + token;
        }

        return config //放行
    },err =>{

    })

    //响应拦截
    instance.interceptors.response.use(res =>{

        return res.data ? res.data : res;

    },err =>{
        //需授权访问的接口

        if (err.response.status == '401'){
            Toast.fail('请先登录');
            router.push({path:'/login'});
        }

        //错误处理
        Notify(err.response.data.errors[Object.keys(err.response.data.errors)[0]][0])

    })

    return instance(config)

}