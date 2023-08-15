<template>
  <div>
    <!-- 切换网络的按钮 -->
    <van-row justify="center" align="center" class="flex pt-[20px]">
      <van-row
        justify="center"
        align="center"
        class="max-w-[60vw] h-[60px] px-[30px] rounded-[30px] bg-[#e5e7eb]"
        style="flex-wrap: nowrap"
      >
        <span
          class="pr-[10px] text-[14px] truncate"
          @click="isShowNetworkList = true"
        >
          {{ networkName }}
        </span>

        <van-icon name="arrow-down" class="!text-[12px]" />
      </van-row>
    </van-row>

    <!-- 显示 钱包名称 以及 相关地址 -->
    <div
      class="border-gray-300 border-[1px] rounded-[20px] p-[20px] w-[calc(100vw-100px)] m-auto mt-[80px]"
    >
      <van-row
        justify="space-between"
        align="center"
        @click="isShowAccountList = true"
      >
        <!-- 钱包别名，从 indexDB 中取 -->
        <span> {{ accountAlias }} </span>
        <van-icon name="arrow-down" />
      </van-row>

      <van-divider class="!m-[20px]" />

      <van-row justify="space-between" align="center">
        <van-row justify="space-between" align="center">
          <span class="text-[12px]"> 地址： </span>

          <!-- 钱包地址，从 indexDB 中取 -->
          <!-- TODO: 这里应该中间省略会比较好 -->
          <div
            class="text-[12px] bg-sky-300 text-sky-700 px-[10px] py-[2px] rounded-[100px] w-[250px] truncate"
          >
            <span> {{ walletAddress }} </span>
          </div>
        </van-row>

        <van-icon name="ellipsis" />
      </van-row>
    </div>

    <!-- Token 和 NFT 的切换栏 -->
    <van-tabs v-model:active="activeTab" line-width="50vw" line-height="2px">
      <van-tab title="Token">
        <van-pull-refresh
          v-model="isOnTokenInfoPullRefresh"
          success-text="刷新成功"
          class="tab-container"
          @refresh="handleTokenInfoPullRefresh"
        >
          <div class="px-[20px]">
            <!-- 代币栏 -->
            <van-row
              v-for="(item, index) in computedTokenInfoList"
              :key="index"
              class="mb-[20px]"
              justify="space-between"
              align="center"
            >
              <div>
                <div>{{ item.name }}</div>
                <div class="text-gray-500 text-[14px]">0 {{ item.name }}</div>
              </div>

              <div>$ 0.00</div>
            </van-row>

            <van-row class="mt-[50px]" justify="center">
              <span class="text-gray-600 text-[14px]">
                没有看到你的代币？
              </span>

              <span class="text-sky-600 text-[14px]"> 导入代币 </span>
            </van-row>
          </div>
        </van-pull-refresh>
      </van-tab>
      <!-- 暂时不做 -->
      <van-tab title="NFT" disabled>
        <van-pull-refresh
          v-model="isOnTokenInfoPullRefresh"
          success-text="刷新成功"
          @refresh="handleTokenInfoPullRefresh"
        >
          <div class="h-[500px]">123</div>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>

    <!-- 网络选择相关组件 -->
    <van-popup
      v-model:show="isShowNetworkList"
      class="h-[70vh] rounded-t-[20px]"
      position="bottom"
    >
      <div>
        <div class="pt-[50px] text-center text-[18px]">选择网络</div>

        <van-row class="flex-col mt-[20px]">
          <!-- 区块链网络列表 -->
          <div class="network-list-container">
            <van-row
              v-for="(item, index) in networkInfoList"
              :key="index"
              align="center"
              class="h-[100px] px-[10px]"
              :class="true && 'bg-[#d6edf7]'"
              style="flex-wrap: nowrap"
            >
              <!-- divider -->
              <div
                class="w-[6px] h-[80%] bg-[transparent]"
                :class="true && '!bg-[#027bb5]'"
              ></div>

              <div class="ml-[30px] pr-[30px] truncate">{{ item.name }}</div>
            </van-row>
          </div>

          <div class="px-[30px]">
            <van-button
              type="primary"
              plain
              hairline
              round
              class="w-[100%] !h-[100px]"
            >
              添加网络
            </van-button>
          </div>
        </van-row>
      </div>
    </van-popup>

    <!-- 选择钱包、添加/创建 钱包 -->
    <van-popup
      v-model:show="isShowAccountList"
      class="rounded-t-[20px]"
      position="bottom"
    >
      <!-- 账户列表 -->
      <div v-if="!isShowCreateAccountOptions" class="">
        <div class="text-center mt-[50px] mb-[20px] text-[18px] font-bold">
          账户
        </div>

        <van-row
          v-for="(item, index) in walleInfoList"
          :key="index"
          align="center"
          class="h-[140px] px-[10px]"
          :class="item.wallet_address === targetWallet?.wallet_address && 'bg-[#d6edf7]'"
        >
          <div
            class="w-[6px] h-[80%] bg-[transparent]"
            :class="item.wallet_address === targetWallet?.wallet_address && '!bg-[#027bb5]'"
          ></div>

          <div class="ml-[30px] pr-[30px] truncate">
            <van-row justify="space-between">
              <!-- 钱包别名 -->
              <span> {{ item.wallet_alias }} </span>
            </van-row>

            <van-row class="!flex-nowrap" justify="space-between">
              <!-- 钱包地址 -->
              <span class="w-[100%] truncate text-[12px]">
                {{ item.wallet_address }}
              </span>
            </van-row>
          </div>
        </van-row>

        <div class="px-[30px] mt-[50px]">
          <van-button
            type="primary"
            plain
            hairline
            round
            class="w-[100%] !h-[100px]"
            @click="isShowCreateAccountOptions = true"
          >
            添加钱包
          </van-button>
        </div>
      </div>

      <!-- 创建钱包的相关操作：自动创建、通过助记词导入等。。。 -->
      <div v-if="isShowCreateAccountOptions">
        <van-nav-bar
          title="添加账户"
          left-arrow
          :border="false"
          @click-left="isShowCreateAccountOptions = false"
        />

        <van-row align="center" class="p-[20px]" @click="createNewAccount">
          <van-icon name="plus" />
          <span class="ml-[20px]"> 添加新账户 </span>
        </van-row>

        <van-row align="center" class="p-[20px]">
          <van-icon name="down" />
          <span class="ml-[20px]"> 导入账户 </span>
        </van-row>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import JJToken from "jj-wallet-contract/abi/JJToken.json";
