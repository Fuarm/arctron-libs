import { defineComponent, toRefs } from 'vue'
import { EChartsOption } from "echarts"
import { useState, useECharts } from '@arctron-cim/hooks-vue3'

export type EChartsProps = {
  /**
   * Box 宽，默认单位px，默认单位仅支持 number
   */
  width?: string,
  /**
   * Box 高，默认单位px，默认单位仅支持 number
   */
  height?: string,
  /**
   * echart 配置项
   */
  option?: EChartsOption
}

const ECharts = defineComponent({
	name: 'ArcECharts',
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    option: Object
  },
  setup(props) {
    const { width, height, option } = toRefs(props)

    const [chartRef] = useState<HTMLDivElement | null>(null)

    const echartInstance = useECharts(chartRef, option || {})

    // 生成 style 变量
    const style = { width: width.value, height: height.value }

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
