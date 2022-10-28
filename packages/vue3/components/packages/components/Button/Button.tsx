import { defineComponent } from 'vue'

const Button = defineComponent({
	name: 'ArcButton',
	render() {
		return <button class='text-amber-400'>{ this.$slots.default?.() }</button>
	}
})

export default Button