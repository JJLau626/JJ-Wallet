<template>
  <div>
    <van-nav-bar
      :title="route.query.name"
      left-arrow
      @click-left="router.go(-1)"
    />

    <div class="p-[20px]">
      <div>
        {{ route.query.name }}
      </div>

      <div class="font-bold text-[24px]">$ {{ route.query.price }}</div>

      <div class="h-[600px]">K Line Chart</div>

      <div class="text-[12px]">余额</div>

      <div class="text-[14px]">$ {{ route.query.price }}</div>

      <div>{{ route.query.balanceOfToken }}&nbsp;{{ route.query.name }}</div>

      <van-row gutter="10">
        <van-col span="12">
          <van-button type="primary" round plain class="w-[100%]">
            接收
          </van-button>
        </van-col>
        <van-col span="12">
          <van-button type="primary" round plain class="w-[100%]">
            发送
          </van-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

console.log(route.query);
</script>

<style scoped lang="scss"></style>
