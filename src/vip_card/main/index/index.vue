<template>
  <div class="container">
    <uni-nav-bar
      v-if="!uiData.hideTitle"
      :background-color="uiData.headerBg"
      :color="uiData.headerColor"
      status-bar
      :border="false"
    >
      <div class="title">{{ uiData.title }}</div>
    </uni-nav-bar>
    <div
      v-if="uiData.openCardDialog !== false && !uiData.showIndex"
      class="page-container"
      :class="{ opencard: uiData.showIndex, 'has-bottomnav': uiData.showFooter }"
      :style="{
        background: uiData.pageBg,
        backgroundImage: 'url(' + uiData.pageBgImg + ')',
        backgroundSize: uiData.bgSize,
      }"
    >
      <div v-for="(u, index) in uiData.components" :key="index" class="page-item">
        <HdNotice v-if="u.name === 'notice'" :config="u"></HdNotice>
        <HdSwiper v-if="u.name === 'swiper'" :config="u"></HdSwiper>
        <HdCard v-if="u.name === 'card'" :config="u"></HdCard>
        <HdShoplist v-if="u.name === 'shoplist'" :config="u"></HdShoplist>
        <HdCube v-if="u.name === 'cube'" :config="u"></HdCube>
        <HdMemberInfo v-if="u.name === 'memberInfo'" :config="u"></HdMemberInfo>
        <HdBottomlink v-if="u.name === 'hdbottomlink'" :config="u"></HdBottomlink>
        <HdCopyRight
          v-if="u.name === 'copyright' && allData.setting.technical"
          :config="u"
        ></HdCopyRight>
        <HdImage v-if="u.name === 'image'" :config="u"></HdImage>
        <HdVideo v-if="u.name === 'video'" :config="u"></HdVideo>
        <HdProduct v-if="u.name === 'product'" :config="u"></HdProduct>
        <HdProduct1 v-if="u.name === 'product1'" :config="u" :pagedata="uiData"></HdProduct1>
        <HdProduct2 v-if="u.name === 'product2'" :config="u" :pagedata="uiData"></HdProduct2>
      </div>
      <div
        v-if="uiData.showIndex && !uiData.hideIndex"
        class="opencard-bg"
        :style="{ backgroundImage: 'url(' + uiData.opencardbg + ')' }"
      ></div>
    </div>
    <div v-if="loading" class="loading">
      <image mode="aspectFit" :src="shopInfo.miniapp_loading_img"></image>
    </div>
    <HdBottomNav
      v-if="bottomnav && !uiData.showIndex"
      :config="bottomnav"
      @action="actionHandler"
    ></HdBottomNav>
    <!-- 旧导航栏 -->
    <HdOldBottomNav v-if="uiData.showFooter && !uiData.showIndex"></HdOldBottomNav>
    <!-- 开屏广告 -->
    <HdAd v-if="loading === false" @action="actionHandler"></HdAd>
    <HdBirthday></HdBirthday>
  </div>
</template>

<script setup lang="ts">
import { UIOption } from '@/types'
import HdMemberInfo from '../../../components/hdui/HdMemberInfo.vue'
import HdCopyRight from '@/components/hdui/HdCopyRight.vue'
const uiData = ref<UIOption>({} as UIOption)
const bottomnav = ref()
let loading = $ref<null | boolean>(null)
const { allData, userInfo, shopInfo } = $(app.User)

