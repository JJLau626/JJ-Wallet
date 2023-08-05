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
import {
  useUserIndexDBTable,
  useNetworkIndeDBTable
} from "@/IndexDB";

const router = useRouter();
const userTable = useUserIndexDBTable();
const networkTable = useNetworkIndeDBTable();

const wallet = ethers.Wallet.createRandom();

const mnemonicWords = ref(wallet.mnemonic.phrase.split(/\s/));

export interface IWalletInfo {
  wallet_address: string;
  wallet_private_key: string;
  wallet_public_key: string;
  wallet_alias: string;
}

async function confirmMnemonic() {
  isSavingWalletInfo.value = true;
  await saveWalletInfo();
  await saveNetworkInfo();
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
  await userTable.setItem("wallet", [walletInfo]).catch(console.log);
}

export interface INetworkInfo {
  name: string;
  rpc_url: string;
  chain_id: string;
  token_info: {
    name: string;
    address: string;
    number_precision: number;
  }[];
}

/**
 * 完成所有流程后，保存网络初始化的一些默认信息
 * 默认信息：网络名称和对应的 URL 以及代币相关的信息
 */
async function saveNetworkInfo() {
  // TODO：默认信息写在配置文件会比较好。
  const defaultData: INetworkInfo = {
    name: "Polygon Mumbai Testnet",
    rpc_url: "https://rpc-mumbai.maticvigil.com/",
    chain_id: "80001",
    token_info: [
      {
        name: "MATIC",
        address: "0x2288EbA68bdb93b54b0d94FdC7bbbc5893f00fC0",
        number_precision: 18
      }
    ]
  };
  await networkTable.setItem("network", defaultData).catch(console.log);
}

</script>

<style scoped lang="scss"></style>
