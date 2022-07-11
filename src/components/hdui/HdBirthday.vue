<script lang="ts" setup>
const { allData } = $(app.User)
let birthInfo = $ref({} as { coupon_img: string })
let show = $ref(false)
function getBirthdayInfo() {
  return app
    .request({
      url: 'addons/vip_card/a/api/?s=/miniapp/coupon/api_get_birthday_init_info',
      data: {},
    })
    .then(res => {
      if (res.data.is_send_birthday_notify === 'yes') {
        show = true
      }
      birthInfo = res.data
    })
}

function go() {
  show = false
  uni.navigateTo({
    url: '/vip_card/pages/coupon/my_coupon_list',
  })
}

getBirthdayInfo()
</script>

<template>
  <div v-if="show" class="birth-wraper" @click="show = false">
    <div class="birth-body">
      <div class="birth-title">
        {{ allData.my_card_info.realname || allData.my_card_info.nickname }} 祝你生日快乐
      </div>
      <div
        class="birth-content"
        :style="{ backgroundImage: 'url(' + birthInfo.coupon_img + ')' }"
        @click.stop="go"
      ></div>
      <div class="btn" @click.stop="go">查看生日礼物</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.birth-wraper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.birth-body {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -55%);
  border-radius: 18rpx;
  text-align: center;
  background: #fff;
}

.user_accumulative_point {
  position: absolute;
  bottom: 25%;
  left: 20px;
  right: 20px;
  text-align: center;
}

.birth-title {
  font-size: 1.1em;
  padding: 20rpx;
  border-bottom: 1px solid #eee;
  color: #62377c;
}

.btn {
  font-size: 1.1em;
  padding: 20rpx;
  border-top: 1px solid #eee;
  color: #3cc51f;
}

.count-down {
  position: absolute;
  top: 2px;
  right: 2px;
  z-index: 1;
  line-height: 1;
  font-size: 13px;
  padding: 5px 8px;
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  border-radius: 0 4px 0 0;
}

.birth-content {
  width: 90vw;
  height: 60vh;
  background-size: cover !important;
  background-position: center !important;
}
</style>
