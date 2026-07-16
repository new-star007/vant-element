# List 列表

列表用于展示一组结构化的信息，支持多种交互模式，包括点击、选择等操作。与表格不同，列表更注重信息的呈现和交互体验，适合展示不需要复杂表格功能的轻量级数据。

列表支持索引背景、头部栏（与尾部类似）、选择复选框、body 内容区等丰富组合，可轻松构建导航菜单、任务列表、设置选项等常见场景。

## 何时使用

- 当需要展示一组结构化信息，且不需要表格的排序、筛选功能时
- 当需要构建可交互的导航菜单、任务列表或设置选项时
- 当需要支持单选/多选操作的轻量级列表场景时

## 基础列表

```vue
<template>
  <el-list :data="data">
    <el-list-item label="选项" prop="value" />
  </el-list>
</template>

<script>
export default {
  data() {
    return {
      data: [
        { value: '选项一' },
        { value: '选项二' },
        { value: '选项三' }
      ]
    }
  }
}
</script>
```

## 索引背景

使用 `type="index"` 将索引号以卡片背景形式展示：

```vue
<template>
  <el-list :data="data">
    <el-list-item type="index" />
    <el-list-item label="选项" prop="value" />
  </el-list>
</template>

<script>
export default {
  data() {
    return {
      data: [
        { value: '选项A' },
        { value: '选项B' },
        { value: '选项C' }
      ]
    }
  }
}
</script>
```

## 头部栏（类似尾部）

使用 `type="header"` 并通过默认插槽自定义头部内容，其渲染方式与 `type="footer"` 尾部完全一致：

```vue
<template>
  <el-list :data="data">
    <el-list-item type="header">
      <template slot-scope="{ row }">
        <el-tag :type="row.status === '已发货' ? 'success' : 'warning'" size="small">{{ row.status }}</el-tag>
        <span style="font-weight:600;margin-left:8px">{{ row.name }}</span>
      </template>
    </el-list-item>
    <el-list-item label="金额" prop="amount" />
    <el-list-item label="时间" prop="time" />
  </el-list>
</template>

<script>
export default {
  data() {
    return {
      data: [
        { name: '笔记本电脑', status: '已发货', amount: '¥5999', time: '2025-06-01' },
        { name: '机械键盘', status: '待发货', amount: '¥399', time: '2025-06-03' }
      ]
    }
  }
}
</script>
```

## 选择框

使用 `type="selection"` 开启多选，复选框位于卡片 body 左侧：

```vue
<template>
  <el-list :data="data" @selection-change="onSelectionChange">
    <el-list-item type="selection" />
    <el-list-item label="姓名" prop="name" />
    <el-list-item label="部门" prop="dept" />
  </el-list>
</template>

<script>
export default {
  data() {
    return {
      data: [
        { name: '张三', dept: '技术部' },
        { name: '李四', dept: '产品部' },
        { name: '王五', dept: '设计部' }
      ]
    }
  },
  methods: {
    onSelectionChange(selection) {
      console.log('选中项', selection)
    }
  }
}
</script>
```

## 综合示例

同时使用索引、选择框、头部栏、body 列和尾部操作按钮：

```vue
<template>
  <el-list :data="data" @selection-change="onSelectionChange">
    <el-list-item type="selection" />
    <el-list-item type="index" />
    <el-list-item type="header">
      <template slot-scope="{ row }">
        <el-icon :name="row.icon" style="margin-right:6px" />
        <span style="font-weight:500">{{ row.name }}</span>
      </template>
    </el-list-item>
    <el-list-item label="角色" prop="role">
      <template slot-scope="{ row }">
        <el-tag :type="row.role === '管理员' ? 'danger' : 'primary'" size="small">{{ row.role }}</el-tag>
      </template>
    </el-list-item>
    <el-list-item label="状态" prop="status" />
    <el-list-item type="footer">
      <template slot-scope="{ row }">
        <el-button size="mini" type="primary" @click.stop="handleEdit(row)">编辑</el-button>
        <el-button size="mini" type="danger" @click.stop="handleDelete(row)">删除</el-button>
      </template>
    </el-list-item>
  </el-list>
</template>
```

## API

### List Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| data | 列表数据源，数组中的每个对象代表一行数据 | array | — |
| stripe | 是否斑马纹 | boolean | false |
| border | 是否显示边框 | boolean | false |
| emptyText | 空数据时的提示文字 | string | '暂无数据' |
| rowKey | 行数据的 Key | string / Function | — |
| rowClassName | 行 class 生成函数 | string / Function | — |

### ListItem Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| label | 列标题，显示在列表项左侧的文本标签 | string | — |
| prop | 对应数据源中的字段名，用于显示该字段的值 | string | — |
| type | 列类型：`selection` 显示选择框（位于 body 左侧），`index` 显示索引（卡片背景），`header` 自定义头部（与 footer 渲染方式相同），`footer` 自定义尾部 | string | — |
| formatter | 格式化函数 `(row, column, value) => string` | Function | — |
| showOverflowTooltip | 内容超长时点击弹窗提示 | boolean | false |
| index | 索引起始值，可以是数字或 `(index) => number` 函数 | number / Function | — |
| className | 列自定义 class | string | — |

### Events

| Name | Description | Parameters |
| ---- | ----------- | ---------- |
| row-click | 点击列表行时触发 | `row`, `column`, `index` |
| selection-change | 选择状态变化时触发 | `selectedRows` |

### Methods

| Name | Description |
| ---- | ----------- |
| clearSelection | 清空所有选中行 |
