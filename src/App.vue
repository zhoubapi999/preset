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
page {
  background: #fff;
  font-family: -apple-system-font, 'Helvetica Neue', sans-serif;
  color: #333;

  --mall: #54ccbf;

  /* 商城自定义颜色 */
  --v_nav_bg: #f5f5f5;
  --v_nav_active_bg: #fff;
  --active_color: #54ccbf;

  --light-bg: #f5f5f5;
  --light-color: #999;
  /* 字体颜色 */
  --light-border: #ddd;
  --success-color: #09bb07;
  --theme-color: #1aad19;
  --price-color: #ff4f3f;
}
</style>
