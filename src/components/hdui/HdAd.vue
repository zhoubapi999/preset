<script lang="ts" setup>
const emit = defineEmits(['action'])
const { allData } = $(app.User)
let countDown = $ref(allData.advertisement.count_down || 10)

let show = $ref(
  allData.advertisement.is_start == 2 &&
    (uni.getStorageSync('adTime') != allData.advertisement.up_time ||
      allData.advertisement.open_type == 2) &&
    (allData.advertisement.pop_up_object != '2' ||
      (allData.advertisement.pop_up_object == '2' && !allData.my_card_info.card_num)),
)

watchEffect(() => {
  if (show === true) {
    if (allData.advertisement.open_type == 1) {
      uni.setStorageSync('adTime', allData.advertisement.up_time)
    } else {
      uni.removeStorageSync('adTime')
    }
  }
})

let interval = setInterval(() => {
  --countDown
  if (countDown == 0) {
    clearInterval(interval)
    show = false
  }
}, 1000)

function goUrl() {
  app.getUserProfile().then(userInfo => {
    // 非会员必须获取授权
    if (!userInfo && !allData.my_card_info.card_num) {
      return
    }
    show = false
    let { oldUrlMap } = app.Shop
    let action = oldUrlMap[allData.advertisement.url]
    if (allData.advertisement.web_url) {
      action = {
        type: 'http',
        url: allData.advertisement.web_url,
      }
    } else if (allData.advertisement.url) {
      action = {
        type: 'inner',
        url:
          (action || allData.advertisement.url) +
          '?wechatUserInfo=' +
          encodeURI(JSON.stringify(userInfo)),
      }
    } else if (this.properties.allData.advertisement.path) {
      action = {
        type: 'extre',
        url: allData.advertisement.path,
        appid: allData.advertisement.appid,
      }
    }
    emit('action', action)
  })
}
</script>

<template>
  <div v-if="show" class="ad-wraper">
    <button
      class="ad-body"
      :style="{ backgroundImage: 'url(' + allData.advertisement.bg_img + ')' }"
      @click="goUrl"
    >
      <div v-if="countDown !== 0" class="advertisement_count_down" @click="show = false">
        {{ countDown }} s 关闭
      </div>
      <div v-else class="advertisement_count_down" @tap="show = false">关闭</div>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.ad-wraper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
}
.ad-body {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.2);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
}
button {
  &::after {
    border: none;
  }
}
.icon-thin-close {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 80rpx);
  color: #fff;
  font-size: 60rpx;
}
.advertisement_count_down {
  position: absolute;
  top: 70px;
  left: 2px;
  z-index: 1;
  line-height: 1;
  font-size: 13px;
  padding: 5px 8px;
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
}
.ad-content {
  overflow: hidden;
  border-radius: 4px;
  image {
    display: block;
  }
}
</style>
