# TimePicker 时间选择器

时间选择器用于让用户通过可视化的时钟面板选择具体时间，适用于需要精确到小时和分钟的时间录入场景。与 DatePicker 配合使用时，可以覆盖「日期 + 时间」的完整时间选择需求。组件提供了禁用状态、可清空等常用交互能力，用户可通过滚轮或直接输入的方式快速设定时间。

## 选择时间

```vue
<template>
  <el-time-picker v-model="time" placeholder="选择时间" />
</template>

<script>
export default {
  data() {
    return {
      time: null
    }
  }
}
</script>
```

## 禁用

```vue
<template>
  <el-time-picker v-model="time" placeholder="已禁用" disabled />
</template>

<script>
export default {
  data() {
    return {
      time: null
    }
  }
}
</script>
```

## 可清空

```vue
<template>
  <el-time-picker v-model="time" placeholder="可清空" clearable />
</template>

<script>
export default {
  data() {
    return {
      time: null
    }
  }
}
</script>
```

## 何时使用

- **时间范围设定**：需要用户选择一个具体的时刻（如闹钟时间、营业时间）时使用，是时间录入的标准方案。
- **与 DatePicker 联动**：当表单同时需要日期和时间时，TimePicker 可与 DatePicker 的 `type="datetime"` 互补，或独立用于纯时间场景（如设置提醒时间）。
- **替代手动输入**：相比纯文本输入时间，可视化选择器能有效避免格式错误，提升用户体验。

## API

### Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| value / v-model | 绑定值，支持 `Date` 对象或格式化的时间字符串 | Date / string | — |
| placeholder | 输入框占位文本，未选择值时显示 | string | `请选择时间` |
| disabled | 是否禁用选择器，禁用后不可点击和输入 | boolean | `false` |
| clearable | 是否可清空，开启后输入框右侧显示清除按钮 | boolean | `true` |

### Events

| Name | Description | Parameters |
| ---- | ----------- | ---------- |
| change | 绑定值改变时触发，即用户确认选择后回调 | 选中的时间值 |
