import { defineComponent } from 'vue'
import './index.less'

const Button = defineComponent({
	name: 'ArcButton',
	render() {
		return <button class='text-amber-400 arc-botton'>{ this.$slots.default?.() }</button>
	}
})

export default Button