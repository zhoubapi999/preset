<script setup lang="ts">
onLaunch(() => {})
onShow(opt => {
  // 门店id
  if (opt.query.shop_id) {
    app.User.shopInfo.id = Number(opt.query.shop_id)
  }

  // 登录
  app.User.login()
})
</script>
<style lang="scss">
// #ifndef APP-NVUE
@import '@/styles/color-ui.css';
@import '@/styles/index.scss';
// #endif
</style>
