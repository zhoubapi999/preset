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
    marginLeft: `${style.mgL || 0}px`,
    marginRight: `${style.mgR || 0}px`,
    marginTop: `${style.mgT || 0}px`,
    marginBottom: `${style.mgB || 0}px`,
    paddingLeft: `${style.pdL || 0}px`,
    paddingRight: `${style.pdR || 0}px`,
    paddingTop: `${style.pdT || 0}px`,
    paddingBottom: `${style.pdB || 0}px`,
    background: style.bg,
    color: style.color,
    fontSize: `${style.fontSize}px`,
    borderRadius: `${style.radius}px`,
    boxShadow: style.shadow
      ? `${style.shadow.x}px ${style.shadow.y}px ${style.shadow.radius}px ${style.shadow.color}`
      : '',
  }
})

function action(item) {
  console.log(toRaw(item))
}
</script>

<template>
  <div class="notice-container" :style="style">
    <uni-icons type="sound" size="24" :color="config.style.iconColor"></uni-icons>
    <div class="notice-content" style="overflow: hidden" @click="action(config)">
      {{ allData.shop_info.user_announcement }}
      <button
        v-if="config.items[0].action.url == 'kefu'"
        catchtap
        open-type="contact"
        form-type="submit"
        :session-from="{
          nickName: allData.my_card_info.nickname,
          avatarUrl: allData.my_card_info.header_url,
          shop_id: allData.shop_info.id,
        }"
      ></button>
      <button
        v-if="
          (config.items[0].action.url == 'vipInfo' ||
            config.items[0].action.url == '/vip_card/main/index/opencard/personal') &&
          !allData.my_card_info.card_num
        "
        catchtap
        form-type="submit"
        bindtap="onGotUserInfo"
      ></button>
      <button v-if="config.items[0].action.url == 'share'" catchtap open-type="share"></button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.notice-container {
  display: flex;
  align-items: center;
  .notice-content {
    position: relative;
    height: 1.8em;
    line-height: 1.8em;
    flex: 1;
    margin-left: 0.6em;
    button {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0;
    }
  }
}
</style>
