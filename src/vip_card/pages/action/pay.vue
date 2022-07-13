<script setup lang="ts">
import { debounce } from 'lodash'
let firstRecharge = $ref(false)
let rechargeData = $ref({} as any)
let display = $ref('none' as 'none' | 'dialog' | 'block')
let couponList = $ref([])
let customCash = $ref()
let { shopInfo, userInfo } = $(app.User)
let selectItem = $ref({ id: 'other', cash: 0, give_cash: 0, give_coupon_list_id: [], point: 0 })

// 根据输入金额来获取对应的折扣、优惠券
function getCash() {
  if (!customCash || customCash == 0) return
  let { point_json } = rechargeData
  let item
  point_json.forEach(p => {
    if (Number(customCash) >= Number(p.cash)) {
      item = p
    }
  })
  selectItem = { ...item, cash: customCash, id: 'other' }
  getCoupons(customCash)
}

// 判断是否首充
function checkIsfirstRecharge() {
  return app
    .request({
      url: 'addons/vip_card/b/public/index.php?s=/miniapp/user/check_user_is_first_recharge',
      data: {},
    })
    .then(res => {
      let { is_first_recharge, newer_first_recharge_switch } = res.data
      firstRecharge = is_first_recharge === 'yes' && newer_first_recharge_switch === 'yes'
    })
}

// 获取充值规则
function getRechargeData() {
  return app
    .request({
      url: 'addons/vip_card/b/public/index.php?s=/miniapp/recharge/get_recharge_rule',
      data: {},
    })
    .then(res => {
      let { is_write, first_recharge_desc, content_pay } = res.data
      try {
        res.data.point_json = JSON.parse(res.data.point_json).sort((a, b) => a.cash - b.cash)
        if (firstRecharge) {
          res.data.point_json = res.data.point_json.filter(
            i => i.recharge_type === 'first_recharge',
          )
        } else {
          res.data.point_json = res.data.point_json.filter(
            i => i.recharge_type !== 'first_recharge',
          )
        }
        // 能否输入
        if (is_write != 2) {
          res.data.point_json.push({
            id: 'other',
          })
        }
      } catch (error) {}
      let content = firstRecharge ? first_recharge_desc : content_pay
      if (content) {
        display = 'dialog'
      }
      res.data.content = content
      rechargeData = res.data
    })
}

function clickItem(item) {
  if (item.id !== 'other') {
    customCash = null
  }
  selectItem = item
  getCoupons(item.cash)
}

// 获取赠送的优惠券
const getCoupons = debounce(
  cash => {
    if (!cash) return (couponList = [])
    return app
      .request({
        url: 'addons/vip_card/a/api/index.php?s=/miniapp/coupon/get_recharge_give_coupon_list',
        data: {
          recharge_amount: cash,
        },
      })
      .then(res => {
        couponList = res.data
      })
  },
  800,
  {
    leading: true,
  },
)

function pay() {
  let { cash, point, give_cash, give_coupon_list_id, id } = selectItem
  return app
    .request({
      url: '/web/index.php?t=0&v=v6.3.9.05&from=wxapp&c=entry&a=wxapp&m=vip_card&do=pay',
      data: {
        id,
        cash,
        point,
        give_cash,
        coupon_num_list: JSON.stringify(give_coupon_list_id),
      },
    })
    .then(res => {
      if (app.isMpWeixin) {
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: res.data.signType || 'MD5',
          paySign: res.data.paySign,
          success: function (r) {},
        })
      }
    })
}

onLoad(async () => {
  await checkIsfirstRecharge()
  await getRechargeData()
})
</script>

<template>
  <div class="pb-120">
    <div class="flex-center-col p-40 bg-light-400">
      <image class="w-120 h-120 mb-12" :src="shopInfo.pic_url" />
      <div>{{ shopInfo.name }}</div>
    </div>
    <div class="p-30">
      <div class="grid grid-cols-3 gap-20">
        <div
          v-for="(item, index) in rechargeData.point_json"
          :key="index"
          class="b-1 b-solid b-gray rounded-6 py-20"
          :class="{ 'border-green-600': item.id === selectItem.id }"
          @click="clickItem(item)"
        >
          <input
            v-if="item.id === 'other'"
            v-model="customCash"
            class="w-full h-full text-center text-36"
            type="digit"
            placeholder="其它金额"
            @input="getCash"
          />
          <div v-else class="flex-center-col">
            <div class="text-32">{{ item.cash }}元</div>
            <div v-if="item.give_cash > 0" class="text-24 mt-10">
              赠送
              <text class="text-green-600">{{ item.give_cash }}</text>
              元
            </div>
          </div>
        </div>
      </div>
      <div v-if="selectItem.cash > 0" class="flex my-20">
        <div v-if="userInfo.custom_fields.balance_text !== '共享豆'" class="flex">
          <div class="tips">赠</div>
          <div>
            充值
            <span class="text-green-600">{{ selectItem.cash }}</span>
            元，赠送
            <span class="text-green-600">{{ selectItem.give_cash }}</span>
            元，实际到账
            <span class="text-green-600">
              {{ (+selectItem.cash + +selectItem.give_cash).toFixed(2) }}
            </span>
            元
          </div>
        </div>
        <div v-else>
          实际到账共享豆：
          <span class="text-green-600">
            {{ (+selectItem.cash + +selectItem.give_cash).toFixed(2) }}
          </span>
        </div>
      </div>
      <div v-if="couponList.length" class="flex">
        <div class="tips">赠</div>
        <div>
          赠送
          <span class="text-green-600">{{ couponList.length }}</span>
          张优惠券
        </div>
      </div>
      <div v-for="item in couponList" :key="item.id" class="pt-20">
        <giveCoupon :couponData="item"></giveCoupon>
      </div>
      <div class="pt-20">
        <rich
          :content="rechargeData.content"
          :display="display"
          title="充值说明"
          @confirm="display = 'block'"
        />
      </div>
    </div>
    <div class="fixed-bottom p-20 z-50 bg-white">
      <button
        class="bg-#48bd47 text-white disabled:bg-#48bd47"
        :disabled="!selectItem.cash"
        @click="pay"
      >
        {{ rechargeData.text_btn || '立即充值' }}
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.tips {
  background: #f56c6c;
  color: #fff;
  font-size: 24rpx;
  padding: 0 10rpx;
  border-radius: 6rpx;
  margin-right: 10rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 40rpx;
}
uni-button[disabled][type='default'],
uni-button[disabled]:not([type]) {
  background-color: #48bd47;
  opacity: 0.8;
}
</style>
