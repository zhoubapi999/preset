<script lang="ts" setup>
const props = defineProps({
  config: { type: Object, required: true },
})

const style = computed(() => {
  const { style, fit } = props.config
  return {
    height: fit == '2' ? undefined : `${style.height || 120}px`,
    marginLeft: `${style.mgL || 0}px`,
    marginRight: `${style.mgR || 0}px`,
    marginTop: `${style.mgT || 0}px`,
    marginBottom: `${style.mgB || 0}px`,
    paddingLeft: `${style.pdL || 0}px`,
    paddingRight: `${style.pdR || 0}px`,
    paddingTop: `${style.pdT || 0}px`,
    paddingBottom: `${style.pdB || 0}px`,
    background: style.bg,
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
  <div
    class="hdhdshop-container"
    :class="['fit' + config.fit]"
    style="display: flex; flex-direction: column"
    :style="style"
  >
    <div v-if="config.title" class="block-header">
      <div class="block-title">{{ config.title }}</div>
      <div class="block-sub-title">{{ config.subTitle }}</div>
    </div>
    <div
      class="swiper-wrapper"
      :style="{
        height: config.fit == '2' ? (config.ratio[1] * 100) / config.ratio[0] + 'vw' : 'auto',
      }"
    >
      <swiper
        class="swiper"
        :indicator-dots="config.items.length > 1"
        indicator-color="rgba(255, 255, 255, 0.2)"
        indicator-active-color="rgba(255, 255, 255, 0.8)"
        autoplay="true"
        interval="5000"
        duration="1000"
      >
        <swiper-item
          v-for="(item, index) in config.items"
          :key="index"
          :style="{
            backgroundImage: 'url(' + item.img + ')',
            borderRadius: config.style.radius,
            overflow: 'hidden',
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
            class="contacButtonv2"
          ></button>
          <button
            v-if="item.action.url == 'share' && item.action.type == 'action'"
            catchtap
            open-type="share"
          ></button>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/uiblock.scss';
swiper {
  overflow: hidden;
}
swiper-item {
  height: 100%;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  button {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    z-index: 100;
  }
}
.swiper-wrapper {
  position: relative;
}
.hdhdshop-container {
  &.fit2 {
    .swiper {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      height: auto;
    }
  }
  &:not(.fit2) {
    .swiper-wrapper {
      padding: 0 !important;
      flex: 1;
    }
    .swiper {
      height: 100%;
    }
  }
}
</style>
