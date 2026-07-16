# Button 按钮

按钮用于触发一个即时操作，例如提交表单、打开对话框、取消操作或执行删除。

按钮是界面中最常见的交互元素之一。Vant Element 提供了丰富的按钮类型和状态，支持朴素、圆角、圆形、禁用、加载中等多种样式变体，可根据业务场景灵活组合使用。与 ButtonGroup 配合使用时，还可以将多个按钮组合为一个整体，适用于分页导航、操作切换等场景。

## 按钮类型

```vue
<template>
  <el-button>default</el-button>
  <el-button type="primary">primary</el-button>
  <el-button type="success">success</el-button>
  <el-button type="warning">warning</el-button>
  <el-button type="danger">danger</el-button>
  <el-button type="info">info</el-button>
</template>
```

## 朴素按钮

```vue
<template>
  <el-button plain>default</el-button>
  <el-button type="primary" plain>primary</el-button>
  <el-button type="success" plain>success</el-button>
  <el-button type="warning" plain>warning</el-button>
  <el-button type="danger" plain>danger</el-button>
  <el-button type="info" plain>info</el-button>
</template>
```

## 圆角与圆形

```vue
<template>
  <el-button round>圆角按钮</el-button>
  <el-button type="primary" round>圆角按钮</el-button>
  <el-button type="success" circle>✓</el-button>
  <el-button type="danger" circle>✗</el-button>
  <el-button type="warning" circle>!</el-button>
</template>
```

## 尺寸

```vue
<template>
  <el-button size="large">large</el-button>
  <el-button>normal</el-button>
  <el-button size="small">small</el-button>
  <el-button size="mini">mini</el-button>
</template>
```

## 禁用状态

```vue
<template>
  <el-button disabled>default</el-button>
  <el-button type="primary" disabled>primary</el-button>
  <el-button type="success" disabled>success</el-button>
  <el-button type="warning" disabled>warning</el-button>
  <el-button type="danger" disabled>danger</el-button>
  <el-button type="info" disabled>info</el-button>
</template>
```

## 加载中

```vue
<template>
  <el-button loading>加载中</el-button>
  <el-button type="primary" loading>加载中</el-button>
  <el-button type="success" loading>加载中</el-button>
  <el-button type="danger" loading>加载中</el-button>
</template>
```

## 图标按钮

```vue
<template>
  <el-button icon="el-icon-search">搜索</el-button>
  <el-button type="primary" icon="el-icon-edit">编辑</el-button>
  <el-button type="success" icon="el-icon-check">确定</el-button>
  <el-button type="danger" icon="el-icon-delete">删除</el-button>
  <el-button type="warning" icon="el-icon-star-on">收藏</el-button>
  <el-button type="info" icon="el-icon-message">消息</el-button>
</template>
```

## 按钮组

```vue
<template>
  <el-button-group capsule>
    <el-button icon="el-icon-arrow-left">上一页</el-button>
    <el-button>中间</el-button>
    <el-button>中间</el-button>
    <el-button>下一页<i class="el-icon-arrow-right el-icon--right" /></el-button>
  </el-button-group>
</template>
```

## 块级按钮

```vue
<template>
  <el-button block>块级按钮 default</el-button>
  <el-button type="primary" block>块级按钮 primary</el-button>
  <el-button type="success" block>块级按钮 success</el-button>
</template>
```

## 何时使用

- **主要操作**：使用 `type="primary"` 按钮引导用户完成核心流程，如提交、确认、下一步。
- **危险操作**：使用 `type="danger"` 按钮明确标识删除、取消订单等不可逆操作，避免误触。
- **异步等待**：使用 `loading` 属性在异步请求期间显示加载状态，防止用户重复点击。

## API

### Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| type | 按钮类型，决定按钮的主色调和视觉风格 | `default` / `primary` / `success` / `warning` / `danger` / `info` | `default` |
| size | 按钮尺寸，影响按钮的内边距和字体大小 | `large` / `normal` / `small` / `mini` | `normal` |
| plain | 朴素按钮，使用浅色背景和描边样式，视觉层级较低 | boolean | `false` |
| round | 圆角按钮，按钮四角呈圆弧形 | boolean | `false` |
| circle | 圆形按钮，按钮呈正圆形，适合放置单个图标 | boolean | `false` |
| block | 块级按钮，按钮宽度撑满父容器 | boolean | `false` |
| disabled | 是否禁用。禁用状态下按钮不可点击，且样式变为灰色 | boolean | `false` |
| loading | 加载状态。启用后按钮显示加载动画，同时禁止点击 | boolean | `false` |
| loadingText | 加载状态下的按钮文字，用于替换默认的加载提示 | string | — |
| icon | 图标类名，用于在按钮文字前显示图标 | string | — |
| nativeType | 原生 HTML type 属性，用于表单按钮场景 | `button` / `submit` / `reset` | `button` |

### Events

| Name | Description | Parameters |
| ---- | ----------- | ---------- |
| click | 按钮被点击时触发 | (event: Event) |
