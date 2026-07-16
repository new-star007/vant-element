# Loading 加载中

Loading 组件用于在数据加载或异步操作期间向用户展示加载状态。它提供两种使用方式：**Service 方式**（`this.$loading()`）通过 JavaScript 调用，适合全屏加载遮罩，返回一个包含 `close()` 方法的对象，可随时关闭；**指令方式**（`v-loading`）通过 DOM 指令绑定，适合局部区域加载，只需切换绑定值即可控制显示。Service 方式适合「提交表单后等待响应」等场景，指令方式适合「表格数据加载中」等局部区域场景。

## 文字加载

```vue
<template>
  <el-button type="primary" @click="showLoading">显示加载</el-button>
</template>

<script>
export default {
  methods: {
    showLoading() {
      const loading = this.$loading({ text: '加载中...' })
      setTimeout(() => { loading.close() }, 2000)
    }
  }
}
</script>
```

## 何时使用

- 提交表单或执行耗时操作后，需要全屏遮罩防止重复提交时，使用 Service 方式（`$loading`）。
- 页面中某个区域（如表格、卡片列表）正在加载数据，需要局部加载提示时，使用指令方式（`v-loading`）。
- 异步操作时间不确定，需要由代码精确控制加载状态的开始和结束时，使用 Service 方式。

## API

### Methods

| Name | Description | Parameters | Return |
| ---- | ----------- | ---------- | ------ |
| $loading | 创建全屏加载遮罩，覆盖整个视口，返回实例对象供手动关闭 | `{ text }` | `{ close() }` 调用 close() 关闭遮罩 |
