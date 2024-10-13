import { createApp } from 'vue'
import './style.css'
import 'normalize.css/normalize.css'
import App from './App.vue'

import { createPinia } from 'pinia'
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.mount('#app')
