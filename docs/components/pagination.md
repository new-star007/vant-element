# Pagination 分页

分页组件用于将大量数据分割成多个页面展示，提升页面加载速度和用户体验。支持页码导航、总数显示、不同尺寸等配置，是处理大数据量展示的核心组件。

分页组件通常与表格、列表等数据展示组件配合使用，提供统一的分页交互体验。通过简单的配置即可实现页码切换、每页条数调整等功能。

## 何时使用

- 当数据量过大，需要分页加载以提升性能时
- 当需要与表格或列表组件配合，实现数据的分页展示时
- 当需要在页面底部或顶部提供页码导航时

## 基础分页

```vue
<template>
  <el-pagination :total="100" :page-size="10" :current-page.sync="currentPage" @current-change="handleChange" />
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1
    }
  },
  methods: {
    handleChange(val) {
      this.currentPage = val
    }
  }
}
</script>
```

## 显示总数

```vue
<template>
  <el-pagination :total="85" :page-size="10" show-total />
</template>
```

## 不同尺寸

```vue
<template>
  <el-pagination :total="50" :page-size="5" />
  <el-pagination :total="50" :page-size="5" small />
</template>
```

## 禁用

```vue
<template>
  <el-pagination :total="120" :page-size="10" :current-page="1" disabled />
</template>
```

## API

### Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| total | 数据总条数，用于计算总页数和页码范围 | number | — |
| pageSize | 每页显示的数据条数，影响分页计算 | number | — |
| currentPage / .sync | 当前页码，支持 .sync 修饰符实现双向绑定 | number | — |
| showTotal | 是否显示数据总数，开启后会在分页旁显示"共 X 条" | boolean | `false` |
| small | 是否使用小尺寸，适用于空间紧凑的场景 | boolean | `false` |
| disabled | 是否禁用分页，禁用后无法点击页码 | boolean | `false` |

### Events

| Name | Description | Parameters |
| ---- | ----------- | ---------- |
| current-change | 页码改变时触发，可用于请求新页面的数据 | 当前页码数值 |
