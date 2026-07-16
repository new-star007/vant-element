# Popover 弹出框

Popover 是一个气泡式弹出框组件，由用户主动触发（点击、悬浮或聚焦）后，在触发元素附近弹出内容面板。它适合展示详细信息、操作菜单或辅助说明，例如点击按钮展开设置选项、悬浮在用户名上显示个人资料卡片。与 Tooltip 不同，Popover 支持承载更丰富的内容（表单、列表、按钮组等），且有标题区域。Popover 提供 `light` 和 `dark` 两种主题风格，以及 top/bottom/left/right 四个弹出方向，可通过 `.sync` 修饰符程序化控制显隐。

## 基础用法

```vue
<template>
  <el-popover placement="bottom" title="提示" trigger="click">
    <div>这是 popover 的内容</div>
    <el-button slot="reference">点击触发</el-button>
  </el-popover>
</template>
```

## 不同触发方式

```vue
<template>
  <el-popover placement="bottom" trigger="hover" title="悬浮提示">
    <div>hover 触发的内容</div>
    <el-button slot="reference">Hover 触发</el-button>
  </el-popover>
  <el-popover placement="bottom" trigger="click" title="点击提示">
    <div>click 触发的内容</div>
    <el-button slot="reference">点击触发</el-button>
  </el-popover>
</template>
```

## 弹出位置

```vue
<template>
  <el-popover placement="top" trigger="click" title="顶部">
    <div>top 弹出内容</div>
    <el-button slot="reference">top</el-button>
  </el-popover>
  <el-popover placement="bottom" trigger="click" title="底部">
    <div>bottom 弹出内容</div>
    <el-button slot="reference">bottom</el-button>
  </el-popover>
  <el-popover placement="left" trigger="click" title="左侧">
    <div>left 弹出内容</div>
    <el-button slot="reference">left</el-button>
  </el-popover>
  <el-popover placement="right" trigger="click" title="右侧">
    <div>right 弹出内容</div>
    <el-button slot="reference">right</el-button>
  </el-popover>
</template>
```

## 深色风格

```vue
<template>
  <el-popover placement="bottom" trigger="click" effect="dark">
    <div>深色背景的 popover 内容</div>
    <el-button slot="reference">深色弹窗</el-button>
  </el-popover>
</template>
```

## 何时使用

- 需要在触发元素附近展示详细信息或操作菜单，如用户头像悬浮卡片、按钮扩展菜单。
- 内容比 Tooltip 更丰富，需要标题、按钮组或表单时，选择 Popover 而非 Tooltip。
- 需要深色风格适配深色背景页面，或需要通过 `.sync` 精确控制显隐状态时。

## API

### Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| trigger | 触发弹出框的方式，click 适合菜单类交互，hover 适合提示类交互 | `click` / `hover` / `focus` | `click` |
| title | 弹出框标题，显示在内容区域顶部 | string | — |
| content | 弹出框内容文本，适合简单文本场景，复杂内容请使用 default 插槽 | string | — |
| placement | 弹出框相对触发元素的弹出方向 | `top` / `bottom` / `left` / `right` | `bottom` |
| width | 弹出框宽度，支持数字（px）或字符串（如 '200px'） | number / string | — |
| visible / .sync | 控制弹出框的显示与隐藏，支持 .sync 修饰符 | boolean | `false` |
| effect | 主题风格，light 为白底，dark 为深色底 | `light` / `dark` | `light` |

### Slots

| Name | Description |
| ---- | ----------- |
| default | 弹出框内容，可放置任意组件或 HTML |
| reference | 触发弹出框的元素，通常是按钮或图标 |