function getUiData() {
  loading = true
  return app
    .request({
      url: 'addons/vip_card/a/api/?s=/miniapp/diy/index_page&op=get',
      data: {},
    })
    .then(res => {
      let pageData
      if (res.data.page_json) {
        pageData = JSON.parse(res.data.page_json)
        bottomnav.value = pageData.components.filter(c => {
          return c.name === 'bottomNav'
        })[0]
      } else {
        pageData = getDefaultPage()
      }
      if (allData.setting.user_agreement_title && allData.setting.user_agreement) {
        pageData.components.push({
          name: 'hdbottomlink',
          isBlock: true,
          style: {
            color: '#888',
            bg: null,
            zIndex: 0,
            mgT: '10',
            mgB: 0,
            mgL: 5,
            mgR: 5,
            pdT: 6,
            pdB: 3,
            pdL: 15,
            pdR: 15,
            radius: 4,
            fontSize: 12,
            align: 'center',
            shadow: {
              x: 0,
              y: 0,
              radius: 0,
              color: 'transparent',
            },
          },
        })
      }

      pageData.components.push({
        name: 'copyright',
        isBlock: true,
        style: {
          color: '#888',
          bg: null,
          zIndex: 0,
          mgT: 0,
          mgB: 0,
          mgL: 5,
          mgR: 5,
          pdT: 6,
          pdB: 30,
          pdL: 15,
          pdR: 15,
          radius: 4,
          fontSize: 12,
          align: 'center',
          shadow: {
            x: 0,
            y: 0,
            radius: 0,
            color: 'transparent',
          },
        },
      })

      //头部颜色
      uni.setNavigationBarColor({
        frontColor: pageData.headerColor.toLowerCase(),
        backgroundColor: pageData.headerBg?.toLowerCase(),
        animation: {
          duration: 30,
          timingFunc: 'linear',
        },
      })
      uni.setNavigationBarTitle({
        title: pageData.title || '',
      })

      var openCardDialog = 2
      if (!allData.my_card_info.card_num) {
        openCardDialog = allData.opencard_show || 2
      }

      pageData.openCardDialog = openCardDialog
      pageData.showIndex = !allData.my_card_info.card_num && openCardDialog && !pageData.hideIndex //是否显示开卡页
      console.log(pageData)
      uiData.value = pageData
    })
    .finally(() => {
      loading = false
    })
}

function getDefaultPage() {
  let defaultIndex = app.Shop.defaultIndex

  let components = defaultIndex.components
  defaultIndex.showFooter = allData.shop_index_page == 1

  bottomnav.value = null

  defaultIndex.headerColor = allData.mini_title_text_color
  defaultIndex.headerBg = allData.mini_title_bg_color
  defaultIndex.pageBg = allData.card_page_color
  defaultIndex.title = allData.mini_name

  //公告
  if (allData.shop_info.user_announcement) {
    let notice = components.filter(c => c.name == 'notice')[0]
    notice.items.push({
      text: allData.shop_info.user_announcement,
      action: {
        type: 'http',
        url: '',
      },
    })
  } else {
    let index = components.findIndex(c => c.name == 'notice')
    components.splice(index, 1)
  }

  //门店组件
  if (allData.is_personal != 1) {
    let index = components.findIndex(c => c.name == 'shoplist' && c.shopType == 'current')
    components.splice(index, 1)
  }
  if (allData.is_enable_shop != 1) {
    let index = components.findIndex(c => c.name == 'shoplist' && c.shopType != 'current')
    components.splice(index, 1)
  }

  //卡面组件
  let card = components.filter(c => c.name == 'card')[0]
  card.btnText = userInfo.custom_fields.opencard_btn_text
  card.showPortrait = allData.setting.is_header == 1
  card.showUsername = allData.setting.is_nickname_tel == 1
  card.showPhone = allData.setting.is_nickname_tel == 1
  card.style.color = allData.title_description_color
  let bg = userInfo.mini_app.card_bg || ''
  if (bg.startsWith('https://')) {
    card.style.bgImg = bg
  } else {
    // card.style.bgImg = app.return_img_url(bg)
  }

  //卡面信息
  if (allData.is_shop.length == 0) {
    let index = components.findIndex(c => c.name == 'memberInfo')
    components.splice(index, 1)
  } else {
    let cardInfo = components.filter(c => c.name == 'memberInfo')[0]
    cardInfo.showUserLevel = allData.is_shop.indexOf('3') > -1
    cardInfo.showUserPoint = allData.is_shop.indexOf('2') > -1
    cardInfo.showUserBalance = allData.is_shop.indexOf('1') > -1
  }

  //旧版 URL 转换
  var { oldUrlMap } = app.Shop

  //轮播
  if (allData.banner_list && allData.banner_list.length > 0) {
    let swiper = components.filter(c => c.name == 'swiper')[0]
    allData.banner_list.forEach(b => {
      let action =
        typeof oldUrlMap[b.url] == 'object'
          ? oldUrlMap[b.url]
          : {
              type: 'inner',
              url: oldUrlMap[b.url] || b.url,
            }
      if (!action.url) {
        if (b.web_url) {
          action = {
            type: 'http',
            url: b.web_url,
          }
        } else if (b.appid) {
          action = {
            type: 'extre',
            url: b.path,
            appid: b.appid,
          }
        }
      }

      //兼容老版本的url
      if (!b.banner_img_url.startsWith('https://')) {
        b.banner_img_url = app.return_img_url(b.banner_img_url)
      }

      swiper.items.push({
        img: b.banner_img_url,
        action: action,
      })
    })
  } else {
    let index = components.findIndex(c => c.name == 'swiper')
    components.splice(index, 1)
  }

  //宫格组件
  let cube = components.filter(c => c.name == 'cube')[0]

  //一列模式
  if (allData.show_index_mode != 1) {
    cube.style.itemWidth = '100%'
    cube.style.itemDir = 'row'
    cube.style.itemMg = 18
    cube.style.iconSize = 26
    cube.style.pdL = 15
    cube.style.pdR = 15
    cube.style.itemFontSize = 16
    delete cube.style.borderColor

    //不带图标
    if (allData.show_index_mode == 2) {
      cube.style.hideIcon = true
    }
  }
  userInfo.index_box.forEach(box => {
    let type = 'inner'
    let url = oldUrlMap[box.url] || box.url
    let appid = ''
    if (box.p_id == 101) {
      type = 'http'
      url = box.web_url
    }

    if (box.p_id == 100) {
      type = 'extre'
      url = box.path
      appid = box.appid
    }

    cube.items.push({
      icon: box.icon,
      title: box.user_name || box.name,
      action:
        typeof oldUrlMap[box.url] == 'object'
          ? oldUrlMap[box.url]
          : {
              type: type,
              url: url,
              appid: appid,
            },
    })
  })

  return defaultIndex
}

