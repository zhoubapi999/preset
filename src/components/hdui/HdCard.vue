<script lang="ts" setup>
import { ConfigOption } from '@/types'
import { PropType } from 'vue'
const props = defineProps({
  config: { type: Object as PropType<ConfigOption>, required: true },
})

const { allData, userInfo } = $(app.User)
const defaultPortrait = $ref(
  'data:image/png;base64,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',
)
const tempWechatUser = $ref({})
const noStyle = computed(() => {
  const { style } = props.config
  return {
    top: `${(2 * style.pdB || 0) - style.noSize}rpx`,
    textAlign: style.noAlign,
    fontSize: 2 * style.noSize + 'rpx',
    display: style.noCardNum ? 'block' : 'none',
  }
})
const iconStyle = computed(() => {
  const { style } = props.config
  return {
    width: `${2 * style.iconSize}rpx`,
    height: `${2 * style.iconSize}rpx`,
    borderRadius: `${2 * style.iconRadius}rpx`,
    backgroundImage:
      'url(' +
      (allData.my_card_info.header_url || tempWechatUser.avatarUrl || defaultPortrait) +
      ')',
  }
})

const style = computed(() => {
  const { style } = props.config
  return {
    color: style.color,
    marginLeft: `${2 * style.mgL || 0}rpx`,
    marginRight: `${2 * style.mgR || 0}rpx`,
    marginTop: `${2 * style.mgT || 0}rpx`,
    marginBottom: `${2 * style.mgB || 0}rpx`,
    paddingLeft: `${2 * style.pdL || 0}rpx`,
    paddingRight: `${2 * style.pdR || 0}rpx`,
    paddingTop: `${2 * style.pdT || 0}rpx`,
    paddingBottom: `${2 * style.pdB || 0}rpx`,
    backgroundImage: `url(${style.bgImg || userInfo.mini_app.card_bg})`,
    backgroundSize: style.bgSize,
    borderRadius: `${2 * style.radius}rpx`,
    boxShadow: style.shadow
      ? `${2 * style.shadow.x}rpx ${2 * style.shadow.y}rpx ${2 * style.shadow.radius}rpx ${
          style.shadow.color
        }`
      : '',
  }
})

const btnStyle = computed(() => {
  const { style } = props.config
  return {
    color: style.btnColor,
    fontSize: `${
      2 * (allData.my_card_info.card_num ? Number(style.btnFontSize) + 6 : style.btnFontSize)
    }rpx`,
    background: style.btnBg,
    boxShadow: style.btnShadow
      ? `${2 * style.btnShadow.x}rpx ${2 * style.btnShadow.y}rpx ${2 * style.btnShadow.radius}rpx ${
          style.btnShadow.color
        }`
      : '',
  }
})

function action(item) {
  console.log(toRaw(item))
}
</script>

<template>
  <div class="card-container card-cover" :style="style" bindtap="goUserInfo">
    <div catchtap="onGotUserInfo">
      <button v-if="!allData.my_card_info.card_num" class="btn-mask"></button>
    </div>
    <div style="flex: 1">
      <div class="user-info">
        <div v-if="config.showPortrait" class="portrait" :style="iconStyle"></div>
        <div class="user-detail">
          <div v-if="config.showUsername" class="username">
            {{
              allData.my_card_info.realname ||
              allData.my_card_info.nickname ||
              tempWechatUser.nickName
            }}
          </div>
          <div v-if="config.showPhone && allData.my_card_info.card_num" class="userphone">
            {{ allData.my_card_info.tel }}
          </div>
          <div v-if="!allData.my_card_info.card_num && !tempWechatUser.nickName" class="userphone">
            <text v-if="!allData.my_card_info.nickname">登录</text>
          </div>
        </div>
        <div class="icon">
          <div
            v-if="allData.my_card_info.card_num"
            class="btn i-ic-baseline-qrcode"
            :style="btnStyle"
            @click.stop="action({})"
          ></div>
          <div v-if="!allData.my_card_info.card_num" class="btn open-card-btn" :style="btnStyle">
            {{ config.btnText || '领取会员卡' }}
          </div>
        </div>
      </div>
    </div>

    <div v-if="allData.my_card_info.card_num || config.fixedNo" class="card-no" :style="noStyle">
      {{ allData.my_card_info.card_num }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-cover {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column;
}
.user-info {
  display: flex;
  align-items: center;
  .portrait {
    margin-right: 0.6em;
    border-radius: 100px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.3) inset;
  }
  .icon {
    margin-left: auto;
    font-size: 24px;
    .qrcode {
      padding: 4px;
      color: #000;
      z-index: 99;
    }
  }
  .username {
    line-height: 1.7em;
  }
  .userphone {
    font-size: 14px;
    line-height: 1.7em;
  }
}
.card-no {
  letter-spacing: 2px;
  position: relative;
}
</style>
