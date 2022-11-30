## 项目从内容中心里拉出来的，当成一个独立的项目来使用维护 【2022.08.09】

### VITE 启动 流程 【 2022.07.16 】
 - cd 到这个目录
 - npx vite --port 5099
 - 好了
 - （热更新一秒都不到，你不用吗？

#### 坑
 - vite 启动后 所有接口初始都会499
 - 原因是 请求头 丢了 cookie 里面的 userid 和 token

解决方法：
 1. 手动传入hardcode的 userid 和 token （没测过，但感觉会有问题）
 2. cookie.get（userid 和 token）【正在用】（但是需要在项目根目录先 yarn start 一下，然后再cd到本目录 vite。。）

### TODO:

- 入口收缩


### ❗️❗️❗ 仓库 开发规范 【 2021.12.16 】

- 我们使用 twind 来写 css [快速上手](https://tezign.feishu.cn/docs/doccnKHJoGCcVKIh8KdVVSZSpsdm)

- 我们使用 Recoil 来做状态管理 [快速上手](https://tezign.feishu.cn/docs/doccnYAPYp9inQcEC8Ym8uK0YCg)

- 通用工具库 ahooks + ramda

- fetch 封装 ahooks/useRequest（原理查看 useSWR 官网）

- dayjs 替换 moment

- lodash 和 export default 的看到直接**财务处报道**

- 我们约定单个文件的总行数控制在 **140** 行

- 我们这样做多人协作 code review

  - 项目开发总分支：feat/content-2.XX.0
  - 单人开发分支：feat/content-2.XX.0-[your-name]
  - 每晚**六点**面对面 review code
  - feat/content-2.XX.0-[your-name] merge to feat/content-2.XX.0

### 启动项目

`yarn start`

### 打包项目

`yarn run build`

### 项目结构说明

```
├── src/
│   ├── assets/ 静态资源目录
│   ├── utils/ 公用方法目录
│   ├── components/ 组件目录
│   ├── locales/ 国际化文件目录
│   ├── pages/ 页面目录
│   ├── services/
│   ├── index.html 网站页面模版
│   ├── index.scss 项目样式入口
│   ├── index.tsx 项目 ts 入口
│   ├── router.tsx 项目的路由配置
│   └── ...
├── webpack/
│   ├── build.js 项目打包模式下的 webpack 配置
│   ├── constants.js webpack 配置常量
│   ├── debug.js 项目开发模式下的 webpack 配置
│   └── getConfig.js 获取公共的 webpack 配置
├── .gitignore
├── babel.config.js
├── index.d.ts
├── package.json
├── READEME.md
└── tsconfig.json
```
