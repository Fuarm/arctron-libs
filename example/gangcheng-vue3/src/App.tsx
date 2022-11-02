import { defineComponent } from 'vue'
import { useState, useInterval } from '@arctron-cim/hooks-vue3'

import { ArcBaseBox, ArcBaseLayout, ArcECharts } from '@arctron-cim/components-vue3'

const App = defineComponent({
	setup() {
		const [echartsRef] = useState(null)
		const [state, setState] = useState<number>(0)

		useInterval(() => setState((c: number) => ++c), 1000, true)

		return { state, echartsRef }
	},
	render() {
		return (
			<ArcBaseLayout width='300px' height='100vh' layout='right'>
				<h1 className={'text-amber-700'}>港城: {this.state} </h1>
				<ArcBaseBox width='120px' height='120px' radius bgColor={'#323232'}>
					<ArcECharts ref={'echartsRef'} />
				</ArcBaseBox>
			</ArcBaseLayout>
		)
	}
})

export default App
