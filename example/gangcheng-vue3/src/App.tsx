import { defineComponent } from 'vue'
import { useState, useInterval } from '@arctron-cim/hooks-vue3'

import { ArcButton } from '@arctron-cim/components-vue3'

const App = defineComponent({
	setup() {
		useInterval(() => setState((c: number) => ++c), 1000, true)
		
		const [state, setState] = useState<number>(0)
		return { state }
	},
	render() {
		return <>
			<h1 className='text-amber-600'>港城: {this.state} </h1>
			<ArcButton className='text-amber-800'>港城: {this.state + 2} </ArcButton>
		</>
	}
})

export default App
