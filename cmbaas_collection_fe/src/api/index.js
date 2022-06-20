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
  config.headers.common['Authorization'] = 'Bearer eyJhbGciOiJFUzI1NiJ9.eyJhdWQiOiJhZG1pbiIsImp0aSI6ImIwM2Y2ZGY1LWM5YmItNDg4OC1hMWQ5LTg5NzMzZmQ4ZmMzZSIsImlzcyI6ImNtaXQiLCJpYXQiOjE2NTU3MTEwMDEsImV4cCI6MTY1NTcxNDYwMSwic3ViIjoiZ2NBNUp1Umc0UkxJYnlPd0xORlM2MGlsV0hiUjJtcUQwa0xGanc1R1ZlUT0iLCJ1c2VyTG9naW5JZCI6ImFkbWluIiwidGVuYW50TmFtZSI6IuW5s-WPsOenn-aIt-e7hCIsInVzZXJSZWFsTmFtZSI6IkZob1IrSnJjSG1kR1NPYkllNDRZZGc9PSIsInRlbmFudElkIjoxLCJlbWFpbCI6ImdjQTVKdVJnNFJMSWJ5T3dMTkZTNjBpbFdIYlIybXFEMGtMRmp3NUdWZVE9In0.AO9-E0Z0n6MBjxzo0oIbT7DyRMS6HueV6Xt3G99YshUrw5z2y_wVJooG0NagpdnRirzthU99N-2qnDMLaOBuug';
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