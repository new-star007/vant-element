# Table 表格

表格用于展示大量结构化数据，支持排序、筛选、合计、展开行、合并单元格等高级功能。是数据密集型后台管理系统中最常用的组件。

## 何时使用

- 当需要展示大量结构化数据，且需要排序、筛选等功能时
- 当需要表格与分页组件配合处理海量数据时
- 当需要自定义单元格内容（如按钮、标签、链接等）时
- 当需要行展开、合计行、单元格合并等高级功能时

## 基础表格

```vue
<template>
  <el-table :data="tableData" border stripe>
    <el-table-column type="index" label="#" width="50" />
    <el-table-column prop="name" label="姓名" width="120" />
    <el-table-column prop="email" label="邮箱" show-overflow-tooltip />
    <el-table-column prop="role" label="角色" width="80" />
    <el-table-column label="操作" width="160">
      <template slot-scope="{ row }">
        <el-button type="primary" size="mini">编辑</el-button>
        <el-button type="danger" size="mini">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { name: '张三', email: 'zhangsan@example.com', role: '管理员' },
        { name: '李四', email: 'lisi@example.com', role: '编辑' },
        { name: '王五', email: 'wangwu@example.com', role: '访客' }
      ]
    }
  }
}
</script>
```

## 排序

通过在 `el-table-column` 上设置 `sortable` 属性即可开启排序功能。

```vue
<el-table :data="tableData" border @sort-change="onSortChange">
  <el-table-column prop="name" label="姓名" width="120" />
  <el-table-column prop="age" label="年龄" width="80" sortable />
  <el-table-column prop="score" label="分数" width="100" sortable />
</el-table>
```

### 默认排序

通过 `default-sort` 属性设置初始排序。

```vue
<el-table
  :data="tableData"
  border
  :default-sort="{ prop: 'age', order: 'descending' }"
>
  <el-table-column prop="age" label="年龄" width="80" sortable :sort-method="customSort" />
</el-table>
```

## 筛选

通过 `filters` 和 `filter-method` 属性开启列筛选功能。

```vue
<el-table :data="tableData" border @filter-change="onFilterChange">
  <el-table-column prop="name" label="姓名" width="120" />
  <el-table-column
    prop="role"
    label="角色"
    width="100"
    :filters="[
      { text: '管理员', value: '管理员' },
      { text: '编辑', value: '编辑' },
      { text: '访客', value: '访客' }
    ]"
  />
</el-table>
```

### 单选筛选

设置 `filter-multiple` 为 `false` 可切换为单选筛选模式。

```vue
<el-table :data="tableData" border>
  <el-table-column prop="name" label="姓名" width="120" />
  <el-table-column
    prop="role"
    label="角色"
    width="100"
    :filters="[
      { text: '管理员', value: '管理员' },
      { text: '编辑', value: '编辑' },
      { text: '访客', value: '访客' }
    ]"
    :filter-multiple="false"
  />
</el-table>
```

### 默认筛选值

通过 `filtered-value` 设置初始筛选条件。

```vue
<el-table :data="tableData" border>
  <el-table-column prop="name" label="姓名" width="120" />
  <el-table-column
    prop="role"
    label="角色"
    width="100"
    :filters="roleFilters"
    :filtered-value="['管理员']"
  />
</el-table>
```

## 多选

通过 `type="selection"` 列开启多选功能，表头复选框支持全选和半选状态。

```vue
<el-table ref="table" :data="tableData" border @selection-change="onSelectionChange">
  <el-table-column type="selection" width="48" />
  <el-table-column prop="name" label="姓名" />
</el-table>

<script>
export default {
  methods: {
    toggleAll() {
      this.$refs.table.toggleAllSelection()
    },
    clearAll() {
      this.$refs.table.clearSelection()
    }
  }
}
</script>
```

### 行可选控制

通过 `selectable` 属性控制哪些行可以被勾选。

