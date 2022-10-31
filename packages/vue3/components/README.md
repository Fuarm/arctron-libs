# `components`

> TODO: description
> 注意：采用 rollup 打包 vue3 组件 rollup-plugin-vue v6.0.0 打包失败

## Usage

```
const components = require('components');

// TODO: DEMONSTRATE API
```

## 问题记录

#### 1、使用 rollup-config-postcss 插件以及 postcss.config.js 文件配置 配置项处 plugins 外，无效（extract）
    
#### 2、gulp 不能使用 gulpfile.ts 配置 （未解决），使用 gulpfile.js 使用 import 语法，在 `package.json` 中配置 `"type": "module"` 导致 `postcss.config.js` 不受支持
        
    问题1、2 解决方案：将 postcss.config.js 文件从项目根目录移动到 config 目录， 手动 import 引入配置

```js
// postcss.congfig.js
import path from 'path'

export default {
  plugins: [],
  extract: path.resolve('lib/index.css'),
}

// rollup.config.js
import postcssConfig from './postcss.config.js'

// rollup 配置项
const rollupConfig = {
  plugins: [
    postcss(postcssConfig),
  ],
}
export default rollupConfig
```
