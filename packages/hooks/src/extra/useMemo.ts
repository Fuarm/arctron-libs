import { Ref } from "vue";
import useState from "../core/useState";
import useWatch from "../core/useWatch";

function useMemo<T extends any>(fn: () => T, deps: Ref<unknown>[]) {
  const [result, setResult] = useState<T | undefined>(undefined);

  useWatch(() => setResult(fn()), [...deps])

  return result
}

export default useMemo
