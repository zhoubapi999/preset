const base_url = {
  PROD: '', // 生产环境地址
  DEV: '', // 开发环境地址
}

interface Option {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: object
  header?: string
  loading?: boolean
}

interface Response<T = any> {
  code: number
  msg: string
  data: T
}

function request<T = Response>(obj: Option): Promise<T> {
  obj.url = obj.url || ''
  obj.method = obj.method || 'GET'
  obj.data = obj.data || {}
  obj.header = obj.header || 'application/json'
  obj.loading = obj.loading !== false
  let token = '' // 登录获得的 token
  let loadingStatus = true
  setTimeout(() => {
    if (loadingStatus && obj.loading) {
      uni.showLoading({
        title: '加载中',
        mask: true,
      })
    }
  }, 800) // 800h毫秒后如果loadingStatus === false 则表示请求返回了，不显示loading
  return new Promise((resolve, reject) => {
    uni.request({
      url: (process.env.NODE_ENV === 'development' ? base_url.DEV : base_url.PROD) + obj.url,
      method: obj.method,
      data: obj.data,
      header: {
        token,
        'Content-Type': obj.header,
      },
      success: res => {
        // 服务器成功返回的回调函数
        let data = res.data
        if (data.code === 200) {
          return resolve(data)
        } else {
          uni.showModal({
            title: '提示',
            content: data.msg,
            showCancel: false,
            success: () => {
              return reject(data)
            },
          })
        }
      },
      fail: err => {
        // 接口调用失败的回调函数
        if (err.errMsg != 'request:fail abort') {
          uni.showToast({
            title: '连接超时，请检查您的网络!',
            icon: 'none',
          })
          return reject('连接超时，请检查您的网络!')
        }
      },
      complete: () => {
        if (loadingStatus && obj.loading) uni.hideLoading()
        loadingStatus = false
      },
    })
  })
}

export default function () {
  Object.assign(app, { request })
}

declare global {
  interface App {
    request: typeof request
  }
}
