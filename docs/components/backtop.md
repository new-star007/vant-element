# Backtop 回到顶部

Backtop 用于在页面滚动到一定距离后，提供一个快速回到页面顶部的按钮。适合内容较长的页面，如列表页、文章详情页。

## 基础用法

```vue
<template>
  <el-backtop />
</template>
```

## 自定义显示高度

```vue
<template>
  <el-backtop :visibility-height="500" />
</template>
```

## 自定义位置

```vue
<template>
  <el-backtop :right="20" :bottom="80" />
</template>
```

## 自定义内容

```vue
<template>
  <el-backtop>
    <div style="text-align: center;">
      <span style="font-size:16px;">UP</span>
    </div>
  </el-backtop>
</template>
```

## 指定容器

```vue
<template>
  <div ref="container" style="height: 300px; overflow-y: auto; border: 1px solid #eee;">
    <div style="height: 800px; padding: 20px;">
      <p>滚动这个容器查看效果</p>
    </div>
    <el-backtop target="#container" :right="20" :bottom="20" />
  </div>
</template>
```

## 何时使用

- 页面内容较长时，提供快速返回顶部的功能。
- 长列表、文章、数据大屏等滚动较深的页面。

## API

### Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| visibility-height | 滚动距离超过该值时显示按钮 | number | `200` |
| target | 滚动容器选择器，默认为 window | string | — |
| right | 按钮距离页面右侧的距离（px） | number | `40` |
| bottom | 按钮距离页面底部的距离（px） | number | `40` |

### Events

| Name | Description | Parameters |
| ---- | ----------- | ---------- |
| click | 点击回到顶部时触发 | — |

### Slots

| Name | Description |
| ---- | ----------- |
| default | 自定义按钮内容，默认显示向上的箭头图标 |
