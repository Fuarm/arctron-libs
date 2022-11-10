import { Ref } from "vue";
import useEffect from "../core/useEffect";

function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void
): void

function useEventListener<K extends keyof HTMLElementEventMap, T extends HTMLElement = HTMLDivElement>(
  eventName: K,
  handlerhandler: (event: HTMLElementEventMap[K], element?: Ref<T>) => void,
  element?: Ref<T>
): void

function useEventListener<W extends keyof WindowEventMap, H extends keyof HTMLElementEventMap, T extends HTMLElement = HTMLDivElement>(
  eventName: W | H,
  handler: (event: WindowEventMap[W] | HTMLElementEventMap[H] | Event, element?: Ref<T>) => void,
  element?: Ref<T>
) {
  useEffect(() => {
    // Define the listening target
    const targetElement: T | Window = element?.value || window;
    if (!(targetElement && targetElement.addEventListener)) {
      return;
    }

    targetElement.addEventListener(eventName, handler);

    // Remove event listener on cleanup
    return () => {
      targetElement.removeEventListener(eventName, handler);
    };
  }, [element!]);
}

export default useEventListener
