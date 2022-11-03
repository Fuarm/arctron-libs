import Logs from "./logs";
import makeInstaller from './plugin/vue3'

const logInstance = new Logs()

const vuePlugin = makeInstaller(logInstance)

export {
  logInstance as default,
  vuePlugin
}

export type {
  Logs
}
