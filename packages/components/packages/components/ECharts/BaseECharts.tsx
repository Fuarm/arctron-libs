import { useEffect, useState } from '@arctron-cim/hooks-vue3'
import { EChartsOption } from 'echarts'
import { defineComponent, toRefs } from 'vue'
import { BaseChartProps, GeneratorOptsFn } from '../../types/echarts'
import ECharts from '../ECharts/ECharts'

// 内置存储器 - 存储 柱状图 折线图 面积图 等多种图表配置生成函数
const interGeneratorMap = new Map();
// 自定义存储器 - 允许用户自定义图表配置生成函数
const customGeneratorMap = new Map();

/**
 * 创建 echarts 组件
 * @param generatorEchartsOption 
 * @returns 
 */
function createECharts(generatorEchartsOptionFn?: GeneratorOptsFn) {

  function createComponent(props: BaseChartProps) {
    const { width, height, type, dataSource, config } = toRefs(props)

    const [chartOpts, setChartOpts] = useState<EChartsOption>({});

    useEffect(() => {
      const generatorFn = interGeneratorMap.get(type?.value) || customGeneratorMap.get(type?.value) || generatorEchartsOptionFn
      const chartOpts1 = generatorFn?.(dataSource.value, config?.value)
      setChartOpts(chartOpts1)
    }, [dataSource])

    return () => (
      <ECharts width={width?.value} height={height?.value} option={chartOpts.value} />
    )
  }

  const BaseECharts = defineComponent(createComponent)

  BaseECharts.name  = 'ArcBaseECharts'
  BaseECharts.props = ['width', 'height', 'type', 'dataSource', 'config']

  return BaseECharts
}

/**
 * 创建内置图表组件生成器
 * @param key - 组件 type
 * @param generatorFn - 生成器函数
 */
function createInterGenerator(key: string, generatorFn: GeneratorOptsFn) {
  interGeneratorMap.set(key, generatorFn)
}

/**
 * 创建自定图表组件生成器
 * @param key - 组件 type
 * @param generatorFn - 生成器函数
 */
function createdCustomGenerator(key: string, generatorFn: GeneratorOptsFn) {
  customGeneratorMap.set(key, generatorFn)
}

const BaseECharts = createECharts()
 
export {
  BaseECharts as default,
  createECharts,
  createInterGenerator,
  createdCustomGenerator
}

