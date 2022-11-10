import useEffect from "../core/useEffect"

/**
 * 定时器 hook
 * @param fn 执行函数
 * @param wait 等待时间
 * @param immediate 直接执行
 * @returns 
 */
function useTimeout(fn: () => void, wait: number = 300, immediate: boolean = false) {
  let timer: number | undefined
  
  const start = () => {
    timer && stop()
    timer = setTimeout(fn, wait)
  }
  
  const stop = () => {
    if (timer) {
      clearTimeout(timer)
      timer = undefined
    }
  }
 
  useEffect(() => {
    // 直接执行
    immediate && fn()
    // 执行 setTimeout
    start()
    return () => stop()
  }, [])

  return [start, stop] as const
}

export default useTimeout
