<script lang="ts" setup>
const tabBar = ref({
  list: [
    {
      name: '快速买单',
      pagePath: '../action/payment?is_index_path=' + true,
      icon: 'i-ic-sharp-paid',
    },
    {
      name: '会员中心',
      pagePath: '',
      icon: 'i-ic-round-perm-identity',
      select: true,
    },
  ],
})
</script>

<template>
  <div class="main-nav">
    <navigator
      v-for="(item, index) in tabBar.list"
      :key="index"
      class="main-nav-item"
      :class="{ active: item.select }"
      open-type="redirect"
    >
      <div class="nav-item-icon" :class="item.icon"></div>
      <div class="nav-item-name">{{ item.name }}</div>
    </navigator>
  </div>
</template>

<style lang="scss" scoped>
.main-nav {
  display: flex;
  align-items: center;
  width: 100%;
  background: #fff;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    border-top: 1px solid var(--light-border);
    transform: scaleY(0.33);
  }
}
.main-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;

  flex: 1;
  padding: 5px;
  &.active {
    color: #ff6600;
  }
}
.nav-item-icon {
  font-size: 24px;
}
.nav-item-name {
  font-size: 10px;
  margin-top: 3px;
}
.fix_nav_wp {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 10;
}
</style>
