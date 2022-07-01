<script lang="ts" setup>
const prop = withDefaults(
  defineProps<{ display?: 'block' | 'dialog'; show?: boolean; content: string }>(),
  {
    display: 'block',
    show: true,
    content: '',
  },
)
const emit = defineEmits(['close'])

const richShow = ref(prop.show)
function close() {
  richShow.value = false
  emit('close')
}
</script>

<template>
  <div v-if="richShow" class="rich-wraper" :class="display">
    <div class="rich-body">
      <div class="rich-content">
        <div class="ql-container ql-snow">
          <rich-text class="ql-editor" :nodes="content"></rich-text>
        </div>
      </div>
      <div class="icon-thin-close" @clcik="close"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/quill.snow.scss';
.rich-wraper {
  &.dialog {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000000;
    text-align: center;
    font-size: 0;
    &::after {
      content: '';
      display: inline-block;
      width: 0;
      height: 100%;
      vertical-align: middle;
    }
  }
}
.dialog {
  .rich-body {
    font-size: initial;
    vertical-align: middle;
    border-radius: 10px;
    min-width: 500rpx;
    width: 100%;
    max-width: 80vw;
    box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.2);
    transform-origin: 0 0;
    border-radius: 20rpx;
    position: relative;
    display: inline-block;
    overflow-y: auto;
    .icon-thin-close {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 80rpx);
      color: #fff;
      font-size: 60rpx;
      display: block;
    }
  }
  .rich-content {
    height: 70vh;
    background: #fff;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
.rich-body {
  .icon-thin-close {
    display: none;
  }
}
.rich-content {
  image {
    max-width: 100%;
  }
}
</style>
