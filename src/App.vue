<script setup lang="ts">
onLaunch(() => {})
onShow(() => {
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
