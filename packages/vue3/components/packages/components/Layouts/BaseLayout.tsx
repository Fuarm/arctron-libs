import { defineComponent } from 'vue'
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
  layout?: 'left' | 'right'
}

const Baselayout = defineComponent<BaseLayoutProps, any>({
	name: 'ArcBaselayout',
  setup(_, { attrs }) {
    const { width = '100%', height = '100%', bgColor, bgImage, blur, layout = 'left' } = attrs

    // 背景高斯模糊处理
    const blurResult = blur === true ? 'backdrop-blur' : typeof blur === 'number' ? `backdrop-blur-[${blur}px]` : ''

    // 左右布局处理
    const layoutResult = layout === 'left' ? 'items-start' : 'items-end'

    // 背景图片，背景颜色处理，生成 style 变量
    const style = {
      width,
      height,
      '--arc-base-box-bg-color': bgColor,
      '--arc-base-box-bg-image': bgImage && `url(${bgImage})`
    }

    return {
      style: {...style},
      blur: blurResult,
      layout: layoutResult
    }
  },
	render() {
		return <div class={`arc-base-layout flex flex-col ${this.layout} ${this.blur}`} style={this.style}>{ this.$slots.default?.() }</div>
	}
})

export default Baselayout