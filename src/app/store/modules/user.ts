import { Store, Pinia, Persist } from '../utils'

@Store
export class User extends Pinia {
  // 使用Persist修饰器持久化数据
  @Persist
  loginInfo = {
    openid: '',
    session_key: '',
    unionid: '',
    version_code: 0,
  }

  @Persist
  shopInfo = {
    id: 0,
  }

  @Persist
  userInfo = {
    id: 0,
    appid: 0,
  }

  // 获取登录信息
  async getLoginInfo() {
    return new Promise(resolve => {
      uni.login({
        success: async res => {
          return app
            .request({
              url: '../../web/index.php?t=0&v=v6.3.9.05&from=wxapp&c=entry&a=wxapp&m=vip_card&do=login_auto',
              data: {
                code: res.code,
                login_num: 1,
                i: 1904190010,
                uniacid: '1904190010',
                vip_timestamp: '1654653465897',
                _sign: 'ad4470fc43660dd6bc36c7022447bfd2',
              },
            })
            .then(res => {
              this.loginInfo = res.data
              resolve(res.data)
            })
        },
        fail: () => {
          uni.showModal({
            title: '获取信息失败',
            content: '请允许授权以便为您提供给服务',
            success: res => {
              if (res.confirm) {
                this.getLoginInfo()
              }
            },
          })
        },
      })
    })
  }

  async login() {
    if (!this.loginInfo.openid) {
      await this.getLoginInfo()
    }

    await this.getShopInfo()
    await this.getUserInfo()
  }

  // 门店信息
  async getShopInfo() {
    return app
      .request({
        url: 'a/api/index.php?s=/miniapp/shop/get_shop_data',
        data: {
          uniacid: 1904190010,
          cardmanage: true,
          condensation_code: '',
          cardmanage_fields: 'other_config_v2,op_card_bg',
        },
      })
      .then(res => {
        this.shopInfo = res.data
      })
  }

  // 用户信息
  async getUserInfo() {
    return app
      .request({
        url: '../../web/index.php?t=0&v=v6.3.9.05&from=wxapp&c=entry&a=wxapp&m=vip_card&do=login',
        data: {
          i: 1904190010,
          uniacid: '1904190010',
        },
      })
      .then(res => {
        this.userInfo = res.data
      })
  }
}
