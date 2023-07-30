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
          Polygon
        </span>

        <van-icon name="arrow-down" class="!text-[12px]" />
      </van-row>
    </van-row>

    <!-- 显示 钱包名称 以及 相关地址 -->
    <div
      class="border-gray-300 border-[1px] rounded-[20px] p-[20px] w-[calc(100vw-100px)] m-auto mt-[80px]"
    >
      <van-row justify="space-between" align="center">
        <!-- 钱包别名，从 indexDB 中取 -->
        <span> Account </span>
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
            <span> 0xf586eDcC01DA194DB45F3F64C64cD2e4f8Ec2217 </span>
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
            <van-row class="mb-[20px]" justify="space-between" align="center">
              <div>
                <div>MATIC</div>
                <div class="text-gray-500 text-[14px]">0 MATIC</div>
              </div>

              <div>$ 0.00</div>
            </van-row>

            <van-row justify="center">
              <span class="text-gray-600 text-[14px]">
                没有看到你的代币？
              </span>

              <span class="text-sky-600 text-[14px]">
                导入代币
              </span>
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

              <div class="ml-[30px] pr-[30px] truncate">Polygon</div>
            </van-row>

            <van-row
              align="center"
              class="h-[100px] px-[10px]"
              :class="false && 'bg-[#d6edf7]'"
              style="flex-wrap: nowrap"
            >
              <!-- divider -->
              <div
                class="w-[6px] h-[80%] bg-[transparent]"
                :class="false && '!bg-[#027bb5]'"
              ></div>

              <div class="ml-[30px] pr-[30px] truncate">Polygon</div>
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
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import JJToken from "jj-wallet-contract/abi/JJToken.json";

const isShowNetworkList = ref(false);

const activeTab = ref(0);
const isOnTokenInfoPullRefresh = ref(false);

function handleTokenInfoPullRefresh() {
  isOnTokenInfoPullRefresh.value = true;
  setTimeout(() => {
    isOnTokenInfoPullRefresh.value = false;
  }, 1000);
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
</style>
