# Skeleton 骨架屏

Skeleton（骨架屏）是一种内容加载占位组件，在真实数据尚未加载完成时，以灰色色块模拟页面内容的布局轮廓。基于 Vant `Skeleton` 组件封装，API 遵循 Element UI 命名规范。

## 基础用法

```vue
<template>
  <el-skeleton :loading="loading">
    <p>内容加载完成后的展示区域</p>
  </el-skeleton>
</template>

<script>
export default {
  data() {
    return {
      loading: true
    }
  }
}
</script>
```

## 多种组合

```vue
<template>
  <el-skeleton :loading="loading" :rows="3" :row-width="['100%', '80%', '60%']">
    <p>完整内容展示区域</p>
  </el-skeleton>
</template>

<script>
export default {
  data() {
    return {
      loading: true
    }
  }
}
</script>
```

## 动画

```vue
<template>
  <el-skeleton :loading="loading" animated :rows="2">
    <p>带动画效果的骨架屏</p>
  </el-skeleton>
</template>

<script>
export default {
  data() {
    return {
      loading: true
    }
  }
}
</script>
```

## API

### Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| loading | 是否处于加载状态，为 true 时显示骨架占位，为 false 时显示真实内容 | boolean | `true` |
| rows | 骨架屏的行数 | number | `3` |
| rowWidth | 每行的宽度，可传入字符串或数组 | string / array | `100%` |
| title | 是否显示标题占位 | boolean | `false` |
| avatar | 是否显示头像占位 | boolean | `false` |
| avatarSize | 头像占位尺寸 | string / number | `32px` |
| avatarShape | 头像形状，可选 `square` / `round` | string | `square` |
| round | 是否为圆角风格 | boolean | `false` |
| animated | 是否开启脉冲动画效果 | boolean | `true` |

### Slots

| Name | Description |
| ---- | ----------- |
| default | 加载完成后显示的真实内容 |
