import { createApp } from 'vue' // Vue 3.x 引入 vue 的形式
import { vuePlugin as logsPlugin } from '@arctron-cim/logs'
import App from './App'
import './main.css'

const app = createApp(App) // 通过 createApp 初始化 app

app
  .use(logsPlugin)
  .mount('#app')

// 注册Service Worker
// 处理兼容性问题, 如果有这个属性，才在页面全局资源加载完后进行注册
if('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then(() => {
        app.$logs.SYSTEM('serviceWorker registration successful!')
      })
      .catch(() => {
        app.$logs.ERROR('serviceWorker registration failed!')
      })
  })
} else {
  app.$logs.DEBUG('serviceWorker does not exist in navigator')
}

