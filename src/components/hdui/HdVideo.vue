<script lang="ts" setup>
import { ConfigOption } from '@/types'
import { PropType } from 'vue'
const props = defineProps({
  config: { type: Object as PropType<ConfigOption>, required: true },
})

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
</script>

<template>
  <view class="hdvideo-container" :style="style">
    <view v-if="config.title" class="block-header">
      <view class="block-title">{{ config.title }}</view>
      <view class="block-sub-title">{{ config.subTitle }}</view>
    </view>
    <video
      id="hdVideo"
      :src="config.video"
      object-fit="cover"
      :autoplay="config.autoplay"
      :muted="config.muted"
      controls
    ></video>
  </view>
</template>

<style lang="scss" scoped>
@import '@/styles/uiblock.scss';
.hdvideo-container video {
  width: 100%;
  display: block;
}
.hdvideo-container {
  position: relative;
}
</style>
