<template>
  <meta title="主页" title:微信="微信端主页" navigationStyle="custom" />
  <HdCard :config="config"></HdCard>
</template>

<script setup lang="ts">
import HdCard from '@/components/hdui/HdCard.vue'
// 可以用ref语法糖解构store
const { name } = $(app.User)
const config = ref({
  name: 'card',
  alias: '卡面组件',
  isBlock: true,
  showUsername: true,
  showPhone: true,
  showPortrait: true,
  btnText: '领取会员卡',
  style: {
    color: '#fff',
    btnColor: '#000',
    btnBg: '',
    btnFontSize: 20,
    zIndex: 0,
    mgT: 0,
    mgB: 0,
    mgL: 0,
    mgR: 0,
    pdT: 15,
    pdB: 15,
    pdL: 15,
    pdR: 15,
    bgImg:
      'https://vipcard-1252869181.cos.ap-guangzhou.myqcloud.com/2020/11/16/016afbe21f54e0e55d52d1e5be131109.png',
    radius: 4,
    noSize: 16,
    iconSize: 50,
    iconRadius: 25,
    noAlign: 'right',
    noCardNum: true,
    shadow: {
      x: 0,
      y: 0,
      radius: 0,
      color: 'transparent',
    },
    btnShadow: {
      x: 0,
      y: 0,
      radius: 0,
      color: 'transparent',
    },
  },
  hide: false,
})

function sayHi() {
  app
    .to('hi', { name })
    .then(({ text }) =>
      text
        ? uni.showToast({ title: '收到返回值: ' + text })
        : uni.showToast({ title: '未收到返回值', icon: 'none' }),
    )
    .catch(({ text }) => {
      uni.showToast({ title: '子页面抛出异常' + text, icon: 'none' })
    })
}

useScroll(onPageScroll).onLoad(page => {
  app.info('页面加载', `第${page.num}页`)
  setTimeout(() => page.endSuccess(1, false), 1000)
})
</script>

<style lang="scss" scoped>
.icon {
  background-image: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
}
</style>
