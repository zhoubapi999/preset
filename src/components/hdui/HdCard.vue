<script lang="ts" setup>
const props = defineProps({
  config: { type: Object, required: true },
})
const { allData, userInfo } = $(app.User)
const defaultPortrait = ref('')
const tempWechatUser = ref({})
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
          <div v-if="!allData.my_card_info.card_num && !tempWechatUser" class="userphone">
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
    // background-image: url(../../../../assets/hp.png);
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
