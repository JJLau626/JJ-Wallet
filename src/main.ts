// tailwind.css 已经带有重置 css 的能力。
import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { setIndexDBConfiguration } from "./IndexDB"

const app = createApp(App)

setIndexDBConfiguration();

app.use(createPinia())
app.use(router)

app.mount('#app')
