<template>
  <div>
    <IntroSteppers :active="2" />

    <div class="pr-[100px] pl-[100px]">
      <div class="text-[20px] font-bold text-center mt-[20px]">
        写下你的助记词
      </div>

      <div class="text-[14px] text-center mt-[30px]">
        这是你的助记词。将它写在纸上并存放在安全的地方。
      </div>

      <div
        class="border-[1px] border-[#e5e7eb] rounded-[10px] px-[50px] py-[20px] mt-[30px]"
      >
        <van-row>
          <van-col
            span="12"
            v-for="(word, index) in mnemonicWords"
            :key="index"
            :class="index % 2 !== 0 && 'text-right'"
          >
            <div
              class="w-[250px] border-[1px] border-[#1989fa] rounded-[100px] text-center mb-[15px] mt-[15px] inline-block"
            >
              {{ `${index + 1}. ${word}` }}
            </div>
          </van-col>
        </van-row>
      </div>

      <van-button
        type="primary"
        round
        class="w-[100%] !h-[100px] !text-[16px] !mt-[150px]"
        :loading="isSavingWalletInfo"
        @click="confirmMnemonic"
      >
        确认
      </van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ethers } from "ethers";
import IntroSteppers from "./components/IntroSteppers.vue";
import { useUserIndexDBStore, useContractIndexDBStore } from "@/IndexDB";

const router = useRouter();
const userStore = useUserIndexDBStore();
const contractStore = useContractIndexDBStore();

const wallet = ethers.Wallet.createRandom();
console.log("wallet", wallet);

const mnemonicWords = ref(wallet.mnemonic.phrase.split(/\s/));

export interface IWalletInfo {
  wallet_address: string;
  wallet_private_key: string;
  wallet_public_key: string;
  wallet_alias: string;
}

function confirmMnemonic() {
  isSavingWalletInfo.value = true;
  saveWalletInfo();
  saveContractInfo();
  isSavingWalletInfo.value = false;
  router.push({
    name: "Main"
  });
}

const isSavingWalletInfo = ref(false);
// TODO：默认信息写在配置文件会比较好。
const wallet_alias = "Account";
/**
 * 完成所有流程后，保存钱包和一些默认信息
 * 默认信息：钱包别名
 */
async function saveWalletInfo() {
  const walletInfo: IWalletInfo = {
    wallet_address: wallet.address,
    wallet_private_key: wallet.privateKey,
    wallet_public_key: wallet.publicKey,
    wallet_alias
  };
  await userStore.setItem("wallet", [walletInfo]);
}

/**
 * 完成所有流程后，保存网络初始化的一些默认信息
 * 默认信息：网络名称和对应的 URL
 */
async function saveNetworkInfo() {

}

interface IContractList {
  contract_address: string;
  token_name: string;
}

/**
 * 完成所有流程后，保存合约初始化的一些默认信息
 * 默认信息：代币名称以及对应的合约地址
 */
async function saveContractInfo() {
  const contractList: IContractList[] = [{}];
  await contractStore.setItem("contract", "contract");
}
</script>

<style scoped lang="scss"></style>
