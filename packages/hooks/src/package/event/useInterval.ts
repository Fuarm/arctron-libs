import useEffect from "../core/useEffect"

/**
 * 定时器 hook
 * @param fn 执行函数
 * @param wait 等待时间
 * @param immediate 直接执行
 * @returns 
 */
function useInterval(fn: () => void, wait: number = 300, immediate: boolean = false) {
  let timer: number | undefined
  
  const start = () => {
    timer && stop()
    // 直接执行
    immediate && fn()
    timer = setInterval(fn, wait)
  }
  
  const stop = () => {
    if (timer) {
      clearInterval(timer)
      timer = undefined
    }
  }
 
  useEffect(() => {
    // 默认开启定时
    start()
    return () => stop()
  }, [])

  return [start, stop] as const
}

export default useInterval
