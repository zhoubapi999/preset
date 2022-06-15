<template>
  <meta title="主页" title:微信="微信端主页" navigationStyle="custom" />
  <view v-for="(u, index) in uiData.components" :key="index">
    <HdCard v-if="u.name === 'card'" :config="u"></HdCard>
    <HdShoplist v-if="u.name === 'shoplist'" :config="u"></HdShoplist>
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
      data: {},
    })
    .then(res => {
      uiData.value = JSON.parse(res.data.page_json)
    })
  setTimeout(() => page.endSuccess(1, false), 1000)
})
</script>

<style lang="scss" scoped></style>
