# TimeSelect 时间选择

TimeSelect 是一个固定选项的时间选择器，用于选择时间点。与 TimePicker 不同，TimeSelect 通过 `start`、`end`、`step` 三个属性自动生成可选项列表，适合选择营业时间、预约时段等规则间隔的时间场景。

## 基础用法

```vue
<template>
  <el-time-select v-model="value" placeholder="选择时间" />
</template>

<script>
export default {
  data() {
    return {
      value: ''
    }
  }
}
</script>
```

## 自定义时间范围

```vue
<template>
  <el-time-select v-model="value" start="08:00" end="20:00" step="01:00" placeholder="选择时间" />
</template>
```

## 限制可选时间

```vue
<template>
  <el-time-select v-model="value" start="09:00" end="21:00" step="00:30" min-time="12:00" max-time="18:00" placeholder="仅选择下午时段" />
</template>
```

## 禁用状态

```vue
<template>
  <el-time-select v-model="value" placeholder="已禁用" disabled />
</template>
```

## 前缀图标

```vue
<template>
  <el-time-select v-model="value" prefix-icon="clock-o" placeholder="选择时间" />
</template>
```

## 何时使用

- 选择规则间隔的时间点，如预约时段每半小时一次。
- 营业时间、上课时间、排班时间等具有固定步长的场景。
- 与 TimePicker 相比，TimeSelect 的选项是预定义的固定列表，更适合时间段固定的业务场景。

## API

### Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| value / v-model | 绑定值 | string | — |
| disabled | 是否禁用 | boolean | `false` |
| editable | 是否可手动输入 | boolean | `true` |
| clearable | 是否可清空 | boolean | `true` |
| size | 尺寸 | string | — |
| placeholder | 占位提示文本 | string | `请选择` |
| start | 开始时间 | string | `09:00` |
| end | 结束时间 | string | `18:00` |
| step | 时间间隔 | string | `00:30` |
| min-time | 最小可选时间 | string | — |
| max-time | 最大可选时间 | string | — |
| prefix-icon | 前缀图标（Vant 图标名） | string | — |
| picker-options | 时间选择器的额外配置（start/end/step/minTime/maxTime） | object | `{}` |

### Events

| Name | Description | Parameters |
| ---- | ----------- | ---------- |
| input | 选择时间时触发 | 选中值 |
| change | 选择时间时触发 | 选中值 |
