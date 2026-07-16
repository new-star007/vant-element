# Select 选择器

选择器通过下拉菜单展示一组选项，用户从中选择一个或多个值。适用于选项较多、不适合平铺展示的场景，如城市选择、分类筛选等。

选择器支持单选和多选模式，可开启搜索功能快速过滤选项。当选中项需要变更时，支持一键清空。在表单中与 Form 组件搭配使用，可实现规范的数据采集流程。

## 基础用法

```vue
<template>
  <el-select v-model="value" placeholder="请选择">
    <el-option label="选项一" value="1" />
    <el-option label="选项二" value="2" />
    <el-option label="选项三" value="3" />
  </el-select>
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

## 可搜索

```vue
<template>
  <el-select v-model="value" filterable placeholder="请输入关键词">
    <el-option label="Apple" value="apple" />
    <el-option label="Banana" value="banana" />
    <el-option label="Orange" value="orange" />
  </el-select>
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

## 清空

```vue
<template>
  <el-select v-model="value" clearable placeholder="可清空">
    <el-option label="选项一" value="1" />
  </el-select>
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

## 禁用

```vue
<template>
  <el-select v-model="value" disabled placeholder="已禁用">
    <el-option label="选项一" value="1" />
  </el-select>
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

## 禁用选项

```vue
<template>
  <el-select v-model="value" placeholder="请选择">
    <el-option label="正常选项" value="1" />
    <el-option label="禁用选项" value="2" disabled />
  </el-select>
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

## 多选

```vue
<template>
  <el-select v-model="value" multiple placeholder="请选择">
    <el-option label="选项一" value="1" />
    <el-option label="选项二" value="2" />
    <el-option label="选项三" value="3" />
  </el-select>
</template>

<script>
export default {
  data() {
    return {
      value: []
    }
  }
}
</script>
```

## 何时使用

- 选项数量较多（超过 5 个），平铺展示会占用过多空间时。
- 需要从预设列表中选择一个或多个值时，如城市、分类、标签等。
- 选项数据需要动态加载或支持搜索过滤时，开启 `filterable` 属性。

## API

### Select Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| value / v-model | 绑定值。单选时为 string/number，多选时为 array | string / number / array | — |
| multiple | 是否多选。开启后可同时选择多个选项，选中项以标签形式展示 | boolean | `false` |
| disabled | 是否禁用。禁用后下拉框不可展开，显示为灰色状态 | boolean | `false` |
| clearable | 是否可清空。启用后选中状态下右侧出现清除按钮，点击可移除当前选中值 | boolean | `false` |
| filterable | 是否可搜索。开启后下拉框顶部出现搜索框，输入关键词可过滤选项 | boolean | `false` |
| placeholder | 占位提示文本，未选中时显示 | string | `请选择` |

### Option Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| value | 选项值，选中后赋值给 Select 的绑定值 | string / number | — |
| label | 选项显示文本，下拉列表中展示的标签内容 | string | — |
| disabled | 是否禁用。禁用后该选项不可选中，显示为灰色 | boolean | `false` |

### Events

| Name | Description | Parameters |
| ---- | ----------- | ---------- |
| change | 选中值变化时触发（单选为选中新值，多选为选中值数组） | 选中的值 |
