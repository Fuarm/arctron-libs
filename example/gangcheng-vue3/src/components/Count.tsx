import { ArcBaseBox } from "@arctron-cim/components-vue3"
import { useInterval, useState } from "@arctron-cim/hooks-vue3"
import { defineComponent } from "vue"

function Count() {
  const [state, setState] = useState<number>(0)
  useInterval(() => setState((c: number) => ++c), 1000, true)
  return () => (
    <ArcBaseBox class={'my-4'} width='140px' height='80px' radius bgColor={'#559999'}>
      <h1 class={'text-white'}>计数: {state.value}</h1>
    </ArcBaseBox>
  )
}

export default defineComponent(Count)
