/**
 * 用法：
 *  1、参数：执行回调函数， 等待时长
 *  2、返回一个调用方法（调用该方法触发 检测等待函数是否执行，未执行 清除函数，重新设置触发执行）
 */

function useDebounce<T>(fn: (...args: any) => void, wait: number) {

  function createDebounce() {
    let timer;
    return function(this:any, ...args) {
      if (timer) {
        clearTimeout(timer)
        timer = undefined
      }

      setTimeout(() => fn.call(this, ...args), wait)
    } 
  }

  return createDebounce()
}

export default useDebounce
