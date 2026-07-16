# Tooltip 文字提示

Tooltip 用于在鼠标悬停或聚焦时显示额外的文字提示信息，常用于对按钮、图标、链接等元素进行补充说明。

Tooltip 采用基于 Vant Popover 的实现，支持多种触发方式、12 种方向位置、暗色/亮色主题，并可通过 `open-delay` 和 `close-delay` 控制显示延迟。

## 基础用法

```vue
<template>
  <el-tooltip content="这是一段提示文字">
    <el-button>悬停显示</el-button>
  </el-tooltip>
</template>
```

## 不同位置

```vue
<template>
  <el-tooltip content="Top" placement="top">
    <el-button>上</el-button>
  </el-tooltip>
  <el-tooltip content="Bottom" placement="bottom">
    <el-button>下</el-button>
  </el-tooltip>
  <el-tooltip content="Left" placement="left">
    <el-button>左</el-button>
  </el-tooltip>
  <el-tooltip content="Right" placement="right">
    <el-button>右</el-button>
  </el-tooltip>
</template>
```

## 主题

```vue
<template>
  <el-tooltip content="暗色主题" effect="dark">
    <el-button>dark</el-button>
  </el-tooltip>
  <el-tooltip content="亮色主题" effect="light">
    <el-button>light</el-button>
  </el-tooltip>
</template>
```

## 触发方式

```vue
<template>
  <el-tooltip content="悬停触发" trigger="hover">
    <el-button>hover</el-button>
  </el-tooltip>
  <el-tooltip content="点击触发" trigger="click">
    <el-button>click</el-button>
  </el-tooltip>
  <el-tooltip content="聚焦触发" trigger="focus">
    <el-button>focus</el-button>
  </el-tooltip>
</template>
```

## 延迟显示

```vue
<template>
  <el-tooltip content="延迟200ms显示" :open-delay="200">
    <el-button>延迟显示</el-button>
  </el-tooltip>
</template>
```

## 何时使用

- 对无文字图标的补充说明，如操作按钮、导航图标。
- 对输入规则或格式的提示，如密码强度要求。
- 对截断文本展示完整内容。

## API

### Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| content | 提示文字内容 | string | — |
| placement | 弹出位置 | `top` / `top-start` / `top-end` / `bottom` / `bottom-start` / `bottom-end` / `left` / `left-start` / `left-end` / `right` / `right-start` / `right-end` | `top` |
| trigger | 触发方式 | `hover` / `click` / `focus` / `manual` | `hover` |
| effect | 主题 | `dark` / `light` | `dark` |
| disabled | 是否禁用 | boolean | `false` |
| offset | 偏移量 | number | `0` |
| open-delay | 打开延迟（ms） | number | `0` |
| close-delay | 关闭延迟（ms） | number | `200` |
| visible-arrow | 是否显示箭头 | boolean | `true` |
| enterable | 鼠标是否可进入提示内容区域 | boolean | `true` |

### Events

| Name | Description | Parameters |
| ---- | ----------- | ---------- |
| change | 显示状态改变时触发 | 当前显示状态 |
