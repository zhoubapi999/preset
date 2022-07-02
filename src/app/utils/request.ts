import initJson from '@/app/config'
import { pickBy, isNil } from 'lodash'
const base_url = {
  PROD: `https://${initJson.siteroot}/`, // 生产环境地址
  DEV: `https://${initJson.siteroot}/`, // 开发环境地址
}
//#ifdef H5
if (process.env.NODE_ENV === 'development') base_url.DEV = '/api/'
//#endif

interface Option {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: object
  header?: string
  loading?: boolean
  loadingText?: string
}

interface Response<T = any> {
  code: number
  msg: string
  data: T
}

function request<T = Response>(obj: Option): Promise<T> {
  let { userInfo, shopInfo, loginInfo } = app.User
  obj.url = obj.url || ''
  obj.method = obj.method || 'POST'
  // 去除null undefined
  obj.data = pickBy(
    {
      ...loginInfo,
      ...obj.data,
      uid: userInfo.id,
      appid: userInfo.appid,
      shop_id: shopInfo.id,
      groupid: shopInfo.groupid,
      uniacid: initJson.uniacid,
      i: obj.method === 'GET' ? initJson.uniacid : null,
    },
    val => {
      return !isNil(val)
    },
  )
  obj.header = obj.header || 'application/x-www-form-urlencoded'
  obj.loading = obj.loading !== false
  let token = '' // 登录获得的 token
  let loadingCount = 0

  if (obj.loading) {
    uni.showLoading({
      title: obj.loadingText || '加载中...',
      mask: true,
    })
    loadingCount++
  }

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
        if (data.code === 200 || data.errno === 0) {
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
        loadingCount > 0 && loadingCount--
        if (loadingCount === 0 && obj.loading) uni.hideLoading()
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
