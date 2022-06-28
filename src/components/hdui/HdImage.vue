<script lang="ts" setup>
import { ConfigOption } from '@/types'
import { PropType } from 'vue'
const props = defineProps({
  config: { type: Object as PropType<ConfigOption>, required: true },
})

const { allData } = $(app.User)
const style = computed(() => {
  const { style } = props.config
  return {
    color: style.color,
    background: style.bg,
    borderRadius: `${2 * style.radius}rpx`,
    marginLeft: `${2 * style.mgL || 0}rpx`,
    marginRight: `${2 * style.mgR || 0}rpx`,
    marginTop: `${2 * style.mgT || 0}rpx`,
    marginBottom: `${2 * style.mgB || 0}rpx`,
    paddingLeft: `${2 * style.pdL || 0}rpx`,
    paddingRight: `${2 * style.pdR || 0}rpx`,
    paddingTop: `${2 * style.pdT || 0}rpx`,
    paddingBottom: `${2 * style.pdB || 0}rpx`,
    boxShadow: style.shadow
      ? `${2 * style.shadow.x}rpx ${2 * style.shadow.y}rpx ${2 * style.shadow.radius}rpx ${
          style.shadow.color
        }`
      : '',
  }
})

function action(item) {
  console.log(toRaw(item))
}
</script>

<template>
  <div class="hdimage-container" :style="style">
    <div v-if="config.title" class="block-header">
      <div class="block-title">{{ config.title }}</div>
      <div class="block-sub-title">{{ config.subTitle }}</div>
    </div>
    <div class="image-body">
      <image :src="config.img" mode="widthFix"></image>
      <div
        v-for="(item, index) in config.items"
        :key="index"
        class="hotpoint-item"
        :style="{
          left: item.l,
          top: item.t,
          width: item.w,
          height: item.h,
        }"
        @click="action(item)"
      >
        <button
          v-if="item.action.url == 'kefu'"
          open-type="contact"
          form-type="submit"
          :session-from="{
            nickName: '{{allData.my_card_info.nickname}}',
            avatarUrl: '{{allData.my_card_info.header_url}}',
            shop_id: '{{allData.shop_info.id}}',
          }"
        ></button>
        <button
          v-if="
            (item.action.url == 'vipInfo' ||
              item.action.url == '/vip_card/main/index/opencard/personal') &&
            !allData.my_card_info.card_num
          "
          catchtap
          form-type="submit"
          bindtap="onGotUserInfo"
        ></button>
        <button v-if="item.action.url == 'share'" catchtap open-type="share"></button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/uiblock.scss';
.hdimage-container {
  position: relative;
  image {
    width: 100%;
  }
}

.hotpoint-item {
  position: absolute;
  background: red;
  z-index: 10;
  opacity: 0;
  button {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 0;
  }
}

.image-body {
  position: relative;
}
</style>
