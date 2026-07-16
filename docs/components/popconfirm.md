# Popconfirm 气泡确认框

Popconfirm 是一个轻量级的确认弹窗，点击元素后弹出气泡，询问用户是否确认操作。与 Dialog 和 MessageBox 相比，Popconfirm 更加轻量，适用于不需要复杂内容的简单确认场景。

## 基础用法

```vue
<template>
  <el-popconfirm title="确定删除这条记录吗？" @confirm="onConfirm" @cancel="onCancel">
    <el-button type="danger">删除</el-button>
  </el-popconfirm>
</template>

<script>
export default {
  methods: {
    onConfirm() {
      this.$message.success('已确认')
    },
    onCancel() {
      this.$message.info('已取消')
    }
  }
}
</script>
```

## 不同位置

```vue
<template>
  <el-popconfirm title="确定？" placement="top" @confirm="onConfirm">
    <el-button>上</el-button>
  </el-popconfirm>
  <el-popconfirm title="确定？" placement="bottom" @confirm="onConfirm">
    <el-button>下</el-button>
  </el-popconfirm>
  <el-popconfirm title="确定？" placement="left" @confirm="onConfirm">
    <el-button>左</el-button>
  </el-popconfirm>
  <el-popconfirm title="确定？" placement="right" @confirm="onConfirm">
    <el-button>右</el-button>
  </el-popconfirm>
</template>
```

## 自定义按钮文字

```vue
<template>
  <el-popconfirm
    title="确认提交？"
    confirm-button-text="提交"
    cancel-button-text="再想想"
    @confirm="onConfirm"
  >
    <el-button type="primary">提交</el-button>
  </el-popconfirm>
</template>
```

## 自定义按钮类型

```vue
<template>
  <el-popconfirm
    title="确认删除？"
    confirm-button-text="删除"
    confirm-button-type="danger"
    @confirm="onConfirm"
  >
    <el-button type="danger">删除</el-button>
  </el-popconfirm>
</template>
```

## 自定义图标

```vue
<template>
  <el-popconfirm
    title="确认删除？"
    icon="warning-o"
    icon-color="#e6a23c"
    @confirm="onConfirm"
  >
    <el-button type="danger">删除</el-button>
  </el-popconfirm>
</template>
```

## 隐藏图标

```vue
<template>
  <el-popconfirm title="确定？" hide-icon @confirm="onConfirm">
    <el-button>无图标</el-button>
  </el-popconfirm>
</template>
```

## 隐藏取消按钮

```vue
<template>
  <el-popconfirm title="确定？" :show-cancel="false" @confirm="onConfirm">
    <el-button>只有确认</el-button>
  </el-popconfirm>
</template>
```

## 何时使用

- 删除、下线、关闭等危险操作前的简单确认。
- 与 Dialog 相比，Popconfirm 更加轻量，适合不需要大量说明文字的场景。
- 操作按钮空间有限时，直接在按钮上弹出确认，无需额外弹层。

## API

### Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| title | 确认提示标题文字 | string | — |
| placement | 弹出位置 | `top` / `top-start` / `top-end` / `bottom` / `bottom-start` / `bottom-end` / `left` / `left-start` / `left-end` / `right` / `right-start` / `right-end` | `top` |
| disabled | 是否禁用 | boolean | `false` |
| icon | 图标名称（Vant 图标名） | string | `info-o` |
| icon-color | 图标颜色 | string | `#f90` |
| confirm-button-type | 确认按钮类型 | `default` / `primary` / `success` / `warning` / `danger` / `info` | `primary` |
| cancel-button-type | 取消按钮类型 | `default` / `primary` / `success` / `warning` / `danger` / `info` | `default` |
| confirm-button-text | 确认按钮文字 | string | `确定` |
| cancel-button-text | 取消按钮文字 | string | `取消` |
| teleport | 渲染容器选择器 | string | `body` |
| offset | 弹出层偏移量 [x, y] | array | `[0, 10]` |
| show-cancel | 是否显示取消按钮 | boolean | `true` |
| hide-icon | 是否隐藏图标 | boolean | `false` |
| hide-after-click | 点击按钮后是否自动隐藏 | boolean | `true` |

### Events

| Name | Description | Parameters |
| ---- | ----------- | ---------- |
| confirm | 点击确认按钮时触发 | — |
| cancel | 点击取消按钮时触发 | — |

### Slots

| Name | Description |
| ---- | ----------- |
| default | 触发 Popconfirm 的元素 |
| reference | 触发 Popconfirm 的自定义元素 |
