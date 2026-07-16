# Tag 标签

Tag 标签用于对内容进行分类标记，帮助用户快速识别和筛选信息。

标签常用于商品分类、文章标签、状态标识等场景。Vant Element 支持多种类型和尺寸的标签，可自定义颜色和圆角样式。标签还支持可关闭功能，用户可以主动移除不需要的标签，适用于标签管理、筛选条件等交互场景。与 Badge 不同，Tag 是独立展示的标签组件，而非附加在其他元素上的标记。

## 基础用法

```vue
<template>
  <el-tag>default</el-tag>
  <el-tag type="success">success</el-tag>
  <el-tag type="info">info</el-tag>
  <el-tag type="warning">warning</el-tag>
  <el-tag type="danger">danger</el-tag>
</template>
```

## 可关闭

```vue
<template>
  <el-tag v-for="tag in tags" :key="tag.name" closable :type="tag.type" @close="handleClose(tag)">
    {{ tag.name }}
  </el-tag>
</template>
```

## 不同尺寸

```vue
<template>
  <el-tag size="small">small</el-tag>
  <el-tag size="medium">medium</el-tag>
  <el-tag size="large">large</el-tag>
</template>
```

## 自定义颜色

```vue
<template>
  <el-tag color="#409eff">蓝色标签</el-tag>
  <el-tag color="#67c23a">绿色标签</el-tag>
  <el-tag color="#e6a23c">橙色标签</el-tag>
  <el-tag color="#f56c6c">红色标签</el-tag>
</template>
```

## 圆角

```vue
<template>
  <el-tag round>圆角标签</el-tag>
  <el-tag type="primary" round>圆角 primary</el-tag>
  <el-tag type="success" round>圆角 success</el-tag>
</template>
```

## 何时使用

- **分类标记**：为文章、商品等内容添加分类标签，便于用户快速识别内容类型。
- **状态标识**：用不同颜色的标签表示待处理、进行中、已完成等状态。
- **筛选条件**：配合可关闭功能，让用户动态添加或移除筛选条件。

## API

### Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| type | 标签的类型，决定标签的背景色和文字颜色 | `success` / `info` / `warning` / `danger` | `default` |
| closable | 是否可关闭。启用后标签右侧显示关闭按钮，点击可触发 close 事件 | boolean | `false` |
| size | 标签尺寸，影响标签的内边距和字体大小 | `small` / `medium` / `large` | — |
| color | 自定义背景颜色，覆盖 type 的默认配色 | string | — |
| round | 是否显示为圆角胶囊样式 | boolean | `false` |

### Events

| Name | Description | Parameters |
| ---- | ----------- | ---------- |
| close | 标签被关闭时触发，可用于更新标签列表或记录用户行为 | — |