```vue
<el-table :data="tableData" border @selection-change="onSelectionChange">
  <el-table-column type="selection" width="48" :selectable="canSelect" />
  <el-table-column prop="name" label="姓名" width="120" />
  <el-table-column prop="age" label="年龄" width="80" />
</el-table>

<script>
export default {
  methods: {
    canSelect(row) {
      return row.age > 25
    }
  }
}
</script>
```

### 高亮选中行

通过 `highlight-selection-row` 属性高亮被选中的行。

```vue
<el-table :data="tableData" border highlight-selection-row @selection-change="onSelectionChange">
  <el-table-column type="selection" width="48" />
  <el-table-column prop="name" label="姓名" width="120" />
</el-table>
```

## 合计行

通过 `show-summary` 属性开启合计行，支持自定义合计方法。

```vue
<el-table :data="tableData" border show-summary>
  <el-table-column prop="name" label="商品" width="120" />
  <el-table-column prop="price" label="单价" width="80" />
  <el-table-column prop="quantity" label="数量" width="80" />
  <el-table-column prop="total" label="总价" />
</el-table>
```

### 自定义合计方法

```vue
<el-table :data="tableData" border show-summary :summary-method="customSummary">
  <el-table-column prop="name" label="商品" width="120" />
  <el-table-column prop="price" label="单价" width="80" />
  <el-table-column prop="quantity" label="数量" width="80" />
  <el-table-column prop="total" label="总价" />
</el-table>

<script>
export default {
  methods: {
    customSummary({ columns, data }) {
      return columns.map((col, index) => {
        if (index === 0) return '合计'
        let allNaN = true
        let sum = 0
        data.forEach(item => {
          const num = Number(item[col.prop])
          if (!isNaN(num)) {
            allNaN = false
            sum += num
          }
        })
        return allNaN ? '' : sum
      })
    }
  }
}
</script>
```

## 行展开

通过 `type="expand"` 列开启行展开功能。

```vue
<el-table :data="tableData" border>
  <el-table-column type="expand">
    <template slot-scope="{ row }">
      <div class="expand-content">
        <p>姓名: {{ row.name }}</p>
        <p>邮箱: {{ row.email }}</p>
      </div>
    </template>
  </el-table-column>
  <el-table-column prop="name" label="姓名" width="120" />
  <el-table-column prop="email" label="邮箱" />
</el-table>
```

### 默认展开所有行

通过 `default-expand-all` 属性默认展开所有行。

```vue
<el-table :data="tableData" border default-expand-all>
  <el-table-column type="expand">
    <template slot-scope="{ row }">
      <p>{{ row.name }} - {{ row.email }}</p>
    </template>
  </el-table-column>
  <el-table-column prop="name" label="姓名" width="120" />
</el-table>
```

### expandRowKeys 控制展开

通过 `expand-row-keys` 属性传入 key 数组控制哪些行展开，需配合 `row-key` 使用。

```vue
<el-table
  :data="tableData"
  border
  row-key="name"
  :expand-row-keys="expandedKeys"
>
  <el-table-column type="expand">
    <template slot-scope="{ row }">
      <p>{{ row.name }}</p>
    </template>
  </el-table-column>
  <el-table-column prop="name" label="姓名" width="120" />
</el-table>

<script>
export default {
  data() {
    return {
      expandedKeys: ['张三', '王五']
    }
  }
}
</script>
```

## 自定义样式

支持通过函数动态设置行、单元格、表头的样式。

```vue
<el-table
  :data="tableData"
  border
  row-class-name="custom-row"
  :row-style="getRowStyle"
  :cell-class-name="getCellClass"
  :cell-style="getCellStyle"
  :header-row-class-name="headerRowClass"
  :header-row-style="headerRowStyle"
  :header-cell-class-name="getHeaderClass"
  :header-cell-style="getHeaderCellStyle"
>
  <el-table-column prop="name" label="姓名" width="120" />
  <el-table-column prop="age" label="年龄" width="80" />
</el-table>

<script>
export default {
  methods: {
    getRowStyle({ rowIndex }) {
      if (rowIndex === 0) return { fontWeight: 'bold' }
      return {}
    },
    getCellClass({ row, column }) {
      if (column.property === 'age' && row.age > 30) return 'age-high'
      return ''
    },
    getCellStyle({ row, column }) {
      if (column.property === 'age' && row.age > 30) return { color: '#f56c6c' }
      return {}
    },
    getHeaderCellStyle({ column }) {
      if (column.property === 'age') return { color: '#409eff' }
      return {}
    }
  }
}
</script>
```

