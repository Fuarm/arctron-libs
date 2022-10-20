import { createApp } from 'vue' // Vue 3.x 引入 vue 的形式
import App from './App'

const app = createApp(App) // 通过 createApp 初始化 app
app.mount('#app')