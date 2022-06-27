<script lang="ts" setup>
const props = defineProps({
  config: { type: Object, required: true },
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

const itemStyle = computed(() => {
  const { style } = props.config
  return {
    padding: `${2 * style.itemMg}rpx 0`,
    minWidth: style.itemWidth,
    outlineColor: style.borderColor,
    fontSize: `${2 * style.itemFontSize}rpx`,
  }
})

const iconStyle = computed(() => {
  return function (url: string) {
    const { style } = props.config
    return {
      backgroundImage: 'url(' + url + ')',
      width: `${2 * style.iconSize}rpx`,
      height: `${2 * style.iconSize}rpx`,
    }
  }
})
</script>

<template>
  <div
    class="hdcube-container"
    :class="[config.style.itemDir, config.style.itemWidth == '100%' ? 'oneline' : '']"
    :style="style"
  >
    <div v-if="config.title" class="block-header">
      <div class="block-title">{{ config.title }}</div>
      <div class="block-sub-title">{{ config.subTitle }}</div>
    </div>
    <div class="cube-body">
      <div
        v-for="val in config.items"
        :key="val.id"
        class="cube-item"
        :class="{ showborder: config.style.borderColor }"
        bindtap="action"
        :style="itemStyle"
      >
        <div v-if="!config.style.hideIcon" class="cube-icon" :style="iconStyle(val.icon)"></div>
        <div class="cube-info">
          <div class="cube-title">{{ val.title }}</div>
          <div v-if="config.showSubTitle" class="cube-sub-title">{{ val.subTitle }}</div>
        </div>
        <div class="split" style="background:{{config.style.color}}"></div>
        <button
          v-if="val.action.url == 'kefu'"
          catchtap
          open-type="contact"
          form-type="submit"
          :session-from="{
            nickName: allData.my_card_info.nickname,
            avatarUrl: allData.my_card_info.header_url,
            shop_id: allData.shop_info.id,
          }"
          class="contacButtonv2"
        ></button>

        <button
          v-if="
            (val.action.url == 'vipInfo' ||
              val.action.url == '/vip_card/main/index/opencard/personal') &&
            !allData.my_card_info.card_num
          "
          catchtap
          form-type="submit"
          bindtap="onGotUserInfo"
          class="contacButtonv2"
        ></button>
        <button
          v-if="val.action.url == 'share'"
          catchtap
          open-type="share"
          class="contacButtonv2"
        ></button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/uiblock.scss';
.hdcube-container {
  .cube-body {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  &.row {
    .cube-item {
      flex-direction: row;
      align-items: center;
      position: relative;
      margin-top: 0 !important;
    }
    &.oneline {
      .cube-item {
        &:not(:last-child) {
          .split {
            display: block;
          }
        }
        &:before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          margin: auto;
          height: 14px;
          width: 14px;
          opacity: 0.5;
          background: url(data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjUxMiIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48dGl0bGU+PC90aXRsZT48ZyBpZD0iaWNvbW9vbi1pZ25vcmUiPjwvZz48cGF0aCBmaWxsPSIjZGRkIiBkPSJNMTAyLjQgMGwyMjEuOTQgMjU2LTIyMS45NCAyNTZoODUuMjdsMjIxLjkzLTI1Ni0yMjEuOTc1LTI1NnoiPjwvcGF0aD48L3N2Zz4=);
          background-size: 100% 100%;
        }
      }
    }
    .cube-icon {
      margin-right: 12px;
    }
    .cube-sub-title {
      margin-top: 0.3em;
    }
  }
  &.column {
    .cube-item {
      flex-direction: column;
      text-align: center;
      align-items: center;
      flex: 1;
      flex-wrap: wrap;
      box-sizing: border-box;
      &:before {
        display: none;
      }
    }
    .cube-icon {
      margin-bottom: 8px;
    }
    .cube-sub-title {
      margin-top: 0.3em;
    }
  }
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
.split {
  position: absolute;
  height: 2rpx;
  left: 0;
  right: 0;
  bottom: 0;
  transform: scaleY(0.3);
  display: none;
  opacity: 0.2;
}
.cube-item {
  display: flex;
  position: relative;
  &.showborder {
    border: 1px solid #eaeaea;
    margin-left: -1px;
    margin-top: -1px;
  }
}
.cube-icon {
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
.cube-sub-title {
  font-size: 12px;
  color: #aaa;
}
</style>
