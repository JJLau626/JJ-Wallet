<template>
  <div>
    <van-steps class="step-indicator" :active="activedStepIndicator">
      <van-step>创建密码</van-step>
      <!-- <van-step>保护钱包安全</van-step> -->
      <van-step>确认助记词</van-step>
    </van-steps>

    <div class="text-center text-[20px] font-bold mt-[40px]">创建密码</div>

    <div class="w-[500px] text-[16px] text-center m-[0] m-auto mt-[30px]">
      此密码将仅在此设备上解锁你的 JJ-Wallet 钱包。
    </div>

    <div class="pr-[100px] pl-[100px]">
      <van-row class="mt-[30px]" justify="space-between">
        <span class="text-[14px]"> 新密码 </span>

        <span class="text-[14px]" @click="isShowPassword = !isShowPassword">
          {{ isShowPassword ? "隐藏" : "显示" }}
        </span>
      </van-row>
      <van-field
        v-model="password"
        class="mt-[10px] !pt-[25px] !pb-[25px] border-[1px] border-[#e5e7eb] rounded-[10px] !text-[12px]"
        :type="isShowPassword ? 'text' : 'password'"
        :formatter="(value) => value.replace(/\s/g, '')"
      />
      <div
        class="text-[12px] mt-[10px]"
        :style="{
          visibility: password ? 'visible' : 'hidden'
        }"
      >
        <span> 密码强度： </span>
        <span :class="passwordChecker.type"> {{ passwordChecker.text }} </span>
      </div>

      <van-row class="mt-[30px]" justify="space-between">
        <span class="text-[14px]"> 确认密码 </span>
      </van-row>
      <van-field
        v-model="secondConfirmPassword"
        class="mt-[10px] !pt-[25px] !pb-[25px] border-[1px] border-[#e5e7eb] rounded-[10px] !text-[12px]"
        :type="isShowPassword ? 'text' : 'password'"
        :formatter="(value) => value.replace(/\s/g, '')"
      />
      <div class="text-[12px] mt-[10px]">必须至少包含8个字符</div>

      <van-checkbox
        v-model="isUserUnderstand"
        shape="square"
        class="text-[12px] mt-[50px]"
      >
        我了解 JJ-Wallet 无法为我找回此密码。
      </van-checkbox>

      <van-button
        type="primary"
        round
        class="w-[100%] !h-[100px] !text-[16px] !mt-[50px]"
        :disabled="!isShowDisabled"
        :loading="isCreatingPassword"
        @click="setupPassword"
      >
        创建密码
      </van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import bcrypt from "bcryptjs";
// TODO: 看看怎么解决这个警告
import { useUserIndexDBStore } from "@/IndexDB";
import { useRouter } from "vue-router";

const router = useRouter();
const activedStepIndicator = ref(0);

const password = ref("");
const secondConfirmPassword = ref("");
const isShowPassword = ref(false);

const isCreatingPassword = ref(false);
const isUserUnderstand = ref(false);
const user = useUserIndexDBStore();
async function setupPassword() {
  isCreatingPassword.value = true;
  const salt = bcrypt.genSaltSync(1);
  const hash = bcrypt.hashSync(password.value, salt);

  console.log(salt, hash);
  // TODO: 这里应该写成 事务 会比较好。
  await user.setItem("salt", salt);
  await user.setItem("hash", hash);
  isCreatingPassword.value = false;
  router.push({
    name: "ConfirmPassword"
  });
}

// 密码至少的长度
const targetCharacterLength = 8;
const passwordChecker = computed(() => {
  let text: "强" | "好" | "弱" = "弱";
  let type: "strong" | "great" | "weak" = "weak";

  // 强 类型
  const strongRule = new RegExp(
    `^(?=.{${targetCharacterLength},})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$`
  );
  // 好 类型 1
  const greatRule1 = new RegExp(
    `^(?=.{${targetCharacterLength},})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[a-z])(?=.*\\W))|((?=.*[0-9])(?=.*\\W))|((?=.*[A-Z])(?=.*\\W))).*$`
  );
  // 好 类型 2
  const greatRule2 = new RegExp(`(?=.{${targetCharacterLength},}).*`);
  // 密码强弱校验
  if (strongRule.test(password.value)) {
    text = "强";
    type = "strong";
  } else if (
    greatRule1.test(password.value) ||
    greatRule2.test(password.value)
  ) {
    text = "好";
    type = "great";
  } else {
    text = "弱";
    type = "weak";
  }

  return {
    text,
    type
  };
});

// 是否能 创建密码 的先决条件:
// 密码长度足够、两次输入密码一样、点击我了解
const isShowDisabled = computed(() => {
  const isLengthEnough = password.value.length >= targetCharacterLength;
  const isSecondPasswordEqual = password.value === secondConfirmPassword.value;
  return isLengthEnough && isSecondPasswordEqual && isUserUnderstand.value;
});
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

:deep(.van-checkbox__label) {
  line-height: 1;
}

:deep(.van-checkbox__icon) {
  font-size: 16px;
}

.strong {
  color: green;
}

.great {
  color: blue;
}

.weak {
  color: red;
}
</style>
