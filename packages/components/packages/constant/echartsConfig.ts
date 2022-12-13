import { XAXisComponentOption, YAXisComponentOption } from "echarts"

// 基础的字体大小
export const defSize = 14

// 基础的颜色序列
export const defColors = []

// 基础的 tooltip 配置
export const defTooltip = {}

// 基础的 grid
export const defGrid = {
  top: '12%',
  left: '12%',
  right: '6%',
  bottom: '24%'
}

// 基础的 xAxis
export const defXAxis: XAXisComponentOption = {
  axisLine: {
    show: true, // 隐藏X轴轴线
    lineStyle: {
      color: 'rgba(255, 255, 255, 0.45)'
    }
  },
  axisTick: {
    show: false // 隐藏X轴刻度
  },
  axisLabel: {
    show: true,
    margin: 10,
    fontSize: defSize,
    color: 'rgba(255, 255, 255, 0.85)' // X轴文字颜色
  }
}

// 基础的 yAxis
export const defYAxis: YAXisComponentOption = {
  axisLabel: {
    show: true,
    margin: 10,
    fontSize: defSize,
    color: 'rgba(255, 255, 255, 0.85)' // X轴文字颜色
  },
  splitLine: {
    lineStyle: {
      type: 'dashed',
      color: 'rgba(255, 255, 255, 0.45)'
    }
  }
}