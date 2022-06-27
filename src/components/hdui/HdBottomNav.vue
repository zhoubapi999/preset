<script lang="ts" setup>
const props = defineProps({
  config: { type: Object, required: true },
})

const { allData } = $(app.User)

const style = computed(() => {
  const { style } = props.config
  return {
    color: style.color,
    marginLeft: `${style.mgL || 0}px`,
    marginRight: `${style.mgR || 0}px`,
    paddingLeft: `${style.pdL || 0}px`,
    paddingRight: `${style.pdR || 0}px`,
    paddingTop: `${style.pdT || 0}px`,
    paddingBottom: `${style.pdB || 0}px`,
    borderRadius: `${style.radius}px`,
    fontSize: `${style.fontSize}px`,
    background: style.bg,
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
  <div class="bottom-nav-container" :style="style">
    <div
      v-for="(item, index) in config.items"
      :key="index"
      class="item"
      :style="{ color: config.style.color }"
      @click="action(item)"
    >
      <div
        class="nav-item-icon"
        :class="item.class"
        :style="{
          height: config.style.iconSize + 'px',
          width: config.style.iconSize + 'px',
          backgroundImage: 'url(' + item.icon + ')',
        }"
      ></div>
      <div class="nav-item-label">{{ item.title }}</div>
      <button
        v-if="item.action.url == 'kefu'"
        catchtap
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
        v-if="
          (item.action.url == 'vipInfo' ||
            item.action.url == '/vip_card/main/index/opencard/personal') &&
          !allData.my_card_info.card_num
        "
        catchtap
        form-type="submit"
        bindtap="onGotUserInfo"
        class="contacButtonv2"
      ></button>
      <button
        v-if="item.action.url == 'share'"
        catchtap
        open-type="share"
        class="contacButtonv2"
      ></button>
    </div>
    <div class="nav-split" :style="{ background: config.style.color }"></div>
  </div>
</template>

<style lang="scss" scoped>
.bottom-nav-container {
  display: flex;
  justify-content: space-around;
  position: relative;

  .nav-split {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    height: 1px;
    transform: translateY(0.3);
    opacity: 0.1;
  }
  .nav-item-icon {
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    position: relative;
    &:before {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 1em;
      height: 1em;
    }
  }
  .nav-item-label {
    margin-top: 0.2em;
  }
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    position: relative;
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
