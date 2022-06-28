<script lang="ts" setup>
import { ConfigOption } from '@/types'
import { PropType } from 'vue'
const props = defineProps({
  config: { type: Object as PropType<ConfigOption>, required: true },
})

const { shopInfo: shop } = $(app.User)
const { shopList } = $(app.Shop)

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
    boxShadow:
      style.shadow && style.shadow.radius && style.shadow.color
        ? `${style.shadow.x}px ${style.shadow.y}px ${style.shadow.radius}px ${style.shadow.color}`
        : '',
  }
})

const iconStyle = computed(() => {
  return function (url: string) {
    const { style } = props.config
    const width = `${style.iconSize || 50}px`
    return {
      backgroundImage: 'url(' + url + ')',
      height: width,
      width: width,
      minWidth: width,
    }
  }
})
</script>

<template>
  <div class="hdshop-container" :class="config.style.itemDir" :style="style">
    <div v-if="config.title && config.shopType == 'near'" class="block-header">
      <div class="block-title">{{ config.title }}</div>
      <div class="block-sub-title">{{ config.subTitle }}</div>
    </div>
    <div class="shop-list-body">
      <!-- 附近门店 -->
      <div v-if="config.shopType == 'near'">
        <div
          v-for="(item, index) in shopList"
          :key="index"
          class="shop-item"
          :style="{
            margin: config.style.itemMg + 'px 0',
            padding: config.style.itemMg + 'px 0',
            width: config.style.itemWidth + 'px',
          }"
        >
          <div class="shop-icon" :style="iconStyle(item.pic_url)"></div>
          <div class="shop-info">
            <div class="shop-title">{{ item.name }}</div>
            <div v-if="item.address && !config.hideAddress" class="shop-sub-title">
              {{ item.address }}
            </div>
          </div>
          <div v-if="shop.id == item.id" class="i-ic-round-star"></div>
          <div class="icon i-ic-round-arrow-forward-ios"></div>
        </div>
      </div>
      <!-- 当前门店 -->
      <div
        v-if="config.shopType != 'near'"
        class="shop-item"
        bindtap="goShop"
        :style="{
          margin: config.style.itemMg + 'px 0',
          padding: config.style.itemMg + 'px 0',
          width: config.style.itemWidth + 'px',
        }"
      >
        <div class="shop-icon" :style="iconStyle(shop.pic_url)"></div>
        <div class="shop-info">
          <div class="shop-title">{{ shop.name }}</div>
          <div v-if="shop.address && !config.hideAddress" class="shop-sub-title">
            {{ shop.address }}
          </div>
        </div>
        <div class="icon i-ic-round-arrow-forward-ios"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/uiblock.scss';
.hdshop-container {
  .shop-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 !important;

    &:not(:last-child) {
      border-bottom: 1px solid rgba(125, 125, 125, 0.5);
    }

    background-size: 14px;
    background-repeat: no-repeat;
    background-position: right center;
    .shop-icon {
      margin-right: 12px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
    }
    .shop-info {
      flex: 1;
      padding-right: 80rpx;
      .shop-sub-title {
        margin-top: 0.3em;
        font-size: 0.7em;
        color: #aaa;
      }
    }
  }

  .icon {
    margin-left: auto;
    color: #999;
  }
}

.i-ic-round-star {
  color: #fcbe40;
  font-size: 50rpx;
  margin: 0 10rpx;
}
</style>