import { useUserIndexDBTable, useNetworkIndeDBTable } from "@/IndexDB";
import type {
  IWalletInfo,
  INetworkInfo
} from "../CreateWallet/CreateOrImportMnemonic/MarkDownMnemonic.vue";
import { useWalletStore } from "@/stores/wallet";
import { useNetworkStore } from "@/stores/network";
import { ethers } from "ethers";
import clone from "clone";

const accountAlias = ref("");
const networkName = ref("");
const walletAddress = ref("");

const isShowNetworkList = ref(false);

const activeTab = ref(0);
const isOnTokenInfoPullRefresh = ref(false);

function handleTokenInfoPullRefresh() {
  isOnTokenInfoPullRefresh.value = true;
  setTimeout(() => {
    isOnTokenInfoPullRefresh.value = false;
  }, 1000);
}

const isShowAccountList = ref(false);
const isShowCreateAccountOptions = ref(false);

const walletStore = useWalletStore();
const networkStore = useNetworkStore();

const walleInfoList = ref<IWalletInfo[] | null>([]);
const networkInfoList = ref<INetworkInfo[] | null>([]);
// 原先从数据库获取的 token 列表
const tokenInfoList = ref<INetworkInfo["token_info_list"]>([]);
const computedTokenInfoList = ref([]);
let walletPrivateKey = "";
// 通过 tokenInfoList 从链上、后端获取 token 相关的
function setComputedTokenInfoList() {
  tokenInfoList.value.forEach(async (item) => {
    const provider = new ethers.providers.JsonRpcProvider(
      networkStore.currentSelectedNetworkRPC
    );
    const wallet = new ethers.Wallet(walletPrivateKey);
    const walletSigner = wallet.connect(provider);
    const contract = new ethers.Contract(
      item.address,
      JSON.stringify(JJToken),
      walletSigner
    );
    const balanceOfToken = await contract
      .balanceOf(walletStore.currentSelectedWalletAddress)
      .catch(console.log);
    computedTokenInfoList.value.push({
      ...item,
      balanceOfToken: balanceOfToken.toNumber(),
      price: 0
    });
  });
}

const networkDB = useNetworkIndeDBTable();
const userDB = useUserIndexDBTable();
const targetWallet = ref<IWalletInfo>();
async function handleOnMounted() {
  networkInfoList.value = await networkDB.getItem<INetworkInfo[]>("network");
  const targetNetwork =
    networkInfoList.value!.find((item) => {
      return item.rpc_url === networkStore.currentSelectedNetworkRPC;
    }) ?? networkInfoList.value![0];
  networkName.value = targetNetwork.name;
  networkStore.currentSelectedNetworkRPC = targetNetwork.rpc_url;

  walleInfoList.value = await userDB.getItem<IWalletInfo[]>("wallet");
  // 目前选中的钱包，如果没有，默认选择列表中的第一个
  const currentWalletAddress = walletStore.currentSelectedWalletAddress;
  targetWallet.value =
    walleInfoList.value!.find((wallet) => {
      return wallet.wallet_address === currentWalletAddress;
    }) ?? walleInfoList.value![0];
  console.log(targetWallet.value);
  
  accountAlias.value = targetWallet.value.wallet_alias;
  walletAddress.value = targetWallet.value.wallet_address;
  walletPrivateKey = targetWallet.value.wallet_private_key;
  // 顺便把当前的地址给保存 store 中作下一次打开页面的默认。
  walletStore.currentSelectedWalletAddress = targetWallet.wallet_address;

  tokenInfoList.value = targetNetwork.token_info_list;
  setComputedTokenInfoList();
}
onMounted(handleOnMounted);

async function createNewAccount() {
  const clonedWalletInfoList = clone(walleInfoList.value);
  const wallet = ethers.Wallet.createRandom();
  const walletInfo: IWalletInfo = {
    wallet_address: wallet.address,
    wallet_private_key: wallet.privateKey,
    wallet_public_key: wallet.publicKey,
    wallet_alias: `Account${clonedWalletInfoList?.length}`
  };
  clonedWalletInfoList?.push(walletInfo);
  await userDB.setItem("wallet", clonedWalletInfoList).catch(console.log);
  walleInfoList.value = clonedWalletInfoList;
  isShowAccountList.value = false;
  isShowCreateAccountOptions.value = false;
  await nextTick();
  isShowAccountList.value = true;
}
</script>

<style scoped lang="scss">
.network-list-container {
  height: calc(70vh - 50px - 80px - 100px - 20px);
  overflow: auto;
}

.tab-container {
  /* prettier-ignore */
  height: calc(100vh - 44PX - 80px - 280px);
  overflow-y: auto;
}

:deep(.van-tab--active) {
  color: #1989fa;
}

:deep(.van-nav-bar .van-icon) {
  color: black;
}
</style>
