import type { Plugin } from "vue";
import { withInstall } from '../../utils'
import { BaseChartProps, DataSource, GeneratorOptsFn } from "../../types/echarts";

import ECharts, { EChartsProps } from './ECharts'
import BaseECharts, { createECharts, createdCustomGenerator } from './BaseECharts'

const ArcECharts = withInstall(ECharts)
const ArcBaseECharts = withInstall(BaseECharts)

export {
  ArcECharts,
  ArcBaseECharts,
  EChartsProps,
  BaseChartProps,
  DataSource,
  GeneratorOptsFn,
  createECharts,
  createdCustomGenerator
}