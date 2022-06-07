<script lang="ts" setup name="HdShoplist">
const props = defineProps({
  config: { type: Object, required: true },
})

const shopList = computed(() => {
  const { shopType, items } = props.config
  if (shopType == 'near') {
    return items.slice(0, 5)
  } else if (items.length > 0) {
    return [items[0]]
  }

  return []
})

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
</script>

<template>
  <div class="hdshop-container" :style="style">
    <div v-if="config.title && config.shopType == 'near'" class="block-header">
      <div class="block-title">{{ config.title }}</div>
      <div class="block-sub-title">{{ config.subTitle }}</div>
    </div>
    <div class="shop-list-body">
      <div
        v-for="(it, i) in shopList"
        :key="i"
        class="shop-item"
        :style="{
          margin: `${config.style.itemMg}px 0`,
          padding: `${config.style.itemMg}px 0`,
          fontSize: config.style.itemFontSize + 'px',
        }"
      >
        <div
          class="shop-icon"
          :style="{
            backgroundImage: 'url(' + it.pic_url + ')',
            height: `${config.style.iconSize || 50}px`,
            width: `${config.style.iconSize || 50}px`,
            minWidth: `${config.style.iconSize || 50}px`,
          }"
        ></div>
        <div class="shop-info">
          <div class="shop-title">{{ it.name }}</div>
          <div v-if="!config.hideAddress" class="shop-sub-title">{{ it.address }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hdshop-container {
  .shop-item {
    flex-direction: row;
    align-items: center;
    margin: 0 !important;

    &:not(:last-child) {
      border-bottom: 1px solid rgba(125, 125, 125, 0.5);
    }

    background-image: url(../../../../assets/images/arrow-left.svg);
    background-size: 14px;
    background-repeat: no-repeat;
    background-position: right center;
  }

  .shop-icon {
    margin-right: 12px;
  }
  .shop-sub-title {
    margin-top: 0.3em;
  }

  .shop-item {
    display: flex;

    .shop-icon {
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
    }
    .shop-sub-title {
      font-size: 0.7em;
      color: #aaa;
    }
  }
}

.block-header {
  margin-bottom: 10px;
  display: flex;
  line-height: 1em;
  padding-bottom: 10px;
  position: relative;
  cursor: move;
  &:after {
    content: '';
    display: block;
    background: #ccc;
    height: 1px;
    bottom: 0;
    right: 0;
    left: 0;
    transform: scaleY(0.5);
    position: absolute;
  }

  .block-title {
    font-size: 16px;
    margin-right: 0.6em;
  }
  .block-sub-title {
    font-size: 12px;
    opacity: 0.5;
  }
}
</style>