/**
 * 处理跳转动作
 */
function actionHandler(action) {
  console.log(toRaw(action))
  let url = '' // action.url截取掉？之后的副本
  if (
    action.url &&
    action.url.indexOf('?') != -1 &&
    action.url.indexOf('/vip_card/pages/mall/mall') == -1
  ) {
    url = action.url.split('?')[0]
  } else {
    url = action.url
  }
  //限制非会员的功能
  if (!allData.my_card_info.card_num && this.noLoginUrls.indexOf(url) > -1) {
    this.setData({
      createCardTipDialog: true,
    })
    let dialog = this.selectComponent('#openCardDialog')
    dialog.showModal()
    return
  } else if (!allData || !allData.shop_info.id) {
    return
  }

  if (typeof action == 'object') {
    switch (action.type) {
      case 'inner':
      case 'nav': {
        //底部导航栏和内部跳转
        if (action.url) {
          if (
            !allData.my_card_info.card_num &&
            action.url === '/vip_card/main/index/opencard/personal'
          ) {
            app.getUserProfile().then(userInfo => {
              let my_card_info = allData.my_card_info
              userInfo.isVip = !(!my_card_info.card_num && my_card_info.id > 0)
              uni.navigateTo({
                url:
                  '/vip_card/main/index/opencard/personal?wechatUserInfo=' +
                  encodeURI(JSON.stringify(userInfo)),
              })
              return
            })
          } else {
            uni.navigateTo({
              url: action.url,
              fail(e) {
                console.log(e)
              },
            })
          }
        }
        break
      }

      case 'freeinner': {
        //跳转内部
        if (action.url) {
          if (!action.url.startsWith('/')) {
            action.url = '/' + action.url
          }
          if (action.url.indexOf('vip_card/pages/mall/goods_detail') > -1) {
            uni.navigateTo({
              url: `/vip_card/pages/mall/mall?` + action.url.split('?')[1],
              fail(e) {
                console.log(e)
              },
            })
          } else {
            uni.navigateTo({
              url: action.url,
              fail(e) {
                console.log(e)
              },
            })
          }
        }
        break
      }

      case 'http': {
        //跳转网页
        if (action.url)
          uni.navigateTo({
            url: `/vip_card/pages/web/index?web_url=${encodeURIComponent(
              action.url,
            )}&action=${encodeURIComponent(JSON.stringify(action))}`, //跳转页面的路径，可带参数 ？隔开，不同参数用 & 分隔；相对路径，不需要.wxml后缀
            fail(e) {
              console.log(e)
            }, //成功后的回调；
          })
        break
      }
      case 'action': {
        //首页方法(action.url)
        this[action.url](action)
        break
      }
      case 'scancode': {
        //首页方法(action.url)
        setTimeout(() => {
          uni.scanCode({
            onlyFromCamera: true,
            scanType: [],
            success: res => {
              if (res.errMsg == 'scanCode:ok') {
                let path = res.path
                if (!path.startsWith('/')) {
                  path = '/' + path
                }
                uni.navigateTo({
                  url: path,
                  fail(e) {
                    uni.showToast({
                      title: '错误二维码',
                      icon: 'none',
                      duration: 1500,
                    })
                  },
                })
              }
            },
            fail: res => {},
            complete: res => {
              // 接口调用结束
              console.log(res)
            },
          })
        }, 600)
        break
      }
      case 'product': {
        //跳转商品详情
        //vip_card/pages/mall/goods_detail?scene=delivery_mall&goodsId=729&shop_id=4
        uni.navigateTo({
          url: `/vip_card/pages/mall/mall?scene=${action.scene}&goodsId=${action.product.id}`,
          fail(e) {
            console.log(e)
          },
        })
        break
      }
      case 'extre': {
        //跳转小程序
        if (action.url) {
          uni.navigateToMiniProgram({
            appId: action.appid, //小程序appid
            path: action.url, //跳转关联小程序app.json配置里面的地址
            //**重点**要打开的小程序版本，有效值 develop（开发版），trial（体验版），release（正式版）
            envVersion: 'release',
            fail(res) {
              console.log(res)
              //errMsg
              uni.showToast({
                icon: 'none',
                duration: 1000,
                title: res.errMsg,
              })
            },
          })
        }
        break
      }
      case 'product_cate': {
        uni.navigateTo({
          url: `/vip_card/pages/mall/mall?scene=delivery_mall&cateId=${action.cateId}&brand_mall=`,
          fail(e) {
            console.log(e)
          },
        })
        break
      }
      case 'brand_mall_search': {
        uni.navigateTo({
          url: `/vip_card/pages/mall/mall_search?brand_mall=false&scene=delivery_mall`,
          fail(e) {
            console.log(e)
          },
        })
        break
      }
      case 'brand_mall_cart': {
        uni.navigateTo({
          url: `/vip_card/main/index/cart/cart?scene=delivery_mall&brand_mall=true`,
          fail(e) {
            console.log(e)
          },
        })

        break
      }
      case 'shopcate': {
        uni.navigateTo({
          url: `/vip_card/pages/mall/mall?scene=${action.scene}&cateId=${action.shop_cate}&brand_mall=`,
          fail(e) {
            console.log(e)
          },
        })
        break
      }
      default:
        break
    }
  }
}

onLoad(() => {
  getUiData()
})

onPullDownRefresh(async () => {
  uni.showNavigationBarLoading()
  await app.User.login()
  await getUiData()

  uni.stopPullDownRefresh()
  uni.hideNavigationBarLoading()
})
</script>

<style lang="scss" scoped>
.container {
  margin: 0;
  padding: 0;
  height: 100vh;

  display: flex;
  flex-direction: column;
}

.page-container {
  position: relative;
  z-index: 10;
  width: 100%;

  background-position: center;
  background-repeat: no-repeat;
  box-sizing: border-box;
  flex: 1;
  overflow-y: auto;
}

opencardindex {
  display: block;
  position: relative;
  z-index: 100000;
  flex: 1;
}

.opencard .user-info {
  opacity: 0;
}

.has-bottomnav {
  padding-bottom: 50px;
}

.opencard-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: top center;
}

.title {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
}
</style>
