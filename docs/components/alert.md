# Alert 提示

Alert 用于在页面中展示重要的提示信息，帮助用户了解操作结果或注意事项。

Alert 支持四种类型（成功、警告、信息、错误），可通过标题和描述文字的组合传递不同层级的信息。组件内置可关闭功能和图标展示，适合在表单提交反馈、系统通知、操作引导等场景中使用。与 Message 气泡提示不同，Alert 是页面级的静态提示，会持续展示直到用户主动关闭或条件消失。

## 基本用法

```vue
<template>
  <el-alert title="成功提示" type="success" />
  <el-alert title="警告提示" type="warning" />
  <el-alert title="信息提示" type="info" />
  <el-alert title="错误提示" type="error" />
</template>
```

## 带描述

```vue
<template>
  <el-alert title="成功提示" type="success" description="这是一条成功的描述信息，用于补充说明" />
  <el-alert title="警告提示" type="warning" description="这是一条警告的描述信息，请用户注意" />
</template>
```

## 图标

```vue
<template>
  <el-alert title="成功提示" type="success" show-icon />
  <el-alert title="警告提示" type="warning" show-icon />
  <el-alert title="信息提示" type="info" show-icon />
  <el-alert title="错误提示" type="error" show-icon />
</template>
```

## 居中

```vue
<template>
  <el-alert title="成功提示" type="success" center show-icon />
  <el-alert title="错误提示" type="error" center show-icon />
</template>
```

## 可关闭

```vue
<template>
  <el-alert title="可关闭的提示" type="success" closable />
  <el-alert title="不可关闭的提示" type="warning" :closable="false" />
</template>
```

## 无标题

```vue
<template>
  <el-alert type="success" show-icon description="只有描述没有标题的提示" />
  <el-alert type="warning" show-icon description="纯描述信息" />
</template>
```

## 何时使用

- **操作反馈**：在表单提交、数据保存等操作完成后，用 Alert 展示成功或失败的结果。
- **系统通知**：在页面顶部展示需要用户关注的系统级信息，如版本更新、维护公告。
- **风险提示**：在执行不可逆操作前，用警告类型 Alert 提醒用户注意潜在风险。

## API

### Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| title | 提示的标题文字，通常用于概括提示的核心信息 | string | — |
| type | 提示类型，决定图标的样式和背景色调 | `success` / `warning` / `info` / `error` | `info` |
| description | 描述性文字，用于对标题进行更详细的补充说明 | string | — |
| closable | 是否可关闭。启用后会在提示右侧显示关闭按钮 | boolean | `true` |
| center | 文字是否居中对齐 | boolean | `false` |
| closeText | 关闭按钮的自定义文本，替换默认的关闭图标 | string | — |
| showIcon | 是否在标题前显示对应类型的图标 | boolean | `false` |
| effect | 主题风格，dark 为深色背景，light 为浅色背景 | `light` / `dark` | `light` |

### Events

| Name | Description | Parameters |
| ---- | ----------- | ---------- |
| close | Alert 被关闭时触发，可用于执行清理或记录关闭行为 | — |
