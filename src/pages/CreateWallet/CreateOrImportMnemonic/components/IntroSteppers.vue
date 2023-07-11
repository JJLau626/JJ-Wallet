<template>
  <van-steps class="step-indicator" v-bind="$attrs">
    <van-step>创建密码</van-step>
    <van-step>确认密码</van-step>
    <van-step>确认助记词</van-step>
  </van-steps>
</template>

<script setup lang="ts">
import { useAttrs } from "vue";

const $attrs = useAttrs();

</script>

<style scoped lang="scss">
.step-indicator {
  width: 90%;
  margin: 0 auto;
  margin-top: 20px;
  :deep(.van-steps--horizontal .van-steps__items) {
    padding-bottom: 600px;
  }

  :deep(.van-step--horizontal .van-step__circle-container) {
    top: 60px;
  }

  :deep(.van-step__line) {
    top: 60px;
    // prettier-ignore
    height: 1PX;
  }
}
</style>
