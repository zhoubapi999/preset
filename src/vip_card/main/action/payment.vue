<script setup lang="ts">
let popup = $ref(null)
let payData = $ref(
  {} as {
    total_fee: number
    remarks: string
    balance: number | string
  },
)
let currentOrderCoupon = $ref([])
let couponSelect = $ref({} as any)
let { shopInfo, userInfo } = $(app.User)
let balance_text_v = userInfo.custom_fields?.balance_text || '余额'

onLoad(async opt => {})

// 获取可用优惠券
function getCoupon() {
  let { total_fee } = payData
  return app
    .request({
      url: '/addons/vip_card/a/api/index.php?s=/miniapp/coupon/get_this_order_able_use_coupon',
      data: {
        total_fee,
        order_id: null,
        combination_id: null, //套餐id
        table_order_id: null,
      },
    })
    .then(res => {
      currentOrderCoupon = res.data
    })
}

// 获取预支付信息
function getPrePayInfo() {
  let { total_fee } = payData
  return app
    .request({
      url: '/addons/vip_card/a/api/index.php?s=/miniapp/pay/get_member_prepay_info',
      data: {
        total_fee,
        source_coupon_id: null,
        uc_verification_num: couponSelect?.uc_verification_num,
        order_id: null,
        combination_id: null, //套餐id
        table_id: null,
        table_order_id: null,
        level_id: null,
      },
    })
    .then(res => {
      var data = res.data
      var payTypes = []
      var typeAndNames = {
        balance: {
          paytypeName: 'balance',
          paytypeText: balance_text_v + '支付',
        },
        wechat: {
          paytypeName: 'wechat',
          paytypeText: '微信支付',
        },
        balance_and_wechat: {
          paytypeName: 'balance_and_wechat',
          paytypeText: balance_text_v + ' + 微信',
        },
      }
      var keys = Object.keys(typeAndNames)
      Object.keys(data).forEach(k => {
        if (keys.indexOf(k) > -1) {
          let v = data[k]
          v = {
            ...v,
            ...typeAndNames[k],
            coupon_discount: data.coupon_discount,
          }
          payTypes.push(v)
        }
      })
      payData.balance = data.user_balance

      var currentPaytype
      console.log(payTypes)
      currentPaytype = payTypes[0]
      popup.open('bottom')

      //如果是非会员且没有优惠券且没有开启非会员折扣直接进入支付
      // if (
      //   payTypes.length == 1 &&
      //   app.globalData.uid > 0 &&
      //   !app.config_data.card_num &&
      //   this.data.currentOrderCoupon.length === 0 &&
      //   !this.data.nonMemberData.do_main
      // ) {
      //   console.log('===============')
      //   this.setData({
      //     payData: payData,
      //     payTypes: payTypes,
      //     currentPaytype: currentPaytype,
      //     disablePay: true,
      //     oil_litre: data.oil_litre, // 油
      //   })
      //   this.doPay(1)
      // } else {
      //   this.setData({
      //     oil_litre: data.oil_litre, // 油
      //     showPayDialog: true,
      //     payData: payData,
      //     payTypes: payTypes,
      //     currentPaytype: currentPaytype,
      //     disablePay: false,
      //   })
      // }

      // // 余额支付 不支持线上充值
      // if (data.able_recharge == 'no') {
      //   this.hidePayDialog()
      //   wx.showModal({
      //     title: '温馨提示',
      //     content: '尊敬的VIP会员，您的会员卡余额已不足，请联系商家充值，感谢您的惠顾～',
      //     showCancel: false,
      //   })
      // }

      // // 余额支付 支持线上充值，不支持微信充值
      // if (data.able_recharge == 'yes') {
      //   wx.showModal({
      //     title: '温馨提示',
      //     content: '尊敬的VIP会员，您的会员卡余额已不足，请线上充值后支付～',
      //     showCancel: false,
      //     confirmText: '去充值',
      //     success: e => {
      //       //充值
      //       wx.redirectTo({
      //         url: '/vip_card/pages/action/pay',
      //       })
      //     },
      //   })
      // }
    })
}

function getPayInfo() {
  getCoupon()
  getPrePayInfo()
}
</script>

<template>
  <div class="pb-120">
    <div class="flex-center-col p-40 bg-light-400">
      <image class="w-120 h-120 mb-12" :src="shopInfo.pic_url" />
      <div>{{ shopInfo.name }}</div>
    </div>
    <div class="p-30">
      <div class="py-20 mb-20 b-0 b-b b-#f2f2f2">
        <input
          v-model="payData.total_fee"
          type="digit"
          class="input placeholder-#ddd text-60"
          maxlength="8"
          placeholder="请输入金额"
        />
      </div>
      <textarea
        v-model="payData.remarks"
        placeholder="备注"
        class="placeholder-#ddd w-full"
        auto-height
        maxlength="100"
      ></textarea>
      <button
        class="mt-100 bg-#48bd47 text-white flex-center"
        :disabled="!payData.total_fee"
        @click="getPayInfo"
      >
        {{ '立即支付' }}
      </button>
    </div>
  </div>

  <uni-popup ref="popup" background-color="#fff">
    <view class="p-20">
      <view class="flex-center">123</view>
    </view>
  </uni-popup>
  <!-- <div class="fixed-bottom flex">
    <HdOldBottomNav></HdOldBottomNav>
  </div> -->
</template>

<style lang="scss">
.input {
  position: relative;
  padding-left: 120rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  &::before {
    content: '￥';
    position: absolute;
    left: 0;
  }
}
uni-button[disabled][type='default'],
uni-button[disabled]:not([type]) {
  background-color: #48bd47;
  opacity: 0.8;
}
</style>
