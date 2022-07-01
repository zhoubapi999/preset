<script lang="ts" setup>
const prop = withDefaults(
  defineProps<{ type?: 'cz' | 'kaika'; showBtnClone?: boolean; couponData: any }>(),
  {
    type: 'cz',
    showBtnClone: false,
    couponData: {},
  },
)

const bgLeft = computed(() => {
  return `radial-gradient(circle at right top, transparent 14rpx, ${prop.couponData.color} 0) right top, radial-gradient(circle at right bottom, transparent 14rpx, ${prop.couponData.color} 0) right bottom`
})
const bgRight = computed(() => {
  return `radial-gradient(circle at left top, transparent 14rpx, ${prop.couponData.color} 0) left top, radial-gradient(circle at left bottom, transparent 14rpx, ${prop.couponData.color} 0) left bottom`
})
</script>

<template>
  <div class="coupon-body">
    <div class="coupon-left" :style="{ background: bgLeft }">
      <div>
        {{ type == 'cz' ? '充值即送' : '开卡即送' }}
      </div>
    </div>
    <div class="coupon-right" :style="{ background: bgRight }">
      <div class="coupon-laws">
        {{
          couponData.types == 'cika' || couponData.type == 'cika'
            ? couponData.title
            : couponData.laws || couponData.law
        }}
      </div>
      <div class="coupon-expire">可用次数：{{ couponData.times }}</div>
      <div class="coupon-expire">{{ couponData.valid_time }}</div>
      <div v-if="showBtnClone" class="btn" :style="{ color: couponData.color }">免费领取</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.coupon-body {
  display: flex;
  align-items: stretch;
  border-radius: 10rpx;
  overflow: hidden;
}
.coupon-left {
  background-size: 100% 55% !important;
  background-repeat: no-repeat !important;
  padding: 10rpx;
  color: #fff;
  text-align: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200rpx;
  &::after {
    content: '';
    display: block;
    top: 20rpx;
    bottom: 20rpx;
    position: absolute;
    right: -2rpx;
    z-index: 10;
    border-right: 4rpx #fff dashed;
  }
}
.coupon-right {
  flex: 1;
  padding: 20rpx;
  background-size: 100% 55% !important;
  background-repeat: no-repeat !important;
  color: #fff;
  padding-left: 50rpx;
}
.coupon-name {
  font-size: 40rpx;
}
.coupon-desc {
  font-size: 26rpx;
}
.btn {
  display: inline-block;
  border-radius: 100rpx;
  background: #fff;
  padding: 6rpx 40rpx;
  font-size: 28rpx;
}
.coupon-expire {
  font-size: 24rpx;
  margin: 10rpx 0;
}
.coupon-laws {
  font-size: 36rpx;
}
</style>
