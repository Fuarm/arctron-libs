import { defineComponent } from 'vue'

const Button = defineComponent({
	name: 'ArcButton',
	render() {
		return <h1 className='text-amber-400'>{this.$slots.default()}</h1>
	}
})

export default Button