# Dropdown 下拉菜单

Dropdown 用于将一组操作折叠在按钮或文字下方，点击或悬停时展开菜单项。适用于界面空间有限的场景，如表格操作列、工具栏更多操作等。

Dropdown 支持 hover 和 click 两种触发方式，可配置分割按钮模式，菜单项支持禁用和分隔线。

## 基础用法

```vue
<template>
  <el-dropdown @command="handleCommand">
    <el-button>更多操作<i class="el-icon-arrow-down el-icon--right" /></el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="edit">编辑</el-dropdown-item>
      <el-dropdown-item command="copy">复制</el-dropdown-item>
      <el-dropdown-item command="delete" disabled>删除</el-dropdown-item>
      <el-dropdown-item command="share" divided>分享</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  methods: {
    handleCommand(command) {
      this.$message('点击了: ' + command)
    }
  }
}
</script>
```

## 触发方式

```vue
<template>
  <el-dropdown trigger="click" @command="handleCommand">
    <el-button>点击触发<i class="el-icon-arrow-down el-icon--right" /></el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="a">选项A</el-dropdown-item>
      <el-dropdown-item command="b">选项B</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
```

## 分割按钮

```vue
<template>
  <el-dropdown split-button type="primary" @click="handleClick" @command="handleCommand">
    主要操作
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="edit">编辑</el-dropdown-item>
      <el-dropdown-item command="delete">删除</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  methods: {
    handleClick() {
      this.$message('点击了主按钮')
    },
    handleCommand(command) {
      this.$message('点击了: ' + command)
    }
  }
}
</script>
```

## 不同尺寸

```vue
<template>
  <el-dropdown size="large" @command="handleCommand">
    <el-button size="large">大尺寸</el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="a">选项</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
  <el-dropdown @command="handleCommand">
    <el-button>默认</el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="a">选项</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
  <el-dropdown size="small" @command="handleCommand">
    <el-button size="small">小尺寸</el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="a">选项</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
```

## 菜单项图标

```vue
<template>
  <el-dropdown @command="handleCommand">
    <el-button>带图标菜单</el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="edit" icon="edit">编辑</el-dropdown-item>
      <el-dropdown-item command="copy" icon="copy">复制</el-dropdown-item>
      <el-dropdown-item command="delete" icon="delete" disabled>删除</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
```

## 何时使用

- 操作项过多时折叠次要操作，保持界面简洁。
- 作为表格操作列的下拉菜单。
- 分割按钮适用于主要操作 + 更多选项的场景。

## API

### Dropdown Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| trigger | 触发方式 | `hover` / `click` | `hover` |
| hide-on-click | 点击菜单项是否自动隐藏 | boolean | `true` |
| placement | 菜单弹出位置 | `bottom` / `bottom-start` / `bottom-end` | `bottom` |
| size | 按钮尺寸 | `large` / `default` / `small` / `mini` | `default` |
| split-button | 是否使用分割按钮模式 | boolean | `false` |
| type | 按钮类型 | `primary` / `success` / `warning` / `danger` / `info` | — |
| disabled | 是否禁用 | boolean | `false` |
| hide-timeout | hover 隐藏延迟（ms） | number | `150` |

### Dropdown Events

| Name | Description | Parameters |
| ---- | ----------- | ---------- |
| click | split-button 主按钮点击时触发 | — |
| command | 点击菜单项时触发 | command, instance |
| visible-change | 下拉菜单显示状态变化时触发 | 是否显示 |

### Dropdown Slots

| Name | Description |
| ---- | ----------- |
| default | 触发下拉的按钮/元素 |
| dropdown | 下拉菜单内容，通常放置 `el-dropdown-menu` |

### DropdownMenu Slots

| Name | Description |
| ---- | ----------- |
| default | 菜单项列表，通常放置 `el-dropdown-item` |

### DropdownItem Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| command | 菜单项标识值，在 command 事件中接收 | string / number / object | — |
| disabled | 是否禁用 | boolean | `false` |
| divided | 是否显示分隔线 | boolean | `false` |
| icon | 图标名称（Vant 图标名） | string | — |
