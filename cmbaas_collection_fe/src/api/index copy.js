import axios from 'axios';
import { ips } from './config';

const Axios = axios.create({
  // 开发环境中使用测试接口，生产环境中使用线上
  baseURL: ips[process.env.NODE_ENV]
});

const createToken = config => {
  // token值是vuex里的token
  // const token = Store.getState().user.token;
  // 将token放在请求头中
  // config.headers.common['Authorization'] = token;
  config.headers.common['Authorization'] = '123456';
  return config;
};

// 发起请求
Axios.interceptors.request.use(config => {
  let url = window.location.pathname;
  // if (!url.includes('/login')) {
  //   return createToken(config);
  // }
  return config;
}, err => {
  // 抛出错误
  Promise.reject(err);
});

// 请求回来之后
Axios.interceptors.response.use(config => {
  // if (config.data.code === 404) {
  //   window.location.replace('/login')
  //   return;
  // }
  return config.data;
}, err => {
  message.error('网络错误,请稍后再试!');
  return Promise.reject(err)
})

export default Axios;