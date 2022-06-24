import Axios from 'axios';
import { ips } from './config';

// const Axios = axios.create({
//   // 开发环境中使用测试接口，生产环境中使用线上
//   baseURL: ips[process.env.NODE_ENV]
// });

const createToken = config => {
  // token值是vuex里的token
  // const token = Store.getState().user.token;
  // 将token放在请求头中
  // config.headers.common['Authorization'] = token;
  config.headers.common['Authorization'] = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVfdGltZSI6MTY1NjA1MDc4MDczNiwidXNlcl9uYW1lIjoiYWRtaW4iLCJzY29wZSI6WyJhbGwiXSwiZXhwaXJhdGlvbiI6IjIwMjItMDYtMjQgMTU6MDY6MjAiLCJleHAiOjE2NTYwNTQzODAsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJqdGkiOiJjOTgzOGI4ZS0yYzk1LTRlMTAtOTg2NS05MGJhOTA3YmIwMWYiLCJjbGllbnRfaWQiOiJhNTRhMmRmZGM3ODg0ZTYwYTI0ZDQzNTUxOTU5MmZmYiJ9.QfXHH7eOy9SY88CP3syo0QYy9xVSTb7FF7CbXGXmChbHHsIqZd_IshH_yoHw0DPgqI_5IItFbNCLPTMs3TL9Gvt5wnCCooGQMZ2TCIR_UGXibcJUVhvP9hQtmq2Ojv_s0IAur8HzyzyCmUaUvumzVYDdkeKWtjXXic4aWzfjr-25vzCzqCfuLdZfvJe0jN8MjuclYXG2EOw0CJkQlyiYg-0Af6npS3at1oNaMwRls3ONf5gfOXNwitdsl_wCUfd41_xbSYdi70l7PBT4pwRnoVFJQ5cJk5ddForsxOsyXjSawu38K8Z4JgRX1mOYG5EV3XV664pzFKNjO64r3y2ObQ';
  return config;
};

// 发起请求
Axios.interceptors.request.use(config => {
  let url = window.location.pathname;
  if (!url.includes('/index')) {
    return createToken(config);
  }
  return config;
}, err => {
  // 抛出错误
  Promise.reject(err);
});

// // 请求回来之后
Axios.interceptors.response.use(config => {
  // if (config.data.code === 404) {
  //   window.location.replace('/index')
  //   return;
  // }
  return config;

}, err => {
  message.error('网络错误,请稍后再试!');
  return Promise.reject(err)
})

export default Axios;