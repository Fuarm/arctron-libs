import { ref, UnwrapRef } from 'vue'
/**
 * state
 * @param {*} state
 */
function useState<T>(state: T) {
	const newState = ref<T>(state)

	const setState = (args: ((arg: UnwrapRef<T>) => UnwrapRef<T>) & UnwrapRef<T>) => {
		typeof state === 'function' ? (newState.value = args(newState.value)) : (newState.value = args)
	}
	return [newState, setState]
}

export default useState
