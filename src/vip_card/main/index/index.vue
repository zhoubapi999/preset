<template>
  <meta title="主页" title:wx="微信端主页" navigationStyle="custom" />
  <div
    class="page-container"
    :class="{ opencard: showIndex, 'has-bottomnav': uiData.showFooter }"
    style="background:{{ui.pageBg}};background-image:url({{ui.pageBgImg}});background-size:{{ui.bgSize}}"
  >
    <div v-for="(u, index) in uiData.components" :key="index" class="page-item">
      <HdSwiper v-if="u.name === 'swiper'" :config="u"></HdSwiper>
      <HdCard v-if="u.name === 'card'" :config="u"></HdCard>
      <HdShoplist v-if="u.name === 'shoplist'" :config="u"></HdShoplist>
      <HdCube v-if="u.name === 'cube'" :config="u"></HdCube>
      <HdBottomNav v-if="u.name === 'bottomNav'" :config="u" class="bottomnav"></HdBottomNav>
    </div>
  </div>
</template>

<script setup lang="ts">
import HdCard from '@/components/hdui/HdCard.vue'
import HdShoplist from '@/components/hdui/HdShoplist.vue'
import HdCube from '@/components/hdui/HdCube.vue'
import HdSwiper from '@/components/hdui/HdSwiper.vue'
import HdBottomNav from '@/components/hdui/HdBottomNav.vue'
import { UIOption } from '@/types'
const uiData = ref<UIOption>({} as UIOption)
const bottomnav = ref()
const showIndex = ref(true)
const { allData, userInfo } = $(app.User)

function getUiData() {
  return app
    .request({
      url: 'a/api/?s=/miniapp/diy/index_page&op=get',
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
      console.log(pageData)
      uiData.value = pageData
    })
}

function getDefaultPage() {
  let defaultIndex = app.Shop.defaultIndex

  let components = defaultIndex.components
  defaultIndex.showFooter = this.data.allData.shop_index_page == 1

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
  var oldUrlMap = {
    super_home: '/vip_card/pages/index/super_home',
    shop: '/vip_card/pages/points/list',
    '../coupon/tuangou_coupon_list': '/vip_card/pages/coupon/tuangou_coupon_list',
    '../coupon/my_service_list': '/vip_card/pages/coupon/my_service_list',
    '../coupon/coupon_list': '/vip_card/pages/coupon/collect_coupon_center',
    '../coupon/coupon_list?show_list_type=3':
      '/vip_card/pages/coupon/collect_coupon_center?show_list_type=3',
    'vip_card/main/index/shop': '/vip_card/pages/points/list',
    '../my_integral/my_integral': '/vip_card/pages/my_integral/my_integral',
    '../card/personal': '/vip_card/main/index/opencard/personal',
    '../action/privilege': '/vip_card/pages/action/privilege',
    '../coupon/coupon_list?show_list_type=1':
      '/vip_card/pages/coupon/my_coupon_list?show_list_type=1',
    '../pay_record/index': '/vip_card/pages/pay_record/index',
    '../wifi/index': '/vip_card/pages/wifi/index',
    '../action/pay': '/vip_card/pages/action/pay',
    '../card/list': '/vip_card/pages/card/list',
    '../vgoods/vgoods': '/vip_card/pages/mall/mall?scene=self_mall',
    '../qrcode/index': {
      //二维码
      type: 'action',
      url: 'qrcode',
    },
    contact_us: {
      type: 'action',
      url: 'contactUs',
    },
    shop_detail: {
      type: 'action',
      url: 'shopDetail',
    },
  }

  //轮播
  if (allData.banner_list.length > 0) {
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

useScroll(onPageScroll).onLoad(async page => {
  app.info('页面加载', `第${page.num}页`)
  await getUiData()
  page.endSuccess(1, false)
})
</script>

<style lang="scss" scoped>
page {
  margin: 0;
  padding: 0;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}

.page-container {
  position: relative;
  z-index: 10;
  width: 100%;
  overflow: hidden;
  background-position: center;
  background-repeat: no-repeat;
  box-sizing: border-box;
  flex: 1;
  overflow-y: auto;
}

.page-container.opencard {
  display: flex;
  flex-direction: column;
}

.page-item {
  position: relative;
}

.loading {
  position: fixed;
  top: -90rpx;
  left: -90rpx;
  right: -90rpx;
  bottom: -90rpx;
  z-index: 100000;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10rpx);
}

.loading image {
  position: absolute;
  width: 80px;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
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
.bottomnav {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
}
</style>
