# DatePicker 日期选择器

日期选择器用于让用户在可视化日历面板中选择日期，是表单中采集时间信息的核心组件。它支持多种粒度的日期类型——包括日期、日期时间、年份和月份，可以满足从精确到秒的时间录入到粗略的月份选择等不同场景。组件内置了禁用日期、可清空、自定义占位文本等常用能力，配合 `type` 属性即可快速切换选择模式，无需使用不同的组件。

## 选择日期

```vue
<template>
  <el-date-picker v-model="date" placeholder="选择日期" />
</template>

<script>
export default {
  data() {
    return {
      date: null
    }
  }
}
</script>
```

## 选择日期时间

```vue
<template>
  <el-date-picker v-model="date" type="datetime" placeholder="选择日期时间" />
</template>

<script>
export default {
  data() {
    return {
      date: null
    }
  }
}
</script>
```

## 选择年份

```vue
<template>
  <el-date-picker v-model="date" type="year" placeholder="选择年份" />
</template>

<script>
export default {
  data() {
    return {
      date: null
    }
  }
}
</script>
```

## 选择月份

```vue
<template>
  <el-date-picker v-model="date" type="month" placeholder="选择月份" />
</template>

<script>
export default {
  data() {
    return {
      date: null
    }
  }
}
</script>
```

## 禁用状态

```vue
<template>
  <el-date-picker v-model="date" placeholder="已禁用" disabled />
</template>

<script>
export default {
  data() {
    return {
      date: null
    }
  }
}
</script>
```

## 可清空

```vue
<template>
  <el-date-picker v-model="date" placeholder="可清空" clearable />
</template>

<script>
export default {
  data() {
    return {
      date: null
    }
  }
}
</script>
```

## 何时使用

- **表单日期录入**：需要用户选择一个具体日期（如出生日期、预约日期）时使用 `type="date"`，是最常见的场景。
- **精确时间记录**：需要同时采集日期和时间（如航班出发时间、会议排期）时使用 `type="datetime"`。
- **粗粒度选择**：仅需要选择年份或月份（如选择年份进行数据筛选、选择月份查看月度报表）时使用 `type="year"` 或 `type="month"`。

## API

### Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| value / v-model | 绑定值，支持 `Date` 对象或格式化的日期字符串 | Date / string | — |
| type | 选择器类型：`date` 选择日期，`datetime` 选择日期时间，`year` 选择年份，`month` 选择月份 | `date` / `datetime` / `year` / `month` | `date` |
| placeholder | 输入框占位文本，未选择值时显示 | string | `请选择日期` |
| disabled | 是否禁用选择器，禁用后不可点击和输入 | boolean | `false` |
| clearable | 是否可清空，开启后输入框右侧显示清除按钮 | boolean | `true` |

### Events

| Name | Description | Parameters |
| ---- | ----------- | ---------- |
| change | 绑定值改变时触发，即用户确认选择后回调 | 选中的日期值 |
