import { ref, UnwrapRef } from 'vue'
/**
 * useState
 * @public
 * @param state - T
 * @returns 
 */
function useState<T>(state: T) {
	const newState = ref(state)

	const setState = (args: ((arg: T) => T) | T) => {
		args instanceof Function ? (newState.value = args(newState.value as T) as UnwrapRef<T>) : (newState.value = args as UnwrapRef<T>)
	}
	return [newState, setState] as const
}

export default useState
