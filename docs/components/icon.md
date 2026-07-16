# Icon 图标

Icon 组件提供了一套覆盖常见场景的图标集合，包括搜索、编辑、删除、导航箭头等常用操作图标。

图标可单独使用，也可与 Button、Tag 等组件搭配使用。每个图标支持自定义颜色和大小，能够灵活适配不同界面区域的视觉需求。图标名称遵循 `el-icon-*` 命名规范，便于统一管理和查找。

## 图标展示

```vue
<template>
  <el-icon name="el-icon-search" />
  <el-icon name="el-icon-edit" />
  <el-icon name="el-icon-check" />
  <el-icon name="el-icon-delete" />
  <el-icon name="el-icon-message" />
  <el-icon name="el-icon-star-on" />
  <el-icon name="el-icon-star-off" />
  <el-icon name="el-icon-upload" />
  <el-icon name="el-icon-download" />
  <el-icon name="el-icon-plus" />
  <el-icon name="el-icon-minus" />
  <el-icon name="el-icon-info" />
  <el-icon name="el-icon-warning" />
  <el-icon name="el-icon-success" />
  <el-icon name="el-icon-error" />
  <el-icon name="el-icon-close" />
  <el-icon name="el-icon-arrow-left" />
  <el-icon name="el-icon-arrow-right" />
  <el-icon name="el-icon-arrow-up" />
  <el-icon name="el-icon-arrow-down" />
</template>
```

## 图标颜色

```vue
<template>
  <el-icon name="el-icon-search" color="#409eff" size="24" />
  <el-icon name="el-icon-edit" color="#67c23a" size="24" />
  <el-icon name="el-icon-delete" color="#f56c6c" size="24" />
  <el-icon name="el-icon-warning" color="#e6a23c" size="24" />
  <el-icon name="el-icon-info" color="#909399" size="24" />
</template>
```

## 图标大小

```vue
<template>
  <el-icon name="el-icon-search" size="16" />
  <el-icon name="el-icon-search" size="20" />
  <el-icon name="el-icon-search" size="24" />
  <el-icon name="el-icon-search" size="32" />
  <el-icon name="el-icon-search" size="40" />
</template>
```

## 何时使用

- **按钮图标**：与 Button 组件搭配使用，在按钮文字旁添加图标增强语义表达。
- **导航指示**：使用箭头图标指示方向，如展开/收起、前进/后退。
- **状态标识**：用不同颜色的图标直观表示成功、警告、错误等状态信息。

## API

### Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| name | 图标类名，格式为 `el-icon-*`，用于指定显示哪个图标 | string | — |
| color | 图标颜色，支持十六进制色值 | string | — |
| size | 图标大小，支持数字（单位 px）或带单位的字符串 | string / number | — |
