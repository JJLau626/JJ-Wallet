<template>
  <div>
    <div>
      <van-row justify="center" class="text-[22px] font-bold mt-[100px]">
        钱包设置
      </van-row>

      <van-row justify="center" class="mt-[50px]">
        导入现有钱包或创建新钱包
      </van-row>

      <div class="absolute bottom-[150px] left-0 right-0 margin-auto">
        <van-row justify="center">
          <van-button
            type="primary"
            plain
            round
            class="w-[450px] !h-[100px] !text-[16px]"
          >
            使用助记词导入
          </van-button>
        </van-row>

        <van-row justify="center" class="mt-[30px]">
          <van-button
            type="primary"
            round
            class="w-[450px] !h-[100px] !text-[16px]"
            @click="goToCreateAppPassword"
          >
            创建新钱包
          </van-button>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

function goToCreateAppPassword() {
  router.push({ name: "CreateAppPassword" });
}
</script>

<style scoped lang="scss"></style>
