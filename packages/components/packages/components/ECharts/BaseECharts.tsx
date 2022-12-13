import { useEffect, useState } from '@arctron-cim/hooks-vue3'
import { EChartsOption } from 'echarts'
import { defineComponent, toRefs } from 'vue'
import { BaseChartProps, GeneratorOptsFn } from '../../types/echarts'
import ECharts from '../ECharts/ECharts'

/**
 * 创建 echarts 组件
 * @param generatorEchartsOption 
 * @returns 
 */
function createECharts(generatorEchartsOptionFn: GeneratorOptsFn) {

  function createComponent(props: BaseChartProps) {
    const { width, height, dataSource, config } = toRefs(props)

    const [chartOpts, setChartOpts] = useState<EChartsOption>({});

    useEffect(() => {
      const chartOpts1 = generatorEchartsOptionFn(dataSource.value, config?.value)
      setChartOpts(chartOpts1)
    }, [dataSource])

    return () => (
      <ECharts width={width?.value} height={height?.value} option={chartOpts.value} />
    )
  }

  const BaseECharts = defineComponent(createComponent)

  BaseECharts.name  = 'ArcBaseECharts'
  BaseECharts.props = ['width', 'height', 'dataSource', 'config']

  return BaseECharts
}
 
export { createECharts }

