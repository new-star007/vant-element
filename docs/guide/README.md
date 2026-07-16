# 介绍

## 什么是 Vant Element？

Vant Element 是一个基于 Vant 构建的 Element-UI 兼容组件库。它保持了 Element-UI 的 API 风格，让开发者可以使用熟悉的方式调用 Vant 的移动端能力。

如果你的桌面端项目使用 Element-UI，移动端项目使用 Vant，那么维护两套组件库的成本很高。Vant Element 解决了这个问题——你只需要写 Element-UI 的代码，底层会自动渲染为 Vant 的移动端 UI。

## 解决什么问题？

| 场景 | 没有 Vant Element | 有了 Vant Element |
|------|------------------|------------------|
| 桌面端 + 移动端双端项目 | 需要分别维护 Element-UI 和 Vant 两套代码 | 只需维护一套 Element-UI 代码 |
| 从桌面端迁移到移动端 | 需要重写所有组件为 Vant 语法 | 替换依赖即可，代码无需修改 |
| 团队技能统一 | 前端需要同时掌握 Element-UI 和 Vant | 只需掌握 Element-UI 即可 |

## 工作原理

Vant Element 在内部维护了一个映射表，将 Element-UI 的组件名和属性自动转换为 Vant 的等价物：

```
你的代码（Element-UI 语法）
    ↓
Vant Element（自动映射）
    ↓
渲染结果（Vant 组件）
```

例如：

```vue
<!-- 你写的代码 -->
<el-button type="primary">确定</el-button>

<!-- 实际渲染为 -->
<van-button type="primary">确定</van-button>
```

## 特性

- **API 兼容**：与 Element-UI 保持一致的组件 API，降低迁移成本
- **移动端优先**：底层基于 Vant，提供优秀的移动端体验
- **Vue 2 支持**：基于 Vue 2.x 构建
- **按需加载**：支持按需引入，减小打包体积
- **全局服务**：内置 `$message`、`$notify`、`$loading`、`$alert`、`$confirm`、`$prompt` 等全局方法
- **组件覆盖**：已实现 40+ 个 Element-UI 组件，覆盖基础、表单、数据、导航、反馈等场景

## 支持的组件

| 分类 | 组件 |
|------|------|
| 基础 | Button、ButtonGroup、Icon、Image、Layout、Card |
| 表单 | Input、InputNumber、Radio、Checkbox、Select、Cascader、Switch、Slider、DatePicker、TimePicker、Upload、Rate、Form |
| 数据 | Table、List、ListPage、Descriptions、Badge、Tag、Pagination、Skeleton、Progress、Empty、Carousel |
| 导航 | Tabs、Steps、Collapse |
| 反馈 | Alert、Message、MessageBox、Notification、Dialog、Popover、Loading |

## 相关链接

- [Vant 文档](https://vant-ui.github.io/vant/v2/#/zh-CN/quickstart)
- [Element-UI 文档](https://element.eleme.cn/#/zh-CN)
