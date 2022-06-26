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
  config.headers.common['Authorization'] = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVfdGltZSI6MTY1NjIzNzg3NDczMywidXNlcl9uYW1lIjoiYWRtaW4iLCJzY29wZSI6WyJhbGwiXSwiZXhwaXJhdGlvbiI6IjIwMjItMDYtMjYgMTk6MDQ6MzQiLCJleHAiOjE2NTYyNDE0NzQsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJqdGkiOiJiYTNmMTI3ZC0zZmE2LTQyNzMtOTA0MC1mOGIyZjYzYzg3ZjkiLCJjbGllbnRfaWQiOiJhNTRhMmRmZGM3ODg0ZTYwYTI0ZDQzNTUxOTU5MmZmYiJ9.B7N3dgM7zFNwehhcxvGv5J1mFWhyn4GaAMXF3Oq_So5-WEw6_iXd8xGDNnCeW-lkkKXBsUrYVWSyW45WMAbZ_d6VOON6Jpk6OXamlS2i-OeSfrcFcqtpKnWnPvOk2Ea9K4aulxGikcGIOiEUhQohP2n08m1cHaB8Cq0U3ePCv-msktXhRtYUxcKi1hXJZWfdNcXLtz0UcCibDjKqlyKv9ogbwIAXFeW3uF6bXTurS008iaqNw0UYKfsvuVCtH3eg6c5O7jlg57z-QietiUHlDe6gNTaYDVzDtiOXLdk-mOnNXc0qz3-0IFRCVGjKHPeE1z5Enu1EdgL1X8oSTpkffQ';
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