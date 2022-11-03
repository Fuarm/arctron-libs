import { defineComponent } from 'vue'
import { useState, useCurrentInstance } from '@arctron-cim/hooks-vue3'

import { ArcBaseBox, ArcBaseLayout, ArcECharts } from '@arctron-cim/components-vue3'

import Count from './components/Count'

const App = defineComponent({
	setup() {
		const [echartsRef] = useState(null)
		// app 启动日志
		useCurrentInstance().app.$logs.printBg(['primary', 'success'], '系统版本', 'v1.0.24.beta.12')

		return { echartsRef }
	},
	render() {
		return (
			<ArcBaseLayout width='300px' height='100vh' layout='right' padding={[12, 24]}>
				<Count />
				<ArcBaseBox width='120px' height='120px' radius bgColor={'#f55555'} bgImage={'https://i.scdn.co/image/ab6761610000e5eb006ff3c0136a71bfb9928d34'}>
					<ArcECharts ref={'echartsRef'} />
				</ArcBaseBox>
			</ArcBaseLayout>
		)
	}
})

export default App
