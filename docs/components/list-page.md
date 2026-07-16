# ListPage 列表页

列表页是集成了分页功能的列表组件，专门用于处理需要分页展示的数据列表场景。通过内置的分页逻辑，开发者只需提供数据请求函数，即可快速构建带分页的列表页面。

与普通列表不同，列表页自动管理页码状态、加载状态和数据刷新，大幅简化了分页列表的开发工作。非常适合用于后台管理系统的数据列表页面。

## 何时使用

- 当需要展示分页数据列表，且希望简化分页逻辑的开发时
- 当需要快速构建后台管理系统的数据列表页面时
- 当需要支持搜索、筛选等交互的分页列表场景时

## 基础列表页

```vue
<template>
  <el-list-page :fetch="fetchList" :page-size="5" border stripe @row-click="handleRowClick">
    <el-list-item type="index" />
    <el-list-item prop="name" label="名称" />
    <el-list-item prop="category" label="分类" />
    <el-list-item prop="price" label="价格" />
  </el-list-page>
</template>

<script>
export default {
  methods: {
    fetchList({ page, pageSize }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            list: [
              { name: '商品A', category: '电子', price: 99 },
              { name: '商品B', category: '服饰', price: 199 }
            ],
            total: 20
          })
        }, 500)
      })
    },
    handleRowClick(row) {
      console.log('点击行', row)
    }
  }
}
</script>
```

## 带搜索

```vue
<template>
  <el-input v-model="query" placeholder="搜索名称" clearable @input="handleSearch" />
  <el-list-page ref="list" :fetch="fetchList" :page-size="5" border stripe>
    <el-list-item type="index" />
    <el-list-item prop="name" label="名称" />
    <el-list-item prop="price" label="价格">
      <template slot-scope="{ row }">
        <el-tag type="danger" size="small">¥{{ row.price }}</el-tag>
      </template>
    </el-list-item>
  </el-list-page>
</template>

<script>
export default {
  data() {
    return {
      query: ''
    }
  },
  methods: {
    fetchList({ page, pageSize }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            list: [
              { name: '商品A', price: 99 },
              { name: '商品B', price: 199 }
            ],
            total: 20
          })
        }, 500)
      })
    },
    handleSearch() {
      this.$refs.list.refresh()
    }
  }
}
</script>
```

## 带操作按钮

```vue
<template>
  <el-list-page :fetch="fetchList" :page-size="5" border stripe>
    <el-list-item type="index" />
    <el-list-item prop="name" label="名称" />
    <el-list-item type="footer" label="操作">
      <template slot-scope="{ row }">
        <el-button type="primary" size="mini">编辑</el-button>
        <el-button type="danger" size="mini">删除</el-button>
      </template>
    </el-list-item>
  </el-list-page>
</template>

<script>
export default {
  methods: {
    fetchList({ page, pageSize }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            list: [
              { name: '商品A', price: 99 },
              { name: '商品B', price: 199 }
            ],
            total: 20
          })
        }, 500)
      })
    }
  }
}
</script>
```

## API

### Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| fetch | 数据请求函数，接收 { page, pageSize } 参数，需返回 Promise，resolve 格式为 `{ list: T[], total: number }` | ({ page, pageSize }) => Promise<{ list: T[], total: number }> | — |
| pageSize | 每页显示的数据条数，用于计算总页数 | number | — |
| border | 是否显示表格边框，开启后会有明显的边框线 | boolean | `false` |
| stripe | 是否显示斑马纹，开启后奇偶行会交替显示不同背景色 | boolean | `false` |

### Events

| Name | Description | Parameters |
| ---- | ----------- | ---------- |
| row-click | 点击表格行时触发，可用于执行行级操作或查看详情 | 当前点击行的数据对象 |

### Methods

| Name | Description | Parameters |
| ---- | ----------- | ---------- |
| refresh | 刷新列表数据，会重新调用 fetch 函数并回到第一页 | — |
