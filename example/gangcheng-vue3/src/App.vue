<template>
  <h1 className='text-amber-600'>港城: {{state}} </h1>
  <ArcBaseBox width='120px' height='120px' :radius="true" bg-color='red'>
    <ArcButton className='text-white'>港城: {{state}} </ArcButton>
  </ArcBaseBox>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useState, useInterval } from '@arctron-cim/hooks-vue3'

// 全局注册组件，jsx 不支持，未找到解决方案，vue sfc 支持
import { ArcButton, ArcBaseBox } from '@arctron-cim/components-vue3'
export default defineComponent({
	components: {
		ArcBaseBox,
		ArcButton
	},
	setup() {
		useInterval(() => setState((c: number) => ++c), 1000, true)
		
		const [state, setState] = useState<number>(0)
		return { state }
	},
})
</script>