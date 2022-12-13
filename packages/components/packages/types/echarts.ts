import { EChartsOption } from "echarts";

export type DataSource = {
  name: string;
  data: Array<string | number>
}

export type GeneratorOptsFn = (dataSource: DataSource | DataSource[], config?: {[K: string]: any}) => EChartsOption

export interface BaseChartProps {
  /**
   * Box 宽，默认单位px，默认单位仅支持 number
   */
  width?: string,
  /**
   * Box 高，默认单位px，默认单位仅支持 number
   */
  height?: string,
  /**
   * 图表 key
   */
  type?: string,
  /**
   * echart 数据源
   */
  dataSource: DataSource | DataSource[],
  /**
   * echart 配置
   */
  config?: any
}
