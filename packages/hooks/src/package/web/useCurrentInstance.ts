import { getCurrentInstance } from "vue"

/**
 * useCurrentInstance 全局属性、app 实例、代理对象
 * @returns 
 */
function useCurrentInstance() {
  const { appContext, proxy } = getCurrentInstance()!

  return {
    app: appContext.app,
    appContext,
    proxy,
    globalProperties: appContext.config.globalProperties
  }
}

export default useCurrentInstance
