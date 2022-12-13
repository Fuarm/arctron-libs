import { defineComponent } from 'vue'
import { useState, useCurrentInstance, useEffect } from '@arctron-cim/hooks-vue3'

import { ArcBaseBox, ArcBaseLayout, ArcBarChart1 } from '@arctron-cim/components-vue3'

import Count from './components/Count'

import pkg from '../package.json' assert { type: 'json' };

const App = defineComponent({
	setup() {
		const [echartsRef] = useState<any>(null)
		// app 启动日志
		useCurrentInstance().app.$logs.printBg(['primary', 'success'], '系统版本', `v${pkg.version}`)
		const [dataSource, setDataSource] = useState<any>(null)

		useEffect(() => {
			setDataSource({
				name: '设计资源',
				data: [12, 24, 36, 12, 45]
			})
		}, [])
		return { echartsRef, dataSource }
	},
	render() {
		return (
			<>
				<ArcBaseLayout width='300px' height='auto' layout='right' padding={[12, 24]}>
					<Count class={'mb-5'} />
					<ArcBaseBox class={'mb-5'} width='260px' height='120px' radius bgColor={'#f55555'}>
						<ArcBarChart1 dataSource={this.dataSource} config={{xData: ['1月', '2月', '3月', '4月', '5月']}} />
					</ArcBaseBox>
				</ArcBaseLayout>
			</>
		)
	}
})

export default App
