# Layout 栅格布局

栅格布局组件基于 24 列分栏系统，通过 `Row` 和 `Col` 的组合快速构建响应式页面布局。它借鉴了业界成熟的栅格设计理念，支持分栏偏移、间距控制和灵活的水平对齐方式，让开发者无需编写复杂的 CSS 即可实现多列布局。无论是后台管理系统的表单排列、数据面板的卡片布局，还是营销页面的图文混排，栅格布局都能提供简洁高效的排版方案。

## 基础布局

```vue
<template>
  <el-row>
    <el-col :span="12"><div>span-12</div></el-col>
    <el-col :span="12"><div>span-12</div></el-col>
  </el-row>
  <el-row>
    <el-col :span="6"><div>span-6</div></el-col>
    <el-col :span="6"><div>span-6</div></el-col>
    <el-col :span="6"><div>span-6</div></el-col>
    <el-col :span="6"><div>span-6</div></el-col>
  </el-row>
</template>
```

## 分栏间隔

```vue
<template>
  <el-row :gutter="20">
    <el-col :span="6"><div>span-6</div></el-col>
    <el-col :span="6"><div>span-6</div></el-col>
  </el-row>
</template>
```

## 偏移

```vue
<template>
  <el-row>
    <el-col :span="8"><div>span-8</div></el-col>
    <el-col :span="8" :offset="8"><div>span-8 offset-8</div></el-col>
  </el-row>
</template>
```

## 栅格对齐

```vue
<template>
  <el-row justify="center">
    <el-col :span="4"><div>span-4</div></el-col>
    <el-col :span="4"><div>span-4</div></el-col>
  </el-row>
</template>
```

## 何时使用

- **页面整体结构**：需要将页面内容划分为多列区域（如侧边栏 + 主内容区、左图右文）时使用，通过 `span` 控制各列占比。
- **表单/数据排列**：需要将多个表单项或数据卡片整齐排列在一行时，配合 `gutter` 设置列间距，避免内容紧贴。
- **居中或偏移布局**：需要将内容居中展示或在一侧留白时，使用 `justify` 控制水平对齐或 `offset` 设置偏移列数。

## API

### Row Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| gutter | 栅格列之间的间距（单位 px），会向两侧分配等量间距 | number | `0` |
| justify | 水平排列方式，控制子元素在行内的对齐与分布 | `flex-start` / `center` / `flex-end` / `space-between` / `space-around` | — |

### Col Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| span | 栅格占据的列数，取值范围 1-24，总和不超过 24 即可换行 | number | — |
| offset | 栅格左侧的空白间隔列数，用于将元素向右偏移 | number | `0` |
