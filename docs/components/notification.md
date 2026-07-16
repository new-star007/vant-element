# Notification 通知

Notification 是一种全局通知组件，会从页面右上角（或左上角）浮入并自动消失。与 Message 的区别在于：Notification 支持自定义标题、可配置出现位置（左上/右上）、支持自定义背景色，且默认停留时间更长（4.5 秒）。它适合展示系统级消息，例如「你收到了一条新消息」「任务已提交，请等待审核」等需要用户留意但不必立即处理的通知。Notification 不会阻断用户操作，多个通知可以同时显示并自动堆叠。

## 基础通知

```vue
<template>
  <el-button type="primary" @click="showNotify">基础通知</el-button>
</template>

<script>
export default {
  methods: {
    showNotify() {
      this.$notify('通知内容')
    }
  }
}
</script>
```

## 不同类型

```vue
<template>
  <el-button type="success" @click="showSuccess">成功</el-button>
  <el-button type="warning" @click="showWarning">警告</el-button>
  <el-button type="danger" @click="showError">错误</el-button>
</template>

<script>
export default {
  methods: {
    showSuccess() {
      this.$notify.success('成功通知')
    },
    showWarning() {
      this.$notify.warning('警告通知')
    },
    showError() {
      this.$notify.error('错误通知')
    }
  }
}
</script>
```

## 自定义时长

```vue
<template>
  <el-button type="primary" @click="showLongDuration">持续5秒</el-button>
</template>

<script>
export default {
  methods: {
    showLongDuration() {
      this.$notify({ message: '这条通知显示5秒', duration: 5000 })
    }
  }
}
</script>
```

## 自定义颜色

```vue
<template>
  <el-button type="primary" @click="showCustomColor">自定义颜色</el-button>
</template>

<script>
export default {
  methods: {
    showCustomColor() {
      this.$notify({ message: '自定义颜色通知', backgroundColor: '#1989fa', duration: 3000 })
    }
  }
}
</script>
```

## 何时使用

- 需要通知用户系统级事件，如收到新消息、任务状态变更、系统维护通知。
- 需要展示较详细的通知内容（含标题），且希望通知在页面角落停留更长时间。
- 操作反馈需要自定义背景色或出现在指定位置（左上/右上）时，优先使用 Notification 而非 Message。

## API

### Methods

| Name | Description | Parameters |
| ---- | ----------- | ---------- |
| $notify | 显示一条基础通知（无图标，灰色背景） | message / options |
| $notify.success | 显示成功通知（绿色背景+对勾图标） | message / options |
| $notify.warning | 显示警告通知（橙色背景+感叹号图标） | message / options |
| $notify.info | 显示信息通知（蓝色背景+信息图标） | message / options |
| $notify.error | 显示错误通知（红色背景+叉号图标） | message / options |

### Options

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| message | 通知文本内容，支持纯文本 | string | — |
| type | 通知类型，决定图标和背景色 | `success` / `warning` / `info` / `error` | — |
| duration | 显示时长（毫秒），设为 0 则不自动关闭 | number | `3000` |
| backgroundColor | 自定义背景颜色，覆盖 type 默认色 | string | — |
| color | 文字颜色 | string | — |
| onClose | 关闭时的回调函数 | function | — |
| onClick | 点击时的回调函数 | function | — |
| customClass | 自定义类名 | string | — |
