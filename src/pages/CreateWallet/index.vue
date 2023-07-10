<template>
  <div class="intro-container">

    <van-nav-bar class="app-title" left-arrow>
      <template #title>
        <div class="!leading-[1] text-[18px] font-bold tracking-[10px]">
          JJ-Wallet
        </div>
      </template>
    </van-nav-bar>

    <RouterView></RouterView>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.app-title {
  // prettier-ignore
  height: 50PX;

  // prettier-ignore
  :deep(.van-nav-bar__content) {
    height: 50PX;
  }

  :deep(.van-nav-bar__arrow) {
    font-size: 18px;
  }
}
</style>
