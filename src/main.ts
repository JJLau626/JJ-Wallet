// tailwind.css 已经带有重置 css 的能力。
import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import { setIndexDBConfiguration } from "./IndexDB"

const app = createApp(App)

setIndexDBConfiguration();

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia)
app.use(router)

app.mount('#app')
