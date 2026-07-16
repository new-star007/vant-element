# Empty 空状态

Empty 用于在内容区域为空时展示占位提示，告知用户当前没有可显示的数据。

空状态常见于搜索无结果、列表数据加载前、购物车为空等场景。Vant Element 的 Empty 组件支持自定义描述文字、图片和底部操作按钮，可引导用户进行下一步操作（如「去逛逛」「重新搜索」）。与直接使用文字提示相比，Empty 提供了更友好的视觉体验和明确的操作引导。

## 基础用法

```vue
<template>
  <el-empty />
</template>
```

## 自定义描述

```vue
<template>
  <el-empty description="暂无可用的数据" />
</template>
```

## 自定义图片

```vue
<template>
  <el-empty image="https://img.yzcdn.cn/vant/ipad.jpeg" description="自定义图片" />
</template>
```

## 底部操作

```vue
<template>
  <el-empty description="购物车是空的">
    <template slot="bottom">
      <el-button type="primary" size="small">去逛逛</el-button>
    </template>
  </el-empty>
</template>
```

## 小型

```vue
<template>
  <el-empty size="small" description="小型空状态" />
</template>
```

## 何时使用

- **列表为空**：当列表数据加载完成但无数据时，展示空状态引导用户。
- **搜索无结果**：在搜索结果为空时，提示用户调整搜索条件。
- **功能未启用**：当用户未开通某项功能或尚未产生数据时，展示空状态并提供操作入口。

## API

### Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| image | 自定义空状态的图片地址，替换默认的空状态插图 | string | — |
| description | 描述文字，用于告知用户当前状态或引导下一步操作 | string | `暂无数据` |
| size | 空状态组件的尺寸，small 适用于紧凑布局 | `small` / `normal` | `normal` |

### Slots

| Name | Description |
| ---- | ----------- |
| default | 自定义空状态的主体内容，替换默认的描述文字 |
| bottom | 底部操作区域，可放置按钮等操作元素 |
