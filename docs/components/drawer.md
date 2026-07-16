# Drawer 抽屉

Drawer 是一个从屏幕边缘滑入的面板组件，用于承载表单填写、详情展示、配置编辑等辅助内容。与 Dialog 不同，Drawer 通常不阻断用户对背景页面的查看。

Drawer 支持从四个方向滑入，可设置尺寸、遮罩、关闭前确认等功能，适合在移动端和后台管理系统中使用。

## 基础用法

```vue
<template>
  <el-button type="primary" @click="visible = true">打开抽屉</el-button>
  <el-drawer title="基础抽屉" :visible.sync="visible">
    <p>这是抽屉的内容区域</p>
  </el-drawer>
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

## 不同方向

```vue
<template>
  <el-button @click="open('rtl')">右侧滑入</el-button>
  <el-button @click="open('ltr')">左侧滑入</el-button>
  <el-button @click="open('ttb')">顶部滑入</el-button>
  <el-button @click="open('btt')">底部滑入</el-button>
  <el-drawer title="抽屉" :direction="direction" :visible.sync="visible">
    <p>从{{ directionText }}滑入</p>
  </el-drawer>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      direction: 'rtl'
    }
  },
  computed: {
    directionText() {
      const map = { rtl: '右侧', ltr: '左侧', ttb: '顶部', btt: '底部' }
      return map[this.direction]
    }
  },
  methods: {
    open(dir) {
      this.direction = dir
      this.visible = true
    }
  }
}
</script>
```

## 自定义尺寸

```vue
<template>
  <el-button type="primary" @click="visible = true">打开抽屉（50%）</el-button>
  <el-drawer title="自定义尺寸" :visible.sync="visible" size="50%">
    <p>宽度为 50%</p>
  </el-drawer>
</template>
```

## 点击遮罩不关闭

```vue
<template>
  <el-drawer title="点击遮罩不关闭" :visible.sync="visible" :close-on-click-modal="false">
    <p>点击遮罩层不会关闭抽屉</p>
    <el-button @click="visible = false">关闭</el-button>
  </el-drawer>
</template>
```

## 关闭前确认

```vue
<template>
  <el-drawer title="关闭前确认" :visible.sync="visible" :before-close="handleBeforeClose">
    <p>关闭前会进行确认</p>
  </el-drawer>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    }
  },
  methods: {
    handleBeforeClose(close) {
      this.$confirm('确定关闭吗？')
        .then(() => close('close'))
        .catch(() => {})
    }
  }
}
</script>
```

## 多层嵌套

```vue
<template>
  <el-button type="primary" @click="outerVisible = true">打开外层抽屉</el-button>
  <el-drawer title="外层" :visible.sync="outerVisible" size="80%">
    <p>这是外层抽屉</p>
    <el-button type="primary" @click="innerVisible = true">打开内层抽屉</el-button>
    <el-drawer title="内层" :visible.sync="innerVisible" size="60%">
      <p>这是内层抽屉</p>
    </el-drawer>
  </el-drawer>
</template>

<script>
export default {
  data() {
    return {
      outerVisible: false,
      innerVisible: false
    }
  }
}
</script>
```

## 何时使用

- 需要在不离开当前页面的情况下展示详情或编辑表单。
- 需要在页面边缘滑入辅助信息面板，如通知列表、设置面板。
- 与 Dialog 相比，Drawer 更适合承载非阻断性的辅助内容。

## API

### Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| visible / .sync | 抽屉是否显示，支持 .sync 双向绑定 | boolean | `false` |
| title | 抽屉标题 | string | — |
| size | 抽屉尺寸，左右方向为宽度，上下方向为高度 | string / number | `30%` |
| direction | 抽屉滑入方向 | `rtl` / `ltr` / `ttb` / `btt` | `rtl` |
| modal | 是否显示遮罩层 | boolean | `true` |
| modal-class | 遮罩层自定义类名 | string | — |
| modal-style | 遮罩层自定义样式 | object | — |
| show-close | 是否显示关闭按钮 | boolean | `true` |
| before-close | 关闭前的拦截回调，调用 close('close') 后才会关闭 | function | — |
| close-on-click-modal | 点击遮罩层是否关闭 | boolean | `true` |
| close-on-press-escape | 按 ESC 键是否关闭 | boolean | `true` |
| open-delay | 打开延迟（ms） | number | `0` |
| close-delay | 关闭延迟（ms） | number | `0` |
| custom-class | 自定义类名 | string | — |
| destroy-on-close | 关闭时是否销毁内容 | boolean | `false` |
| append-to-body | 是否插入到 body | boolean | `true` |
| z-index | 层级 | number | `2000` |
| lock-scroll | 是否锁定背景滚动 | boolean | `true` |

### Events

| Name | Description | Parameters |
| ---- | ----------- | ---------- |
| open | 打开动画开始时触发 | — |
| opened | 打开动画结束时触发 | — |
| close | 关闭动画开始时触发 | — |
| closed | 关闭动画结束时触发 | — |

### Slots

| Name | Description |
| ---- | ----------- |
| default | 抽屉主体内容 |
| title | 自定义标题区域 |
| footer | 底部操作区域 |
