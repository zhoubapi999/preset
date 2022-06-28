<script lang="ts" setup>
import { ConfigOption } from '@/types'
import { PropType } from 'vue'
const props = defineProps({
  config: { type: Object as PropType<ConfigOption>, required: true },
})
const { allData, userInfo } = $(app.User)

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
    fontSize: `${2 * style.fontSize}rpx`,
    paddingBottom: `${2 * style.pdB || 0}rpx`,
    borderRadius: `${2 * style.radius}rpx`,
    backgroundColor: style.bg,
    boxShadow: style.shadow
      ? `${2 * style.shadow.x}rpx ${2 * style.shadow.y}rpx ${2 * style.shadow.radius}rpx ${
          style.shadow.color
        }`
      : '',
  }
})

function action(item) {
  console.log(toRaw(item))
}
</script>

<template>
  <div
    v-if="
      allData.my_card_info.card_num &&
      (config.showUserBalance || config.showUserPoint || config.showUserLevel)
    "
    class="member-info-container"
    :class="config.style.itemDir"
    :style="style"
  >
    <div v-if="config.showUserBalance" class="item" @click="action">
      <span class="item-label">{{ userInfo.custom_fields.balance_text || '余额' }}</span>
      <span class="item-value">{{ allData.my_card_info.balance }}元</span>
    </div>
    <div v-if="config.showUserPoint" class="item" @click="action">
      <span class="item-label">积分</span>
      <span class="item-value">{{ allData.my_card_info.point }}</span>
    </div>
    <div v-if="config.showUserLevel" class="item" @click="action">
      <span class="item-label">等级</span>
      <span class="item-value">{{ '暂无' || allData.new_levelinfo.user_level.level_name }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.member-info-container {
  display: flex;
  justify-content: space-around;
  .item-label {
    opacity: 0.5;
  }
  &.column {
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .item-label {
      margin-bottom: 0.6em;
    }
  }
  &.row {
    .item {
      flex-direction: row;
      .item-label {
        margin-right: 0.5em;
        &:after {
          content: ' :';
        }
      }
    }
  }
}
</style>
