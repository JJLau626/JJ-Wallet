import { createRouter, createWebHistory } from "vue-router";
import Index from "../pages/index/index.vue";
import CreateWallet from "../pages/CreateWallet/index.vue";
import CreateOrImportMnemonic from "../pages/CreateWallet/CreateOrImportMnemonic/index.vue";
import CreateAppPassword from "../pages/CreateWallet/CreateOrImportMnemonic/CreateAppPassword.vue";
import ConfirmPassword from "@/pages/CreateWallet/CreateOrImportMnemonic/ConfirmPassword.vue";
import MarkDownMnemonic from "@/pages/CreateWallet/CreateOrImportMnemonic/MarkDownMnemonic.vue";
import Main from "@/pages/Main/index.vue";
import CoinDetail from "@/pages/CoinDetail/index.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Index
    },
    {
      path: "/CreateWallet",
      name: "CreateWallet",
      component: CreateWallet,
      redirect: { name: "CreateOrImportMnemonic" },
      children: [
        {
          path: "CreateOrImportMnemonic",
          name: "CreateOrImportMnemonic",
          component: CreateOrImportMnemonic
        },
        {
          path: "CreateAppPassword",
          name: "CreateAppPassword",
          component: CreateAppPassword
        },
        {
          path: "ConfirmPassword",
          name: "ConfirmPassword",
          component: ConfirmPassword
        },
        {
          path: "MarkDownMnemonic",
          name: "MarkDownMnemonic",
          component: MarkDownMnemonic
        }
      ]
    },
    {
      path: "/Main",
      name: "Main",
      component: Main
    },
    {
      path: "/CoinDetail",
      name: "CoinDetail",
      component: CoinDetail
    },
  ]
});

export default router;
