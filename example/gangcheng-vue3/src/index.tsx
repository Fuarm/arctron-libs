import { createApp } from 'vue' // Vue 3.x 引入 vue 的形式
import { vuePlugin } from '@arctron-cim/logs'
import App from './App'
import './main.css'

const app = createApp(App) // 通过 createApp 初始化 app

app
  .use(vuePlugin)
  .mount('#app')


