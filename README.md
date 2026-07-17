<p align="center">
  <img src="https://github.com/new-star007/vant-element/blob/main/logo.png" alt="Vant Element" width="120">
</p>

<h1 align="center">vant-element</h1>

<p align="center">
  在移动端使用 Element-UI 语法，底层渲染 Vant 组件
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/vant-element" target="_blank">
    <img src="https://img.shields.io/npm/v/vant-element" alt="npm">
  </a>
  <a href="https://www.npmjs.com/package/vant-element" target="_blank">
    <img src="https://img.shields.io/npm/l/vant-element" alt="license">
  </a>
  <a href="https://new-star007.github.io/vant-element-docs/" target="_blank">
    <img src="https://img.shields.io/badge/docs-vant--element-blue" alt="docs">
  </a>
</p>

---

## 简介

桌面端用 Element-UI，移动端还得重写一套 Vant 代码？**不需要。**

`vant-element` 是一个 Vue 2 插件，全局注册 `el-` 前缀的组件和服务，内部调用 Vant 组件并自动完成 API 映射。**一套 Element-UI 代码，桌面端跑 Element-UI，移动端渲染 Vant UI。**

> [📖 在线文档](https://new-star007.github.io/vant-element-docs/) | [🌰 示例](https://new-star007.github.io/vant-element-examples/)

## 快速开始

### 安装

`vant-element` 基于 `vant` 构建，需要确保项目中已安装 `vant`：

```bash
# 如果项目还没有 vant（vant-element 基于 Vant 2）
npm install vant@latest-v2 vant-element
# 或
pnpm add vant@latest-v2 vant-element
```

> 如果你的项目已安装 `vant`，只需额外安装 `vant-element` 即可。

### 注册插件

```js
import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'
import VantElement from 'vant-element'
import 'vant-element/dist/vant-element.css'

Vue.use(Vant)
Vue.use(VantElement)
```

按需注册 vant-element 组件：

```js
Vue.use(VantElement, { components: ['el-button', 'el-input'] })
```

### 使用

直接写 Element-UI 语法：

```vue
<template>
  <div>
    <el-button type="primary" @click="handleClick">
      {{ buttonText }}
    </el-button>
    <el-input v-model="name" placeholder="请输入姓名" clearable />
    <el-form :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.username" />
      </el-form-item>
    </el-form>
  </div>
</template>
```

### 插件选项

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `components` | 组件白名单，不传则注册全部 | `string[]` | 全部 |

## 组件列表

> 完整文档请查看 [📖 在线文档](https://new-star007.github.io/vant-element-docs/components/)

### Basic 基础

| Element-UI | Vant | 说明 |
|------------|------|------|
| `el-button` | `van-button` | 常用的操作按钮 |
| `el-button-group` | 多个 `van-button` 组合 | 将多个按钮组合在一起 |
| `el-icon` | `van-icon` | 提供了一套常用的图标集合 |
| `el-image` | `van-image` + `van-loading` | 图片容器，支持懒加载 |
| `el-row` / `el-col` | `van-row` / `van-col` | 通过 24 列分栏创建布局 |
| `el-card` | `van-cell` + `van-cell-group` | 将信息聚合在卡片容器中展示 |
| `el-link` | 原生 a 标签 | 在不同页面之间导航或跳转 |
| `el-divider` | `van-divider` | 分隔内容的辅助元素 |
| `el-spinner` | `van-loading` | 加载动画指示器 |

### Form 表单

| Element-UI | Vant | 说明 |
|------------|------|------|
| `el-input` | 原生 input + `van-icon` | 通过键盘输入内容 |
| `el-input-number` | `van-stepper` | 仅允许输入标准的数字值 |
| `el-radio` / `el-radio-group` | `van-radio` / `van-radio-group` | 一组备选项中进行单选 |
| `el-checkbox` / `el-checkbox-group` | `van-checkbox` / `van-checkbox-group` | 一组备选项中进行多选 |
| `el-select` / `el-option` | `van-popup` + `van-picker` + `van-search` | 当选项过多时使用下拉菜单选择 |
| `el-cascader` | `van-popup` + `van-tabs` + `van-tag` + `van-search` | 逐级查看并选择层级数据 |
| `el-cascader-panel` | `van-tabs` + `van-tab` + `van-icon` | 级联选择器的核心面板 |
| `el-time-select` | `van-popup` + `van-picker` | 固定选项的时间点选择 |
| `el-autocomplete` | `van-popup` + `van-search` + `van-field` | 带联想建议的输入组件 |
| `el-switch` | `van-switch` | 表示两种相互对立状态间的切换 |
| `el-slider` | `van-slider` | 在固定区间内进行选择 |
| `el-date-picker` | `van-popup` + `van-datetime-picker` | 用于选择日期 |
| `el-time-picker` | `van-datetime-picker` | 用于选择时间 |
| `el-upload` | `van-uploader` | 文件上传组件 |
| `el-rate` | `van-rate` | 对事物进行快速评级 |
| `el-form` / `el-form-item` | `van-form` + `van-field` | 收集、校验、提交数据 |

### Data 数据

| Element-UI | Vant | 说明 |
|------------|------|------|
| `el-table` / `el-table-column` | 自定义实现 + `van-checkbox` | 展示多条结构化数据 |
| `el-list` / `el-list-item` | 自定义实现 + `van-checkbox` | 用于展示列表信息 |
| `el-list-page` | `van-pull-refresh` + `van-list` | 带分页的列表组件 |
| `el-descriptions` / `el-descriptions-item` | 纯 Vue 实现 | 以列表形式展示多个字段 |
| `el-badge` | `van-badge` | 按钮或图标右上角的数字标记 |
| `el-tag` | `van-tag` | 用于标记和分类 |
| `el-pagination` | `van-pagination` | 数据量过多时分页展示 |
| `el-skeleton` | `van-skeleton` | 加载过程中展示占位图形 |
| `el-progress` | `van-progress` / `van-circle` | 展示操作进度 |
| `el-empty` | `van-empty` | 没有数据时的占位提示 |
| `el-carousel` / `el-carousel-item` | `van-swipe` / `van-swipe-item` | 有限空间内循环展示 |
| `el-calendar` | `van-calendar` | 展示日期信息，支持事件标记 |

### Navigation 导航

| Element-UI | Vant | 说明 |
|------------|------|------|
| `el-tabs` / `el-tab-pane` | `van-tabs` / `van-tab` | 分隔不同类别的数据集合 |
| `el-steps` / `el-step` | `van-steps` / `van-step` | 引导用户按照流程完成 |
| `el-collapse` / `el-collapse-item` | `van-collapse` / `van-collapse-item` | 通过折叠收纳内容区域 |
| `el-dropdown` / `el-dropdown-menu` | `van-popover` | 折叠次要操作到菜单中 |
| `el-backtop` | `van-icon` + 自定义实现 | 快速返回页面顶部 |

### Feedback 反馈

| Element-UI | Vant | 说明 |
|------------|------|------|
| `el-alert` | 自定义实现 + `van-icon` | 展示重要的提示信息 |
| `el-message` | `van-toast` | 消息提示（通过 `$message` 调用） |
| `el-message-box` | `van-dialog` | 弹框（通过 `$alert` / `$confirm` / `$prompt` / `$msgbox` 调用） |
| `el-notification` | `van-notify` | 通知（通过 `$notify` 调用） |
| `el-dialog` | `van-dialog` | 承载相关操作的弹出层 |
| `el-popover` | `van-popover` | 点击/悬浮触发的气泡弹出框 |
| `el-loading` | `van-toast`（loading 模式） | 加载中（通过 `$loading` 调用） |
| `el-tooltip` | `van-popover` | 悬停或聚焦时显示额外提示 |
| `el-popconfirm` | `van-popover` + `van-button` | 点击元素后弹出确认气泡 |
| `el-drawer` | `van-popup` | 从屏幕边缘滑入的面板 |

### 服务式 API

| Element-UI 方法 | Vant 组件 | 说明 |
|-----------------|-----------|------|
| `this.$message` | `van-toast` | 从顶部出现的轻量提示 |
| `this.$notify` | `van-notify` | 悬浮出现在页面角落的通知 |
| `this.$loading` | `van-toast`（loading 模式） | 加载数据时显示动效 |
| `this.$alert` | `van-dialog` | 模态消息框 |
| `this.$confirm` | `van-dialog` | 包含确认取消的操作 |
| `this.$prompt` | 自定义输入弹窗 | 带输入框的模态消息 |
| `this.$msgbox` | `van-dialog`（完整封装） | 模态消息框 |

## License

[MIT](LICENSE)

Copyright (c) 2024-present fengluo
