# 贡献指南

感谢你愿意为 Vant Element 贡献！

## 开发流程

```bash
# 克隆仓库
git clone https://github.com/fengluo/vant-element.git

# 安装依赖
npm install

# 启动演示项目
npm run dev

# 启动文档站
npm run docs:dev
```

## 项目结构

```
packages/vant-element/     # 库源码
  src/
    components/            # 组件实现
    services/              # 服务式 API
    directives/            # 自定义指令
    mixins/                # 共享 mixin
    index.js               # 插件入口
examples/vue2-demo/        # 演示项目
docs/                      # VuePress 文档站
```

## 新增组件

1. 在 `packages/vant-element/src/components/` 下创建 `el-xxx.vue`
2. 在 `packages/vant-element/src/index.js` 中注册组件
3. 在 `docs/components/` 下创建对应的文档 `xxx.md`
4. 在 `docs/components/README.md` 的对应分类表格中添加条目
5. 在 `docs/guide/getting-started.md` 的对应分类表格中添加条目
6. 在 `examples/vue2-demo/src/views/` 下创建演示页面
7. 在 `examples/vue2-demo/src/router/index.js` 中添加路由

## 代码规范

- 使用 Vue 2 的 Options API
- 保持与 Element-UI 的 API 命名一致
- 服务式 API 的返回值遵循 Promise 规范
- 添加关键的注释说明 Vant 映射关系

## 提交规范

提交信息遵循以下格式：

```
<类型>: <描述>

类型: feat / fix / docs / refactor / style / chore
```

示例：

- `feat: 新增 el-calendar 组件`
- `fix: 修复 el-input v-model 绑定异常`
- `docs: 补充 el-table 文档示例`

## 发布

```bash
npm run build:lib    # 构建库
npm version patch    # 升级版本
npm publish          # 发布到 npm
```
