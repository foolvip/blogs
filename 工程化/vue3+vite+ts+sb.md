# 项目搭建

- [vite 配置+调试+构建上传](https://juejin.cn/post/7313761724338618395)
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


# 问题

## npm login
- https://juejin.cn/post/7070798566326796319
npm config set registry https://registry.npmjs.org/
