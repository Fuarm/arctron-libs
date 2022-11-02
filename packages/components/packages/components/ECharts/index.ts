import type { Plugin } from "vue";
import { withInstall } from '../../utils'

import ECharts, { EChartsProps } from './ECharts'

const ArcECharts = withInstall(ECharts)

export { ArcECharts, EChartsProps }