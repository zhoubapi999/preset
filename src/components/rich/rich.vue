<script lang="ts" setup>
const prop = withDefaults(
  defineProps<{
    display?: 'block' | 'dialog' | 'none'
    content: string
    showCancel?: boolean
    title?: string
  }>(),
  {
    display: 'block',
    showCancel: false,
    content: '',
    title: '',
  },
)
const emit = defineEmits(['confirm', 'close'])
let display = ref()
watch(
  () => prop.display,
  val => {
    display.value = val
  },
)
function confirm() {
  display.value = 'none'
  emit('confirm')
}
function close() {
  display.value = 'none'
  emit('close')
}
</script>

<template>
  <div class="cu-modal" :class="{ show: display === 'dialog' }">
    <div class="cu-dialog">
      <div v-if="title" class="cu-bar justify-end">
        <div class="content">{{ title }}</div>
      </div>
      <div class="padding-sm overflow-y-auto max-h-50vh">
        <div class="ql-container ql-snow">
          <rich-text class="ql-editor" :nodes="content"></rich-text>
        </div>
      </div>
      <view class="cu-bar bg-white">
        <div v-if="showCancel" class="flex-1" @tap="close">取消</div>
        <div class="flex-1" @tap="confirm">确定</div>
      </view>
    </div>
  </div>

  <div v-if="display === 'block'" class="rich-body">
    <div class="rich-content">
      <div class="ql-container ql-snow">
        <rich-text class="ql-editor" :nodes="content"></rich-text>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/quill.snow.scss';

.rich-content {
  image {
    max-width: 100%;
  }
}
</style>
