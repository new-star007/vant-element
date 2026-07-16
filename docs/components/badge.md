# Badge 徽标

Badge 是一种用于在按钮、图标或其他元素右上角展示数字或状态标记的叠加组件。

Badge 常用于消息通知计数、未读状态提示等场景。它支持数字显示（可设置上限自动截断为 `99+`）、小圆点模式、自定义颜色和类型，以及灵活的偏移量控制。与 Tag 不同，Badge 始终作为其他元素的附属标记存在，而非独立的标签组件。

## 基础用法

```vue
<template>
  <el-badge value="3">
    <el-button>消息</el-button>
  </el-badge>
</template>
```

## 最大值

```vue
<template>
  <el-badge value="100" max="99">
    <el-button>消息</el-button>
  </el-badge>
</template>
```

## 小圆点

```vue
<template>
  <el-badge is-dot>
    <el-button>消息</el-button>
  </el-badge>
</template>
```

## 隐藏

```vue
<template>
  <el-badge :hidden="false" value="3">
    <el-button>消息</el-button>
  </el-badge>
</template>
```

## 自定义颜色

```vue
<template>
  <el-badge value="3" color="#67c23a">
    <el-button>绿色</el-button>
  </el-badge>
  <el-badge value="3" color="#e6a23c">
    <el-button>橙色</el-button>
  </el-badge>
</template>
```

## 不同类型

```vue
<template>
  <el-badge value="3" type="danger"><el-button>danger</el-button></el-badge>
  <el-badge value="3" type="primary"><el-button>primary</el-button></el-badge>
  <el-badge value="3" type="success"><el-button>success</el-button></el-badge>
  <el-badge value="3" type="warning"><el-button>warning</el-button></el-badge>
  <el-badge value="3" type="info"><el-button>info</el-button></el-badge>
</template>
```

## 何时使用

- **消息通知**：在消息图标或按钮上显示未读消息数量，提醒用户有新消息待处理。
- **状态标记**：用小圆点模式标记某个元素有更新或变化，无需显示具体数量。
- **数量限制**：配合 `max` 属性设置显示上限，避免大数字破坏界面布局。

## API

### Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| value | 徽标显示的数字或文本内容 | string / number | — |
| max | 最大值，当数字超过该值时显示 `{max}+`（如 max=99 时，100 显示为 99+） | number | — |
| isDot | 是否以小圆点形式展示，不显示具体数字 | boolean | `false` |
| hidden | 是否隐藏徽标。可配合条件动态控制徽标的显示与隐藏 | boolean | `false` |
| type | 徽标的颜色类型 | `primary` / `success` / `warning` / `danger` / `info` | `danger` |
| color | 自定义背景颜色，覆盖 type 的默认配色 | string | — |
| tag | 自定义包裹元素的 HTML 标签类型 | string | `div` |
| position | 徽标在宿主元素上的定位方向 | string | — |
| offset | 徽标的偏移量，格式为 [水平偏移, 垂直偏移]，单位为像素 | [number, number] | — |
