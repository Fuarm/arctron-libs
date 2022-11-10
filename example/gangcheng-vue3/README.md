# `vue3 案例`

## 问题记录

### input v-model 绑定在 tsx 中存在 bug
* backsoace 键删除，最后一个字符删除不了， *解决方案：使用原生开发*
  ```tsx
  // 存在一个ts类型问题， EventTarget 中不存在 value 属性（未深入了解）
  <input type="text" onInput={({target}: Event) => setInput(target?.value) } />
  ```
* 在.vue 文件中 v-model 正常
  ```vue
  <template>
    <h1 class='font-bold text-amber-600'>防抖前: {{input}}</h1>
    <h1 class='font-bold text-emerald-500'>防抖后: {{debounce}}</h1>
    <input type="text"  v-model="input" />
  </template>
  <script lang="ts" setup>
    import { useDebounce, useState } from '@arctron-cim/hooks-vue3';

    const [input] = useState(null)

    const debounce = useDebounce(input)
  </script>
  ```