## 自定义 formatter

`formatter` 函数的第 4 个参数为行索引 `index`。

```vue
<el-table :data="tableData" border>
  <el-table-column prop="name" label="姓名" width="120" :formatter="formatName" />
</el-table>

<script>
export default {
  methods: {
    formatName(row, column, cellValue, index) {
      return (index + 1) + '. ' + cellValue
    }
  }
}
</script>
```

## 单元格合并

通过 `spanMethod` 属性实现单元格合并。

```vue
<el-table :data="tableData" border :span-method="mergeMethod">
  <el-table-column prop="name" label="姓名" width="120" />
  <el-table-column prop="role" label="角色" width="100" />
  <el-table-column prop="email" label="邮箱" />
</el-table>

<script>
export default {
  methods: {
    mergeMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex === 0) return { rowspan: 2, colspan: 1 }
        if (rowIndex === 1) return { rowspan: 0, colspan: 0 }
      }
    }
  }
}
</script>
```

## 高亮当前行

通过 `highlight-current-row` 属性高亮当前选中行，配合 `current-row-key` 可通过 key 设置当前行。

```vue
<el-table
  :data="tableData"
  border
  highlight-current-row
  :current-row-key="currentKey"
  row-key="name"
  @current-change="onCurrentChange"
>
  <el-table-column prop="name" label="姓名" width="120" />
  <el-table-column prop="age" label="年龄" width="80" />
</el-table>
```

## 固定高度 / 最大高度

通过 `height` 设置固定高度，超出后纵向滚动（仅 body 滚动，表头固定）。通过 `maxHeight` 限制最大高度，内容少时不滚动。

```vue
<!-- 固定高度，超出滚动 -->
<el-table :data="tableData" border height="300">
  <el-table-column prop="name" label="姓名" width="120" />
</el-table>

<!-- 最大高度，内容少时不滚动 -->
<el-table :data="tableData" border max-height="300">
  <el-table-column prop="name" label="姓名" width="120" />
</el-table>
```

## 三种尺寸

通过 `size` 属性设置表格尺寸：`medium` / `small` / `mini`。

```vue
<el-table :data="tableData" border size="medium">
  <el-table-column prop="name" label="姓名" width="120" />
</el-table>

<el-table :data="tableData" border size="small">
  <el-table-column prop="name" label="姓名" width="120" />
</el-table>

<el-table :data="tableData" border size="mini">
  <el-table-column prop="name" label="姓名" width="120" />
</el-table>
```

## 隐藏表头

通过 `show-header` 属性隐藏表头行。

```vue
<el-table :data="tableData" border :show-header="false">
  <el-table-column prop="name" label="姓名" width="120" />
  <el-table-column prop="age" label="年龄" width="80" />
</el-table>
```

## 固定列

通过 `el-table-column` 的 `fixed` 属性将列固定在左侧或右侧，横向滚动时固定列保持不动。

```vue
<el-table :data="tableData" border height="300">
  <!-- 左固定 -->
  <el-table-column type="index" label="#" width="50" fixed="left" />
  <el-table-column prop="name" label="姓名" width="120" fixed="left" />

  <!-- 中间可滚动列 -->
  <el-table-column prop="age" label="年龄" width="80" />
  <el-table-column prop="email" label="邮箱" width="200" />
  <el-table-column prop="address" label="地址" width="300" />

  <!-- 右固定 -->
  <el-table-column prop="status" label="状态" width="80" fixed="right" />
  <el-table-column label="操作" width="140" fixed="right">
    <template slot-scope="{ row }">
      <el-button type="primary" size="mini">编辑</el-button>
    </template>
  </el-table-column>
</el-table>
```

