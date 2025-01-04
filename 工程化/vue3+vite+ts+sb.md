# 项目搭建
## 开发流程链路配置：
- 初始化项目（包管理器+开发/构建工具） 
- 各类开发工具配置（TS + 样式预处理器 + Lint + Git工具 + 前端测试 + 格式化等）
- 测试辅助工具的可用性及适用性
- 功能/业务代码开发（本文不涉及）
- 校验、测试、规范化、Git操作等

## 学习链接

- [vite 配置+调试+构建上传](https://juejin.cn/post/7313761724338618395):创建项目
- [项目基础配置学习](https://www.cnblogs.com/fanqshun/p/16549011.html)
- [组件开发配置](https://www.cnblogs.com/chun321/p/17824084.html)
- [Monorepo(pnpm + workspace)+ vitepress + install](https://juejin.cn/post/7120893568553582622)
- [使用 storybook 创建 vue 项目组件使用指南](https://juejin.cn/post/7346481513541189667)
- [vite + vue3 + storybook + ts 搭建 vue 组件库记录](https://blog.csdn.net/qq_35459724/article/details/130848582)
- [npm link 本地调试](https://juejin.cn/post/6987716839639875591)
- [npm link 本地调试](https://blog.csdn.net/zz00008888/article/details/130271766)


# 创建项目

```shell
mkdir comProject

cd comProject

npx storybook@next init 
```

# vite打包配置

```javascript
// vite.config.ts
import { defineConfig } from "vite";
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true, // 允许在 Less 中使用 JavaScript 表达式
        globalVars: {
          // 全局变量
        }
      },
    }
  },
  build: {
    lib: {
      // 入口文件将包含可以由你的包的用户导入的导出
      entry: resolve(__dirname, "src/index.ts"),
      name: "mthBusinessCom",
      fileName: (format) => `index.${format}.js`,
    },
    // rollupOptions: {
    //   // 确保外部化处理那些你不想打包进库的依赖
    //   external: ["vue"],
    //   output: {
    //     // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
    //     globals: {
    //     },
    //   },
    // },
  },
});

```

# 导出文件配置

```javascript
// package.json
"type": "module",
"files": [
  "dist" // npm publish 的时候只上传dist
],
"exports": {
  ".": {
    "import": "./dist/index.es.js",
    "require": "./dist/index.umd.js"
  },
  "./style": "./dist/style.css"
},
"dependencies": {
  "axios": "^1.7.7",
  "element-plus": "^2.8.7",
  "vue": "^3.5.12"
},

```

# 调试

1. 在组件根目录下执行
```shell
npm link

```
2. 复制项目的文件路径（/zoey/projects/vue3+vite+ts+sb）
3. 在需要引入组件的项目根目录，运行命令
```shell
npm link 组件项目路径 # 醒目路径：/zoey/projects/vue3+vite+ts+sb
```

# 构建&上传组件

```shell
yarn build

npm login

npm publish

```
# 使用组件库

```js
// main.js

import { SnailButton } from 'business-components'
import 'business-components/style.css'

app.component('SnailButton', SnailButton) // 下载组件
```
```html
<SnailButton label="测试" primary size="large" />
```
# 按需引入element-plus
- [elemen-plus官网按需引入](https://element-plus.org/zh-CN/guide/quickstart.html#%E6%8C%89%E9%9C%80%E5%AF%BC%E5%85%A5)

首先你需要安装unplugin-vue-components 和 unplugin-auto-import这两款插件

```shell
npm install -D unplugin-vue-components unplugin-auto-import
```
然后把下列代码插入到你的 Vite 或 Webpack 的配置文件中
```ts
// vite.config.ts
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
```
## 按需导入的原理
- [按需加载](https://juejin.cn/post/6968505746757533710#heading-12)
- [按需加载](https://pengzhenglong.github.io/2022/03/27/%E7%BB%84%E4%BB%B6%E5%BA%93%E6%8C%89%E9%9C%80%E5%8A%A0%E8%BD%BD%E5%8E%9F%E7%90%86%E5%88%86%E6%9E%90/)
# 包版本管理自动化
- (standard-version)[https://github.com/conventional-changelog/standard-version]
- (release-it)[https://github.com/release-it/release-it]
- (changeset)[https://github.com/changesets/changesets]
- (bumpp)[https://github.com/antfu-collective/bumpp]
- (np)[https://github.com/sindresorhus/np]

# 按需引入element-plus 后的样式隔离
1. 安装 sass
```shell
npm i sass -D
```
2. element-plus组件修改命名空间
```html
<!-- App.vue -->
<template>
  <el-config-provider namespace="bus-com">
	<!-- element-plus组件 -->
  </el-config-provider>
</template>
```
3. 在src的styles文件夹下新建element.scss文件

```scss
// src/styles/element.scss
@forward 'element-plus/theme-chalk/src/mixins/config.scss' with (
  $namespace: 'bus-com'
);
// 按需引入
@use "element-plus/theme-chalk/src/overlay.scss" as *;
@use "element-plus/theme-chalk/src/loading.scss" as *;
@use "element-plus/theme-chalk/src/message.scss" as *;
@use "element-plus/theme-chalk/src/message-box.scss" as *;

// 全量引入
// @use "element-plus/theme-chalk/src/index.scss" as *;
```
4. 修改vite.config.js

```js
// vite.config.js
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
defineConfig(
  {
    plugins: [
      Components({
        resolvers: [ElementPlusResolver({
          importStyle: 'sass',
        })],
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/element.scss" as *;`,
        },
      },
    },
  }
)

```

# storybook服务添加接口请求代理

1. 安装 http-proxy-middleware 依赖包
```shell
npm install http-proxy-middleware --save-dev
```
2. 在\.storybook文件夹中新建：middleware.js
```js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function expressMiddleware(router) {
	router.use(
		"/api",
		createProxyMiddleware({
			target: "http://youdomain.com",
			changeOrigin: true,
		})
	);
};
```


# 问题

## npm login
- https://juejin.cn/post/7070798566326796319
npm config set registry https://registry.npmjs.org/
