import { ref, UnwrapRef } from 'vue'
/**
 * useState
 * @param state - T
 * @returns 
 */
function useState<T>(state: T) {
	const newState = ref<T>(state)

	const setState = (args: ((arg: UnwrapRef<T>) => UnwrapRef<T>) | UnwrapRef<T>) => {
		args instanceof Function ? (newState.value = args(newState.value)) : (newState.value = args)
	}
	return [newState, setState] as const
}

export default useState