### 注意事项

- `fixed` 支持 `true`、`'left'`、`'right'` 三种值，`true` 等价于 `'left'`
- 固定列需要设置明确的 `width`，否则可能无法正确计算固定区域宽度
- 固定列需要配合 `height` 或 `maxHeight` 使用才具有最佳体验
- 同时使用左固定和右固定时，中间列需要足够多以使表格产生横向滚动
- 多级表头（group header）也支持固定列，固定区域会包含对应的父级表头

---

## 多级表头

通过嵌套 `el-table-column` 实现复杂表头（多级表头）。

- 父列不绑定 `prop`，只设置 `label`
- 排序、筛选仅对叶子列（没有子列的列）生效
- 多选（`type="selection"`）、展开（`type="expand"`）等特殊列建议放在最顶层

```vue
<template>
  <el-table :data="tableData" border>
    <el-table-column prop="date" label="日期" width="120" sortable />
    <el-table-column label="配送信息">
      <el-table-column prop="name" label="姓名" width="100" />
      <el-table-column label="地址">
        <el-table-column prop="province" label="省份" width="80" />
        <el-table-column prop="city" label="城市" width="80" />
        <el-table-column prop="district" label="区县" width="80" />
      </el-table-column>
    </el-table-column>
    <el-table-column prop="remark" label="备注" />
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { date: '2024-01-15', name: '张三', province: '浙江', city: '杭州', district: '西湖区', remark: '已签收' },
        { date: '2024-01-16', name: '李四', province: '江苏', city: '南京', district: '鼓楼区', remark: '配送中' }
      ]
    }
  }
}
</script>
```

---

## API

### Table Attributes

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 表格数据源 | array | — |
| height | 表格固定高度，超出后 body 纵向滚动，表头固定 | string / number | — |
| maxHeight | 表格最大高度，超出后 body 纵向滚动，表头固定 | string / number | — |
| width | 表格宽度 | string / number | — |
| size | 尺寸，可选值：`medium` / `small` / `mini` | string | — |
| border | 是否显示边框 | boolean | `false` |
| stripe | 是否显示斑马纹 | boolean | `false` |
| fit | 列宽是否撑满 | boolean | `true` |
| showHeader | 是否显示表头 | boolean | `true` |
| showSummary | 是否显示合计行 | boolean | `false` |
| sumText | 合计行首列文本 | string | `合计` |
| summaryMethod | 自定义合计方法 | function({ columns, data }) | — |
| rowKey | 行数据唯一标识字段，用于展开行和选中行 | string / function(row) | — |
| rowClassName | 行 className，支持字符串或函数 | string / function({ row, rowIndex }) | — |
| rowStyle | 行内联样式，支持对象或函数 | object / function({ row, rowIndex }) | — |
| cellClassName | 单元格 className | string / function({ row, column, rowIndex, columnIndex }) | — |
| cellStyle | 单元格内联样式 | object / function({ row, column, rowIndex, columnIndex }) | — |
| headerRowClassName | 表头行 className | string / function({ row, rowIndex }) | — |
| headerRowStyle | 表头行内联样式 | object / function({ row, rowIndex }) | — |
| headerCellClassName | 表头单元格 className | string / function({ row, column, columnIndex }) | — |
| headerCellStyle | 表头单元格内联样式 | object / function({ row, column, columnIndex }) | — |
| highlightCurrentRow | 是否高亮当前行 | boolean | `false` |
| highlightSelectionRow | 是否高亮选中行 | boolean | `false` |
| currentRowKey | 当前行的 key | string / number | — |
| defaultSort | 默认排序 `{ prop, order }` | object | — |
| defaultExpandAll | 是否默认展开所有行 | boolean | `false` |
| expandRowKeys | 默认展开行的 key 数组，需配合 `row-key` 使用 | array | — |
| spanMethod | 合并单元格方法 | function({ row, column, rowIndex, columnIndex }) | — |
| tooltipEffect | tooltip 主题 | string | `dark` |
| emptyText | 空数据文本 | string | `暂无数据` |

