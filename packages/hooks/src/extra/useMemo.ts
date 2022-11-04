import { Ref, UnwrapRef } from "vue";
import useEffect from "../core/useEffect";
import useState from "../core/useState";

function useMemo<T extends any>(fn: () => T, deps: Ref<unknown>[]) {
  const [result, setResult] = useState<T | undefined>(undefined);
  useEffect(() => setResult(fn()), [...deps])

  return result
}

export default useMemo
