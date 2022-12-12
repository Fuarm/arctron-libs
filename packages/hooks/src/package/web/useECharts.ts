import { init, EChartsType } from "echarts"
import { Ref } from "vue"
import useEffect from "../core/useEffect"
import useState from '../core/useState'

/**
 * 图表
 * @param {*} querySelect 元素
 * @param {*} option echart 配置
 */
function useECharts<O extends {}, E extends HTMLElement>(querySelect: string | Ref<E | null>, option: Ref<O>, deps: Ref<unknown>[] = []) {

  let [chartInstance, setChartInstance] = useState<EChartsType | null>(null)

  useEffect(() => {
    const element = typeof querySelect !== "string"
        ? querySelect.value
        : document.querySelector<E>(querySelect)
    
    /**
     * 使用响应式 ref 绑定 echart init 对象，导致tooltip-trigger: 'axis' 无效
     * 使用局部对象
     */
    const _chartInstance = chartInstance.value?.isDisposed() ? chartInstance.value : element ? init(element) : null
    _chartInstance?.setOption(option.value, true)
    setChartInstance(_chartInstance as EChartsType)
    
    return () => setChartInstance(_chartInstance?.dispose() || null);
  }, [option, ...deps])

  return chartInstance as Ref<EChartsType>
}

export default useECharts
