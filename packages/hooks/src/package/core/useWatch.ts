import { Ref, watch } from "vue";

function useWatch<T extends any>(fn: () => T, deps: Ref<unknown>[]) {
  watch([...deps], fn, { immediate: true })
}

export default useWatch
