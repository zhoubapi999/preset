/**枚举EPlatform*/
export enum EPlatform {
  /**App*/
  AppPlus = 'APP-PLUS',
  /**App nvue*/
  AppPlusNvue = 'APP-PLUS-NVUE',
  /**H5*/
  H5 = 'H5',
  /**微信小程序*/
  MpWeixin = 'MP-WEIXIN',
}

/**使用条件编译获取平台信息*/
export function ifDefPlatform(): EPlatform {
  let platform: EPlatform
  //#ifdef APP-PLUS
  platform = EPlatform.AppPlus
  //#endif
  //#ifdef APP-PLUS-NVUE
  platform = EPlatform.AppPlusNvue
  //#endif
  //#ifdef H5
  platform = EPlatform.H5
  //#endif
  //#ifdef MP-WEIXIN
  platform = EPlatform.MpWeixin
  //#endif
  return platform
}

/**平台类型*/
const Platform: EPlatform = ifDefPlatform()

/**App*/
export const isAppPlus = Platform == EPlatform.AppPlus
/**App nvue*/
export const isAppPlusNvue = Platform == EPlatform.AppPlusNvue
/**H5*/
export const isH5 = Platform == EPlatform.H5
/**微信小程序*/
export const isMpWeixin = Platform == EPlatform.MpWeixin
/**是否开发环境*/
export const isDev = process.env.NODE_ENV == 'development'
/**是否线上环境*/
export const isPro = process.env.NODE_ENV == 'production'

export default function () {
  Object.assign(app, {
    isAppPlus,
    isAppPlusNvue,
    isH5,
    isMpWeixin,
    isDev,
    isPro,
  })
}

declare global {
  interface App {
    isAppPlus: boolean
    isAppPlusNvue: boolean
    isH5: boolean
    isMpWeixin: boolean
    isDev: boolean
    isPro: boolean
  }
}
