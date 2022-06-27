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
    groupid: 0,
    name: '',
    address: '',
    pic_url: '',
  }

  @Persist
  userInfo = {
    id: 0,
    appid: 0,
    mini_app: {} as any,
  }

  @Persist
  allData = {
    shop_info: {} as any,
    my_card_info: {} as any,
    setting: {} as any,
    banner_list: [],
    index_box: [],
  }

  // 获取登录信息
  async getLoginInfo() {
    return new Promise(resolve => {
      uni.login({
        success: async res => {
          return app
            .request({
              url: '../../web/index.php?t=0&v=v6.3.9.05&from=wxapp&c=entry&a=wxapp&m=vip_card&do=login_auto',
              method: 'GET',
              data: {
                code: res.code,
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
    this.getUserInfo()
    this.getAllData()
    app.Shop.getShopList()
  }

  // 门店信息
  async getShopInfo() {
    return app
      .request({
        url: 'a/api/index.php?s=/miniapp/shop/get_shop_data',
        data: {
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
        method: 'GET',
        data: {},
      })
      .then(res => {
        this.userInfo = res.data
      })
  }

  async getAllData() {
    return app
      .request({
        url: '../../web/index.php?t=0&v=v6.3.9.05&from=wxapp&c=entry&a=wxapp&m=vip_card&do=index',
        method: 'GET',
        data: {},
      })
      .then(res => {
        this.allData = res.data
      })
  }

  checkLogin() {
    return new Promise(resolve => {
      let int = setInterval(() => {
        if (this.userInfo.id > 0) {
          clearInterval(int)
          resolve(true)
        }
      }, 200)
    })
  }
}
