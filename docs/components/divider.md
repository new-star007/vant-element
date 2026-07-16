# Divider 分割线

Divider 分割线用于在视觉上分隔不同的内容区域，提升页面的层次感和可读性。

支持水平和垂直两种方向。水平分割线可以携带文字说明，用于标识内容区块的主题或过渡；垂直分割线则适合在导航菜单、操作栏等紧凑布局中分隔相邻元素。分割线本身不承载交互功能，纯粹作为视觉组织工具使用。

## 基础分割线

```vue
<template>
  <span>上部分内容</span>
  <el-divider />
  <span>下部分内容</span>
</template>
```

## 带文字

```vue
<template>
  <span>内容区域</span>
  <el-divider content-position="left">左侧文字</el-divider>
  <span>内容区域</span>
  <el-divider content-position="center">居中文字</el-divider>
  <span>内容区域</span>
  <el-divider content-position="right">右侧文字</el-divider>
</template>
```

## 纵向

```vue
<template>
  <div style="display:flex;align-items:center;gap:12px">
    <span>左侧</span>
    <el-divider direction="vertical" />
    <span>中间</span>
    <el-divider direction="vertical" />
    <span>右侧</span>
  </div>
</template>
```

纵向分割线也适合在标签等内联元素之间使用：

```vue
<template>
  <div style="display:flex;align-items:center;gap:12px">
    <el-tag>标签A</el-tag>
    <el-divider direction="vertical" />
    <el-tag type="success">标签B</el-tag>
    <el-divider direction="vertical" />
    <el-tag type="warning">标签C</el-tag>
  </div>
</template>
```

## 自定义样式

```vue
<template>
  <span>上部分</span>
  <el-divider style="border-color: #409eff; border-width: 2px" />
  <span>中部分</span>
  <el-divider style="border-color: #67c23a; border-style: dashed" />
  <span>下部分</span>
</template>
```

## 何时使用

- **内容分隔**：在长页面中用水平分割线将不同主题的内容区域分隔开。
- **章节过渡**：在分割线上添加文字说明，标识内容区块的主题或阶段。
- **导航分隔**：在导航菜单或工具栏中用垂直分割线分隔相邻的操作项。

## API

### Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| content-position | 分割线上文字的水平对齐方式，仅在水平方向且设置了文字内容时生效 | `left` / `center` / `right` | `center` |
| direction | 分割线的方向，horizontal 为水平分隔上下内容，vertical 为垂直分隔左右内容 | `horizontal` / `vertical` | `horizontal` |
| dashed | 是否使用虚线 | `boolean` | `false` |
| hairline | 是否使用 0.5px 细线 | `boolean` | `true` |
