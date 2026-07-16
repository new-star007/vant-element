# Image 图片

图片容器组件为 `<img>` 标签提供了增强能力，包括懒加载、加载失败兜底、多种填充模式和圆角展示。懒加载功能可以在图片进入可视区域时才发起请求，有效提升长列表页面的加载性能。当图片加载失败时，可通过 `error` 插槽自定义兜底内容，避免页面出现破碎图标。组件还支持 `fill`、`contain`、`cover`、`none`、`scale-down` 五种填充模式，适配不同尺寸容器的图片展示需求。

## 基础用法

```vue
<template>
  <el-image src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" style="width: 200px; height: 200px;" />
</template>
```

## 填充模式

```vue
<template>
  <el-image src="..." fit="fill" style="width: 120px; height: 120px;" />
  <el-image src="..." fit="contain" style="width: 120px; height: 120px;" />
  <el-image src="..." fit="cover" style="width: 120px; height: 120px;" />
  <el-image src="..." fit="none" style="width: 120px; height: 120px;" />
  <el-image src="..." fit="scale-down" style="width: 120px; height: 120px;" />
</template>
```

## 圆角图片

```vue
<template>
  <el-image src="..." round style="width: 120px; height: 120px;" />
</template>
```

## 懒加载

```vue
<template>
  <el-image src="..." lazy style="width: 200px; height: 200px;" />
</template>
```

## 加载失败

```vue
<template>
  <el-image src="https://invalid.url/img.png" style="width: 200px; height: 200px;">
    <div slot="error">图片加载失败</div>
  </el-image>
</template>
```

## 何时使用

- **图片列表/瀑布流**：当页面包含大量图片（如商品列表、图片墙）时，开启 `lazy` 懒加载可显著减少首屏网络请求，提升页面加载速度。
- **图片加载兜底**：当图片来源不可靠或可能失效时（如用户头像、UGC 内容），使用 `error` 插槽提供友好的降级展示。
- **头像/封面裁切**：需要将不同尺寸的图片统一展示为固定区域时，通过 `fit` 填充模式配合 `round` 属性实现圆形或方形裁切。

## API

### Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| src | 图片资源地址，支持本地和远程 URL | string | — |
| fit | 图片填充模式，决定图片在容器中的缩放与对齐方式 | `fill` / `contain` / `cover` / `none` / `scale-down` | `fill` |
| round | 是否将图片显示为圆形，适用于头像场景 | boolean | `false` |
| lazy | 是否开启懒加载，图片进入可视区域时才加载 | boolean | `false` |
| width | 图片容器宽度，支持数字（自动转 px）或字符串 | string / number | — |
| height | 图片容器高度，支持数字（自动转 px）或字符串 | string / number | — |

### Slots

| Name | Description |
| ---- | ----------- |
| error | 图片加载失败时显示的兜底内容 |
| loading | 图片加载中时显示的占位内容（懒加载时生效） |
