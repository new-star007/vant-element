# Card 卡片

Card 卡片用于将相关信息聚合在一个带阴影和边框的容器中展示，是信息组织的基础载体。

卡片通过视觉隔离帮助用户快速识别独立的内容区块。Vant Element 的 Card 支持标题、描述、插槽自定义等能力，可灵活用于商品展示、文章摘要、用户信息、操作面板等多种场景。卡片可以控制阴影的显示时机和边框的有无，以适配不同的视觉层次需求。

## 基础卡片

```vue
<template>
  <el-card>
    <p>这是一张基础卡片，没有任何额外配置。</p>
    <p>可以直接在 el-card 中放置内容。</p>
  </el-card>
</template>
```

## 标题

```vue
<template>
  <el-card header="卡片标题">
    <p>通过 header 属性设置卡片标题。</p>
  </el-card>
</template>
```

## 带描述

```vue
<template>
  <el-card header="带描述卡片" description="这是卡片的描述信息">
    <p>通过 description 属性可以添加描述文本。</p>
  </el-card>
</template>
```

## 插槽标题

```vue
<template>
  <el-card>
    <div slot="header">
      <span>插槽标题</span>
      <el-button type="primary" size="small" style="float: right;">操作</el-button>
    </div>
    <p>通过 slot="header" 可以自定义标题区域。</p>
  </el-card>
</template>
```

## 何时使用

- **信息聚合**：将一段独立内容（如商品、文章、用户资料）封装在卡片中，便于用户浏览和操作。
- **内容分区**：在同一页面中用卡片分隔不同类型的内容，提升页面的结构清晰度。
- **操作面板**：将一组相关操作和状态信息放在卡片内，形成独立的操作区域。

## API

### Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| header | 卡片标题文本，显示在卡片顶部 | string | — |
| description | 描述文本，显示在标题下方用于补充说明 | string | — |
| body | 卡片内容文本，直接渲染为卡片主体内容 | string | — |
| shadow | 阴影的显示时机：always 始终显示，hover 悬停时显示，never 不显示 | string | `always` |
| border | 是否显示卡片边框。设为 false 可获得更简洁的视觉效果 | boolean | `true` |

### Slots

| Name | Description |
| ---- | ----------- |
| default | 卡片主体内容 |
| header | 自定义标题区域，可放置标题文字和操作按钮 |
