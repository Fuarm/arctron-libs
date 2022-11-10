import { watch, onMounted, onUnmounted, Ref } from 'vue'
/**
 * useEffect
 * @public
 * @param fn - 执行函数
 * @param deps - 依赖
 */
function useEffect(fn: () => void | (() => void), deps: Ref<unknown>[]) {
	// 卸载执行函数
	let returnFn: void | (() => void)

	// 存在依赖监听，依赖不存在挂载后运行
	deps.length === 0
		? onMounted(() => (returnFn = fn()))
		: onMounted(() => watch([...deps], () => (returnFn = fn()), { immediate: true }))

	// 卸载后执行
	onUnmounted(() => returnFn && returnFn())
}

export default useEffect
