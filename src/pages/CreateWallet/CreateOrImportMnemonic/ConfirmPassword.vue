<template>
  <div>
    <IntroSteppers :active="1" />

    <div class="pr-[100px] pl-[100px]">
      <div class="text-[30px]">确认你的密码</div>

      <div class="mt-[50px] text-[16px]">
        在继续之前，我们需要你确认自己的密码
      </div>

      <van-field
        v-model="password"
        class="mt-[20px] !pt-[25px] !pb-[25px] border-[1px] border-[#e5e7eb] rounded-[10px] !text-[12px]"
        type="password"
        placeholder="Password"
        :formatter="(value) => value.replace(/\s/g, '')"
        :error-message="errorMessage"
        :error="Boolean(errorMessage)"
      />

      <van-button
        type="primary"
        round
        class="w-[100%] !h-[100px] !text-[16px] !mt-[50px]"
        :loading="isCheckingPassword"
        @click="verifyPassword"
      >
        确认
      </van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import IntroSteppers from "./components/IntroSteppers.vue";
import { useUserIndexDBStore } from "@/IndexDB";
import bcrypt from "bcryptjs";
import router from "@/router";

const userStore = useUserIndexDBStore();

const password = ref("");
const isCheckingPassword = ref(false);

const errorMessage = ref('');
async function verifyPassword() {
  isCheckingPassword.value = true;
  const hash = await userStore.getItem<string>("hash").catch((error) => console.log);
  const result = bcrypt.compareSync(password.value, hash as string);
  console.log(result);
  
  if (!result) {
    errorMessage.value = '无法解锁你的账户。请重试';
    return;
  } else {
    errorMessage.value = '';
  }
  isCheckingPassword.value = false;
  router.push({
    name: 'MarkDownMnemonic'
  })
}
</script>

<style scoped lang="scss"></style>
