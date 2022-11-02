import { defineComponent } from 'vue'
import './index.less'

export type BaseBoxProps = {
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
   * Box 圆角，默认单位px， 默认圆角 4px
   */
  radius?: number | boolean
}

function BaseBox(props: BaseBoxProps, { slots }) {
  const { width = '100%', height = '100%', bgColor, bgImage, blur, radius } = props

  // 背景高斯模糊处理
  const blurResult = blur === true ? 'backdrop-blur' : typeof blur === 'number' ? `backdrop-blur-[var(--arc-base-box-backdrop-blur)]` : ''

  // 圆角处理
  const radiusResult = radius === true ? 'rounded' : typeof radius === 'number' ? `rounded-[var(--arc-base-box-radius)]` : ''

  // 背景图片，背景颜色处理，生成 style 变量
  const style = {
    width,
    height,
    '--arc-base-box-bg-color': bgColor,
    '--arc-base-box-bg-image': bgImage && `url(${bgImage})`,
    '--arc-base-box-backdrop-blur': typeof blur === 'number' ? `${blur}px` : undefined,
    '--arc-base-box-radius':  typeof radius === 'number' ? `${radius}px` : undefined
  }

  return () => <div class={['arc-base-box', blurResult, radiusResult]} style={{...style}}>{ slots.default?.() }</div>
}

const BaseBoxComp = defineComponent(BaseBox)

BaseBoxComp.name  = 'ArcBaseBox'
BaseBoxComp.props = ['width', 'height', 'bgColor', 'bgImage', 'blur', 'radius']

export default BaseBoxComp