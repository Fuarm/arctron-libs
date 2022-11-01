import { defineComponent } from 'vue'
import { EChartsOption } from "echarts"
import { useState, useECharts } from '@arctron-cim/hooks-vue3'

export type EChartsProps = {
  /**
   * Box 宽，默认单位px，默认单位仅支持 number
   */
  width?: string | number,
  /**
   * Box 高，默认单位px，默认单位仅支持 number
   */
  height?: string | number,
  /**
   * echart 配置项
   */
  option?: EChartsOption
}

const ECharts = defineComponent({
	name: 'ArcECharts',
  props: {
    width: String,
    height: String,
    option: Object
  },
  setup(props) {
    const { width = '100%', height = '100%', option = {} } = props

    const [chartRef] = useState<HTMLDivElement | null>(null)

    const [optionRef] = useState<EChartsOption>(option)

    const echartInstance = useECharts(chartRef, option, [chartRef, optionRef])

    // 生成 style 变量
    const style = {
      width,
      height
    }

    return {
      chartRef,
      echartInstance,
      style: {...style}
    }
  },
	render() {
		return <div ref={'chartRef'} style={this.style}></div>
	}
})

export default ECharts
