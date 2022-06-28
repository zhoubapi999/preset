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
    textAlign: style.align,
    marginLeft: `${2 * style.mgL || 0}rpx`,
    marginRight: `${2 * style.mgR || 0}rpx`,
    marginTop: `${2 * style.mgT || 0}rpx`,
    marginBottom: `${2 * style.mgB || 0}rpx`,
    paddingLeft: `${2 * style.pdL || 0}rpx`,
    paddingRight: `${2 * style.pdR || 0}rpx`,
    paddingTop: `${2 * style.pdT || 0}rpx`,
    paddingBottom: `${2 * style.pdB || 0}rpx`,
    borderRadius: `${2 * style.radius}rpx`,
    fontSize: `${2 * style.fontSize}rpx`,
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
  <div class="copyright-container" :style="style" @click="action">
    {{ allData.setting.user_agreement_title }}
  </div>
</template>

<style lang="scss" scoped></style>
