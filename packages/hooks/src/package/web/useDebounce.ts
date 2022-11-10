/**
 * 用法：
 *  1、参数：执行回调函数， 等待时长
 *  2、返回一个调用方法（调用该方法触发 检测等待函数是否执行，未执行 清除函数，重新设置触发执行）
 */

import { Ref } from "vue";
import useEffect from "../core/useEffect";
import useState from "../core/useState";
import useTimeout from "../event/useTimeout";

/**
 * 防抖 hook
 * @beta
 * @param value - 处理的值
 * @param wait - 等待时长
 * @returns - 处理后防抖的值
 */
function useDebounce<T extends Ref<any> | ((...args: any) => void)>(value: T, wait?: number): T {
  let result
  // 处理的值是回调函数时
  if (typeof value === 'function') {
    const [args, setArgs] = useState<any>([]);

    const [start] = useTimeout(() => value(...args.value), wait, false)

    result = (...args: any) => { setArgs(args), start() }
  } else {
    // 处理的是 Ref 响应值
    const [debounced, setDebounced] = useState(value.value);

    const [start] = useTimeout(() => setDebounced(value.value), wait, true)

    useEffect(() => {
      start();
    }, [value]);

    result = debounced
  }

  return result;
}

export default useDebounce
