<template>
  <meta title="主页" title:微信="微信端主页" navigationStyle="custom" />
  <view v-for="(u, index) in uiData.components" :key="index">
    <HdCard v-if="u.name === 'card'" :config="u"></HdCard>
    <!-- <HdShoplist v-if="u.name === 'shoplist'" :config="u"></HdShoplist> -->
  </view>
</template>

<script setup lang="ts">
import HdCard from '@/components/hdui/HdCard.vue'
import HdShoplist from '@/components/hdui/HdShoplist.vue'
import { UIOption } from '@/types'
const uiData = ref<UIOption>({} as UIOption)

useScroll(onPageScroll).onLoad(page => {
  app.info('页面加载', `第${page.num}页`)
  app
    .request({
      url: 'a/api/?s=/miniapp/diy/index_page&op=get',
      data: {
        uniacid: 1904190010,
        uid: 1032736,
        appid: 'wx85682b7599304939',
        openid: 'oxMXr4scYh1amK_IOZ0748B4ExoI',
        unionid: 'o9w2I1IlMPkelWtQa5Px7Uc6lbso',
        vip_timestamp: '1654052425711',
        _sign: '330f4dd490fff8e5632435e946a32c43',
        shop_id: 4,
        groupid: 1904190040,
      },
    })
    .then(res => {
      console.log(JSON.parse(res.data.page_json))
      uiData.value = JSON.parse(res.data.page_json)
    })
  setTimeout(() => page.endSuccess(1, false), 1000)
})
</script>

<style lang="scss" scoped>
.icon {
  background-image: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
}
</style>
