/* eslint-disable import/no-extraneous-dependencies */
import path from 'path'
// import { RollupOptions } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import vueJsx from 'rollup-plugin-vue-jsx-compat'
import { swc, minify, defineRollupSwcOption } from 'rollup-plugin-swc3';
import postcss from 'rollup-plugin-postcss'
import postcssConfig from './postcss.config.js'

import pkg from '../package.json' assert { type: 'json' };

const paths = {
  input: path.join('./packages/arctron/index.ts'),
  output: path.join('./lib'),
}

// rollup 配置项
const rollupConfig = {
  input: paths.input,
  output: [
    // 输出 commonjs 规范的代码
    {
      file: path.join(paths.output, 'index.js'),
      format: 'cjs',
      name: pkg.name,
    },
    // 输出 es 规范的代码
    {
      file: path.join(paths.output, 'index.esm.js'),
      format: 'es',
      name: pkg.name,
    },
  ],
  external: [
    // ...Object.keys(pkg.dependencies),
    'vue'
  ], // 指出应将哪些模块视为外部模块，如 Peer dependencies 中的依赖
  // plugins 需要注意引用顺序
  plugins: [

    // ts 的功能只在于编译出声明文件，所以 target 为 ESNext，编译交给 babel 来做
    typescript(),

    vueJsx(),

    swc(),

    postcss(postcssConfig),

    minify()
  ],
}
export default rollupConfig