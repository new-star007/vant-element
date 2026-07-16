# Slider 滑块

滑块用于在指定范围内通过拖动选择一个数值或数值区间。适用于对精度要求不高但需要直觉操作的场景，如音量调节、亮度调节、价格筛选等。

滑块支持单值和范围选择两种模式，可设置步长控制精度，也可显示输入框供用户直接输入精确数值。相比数字输入框，滑块更强调操作的便捷性和视觉反馈。

## 基础用法

```vue
<template>
  <el-slider v-model="value" />
</template>

<script>
export default {
  data() {
    return {
      value: 0
    }
  }
}
</script>
```

## 显示数值

```vue
<template>
  <el-slider v-model="value" show-input />
</template>

<script>
export default {
  data() {
    return {
      value: 0
    }
  }
}
</script>
```

## 范围选择

```vue
<template>
  <el-slider v-model="value" range />
</template>

<script>
export default {
  data() {
    return {
      value: [0, 100]
    }
  }
}
</script>
```

## 步进

```vue
<template>
  <el-slider v-model="value" :step="10" show-input />
</template>

<script>
export default {
  data() {
    return {
      value: 0
    }
  }
}
</script>
```

## 禁用

```vue
<template>
  <el-slider v-model="value" disabled />
</template>

<script>
export default {
  data() {
    return {
      value: 0
    }
  }
}
</script>
```

## 自定义范围

```vue
<template>
  <el-slider v-model="value" :min="-50" :max="50" show-input />
</template>

<script>
export default {
  data() {
    return {
      value: 0
    }
  }
}
</script>
```

## 何时使用

- 需要用户在一定范围内选择一个数值时，如音量、亮度、价格区间。
- 对精度要求不高，更注重操作便捷性和直觉交互时。
- 需要同时选择一个数值范围（如最低价和最高价）时，使用 `range` 模式。

## API

### Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| value / v-model | 绑定值。单值模式为 number，范围模式为 [min, max] 的 array | number / array | `0` |
| min | 滑块最小值，滑块可拖动到的最左端位置 | number | `0` |
| max | 滑块最大值，滑块可拖动到的最右端位置 | number | `100` |
| step | 步长，滑块每次移动的最小刻度 | number | `1` |
| disabled | 是否禁用。禁用后滑块不可拖动，显示为灰色 | boolean | `false` |
| showInput | 是否在滑块右侧显示数字输入框，支持直接输入精确数值 | boolean | `false` |
| range | 是否为范围选择模式。开启后出现两个滑块，可选择一个数值区间 | boolean | `false` |

### Events

| Name | Description | Parameters |
| ---- | ----------- | ---------- |
| change | 滑块值改变时触发（拖动结束或输入框值变化时） | 当前值 |
| input | 拖动过程中实时触发，用于实时响应 | 当前值 |
