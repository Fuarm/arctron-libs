import { defineComponent } from 'vue'
import { useState, useInterval } from '@arctron-cim/hooks-vue3'

import { ArcBaseBox, ArcBaseLayout, ArcECharts } from '@arctron-cim/components-vue3'

const App = defineComponent({
	setup() {
		useInterval(() => setState((c: number) => ++c), 1000, true)
		
		const [state, setState] = useState<number>(0)
		return { state }
	},
	render() {
		return (
			<ArcBaseLayout width='300px' height='100vh' layout='right'>
				<h1 className='text-amber-600'>港城: {this.state} </h1>
				<ArcBaseBox width='120px' height='120px' radius bgColor={'blue'}>
					<ArcECharts />
				</ArcBaseBox>
			</ArcBaseLayout>
		)
	}
})

export default App
