# Message 消息提示

Message 是一种轻量级的全局反馈提示，从页面顶部滑入并在指定时间后自动消失。它不会打断用户的操作流程，非常适合用来反馈操作结果，例如「保存成功」「请填写必填项」等短文本提示。与 Notification 相比，Message 更加轻量、位置固定在顶部、不会显示标题；与 MessageBox 相比，Message 不会阻断用户操作，无需用户主动确认。如果你需要用户确认或输入，请使用 MessageBox。

## 不同类型

```vue
<template>
  <el-button type="success" @click="showSuccess">成功</el-button>
  <el-button type="warning" @click="showWarning">警告</el-button>
  <el-button type="info" @click="showInfo">信息</el-button>
  <el-button type="danger" @click="showError">错误</el-button>
  <el-button @click="showNormal">普通</el-button>
</template>

<script>
export default {
  methods: {
    showSuccess() {
      this.$message.success('成功提示')
    },
    showWarning() {
      this.$message.warning('警告提示')
    },
    showInfo() {
      this.$message.info('信息提示')
    },
    showError() {
      this.$message.error('错误提示')
    },
    showNormal() {
      this.$message('普通消息')
    }
  }
}
</script>
```

## 可关闭

```vue
<template>
  <el-button type="primary" @click="showClosable">可关闭消息</el-button>
</template>

<script>
export default {
  methods: {
    showClosable() {
      this.$message({ message: '可关闭消息', duration: 0 })
    }
  }
}
</script>
```

## 自定义时长

```vue
<template>
  <el-button type="primary" @click="showLongDuration">自定义时长</el-button>
</template>

<script>
export default {
  methods: {
    showLongDuration() {
      this.$message({ message: '这条消息显示5秒', duration: 5000 })
    }
  }
}
</script>
```

## 何时使用

- 操作完成后需要给用户一个简短反馈，如「保存成功」「复制已完成」。
- 需要提示用户注意某个非关键信息，且不希望打断其当前操作流程时。
- 轻量提示即可，不需要标题、不需要用户确认，也不需要自定义位置时选择 Message；需要更丰富的展示请使用 Notification。

## API

### Methods

| Name | Description | Parameters |
| ---- | ----------- | ---------- |
| $message | 显示一条普通消息（无图标） | `{ message, type, duration }` |
| $message.success | 显示成功消息（绿色对勾图标） | message / options |
| $message.warning | 显示警告消息（橙色感叹号图标） | message / options |
| $message.info | 显示信息消息（蓝色信息图标） | message / options |
| $message.error | 显示错误消息（红色叉号图标） | message / options |

### Options

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| message | 消息文本内容，支持纯文本 | string | — |
| type | 消息类型，决定显示的图标和颜色 | `success` / `warning` / `info` / `error` | — |
| duration | 显示时长（毫秒），设为 0 则不自动关闭，需手动调用 close 方法。各类型默认值：success=2000, info=2000, warning=3000, error=3000 | number | 按类型分别设置 |
