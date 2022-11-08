import { Ref, watch } from "vue";

function useWatch<T extends any>(fn: () => T, deps: Ref<unknown>[]) {
	deps.length === 0
  ? fn()
  : watch([...deps], fn, { immediate: true })
}

export default useWatch
