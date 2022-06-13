<script lang="ts" setup name="Hdcard">
const props = defineProps({
  config: { type: Object, required: true },
})
const { allData } = $(app.User)
const noStyle = computed(() => {
  const { style } = props.config
  return {
    top: `${+(style.pdB || 0) - 5}px`,
    textAlign: style.noAlign,
    fontSize: style.noSize + 'px',
    display: style.noCardNum ? 'block' : 'none',
  }
})
const iconStyle = computed(() => {
  const { style } = props.config
  return {
    width: `${style.iconSize}px`,
    height: `${style.iconSize}px`,
    borderRadius: `${style.iconRadius}px`,
    backgroundImage: `url(${allData.my_card_info.header_url})`,
  }
})

const style = computed(() => {
  const { style } = props.config
  return {
    color: style.color,
    marginLeft: `${style.mgL || 0}px`,
    marginRight: `${style.mgR || 0}px`,
    marginTop: `${style.mgT || 0}px`,
    marginBottom: `${style.mgB || 0}px`,
    paddingLeft: `${style.pdL || 0}px`,
    paddingRight: `${style.pdR || 0}px`,
    paddingTop: `${style.pdT || 0}px`,
    paddingBottom: `${style.pdB || 0}px`,
    backgroundImage: `url(${style.bgImg ? style.bgImg : 'images/components/img2.png'})`,
    borderRadius: `${style.radius}px`,
    boxShadow:
      style.shadow && style.shadow.radius && style.shadow.color
        ? `${style.shadow.x}px ${style.shadow.y}px ${style.shadow.radius}px ${style.shadow.color}`
        : '',
  }
})
</script>

<template>
  <div class="card-container card-cover pt100" :style="style">
    <div style="flex: 1">
      <div class="user-info">
        <div v-if="config.showPortrait" class="portrait" :style="iconStyle"></div>
        <div class="user-detail">
          <div v-if="config.showUsername" class="username">
            {{ allData.my_card_info.realname || allData.my_card_info.nickname }}
          </div>
          <div v-if="config.showPhone" class="userphone">{{ allData.my_card_info.tel }}</div>
        </div>
        <div class="icon">
          <div
            :style="{
              color: config.style.btnColor,
              background: config.style.btnBg,
              fontSize: config.style.btnFontSize + 'px',
              boxShadow:
                config.style.btnShadow &&
                config.style.btnShadow.radius &&
                config.style.btnShadow.color
                  ? `${config.style.btnShadow.x}px ${config.style.btnShadow.y}px ${config.style.btnShadow.radius}px ${config.style.btnShadow.color}`
                  : '',
            }"
            class="qrcode i-ic-baseline-qrcode"
          ></div>
        </div>
      </div>
    </div>
    <div class="card-no" :style="noStyle">{{ allData.my_card_info.card_num }}</div>
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
