import { Component, defineComponent } from 'vue'
import './index.less'

type BaseBoxProps = {
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

const BaseBox = defineComponent({
	name: 'ArcBaseBox',
  props: {
    width: String,
    height: String,
    bgColor: String,
    bgImage: String,
    blur: Number,
    radius: Number
  },
  setup(props: BaseBoxProps) {
    const { width = '100%', height = '100%', bgColor, bgImage, blur, radius } = props

    console.log(props, bgColor, bgImage, blur, radius)

    // 背景高斯模糊处理
    const blurResult = blur === true ? 'backdrop-blur' : typeof blur === 'number' ? `backdrop-blur-[${blur}px]` : ''

    // 圆角处理
    const radioResult = radius === true ? 'rounded' : typeof blur === 'number' ? `rounded-[${blur}px]` : ''

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
      radius: radioResult
    }
  },
	render() {
		return <div class={`arc-base-box ${this.blur} ${this.radius}`} style={this.style}>{ this.$slots.default?.() }</div>
	}
})

export default BaseBox