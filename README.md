# `Arctron 私仓`

> 包含 hooks、echarts、layouts 等核心库，以及 金环、港城等项目通用组件库 components

> 案例 example 中包含 港城项目

## 构建 打包

```
```

## 问题记录

### 使用 vue3 + tsx + swc + webpack
* swc中没有vue运行时插件，使用第三方 vue-jsx-runtime 插件, 配置.swcrc
  ```json
  "jsc": {
    "transform": {
      "react": {
        "runtime": "automatic",
        "importSource": "vue-jsx-runtime"
      }
    },
  }
  ```
* webpack 配置 vue 文件解析
  ```js
  rules: [
    {
      test: /\.vue/,
      use: {
        loader: "vue-loader"
      }
    },
  ]
  ```
* 引用 tsx 文件 eslint 报错：`Missing file extension for "./App"`

  需要使用一个库 `eslint-import-resolver-typescript` 配置 eslint
  ```yaml
  settings:
  - import/resolver:
    - typescript: {}
  ```

### microbundle 打包控制打包文件范围 ***未解决***
