let baseURL = process.env.NODE_ENV === 'production'
  ? '/'
  : 'http://10.253.179.7:18086/'

fetch('/static/config.json').then(async (response) => {
  if (response.status === 200) {
    let config = null
    if (response.headers.get('content-type') === 'application/json') {
      config = await response.json()
    } else {
      config = await response.text()
    }
    if (config.baseURL) {
      baseURL = config.baseURL
      localStorage.setItem('baseURL', baseURL)
    }
  }
})
export {
  baseURL
}
