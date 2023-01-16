import { defineComponent } from 'vue'
import { useState, useCurrentInstance, useEffect } from '@arctron-cim/hooks-vue3'

import { ArcBaseBox, ArcBaseLayout, ArcBaseECharts, DataSource, createdCustomGenerator, GeneratorOptsFn, Test } from '@arctron-cim/components-vue3'
import { SeriesOption } from 'echarts'

import Count from './components/Count'

import pkg from '../package.json' assert { type: 'json' };
import BarChart from './components/Bar1';

// 柱状图1： echart 图表配置
const generatorEchartsOption: GeneratorOptsFn = (dataSource, config = {}) => {
  const {xData = []} = config || {}

  const series: SeriesOption[] = dataSource && [dataSource].flat().map(item => ({
    name: item.name,
    type: 'line',
    // barCategoryGap: '-220%',
    // symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
    itemStyle: {
      opacity: 0.6
    },
    emphasis: {
      itemStyle: {
        opacity: 1
      }
    },
    data: [...item.data]
  })) || []

  return {
    grid: {
      top: '12%',
    },
    xAxis: {
      data: [...xData]
    },
    yAxis: {},
    series
  }
}

createdCustomGenerator('bar2', generatorEchartsOption)

const App = defineComponent({
	setup() {
		// app 启动日志
		useCurrentInstance().app.$logs.printBg(['primary', 'success'], '系统版本', `v${pkg.version}`)
		const [dataSource, setDataSource] = useState<DataSource | DataSource[]>([])

		useEffect(() => {
			setDataSource({
				name: '设计资源',
				data: [12, 24, 36, 12, 45]
			})
		}, [])
		return { dataSource }
	},
	render() {
		return (
			<>
				<ArcBaseLayout width='540px' height='auto' layout='right' padding={[12, 24]}>
					<Count class={'mb-5'} />
					<h4 class={'text-emerald-500 font-bold'}>使用 @arctron-cim/components-vue3 内置组件 (暂无内置组件) </h4>
					<ArcBaseBox class={'mb-5'} width='400px' height='120px' radius bgColor={'#f55555'}>
						<ArcBaseECharts type={'bar1'} dataSource={this.dataSource} config={{xData: ['1月', '2月', '3月', '4月', '5月']}} />
					</ArcBaseBox>
					<h4 class={'text-emerald-500 font-bold'}>基于 @arctron-cim/components-vue3 createECharts 创建组件 </h4>
					<ArcBaseBox class={'mb-5'} width='400px' height='120px' radius bgColor={'#559999'}>
						<BarChart dataSource={this.dataSource} config={{xData: ['1月', '2月', '3月', '4月', '5月']}} />
					</ArcBaseBox>
					<h4 class={'text-emerald-500 font-bold'}>基于 @arctron-cim/components-vue3 自定义组件 </h4>
					<ArcBaseBox width='400px' height='120px' radius bgColor={'#559999'}>
						<ArcBaseECharts type={'bar2'} dataSource={this.dataSource} config={{xData: ['1月', '2月', '3月', '4月', '5月']}} />
					</ArcBaseBox>
					<Test label={'12345frefadfdsfaf'} />
				</ArcBaseLayout>
			</>
		)
	}
})

export default App
