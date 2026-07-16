# Autocomplete 自动完成

Autocomplete 是一个带建议列表的输入组件，用户在输入时根据已输入内容动态匹配并展示候选建议。适用于搜索框、地址选择、标签输入等需要联想补全的场景。

## 基础用法

```vue
<template>
  <el-autocomplete
    v-model="value"
    placeholder="输入关键词搜索"
    :fetch-suggestions="querySearch"
  />
</template>

<script>
export default {
  data() {
    return {
      value: ''
    }
  },
  methods: {
    querySearch(query, cb) {
      const data = [
        { value: 'Vue.js' },
        { value: 'React' },
        { value: 'Angular' },
        { value: 'Svelte' }
      ]
      const results = query
        ? data.filter(item => item.value.toLowerCase().includes(query.toLowerCase()))
        : data
      cb(results)
    }
  }
}
</script>
```

## 聚焦时触发

```vue
<template>
  <el-autocomplete
    v-model="value"
    placeholder="聚焦时显示建议"
    :fetch-suggestions="querySearch"
    trigger-on-focus
  />
</template>
```

## 自定义匹配项

```vue
<template>
  <el-autocomplete v-model="value" :fetch-suggestions="querySearch" value-key="text">
    <template slot="item" slot-scope="{ item }">
      <div>{{ item.text }} <small style="color:#999">{{ item.desc }}</small></div>
    </template>
  </el-autocomplete>
</template>

<script>
export default {
  data() {
    return {
      value: ''
    }
  },
  methods: {
    querySearch(query, cb) {
      cb([
        { text: 'Vue.js', desc: '渐进式框架' },
        { text: 'React', desc: '声明式UI' },
        { text: 'Angular', desc: '企业级框架' }
      ])
    }
  }
}
</script>
```

## 可清空

```vue
<template>
  <el-autocomplete
    v-model="value"
    placeholder="可清空"
    clearable
    :fetch-suggestions="querySearch"
  />
</template>
```

## 何时使用

- 搜索框中提供联想建议，提升输入效率。
- 地址、城市、标签等需要从预置列表中选择的场景。
- 需要限制用户输入为预定义选项时。

## API

### Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| value / v-model | 绑定值 | string / number | — |
| placeholder | 占位提示文本 | string | — |
| disabled | 是否禁用 | boolean | `false` |
| clearable | 是否可清空 | boolean | `false` |
| value-key | 选项对象中用于显示的字段名 | string | `value` |
| debounce | 输入防抖延迟（ms） | number | `300` |
| fetch-suggestions | 获取建议列表的方法 | function(query, cb) | — |
| trigger-on-focus | 聚焦时是否主动触发查询 | boolean | `true` |
| select-when-unmatched | 输入无匹配时是否允许选中 | boolean | `false` |
| highlight-first-item | 是否高亮第一个建议项 | boolean | `false` |
| hide-loading | 是否隐藏加载状态 | boolean | `false` |

### Events

| Name | Description | Parameters |
| ---- | ----------- | ---------- |
| input | 输入值变化时触发 | 当前值 |
| change | 确认选择时触发 | 当前值 |
| select | 选中建议项时触发 | 选中项 |
| focus | 获得焦点时触发 | — |
| blur | 失去焦点时触发 | — |
| clear | 清空时触发 | — |

### Slots

| Name | Description | Scope |
| ---- | ----------- | ----- |
| prefix | 输入框前缀内容 | — |
| item | 自定义建议项内容 | { item } |
| loading | 自定义加载状态 | — |
