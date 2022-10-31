import { defineComponent } from 'vue'
import { useState, useInterval } from '@arctron-cim/hooks-vue3'

import { ArcButton, ArcBaseBox } from '@arctron-cim/components-vue3'

const App = defineComponent({
	setup() {
		useInterval(() => setState((c: number) => ++c), 1000, true)
		
		const [state, setState] = useState<number>(0)
		return { state }
	},
	render() {
		return <>
			<h1 className='text-amber-600'>港城: {this.state} </h1>
			<ArcBaseBox width='120px' height='120px' radius bgColor={'red'}>
				<ArcButton className='text-white'>港城: {this.state + 2} </ArcButton>
			</ArcBaseBox>
		</>
	}
})

export default App
