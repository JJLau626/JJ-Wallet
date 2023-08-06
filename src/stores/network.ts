import { defineStore } from "pinia";

export const useNetworkStore = defineStore("network", {
  state: () => ({
    currentSelectedNetworkRPC: ''
  })
});
