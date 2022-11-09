import { ArcBaseBox } from "@arctron-cim/components-vue3"
import { useInterval, useState, useCountdown, useTimeout } from "@arctron-cim/hooks-vue3"
import { defineComponent } from "vue"

function Count() {
  const [state, setState] = useState<number>(0)
  useInterval(() => setState((c: number) => ++c), 1000, true)
  const [leftTime, _, reset] = useCountdown({leftTime: 60 * 1000}, false)


  return () => (
    <ArcBaseBox width='240px' height='120px' radius bgColor={'#559999'} padding={[12]}>
      <h1 class={'text-gray-700 font-bold'}>计数: {state.value}</h1>
      <h1 class={'text-red-600 font-bold'} onClick={() => reset()}>倒计时: {Math.round(leftTime.value / 1000)}</h1>
    </ArcBaseBox>
  )
}

export default defineComponent(Count)