### Table Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| select | 选中某行时触发 | selection, row |
| select-all | 全选/取消全选时触发 | selection |
| selection-change | 选中项发生变化时触发 | selection |
| cell-click | 点击单元格时触发 | row, column, cell, event |
| cell-dblclick | 双击单元格时触发 | row, column, cell, event |
| cell-mouse-enter | 鼠标移入单元格时触发 | row, column, cell, event |
| cell-mouse-leave | 鼠标移出单元格时触发 | row, column, cell, event |
| row-click | 点击行时触发 | row, column, event, index |
| row-dblclick | 双击行时触发 | row, column, event, index |
| row-contextmenu | 右键点击行时触发 | row, column, event, index |
| header-click | 点击表头时触发 | column, event |
| header-dblclick | 双击表头时触发 | column, event |
| header-contextmenu | 右键点击表头时触发 | column, event |
| sort-change | 排序发生变化时触发 | { column, prop, order } |
| filter-change | 筛选条件发生变化时触发 | filters |
| current-change | 当前行发生变化时触发 | row, oldRow |
| expand-change | 展开行发生变化时触发 | row, expandedRows |

### Table Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| toggleRowSelection | 切换某行的选中状态 | row, selected? |
| toggleAllSelection | 切换全选/取消全选 | — |
| clearSelection | 清空选中项 | — |
| toggleRowExpansion | 切换某行的展开状态 | row, expanded? |
| setCurrentRow | 设置当前行 | row |
| sort | 编程式排序 | prop, order |
| clearSort | 清除排序 | — |
| clearFilter | 清除筛选 | columnKeys? |
| doLayout | 重新布局 | — |

### Table Slots

| 插槽名 | 说明 | 作用域 |
| --- | --- | --- |
| empty | 自定义空数据内容 | — |
| expand | 展开行内容 | { row, index } |

---

### TableColumn Attributes

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 列类型：`selection` / `index` / `expand` / 普通列 | string | — |
| prop | 字段名 | string | — |
| label | 列标题 | string | — |
| width | 列宽 | string / number | — |
| minWidth | 最小列宽 | string / number | — |
| align | 对齐方式：`left` / `center` / `right` | string | `center` |
| fixed | 固定列：`left` / `right` | string / boolean | — |
| sortable | 是否可排序 | boolean / `custom` | `false` |
| sortMethod | 自定义排序方法 | function(a, b) | — |
| sortBy | 排序字段 | string / array / function(row) | — |
| sortOrders | 排序顺序 | array | `['ascending', 'descending', null]` |
| resizable | 是否可拖拽调整列宽 | boolean | `true` |
| formatter | 格式化内容，第 4 个参数为行索引 | function(row, column, cellValue, index) | — |
| showOverflowTooltip | 溢出时显示 tooltip | boolean | `false` |
| index | 自定义行号索引 | number / function(index) | — |
| columnKey | 列唯一标识 | string | — |
| className | 列 className | string | — |
| labelClassName | 表头 className | string | — |
| renderHeader | 自定义表头渲染函数 | function({ column, columnIndex }) | — |
| selectable | 仅对 type=selection 的列生效，行是否可选 | function(row, index) | — |
| filters | 筛选项列表 `[{ text, value }]` | array | — |
| filterMultiple | 是否多选筛选 | boolean | `true` |
| filterMethod | 自定义筛选方法 | function(value, row) | — |
| filterPlacement | 筛选下拉弹出位置 | string | — |
| filteredValue | 默认筛选值 | array | — |

### TableColumn Slot

| 插槽名 | 说明 | 作用域 |
| --- | --- | --- |
| default | 自定义列内容 | { row, column, index } |
