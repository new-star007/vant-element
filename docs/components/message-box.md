# MessageBox 弹框

MessageBox 是一个模态弹框组件，用于向用户展示重要信息并要求其做出响应。它提供三种标准模式：`$alert` 用于展示警告信息（只有确认按钮），`$confirm` 用于二次确认操作（确认+取消），`$prompt` 用于收集用户输入（包含输入框）。MessageBox 会阻断页面操作，强制用户处理当前弹框后才能继续。与轻量级的 Message 提示不同，MessageBox 适合「确定删除吗？」「请输入密码」等需要用户明确决策的场景。所有方法均返回 Promise，便于链式处理用户的确认或取消行为。

## $alert

```vue
<template>
  <el-button type="primary" @click="handleAlert">打开 Alert</el-button>
</template>

<script>
export default {
  methods: {
    handleAlert() {
      this.$alert('这是提示内容', '标题')
    }
  }
}
</script>
```

## $confirm

```vue
<template>
  <el-button type="success" @click="handleConfirm">打开 Confirm</el-button>
</template>

<script>
export default {
  methods: {
    handleConfirm() {
      this.$confirm('确定执行操作吗？', '确认')
        .then(() => { this.$message.success('已确认') })
        .catch(() => { this.$message.info('已取消') })
    }
  }
}
</script>
```

## $prompt

```vue
<template>
  <el-button type="warning" @click="handlePrompt">打开 Prompt</el-button>
</template>

<script>
export default {
  methods: {
    handlePrompt() {
      this.$prompt('请输入内容', '提示')
        .then(({ value }) => { this.$message.success('输入内容: ' + value) })
        .catch(() => { this.$message.info('已取消') })
    }
  }
}
</script>
```

## 何时使用

- 需要用户确认一个不可逆操作，如删除数据、退出登录，使用 `$confirm`。
- 需要向用户展示警告或重要通知，并要求其点击确认后才关闭，使用 `$alert`。
- 需要向用户收集简短输入（如密码、验证码），使用 `$prompt`。

## API

### Methods

| Name | Description | Parameters | Return |
| ---- | ----------- | ---------- | ------ |
| $alert | 弹出警告弹框，仅包含确认按钮，适合展示重要通知 | (message, title, options) | Promise，用户点击确认后 resolve |
| $confirm | 弹出确认弹框，包含确认和取消按钮，适合二次确认操作 | (message, title, options) | Promise，确认 resolve，取消 reject |
| $prompt | 弹出输入弹框，包含输入框和确认/取消按钮，适合收集用户输入 | (message, title, options) | Promise<{ value }>，确认时 resolve 输入值，取消 reject |
| $msgbox | 弹出自定义弹框，通过 options 完全控制弹框内容和行为 | options | Promise |
