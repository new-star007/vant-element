# Calendar 日历

Calendar 用于展示日期信息，支持选择日期、切换月份、日期事件标记等功能。适合日程管理、预约日历、数据统计等场景。

## 基础用法

```vue
<template>
  <el-calendar v-model="value" />
</template>

<script>
export default {
  data() {
    return {
      value: '2026-07-11'
    }
  }
}
</script>
```

## 自定义日期范围

```vue
<template>
  <el-calendar v-model="value" :range="['2026-01-01', '2026-12-31']" />
</template>
```

## 日期事件

```vue
<template>
  <el-calendar v-model="value" :data="events" />
</template>

<script>
export default {
  data() {
    return {
      value: '2026-07-11',
      events: {
        '2026-07-11': [
          { title: '会议', color: '#409eff' },
          { title: '生日', color: '#67c23a' }
        ],
        '2026-07-15': [
          { title: '截止日', color: '#f56c6c' }
        ]
      }
    }
  }
}
</script>
```

## 自定义日期单元格

```vue
<template>
  <el-calendar v-model="value">
    <template slot="dateCell" slot-scope="{ data }">
      <div>{{ data.day }}</div>
      <div v-if="data.day === 1" style="color:#409eff;font-size:12px;">月初</div>
    </template>
  </el-calendar>
</template>
```

## 每周起始日

```vue
<template>
  <el-calendar v-model="value" :first-day-of-week="1" />
</template>

<script>
export default {
  data() {
    return {
      value: '2026-07-11'
    }
  }
}
</script>
```

## 何时使用

- 展示日期信息，如日程管理、预订日历。
- 选择特定日期，与日期选择器相比提供更完整的月度视图。
- 在日期上标记事件、任务或统计信息。

## API

### Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| value / v-model | 绑定日期值 | string / Date | — |
| range | 日期范围，数组形式 [start, end] | array | — |
| first-day-of-week | 每周起始日，0 为周日，1 为周一 | number | `0` |
| data | 日期事件数据，key 为日期字符串 (YYYY-MM-DD) | object | — |

### Events

| Name | Description | Parameters |
| ---- | ----------- | ---------- |
| input | 选中日期时触发 | 日期字符串 |
| month-change | 月份切换时触发 | 当前月份 Date |
| day-click | 点击日期时触发 | { date, day } |

### Slots

| Name | Description | Scope |
| ---- | ----------- | ----- |
| dateCell | 自定义日期单元格内容 | { date, day } |
