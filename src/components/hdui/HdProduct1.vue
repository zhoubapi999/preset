<script lang="ts" setup>
// 品牌商品组件
import { ConfigOption } from '@/types'
import { PropType } from 'vue'
const props = defineProps({
  config: { type: Object as PropType<ConfigOption>, required: true },
  pagedata: { type: Object, required: true },
})

const idx = ref(0)
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

function action(item) {
  console.log(item)
}

function selectCate(index) {
  idx.value = index
  loadList()
}

function loadList() {
  let { cates } = props.config
  return app
    .request({
      url: 'a/api/?s=/miniapp/diy/by_goods_id_get_goods',
      data: {
        goods_ids: JSON.stringify(cates[idx.value]?.products),
      },
    })
    .then(res => {
      products.value = res.data
    })
}

loadList()
</script>

<template>
  <div v-if="config.cates.length" class="hdproduct-container" :style="style">
    <div class="cate-product-header">
      <div class="cates">
        <div
          v-for="(item, index) in config.cates"
          :key="index"
          :class="'cate ' + (index === idx ? 'active' : '')"
          @tap="selectCate(index)"
        >
          <div class="cate-name">{{ item.name }}</div>
        </div>
      </div>
    </div>
    <div
      class="product-plus-body"
      :style="
        'row-gap:' +
        config.style.itemMgTB * 2 +
        'rpx; column-gap:' +
        config.style.itemMgLR * 2 +
        'rpx; font-size: ' +
        (config.style.itemFontSize || 16) * 2 +
        'rpx;'
      "
    >
      <div
        v-for="(item, index) in products"
        :key="index"
        class="product-plus-item"
        :style="contentStyle"
        :data-item="item"
        @tap="action"
      >
        <div class="product-plus-icon" :style="'background-image:url(' + item.image + ');'"></div>

        <div class="product-plus-info">
          <div class="product-plus-title">{{ item.store_name }}</div>
          <div class="prices">
            <div class="product-plus-price">{{ item.price }}</div>
            <div v-if="config.showSubPrice" class="product-plus-ot-price">
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
.cate-product-header {
  align-items: center;
  display: flex;
  .cates {
    flex: 1;
    display: flex;
    align-items: center;
    overflow-y: overlay;
    font-size: 30rpx;
  }
  .cate {
    white-space: nowrap;
    cursor: pointer;
    height: 1em;
    padding: 16rpx 0;
    outline: none;
    position: relative;
    line-height: 1em;
    box-sizing: content-box;
    &:not(:last-child) {
      margin-right: 30rpx;
    }
    &.active {
      &:after {
        content: '';
        height: 6rpx;
        background: v-bind('props.pagedata.headerBg');
        position: absolute;
        width: 1.3em;
        left: 0;
        right: 0;
        margin: auto;
        bottom: 0;
        display: block;
        border-radius: 4rpx;
      }
    }
  }
}
.product-plus-body {
  padding: 20rpx 0;
  min-height: 260rpx;
  position: relative;
  display: grid;
  column-gap: 20rpx;
  row-gap: 20rpx;
  grid-template-columns: 1fr 1fr;
  &:empty {
    &:before {
      position: absolute;
      content: '未设置推荐商品';
      font-size: 30rpx;
      opacity: 0.4;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      white-space: nowrap;
    }
  }
  &.loading {
    &:after {
      content: '';
    }
  }
}
.product-plus-item {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  .product-plus-info {
    padding: 0.5em;
    width: 100%;
    box-sizing: border-box;
  }
  .product-plus-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 10rpx;
  }
  .product-plus-icon {
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
  .product-plus-price {
    color: red;
    position: relative;
    font-size: 0.9em;
    left: -0.15em;
  }
  .product-plus-ot-price {
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
.product-plus-item .product-plus-price:before,
.product-plus-item .product-plus-ot-price:before {
  content: '￥';
  display: inline-block;
  transform: scale(0.9);
}
</style>
