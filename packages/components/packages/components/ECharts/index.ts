import type { Plugin } from "vue";
import { withInstall } from '../../utils'
import { BaseChartProps, DataSource } from "../../types/echarts";

import ECharts, { EChartsProps } from './ECharts'

const ArcECharts = withInstall(ECharts)

export {
  ArcECharts,
  EChartsProps,
  BaseChartProps,
  DataSource
}