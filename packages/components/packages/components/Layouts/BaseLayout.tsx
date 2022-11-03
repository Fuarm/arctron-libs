import { defineComponent } from 'vue'
import type { Tuple } from '../../types'
import './index.less'

export type BaseLayoutProps = {
  /**
   * Box 宽，默认单位px，默认单位仅支持 number
   */
  width?: string | number,
  /**
   * Box 高，默认单位px，默认单位仅支持 number
   */
  height?: string | number,
  /**
   * Box 背景色， --arc-base-box-bg-color 变量修改
   */
  bgColor?: string,
  /**
   * Box 背景图片， --arc-base-box-bg-image 变量修改
   */
  bgImage?: string,
  /**
   * Box 背景高斯模糊，默认单位px， 默认高斯 8px
   */
  blur?: number | boolean,
  /**
   * 布局：左右布局
   */
  layout?: 'left' | 'right',
  /**
   * 边距：设置容器内边距
   */
  padding?: Tuple<number, 2 | 3 | 4>
}

function Baselayout(props: BaseLayoutProps, { slots }) {
  const { width = '100%', height = '100%', bgColor, bgImage, blur, layout = 'left', padding } = props

  // 背景高斯模糊处理
  const blurResult = blur === true ? 'backdrop-blur' : ''

  // 左右布局处理
  const layoutResult = layout === 'left' ? 'items-start' : 'items-end'

  // 背景图片，背景颜色处理，生成 style 变量
  const style = {
    width,
    height,
    backdropFilter: typeof blur === 'number' ? `blur(${blur}px)` : undefined,
    padding: padding?.map(item => item + 'px').join(' '),
    '--arc-base-box-bg-color': bgColor,
    '--arc-base-box-bg-image': bgImage && `url(${bgImage})`
  }

  return () => <div class={['arc-base-layout flex flex-col', layoutResult, blurResult]} style={style}>{ slots.default?.() }</div>
}

const BaselayoutComp = defineComponent(Baselayout)

BaselayoutComp.name  = 'ArcBaselayout'
BaselayoutComp.props = ['width', 'height', 'bgColor', 'bgImage', 'blur', 'layout', 'padding']

export default BaselayoutComp