# Switch 开关

开关用于在两个互斥状态之间切换，如开启/关闭、启用/禁用。相比 Checkbox，开关更直观地表示当前状态，适合用于系统设置、功能开关等场景。

开关的切换是即时生效的，无需额外的提交操作。支持自定义颜色、文字标签和尺寸，可根据品牌风格灵活调整视觉表现。

## 基础用法

```vue
<template>
  <el-switch v-model="value" />
</template>

<script>
export default {
  data() {
    return {
      value: false
    }
  }
}
</script>
```

## 自定义颜色

```vue
<template>
  <el-switch v-model="value" active-color="#07c160" inactive-color="#eee" />
  <el-switch v-model="value" inactive-color="#f56c6c" />
</template>

<script>
export default {
  data() {
    return {
      value: false
    }
  }
}
</script>
```

## 自定义文字

```vue
<template>
  <el-switch v-model="value" active-text="开启" inactive-text="关闭" />
</template>

<script>
export default {
  data() {
    return {
      value: false
    }
  }
}
</script>
```

## 禁用

```vue
<template>
  <el-switch v-model="value" disabled />
  <el-switch :value="true" disabled />
</template>

<script>
export default {
  data() {
    return {
      value: false
    }
  }
}
</script>
```

## 大小

```vue
<template>
  <el-switch v-model="value" :size="18" />
  <el-switch v-model="value" :size="24" />
  <el-switch v-model="value" :size="30" />
</template>

<script>
export default {
  data() {
    return {
      value: false
    }
  }
}
</script>
```

## 何时使用

- 需要在两个互斥状态之间切换时，如开启/关闭通知、启用/禁用功能。
- 需要即时生效的设置操作，无需额外提交按钮时。
- 相比 Checkbox，需要更直观地展示当前状态（开/关视觉反馈）时。

## API

### Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| value / v-model | 绑定值，`true` 表示开启状态，`false` 表示关闭状态 | boolean | `false` |
| disabled | 是否禁用。禁用后开关不可切换，显示为灰色 | boolean | `false` |
| active-color | 开启状态的背景颜色，用于自定义品牌色 | string | — |
| inactive-color | 关闭状态的背景颜色 | string | — |
| active-text | 开启状态显示的文字标签，显示在开关右侧 | string | — |
| inactive-text | 关闭状态显示的文字标签，显示在开关左侧 | string | — |
| size | 开关尺寸，单位为像素（px） | string / number | — |

### Events

| Name | Description | Parameters |
| ---- | ----------- | ---------- |
| change | 开关状态改变时触发（用户点击切换时） | 新状态值（boolean） |
