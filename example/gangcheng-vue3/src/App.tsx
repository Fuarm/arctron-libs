import { defineComponent } from 'vue'
import { useState, useCurrentInstance } from '@arctron-cim/hooks-vue3'

import { ArcBaseBox, ArcBaseLayout, ArcECharts } from '@arctron-cim/components-vue3'

import Count from './components/Count'

import pkg from '../package.json' assert { type: 'json' };

const App = defineComponent({
	setup() {
		const [echartsRef] = useState<any>(null)
		// app 启动日志
		useCurrentInstance().app.$logs.printBg(['primary', 'success'], '系统版本', `v${pkg.version}`)

		return { echartsRef }
	},
	render() {
		return (
			<>
				<ArcBaseLayout width='300px' height='auto' layout='right' padding={[12, 24]}>
					<Count class={'mb-6'} />
					<ArcBaseBox width='120px' height='120px' radius bgColor={'#f55555'}>
						<ArcECharts ref={'echartsRef'} />
					</ArcBaseBox>
				</ArcBaseLayout>
			</>
		)
	}
})

export default App
