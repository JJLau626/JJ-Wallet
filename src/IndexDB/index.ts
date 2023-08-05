import localforage from "localforage";

// 这样设置默认值可以保证类型正确。
let userTable = localforage;
let networkTable = localforage;
export function setIndexDBConfiguration() {
  userTable = localforage.createInstance({
    driver: localforage.INDEXEDDB,
    name: "JJ-Wallet",
    storeName: "user",
    description: "User table for JJ-Wallet"
  });

  networkTable = localforage.createInstance({
    driver: localforage.INDEXEDDB,
    name: "JJ-Wallet",
    storeName: "network",
    description: "Network table for JJ-Wallet"
  });
}

export function useUserIndexDBTable() {
  return userTable;
}

export function useNetworkIndeDBTable() {
  return networkTable;
}
