import localforage from "localforage";

// 这样设置默认值可以保证类型正确。
let userStore = localforage;
export function setIndexDBConfiguration() {
    userStore = localforage.createInstance({
        driver: localforage.INDEXEDDB,
        name: "JJ-Wallet",
        storeName: 'user',
        description: 'User table for JJ-Wallet'
    });
}

export function useUserIndexDBStore() {
    return userStore;
}