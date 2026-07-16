# Link 文字链接

Link 用于在不同页面或功能之间进行导航或跳转。与 Button 不同，Link 以文字形式呈现，视觉层级较低，适合在段落文本中嵌入操作入口。

Link 支持多种颜色类型、下划线、禁用状态，可配合图标使用。

## 基础用法

```vue
<template>
  <el-link href="https://example.com" target="_blank">默认链接</el-link>
</template>
```

## 不同类型

```vue
<template>
  <el-link type="primary">主要链接</el-link>
  <el-link type="success">成功链接</el-link>
  <el-link type="warning">警告链接</el-link>
  <el-link type="danger">危险链接</el-link>
  <el-link type="info">信息链接</el-link>
</template>
```

## 下划线

```vue
<template>
  <el-link :underline="false">无下划线</el-link>
  <el-link :underline="true">有下划线</el-link>
</template>
```

## 禁用状态

```vue
<template>
  <el-link disabled>禁用链接</el-link>
  <el-link type="primary" disabled>禁用主要链接</el-link>
</template>
```

## 带图标

```vue
<template>
  <el-link icon="el-icon-edit">编辑</el-link>
  <el-link icon="el-icon-link">链接</el-link>
</template>
```

## 何时使用

- 在段落文本中嵌入操作入口，如"查看更多"、"查看详情"。
- 导航跳转，如面包屑中的链接、返回首页。
- 在不使用按钮的情况下提供轻量级交互。

## API

### Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| type | 链接类型 | `default` / `primary` / `success` / `warning` / `danger` / `info` | `default` |
| underline | 是否显示下划线 | boolean | `true` |
| disabled | 是否禁用 | boolean | `false` |
| href | 原生 href 属性 | string | — |
| icon | 图标类名 | string | — |
| target | 原生 target 属性 | string | — |

### Events

| Name | Description | Parameters |
| ---- | ----------- | ---------- |
| click | 点击链接时触发 | (event: Event) |
