import axios from 'axios'
import { baseURL } from '@/config'
import { localRead } from '@/lib/util'

class HttpRequest {
  constructor() {
    this.queue = {}
  }
  getInsideConfig () {
    if (baseURL && baseURL !== '/') { localStorage.setItem('baseURL', baseURL) }
    // console.log(baseURL, localStorage.getItem('baseURL'))
    return {
      baseURL: localStorage.getItem('baseURL') || baseURL,
      headers: {}
    }
  }
  distroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, url) {
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show()
      }
      this.queue[url] = true
      // config.headers['Authorization'] = getToken()
      // config.headers['Authorization'] = 'Bearer ' + localRead('token')
      // config.headers['Token'] = '123456'
      return config
    }, error => {
      return Promise.reject(error)
    })
    instance.interceptors.response.use(res => {
      this.distroy(url)
      const { data } = res
      return data
    }, error => {
      this.distroy(url)
      return Promise.reject(error.response.data)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
