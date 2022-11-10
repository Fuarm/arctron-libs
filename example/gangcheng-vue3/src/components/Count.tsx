import { ArcBaseBox } from "@arctron-cim/components-vue3"
import { useInterval, useState, useCountdown, useDebounce } from "@arctron-cim/hooks-vue3"
import { defineComponent } from "vue"

function Count() {
  const [state, setState] = useState<number>(0)
  useInterval(() => setState((c: number) => ++c), 1000, true)
  const [leftTime, _, reset] = useCountdown({targetDate: Date.now() +  20 * 1000}, false)
  const [input, setInput] = useState<string | null>(null)
  const [input2, setInput2] = useState<string | null>(null)

  const debounce = useDebounce(input)

  const debounce2 = useDebounce((e: Event) => setInput2(e?.target?.value))

  return () => (
    <ArcBaseBox width='240px' height='auto' radius bgColor={'#559999'} padding={[12]}>
      <h1 class={'text-gray-700 font-bold'}>计数: {state.value}</h1>
      <h1 class={'text-red-600 font-bold'} onClick={() => reset()}>倒计时: {Math.round(leftTime.value / 1000)}</h1>
      <h1 class={'text-amber-600 font-bold'}>防抖前: {input.value}</h1>
      <h1 class={'text-emerald-500 font-bold'}>防抖后: {debounce.value}</h1>
      <input type="text" onInput={({target}: Event) => setInput(target?.value) } />
      <h1 class={'text-amber-600 font-bold'}>防抖函数: {input2.value}</h1>
      <input type="text" onInput={debounce2} />
    </ArcBaseBox>
  )
}

export default defineComponent(Count)
