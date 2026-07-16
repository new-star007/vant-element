# 快速上手

## 安装

```bash
npm install vant-element
```

## 完整引入

```js
import Vue from 'vue'
import VantElement from 'vant-element'
import 'vant-element/dist/vant-element.css'

Vue.use(VantElement)
```

完整引入会注册所有组件以及全局方法（`$message`、`$notify`、`$loading`、`$alert`、`$confirm`、`$prompt`、`$msgbox`）。

## 按需引入

```js
import Vue from 'vue'
import { ElButton, ElDialog } from 'vant-element'
import 'vant-element/dist/vant-element.css'

Vue.use(ElButton)
Vue.use(ElDialog)
```

按需引入时，需要单独调用 `Vue.component()` 注册使用的组件。全局方法（`$message` 等）需通过完整引入或手动挂载。

## 自动按需引入（推荐）

配合 [babel-plugin-import](https://github.com/umijs/babel-plugin-import) 可实现自动按需引入：

```bash
npm install babel-plugin-import -D
```

在 `babel.config.js` 中添加：

```js
module.exports = {
  plugins: [
    ['import', {
      libraryName: 'vant-element',
      libraryDirectory: 'dist',
      style: 'css'
    }]
  ]
}
```

使用时直接引入组件即可，无需手动注册：

```js
import { ElButton, ElInput } from 'vant-element'

// 无需 Vue.use()，babel 插件会自动处理
```

## 可用组件一览

### Basic 基础

| Element 组件 | Vant 组件 | 说明 |
| ---- | ---- | ---- |
| Button 按钮 | `van-button` | 常用的操作按钮 |
| ButtonGroup 按钮组 | 多个 `van-button` 组合 | 将多个按钮组合在一起 |
| Icon 图标 | `van-icon` | 提供了一套常用的图标集合 |
| Image 图片 | `van-image` + `van-loading` | 图片容器，支持懒加载 |
| Layout 栅格布局 | `van-row` + `van-col` | 通过 24 列分栏创建布局 |
| Card 卡片 | `van-cell` + `van-cell-group` | 将信息聚合在卡片容器中展示 |
| Link 文字链接 | 原生 a 标签 | 在不同页面之间导航或跳转 |

### Form 表单

| Element 组件 | Vant 组件 | 说明 |
| ---- | ---- | ---- |
| Input 输入框 | 原生 input + `van-icon` | 通过键盘输入内容 |
| InputNumber 数字输入框 | `van-stepper` | 仅允许输入标准的数字值 |
| Radio 单选框 | `van-radio` + `van-radio-group` | 一组备选项中进行单选 |
| Checkbox 多选框 | `van-checkbox` + `van-checkbox-group` | 一组备选项中进行多选 |
| Select 选择器 | `van-popup` + `van-picker` + `van-search` | 当选项过多时使用下拉菜单选择 |
| Cascader 级联选择器 | `van-popup` + `van-tabs` + `van-tag` + `van-search` | 逐级查看并选择层级数据 |
| CascaderPanel 级联面板 | `van-tabs` + `van-tab` + `van-icon` | 级联选择器的核心面板 |
| TimeSelect 时间选择 | `van-popup` + `van-picker` | 固定选项的时间点选择 |
| Autocomplete 自动完成 | `van-popup` + `van-search` + `van-field` | 带联想建议的输入组件 |
| Switch 开关 | `van-switch` | 表示两种相互对立状态间的切换 |
| Slider 滑块 | `van-slider` | 在固定区间内进行选择 |
| DatePicker 日期选择器 | `van-popup` + `van-datetime-picker` | 用于选择日期 |
| TimePicker 时间选择器 | `van-datetime-picker` | 用于选择时间 |
| Upload 上传 | `van-uploader` | 文件上传组件 |
| Rate 评分 | `van-rate` | 对事物进行快速评级 |
| Form 表单 | `van-form` + `van-field` | 收集、校验、提交数据 |

### Data 数据

| Element 组件 | Vant 组件 | 说明 |
| ---- | ---- | ---- |
| Table 表格 | 自定义实现 + `van-checkbox` | 展示多条结构化数据 |
| List 列表 | 自定义实现 + `van-checkbox` | 用于展示列表信息 |
| ListPage 列表页 | `van-pull-refresh` + `van-list` | 带分页的列表组件 |
| Descriptions 描述列表 | 纯 Vue 实现 | 以列表形式展示多个字段 |
| Badge 徽标 | `van-badge` | 按钮或图标右上角的数字标记 |
| Tag 标签 | `van-tag` | 用于标记和分类 |
| Pagination 分页 | `van-pagination` | 数据量过多时分页展示 |
| Skeleton 骨架屏 | `van-skeleton` | 加载过程中展示占位图形 |
| Progress 进度条 | `van-progress` + `van-circle` | 展示操作进度 |
| Empty 空状态 | `van-empty` | 没有数据时的占位提示 |
| Carousel 走马灯 | `van-swipe` + `van-swipe-item` | 有限空间内循环展示 |
| Calendar 日历 | `van-calendar` | 展示日期信息，支持事件标记 |

### Navigation 导航

| Element 组件 | Vant 组件 | 说明 |
| ---- | ---- | ---- |
| Tabs 标签页 | `van-tabs` + `van-tab` | 分隔不同类别的数据集合 |
| Steps 步骤条 | `van-steps` + `van-step` | 引导用户按照流程完成 |
| Collapse 折叠面板 | `van-collapse` + `van-collapse-item` | 通过折叠收纳内容区域 |
| Dropdown 下拉菜单 | `van-popover` | 折叠次要操作到菜单中 |
| Backtop 回到顶部 | `van-icon` + 自定义实现 | 快速返回页面顶部 |

### Feedback 反馈

| Element 组件 | Vant 组件 | 说明 |
| ---- | ---- | ---- |
| Alert 提示 | 自定义实现 + `van-icon` | 展示重要的提示信息 |
| Message 消息提示 | `van-toast` | 从顶部出现的轻量提示 |
| MessageBox 弹框 | `van-dialog` | 模态消息框，包含确认取消等操作 |
| Notification 通知 | `van-notify` | 悬浮出现在页面角落的通知 |
| Dialog 对话框 | `van-dialog` | 承载相关操作的弹出层 |
| Popover 弹出框 | `van-popover` | 点击/悬浮触发的气泡弹出框 |
| Loading 加载中 | `van-toast`（loading 模式） | 加载数据时显示动效 |
| Tooltip 文字提示 | `van-popover` | 悬停或聚焦时显示额外提示 |
| Popconfirm 气泡确认框 | `van-popover` + `van-button` | 点击元素后弹出确认气泡 |
| Drawer 抽屉 | `van-popup` | 从屏幕边缘滑入的面板 |
