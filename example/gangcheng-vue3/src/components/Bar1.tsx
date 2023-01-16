import { createECharts, GeneratorOptsFn } from '@arctron-cim/components-vue3'
import { SeriesOption } from 'echarts'

// 柱状图1： echart 图表配置
const generatorEchartsOption: GeneratorOptsFn = (dataSource, config = {}) => {
  const {xData = []} = config || {}

  const series: SeriesOption[] = dataSource && [dataSource].flat().map(item => ({
    name: item.name,
    type: 'pictorialBar',
    barCategoryGap: '-220%',
    symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
    itemStyle: {
      // opacity: 0.6
    },
    emphasis: {
      itemStyle: {
        color: `rgba(255, 255, 255, 1)`
      }
    },
    data: [0, ...item.data.map((item, i) => ({
      value: item,
      itemStyle: {
        color: `rgba(255, 255, 255, ${0.8 - i * 0.15})`
      }
    })), 0]
  })) || []

  return {
    grid: {
      top: '12%',
    },
    xAxis: {
      data: ['', ...xData, '']
    },
    yAxis: {},
    series
  }
}

/**
 * 柱状图图表组件1
 */
const BarChart = createECharts(generatorEchartsOption)

// 重写组件 name
BarChart.name = 'ArcBarChart'

export default BarChart

