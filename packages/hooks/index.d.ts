
declare module '@arctron-cim/hooks' {

  export function useState<T>(state: T): readonly [Ref<UnwrapRef<T>>, (args: UnwrapRef<T> | ((arg: UnwrapRef<T>) => UnwrapRef<T>)) => void]
  
  export function useEffect(fn: () => void | (() => void), deps: Ref<unknown>[]): void
  
  export function useInterval(fn: () => void, wait?: number, immediate?: boolean): readonly [() => number, () => void | 0 | undefined]
}