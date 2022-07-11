<script lang="ts" setup>
import { ConfigOption } from '@/types'
import { PropType } from 'vue'
const props = defineProps({
  config: { type: Object as PropType<ConfigOption>, required: true },
})

const products = ref([])
const style = computed(() => {
  const { style } = props.config
  return {
    marginLeft: `${style.mgL * 2 || 0}rpx`,
    marginRight: `${style.mgR * 2 || 0}rpx`,
    marginTop: `${style.mgT * 2 || 0}rpx`,
    marginBottom: `${style.mgB * 2 || 0}rpx`,
    paddingLeft: `${style.pdL * 2 || 0}rpx`,
    paddingRight: `${style.pdR * 2 || 0}rpx`,
    paddingTop: `${style.pdT * 2 || 0}rpx`,
    paddingBottom: `${style.pdB * 2 || 0}rpx`,
    background: style.bg,
    color: style.color,
    borderRadius: `${style.radius * 2}rpx`,
    boxShadow:
      style.shadow && style.shadow.radius && style.shadow.color
        ? `${style.shadow.x * 2}rpx ${style.shadow.y * 2}rpx ${style.shadow.radius * 2}rpx ${
            style.shadow.color
          }`
        : '',
  }
})

const contentStyle = computed(() => {
  const { style } = props.config
  return {
    margin: `${style.itemMg * 2}rpx 0`,
    width: style.itemWidth,
    fontSize: `${style.itemFontSize * 2}rpx`,
    padding: `${style.itemMgTB * 2}rpx ${style.itemMgLR * 2}rpx`,

    textAlign: style.itemAlign,
    backgroundColor: style.itemBg,
    borderRadius: `${style.itemRadius * 2}rpx`,
    boxShadow: `${style.itemShadow.x * 2 || 0}rpx ${style.itemShadow.y * 2 || 0}rpx ${
      style.itemShadow.radius * 2
    }rpx ${style.itemShadow.color}`,
  }
})

function loadList() {
  return app
    .request({
      url: 'addons/vip_card/a/api/?s=/miniapp/diy/goods_list',
      data: {
        scene: props.config.type,
      },
    })
    .then(res => {
      products.value = res.data
    })
}

loadList()
</script>

<template>
  <div v-if="products.length" class="hdproduct-container" :style="style">
    <div v-if="config.title" class="block-header">
      <div class="block-title">{{ config.title }}</div>
      <div class="block-sub-title">{{ config.subTitle }}</div>
    </div>
    <div
      class="product-body"
      :style="{
        rowGap: config.style.itemMgTB * 2 + 'rpx',
        columnGap: config.style.itemMgLR * 2 + 'rpx',
        fontSize: (config.style.itemFontSize || 16) * 2 + 'rpx',
      }"
    >
      <div
        v-for="(item, index) in products"
        :key="index"
        class="product-item"
        :style="contentStyle"
        bindtap="action"
        data-item="{{item}}"
      >
        <div class="product-icon" :style="{ backgroundImage: 'url(' + item.image + ')' }"></div>
        <div class="product-info">
          <div class="product-title">{{ item.store_name }}</div>
          <div class="prices">
            <div class="product-price">{{ item.price }}</div>
            <div v-if="config.showSubPrice" class="product-ot-price">
              {{ item.ot_price }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/uiblock.scss';
.hdproduct-container {
  .product-body {
    min-height: 260rpx;
    position: relative;
    display: grid;
    column-gap: 20rpx;
    row-gap: 20rpx;
    grid-template-columns: 1fr 1fr;
  }
  .product-sub-title {
    margin-top: 0.5em;
  }
}
.product-item {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  .product-info {
    padding: 0.5em;
    width: 100%;
    box-sizing: border-box;
  }
  .product-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 10rpx;
  }
  .product-icon {
    padding: 50%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .prices {
    line-height: 1.1em;
    margin-bottom: 0.2em;
    div {
      display: inline-block;
      vertical-align: bottom;
    }
  }
  .product-price {
    color: red;
    position: relative;
    font-size: 0.9em;
    left: -0.15em;
  }
  .product-ot-price {
    font-size: 0.75em;
    color: #aaa;
    text-decoration: line-through;
    margin-left: 0.5em;
    flex: 1;
    &:before {
      text-decoration: line-through;
      transform: scale(0.9);
    }
  }
}
.product-item .product-price:before,
.product-item .product-ot-price:before {
  content: '￥';
  display: inline-block;
  transform: scale(0.9);
}
</style>
