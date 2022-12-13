import { EChartsOption, SeriesOption } from 'echarts'
import { defxAxis, defyAxis, defGrid } from '../../constant/echartsConfig'
import { DataSource, GeneratorOptsFn } from '../../types/echarts'
import { createECharts } from '../ECharts/baseECharts'

// 柱状图1： echart 图表配置
const generatorEchartsOption: GeneratorOptsFn = (dataSource, config = {}) => {
  const {xData = []} = config || {}

  const series: SeriesOption[] = dataSource && [dataSource].flat().map(item => ({
    name: item.name,
    type: 'pictorialBar',
    barCategoryGap: '-220%',
    symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
    itemStyle: {
      opacity: 0.6
    },
    emphasis: {
      itemStyle: {
        opacity: 1
      }
    },
    data: [0, ...item.data, 0]
  })) || []

  return {
    grid: {
      ...defGrid,
    },
    xAxis: {
      ...defxAxis,
      data: ['', ...xData, '']
    },
    yAxis: defyAxis,
    series
  }
}

/**
 * 柱状图组件1
 * @param props 
 * @returns 
 */
const BarChart1 = createECharts(generatorEchartsOption)

BarChart1.name = 'ArcBarChart1'

export default BarChart1

