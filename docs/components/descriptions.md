# Descriptions 描述列表

描述列表以键值对的形式展示多个字段信息，适用于详情页、信息卡片等需要展示结构化数据的场景。与表格不同，描述列表更注重信息的可读性和美观性。

描述列表支持多列布局、边框样式、尺寸调节等配置，可以轻松展示用户信息、订单详情、配置信息等内容。自定义插槽功能允许开发者在描述项中放置标签、按钮等自定义内容。

## 何时使用

- 当需要展示详情信息，如用户资料、订单详情、配置信息时
- 当需要以键值对形式呈现数据，且不需要表格的编辑功能时
- 当需要在详情页中展示多个字段，且希望支持多列布局时

## 基础用法

```vue
<template>
  <el-descriptions :column="2">
    <el-descriptions-item label="姓名">张三</el-descriptions-item>
    <el-descriptions-item label="手机">13800000000</el-descriptions-item>
    <el-descriptions-item label="邮箱">zhangsan@example.com</el-descriptions-item>
    <el-descriptions-item label="地址">北京市朝阳区</el-descriptions-item>
  </el-descriptions>
</template>
```

## 带边框

```vue
<template>
  <el-descriptions :column="2" border>
    <el-descriptions-item label="姓名">张三</el-descriptions-item>
    <el-descriptions-item label="手机">13800000000</el-descriptions-item>
  </el-descriptions>
</template>
```

## 不同尺寸

```vue
<template>
  <el-descriptions :column="2" border size="large">
    <el-descriptions-item label="姓名">张三</el-descriptions-item>
  </el-descriptions>
  <el-descriptions :column="2" border size="small">
    <el-descriptions-item label="姓名">张三</el-descriptions-item>
  </el-descriptions>
</template>
```

## 自定义内容

```vue
<template>
  <el-descriptions :column="2" border>
    <el-descriptions-item label="角色">
      <el-tag type="danger" size="small">管理员</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="标签">
      <el-tag size="small">前端</el-tag>
      <el-tag size="small" type="success">Vue</el-tag>
    </el-descriptions-item>
  </el-descriptions>
</template>
```

## API

### Descriptions Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| column | 每行显示的描述项数量，用于控制布局密度 | number | `2` |
| border | 是否显示边框，开启后会有清晰的分隔线和背景色区分 | boolean | `false` |
| size | 描述列表的尺寸，影响文字大小和间距 | `large` / `small` | — |

### DescriptionsItem Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| label | 描述项的标签文本，显示在值的左侧或上方 | string | — |
| span | 该描述项占据的列数，可用于实现跨列布局 | number | `1` |
