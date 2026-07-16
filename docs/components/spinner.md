# Spinner 加载

Spinner 是一个纯 CSS 加载动画组件，用于在页面或容器中显示加载中的状态，帮助用户感知正在进行的异步操作。

## 基础用法

```vue
<template>
  <el-spinner />
</template>
```

## 自定义大小

```vue
<template>
  <el-spinner :size="20" />
  <el-spinner :size="40" />
  <el-spinner :size="60" />
</template>
```

## 自定义颜色

```vue
<template>
  <el-spinner color="#409eff" />
  <el-spinner color="#67c23a" />
  <el-spinner color="#e6a23c" />
  <el-spinner color="#f56c6c" />
</template>
```

## 加载中状态

```vue
<template>
  <div style="position: relative; padding: 20px; border: 1px solid #eee; border-radius: 4px;">
    <p>这里是内容区域</p>
    <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.8);">
      <el-spinner :size="36" color="#409eff" />
    </div>
  </div>
</template>
```

## 何时使用

- **异步加载**：当页面或区块需要等待异步数据时，使用 Spinner 反馈加载状态，缓解用户等待焦虑。
- **局部加载**：配合绝对定位实现局部 loading 遮罩，仅锁定特定区域而非整个页面。
- **按钮/图标替代**：作为独立的加载指示器嵌入任何需要的位置。

## API

### Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| size | Spinner 尺寸（宽高，单位 px） | number | `40` |
| color | 加载动画颜色 | string | `#409eff` |
| strokeWidth | SVG 圆环线条宽度（单位 px） | number | `4` |
