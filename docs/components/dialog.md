# Dialog 对话框

Dialog 是一个模态弹窗组件，用于在不离开当前页面的前提下，向用户展示重要信息或收集输入。它会在页面上覆盖一层半透明遮罩，将用户的注意力集中在弹窗内容上。Dialog 适合承载表单填写、详情展示、二次确认等需要用户专注处理的交互场景。与轻量级的 Message/Notification 不同，Dialog 会阻断页面操作，直到用户主动关闭。

## 基础弹窗

```vue
<template>
  <el-button type="primary" @click="visible = true">打开弹窗</el-button>
  <el-dialog title="基础弹窗" :visible.sync="visible">
    <p>这是弹窗的默认内容</p>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    }
  }
}
</script>
```

## 显示关闭按钮

```vue
<template>
  <el-dialog title="有关闭按钮" :visible.sync="visible" :show-close="true">
    <p>右上角有关闭按钮</p>
  </el-dialog>
  <el-dialog title="无关闭按钮" :visible.sync="visible" :show-close="false">
    <p>没有关闭按钮</p>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    }
  }
}
</script>
```

## 点击遮罩关闭

```vue
<template>
  <el-dialog title="点击遮罩关闭" :visible.sync="visible" :close-on-click-modal="true">
    <p>点击遮罩层可以关闭弹窗</p>
  </el-dialog>
  <el-dialog title="点击遮罩不关闭" :visible.sync="visible" :close-on-click-modal="false">
    <p>点击遮罩层不会关闭</p>
    <el-button @click="visible = false">关闭</el-button>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    }
  }
}
</script>
```

## 关闭前确认

```vue
<template>
  <el-dialog title="关闭前确认" :visible.sync="visible" :before-close="handleBeforeClose">
    <p>关闭弹窗前会进行确认</p>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    }
  },
  methods: {
    handleBeforeClose(done) {
      this.$confirm('确定关闭吗？')
        .then(() => done())
        .catch(() => {})
    }
  }
}
</script>
```

## 自定义内容

```vue
<template>
  <el-dialog title="自定义表单" :visible.sync="visible">
    <el-form label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.name" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" placeholder="请输入邮箱" />
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      form: {
        name: '',
        email: ''
      }
    }
  }
}
</script>
```

## 何时使用

- 需要用户填写表单或编辑数据时，例如新建用户、修改配置。
- 需要展示重要详情或预览内容，且不希望用户离开当前页面时。
- 需要二次确认危险操作（如删除）但又希望承载更多说明文字时，优先考虑 MessageBox，需要复杂自定义内容时使用 Dialog。

## API

### Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| visible / .sync | 控制弹窗的显示与隐藏，支持 .sync 修饰符双向绑定 | boolean | `false` |
| title | 弹窗标题，显示在弹窗顶部 | string | — |
| show-close | 是否在右上角显示关闭按钮 | boolean | `true` |
| close-on-click-modal | 点击半透明遮罩层时是否关闭弹窗 | boolean | `true` |
| before-close | 关闭前的拦截回调，调用 done() 后才会真正关闭弹窗，可用于表单校验 | (action, done) => void | — |

### Events

| Name | Description | Parameters |
| ---- | ----------- | ---------- |
| open | 弹窗打开动画开始时触发（实现中同时触发 opened） | — |
| opened | 弹窗打开动画结束时触发 | — |
| close | 弹窗关闭动画结束时触发 | — |

### Slots

| Name | Description |
| ---- | ----------- |
| default | 弹窗主体内容，可放置任意组件或 HTML |
| footer | 底部操作区域，通常放置确认/取消按钮 |
