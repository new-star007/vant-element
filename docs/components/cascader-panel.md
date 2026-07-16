# CascaderPanel 级联面板

CascaderPanel 是级联选择器的核心面板组件，用于在选项卡中逐级展示和选择层级数据。可独立使用，适用于需要嵌入到自定义弹层或页面中的级联选择场景。

CascaderPanel 支持单选、多选、严格勾选、懒加载等功能，适合地址选择、商品分类、组织架构等层级数据场景。

## 基础用法

```vue
<template>
  <el-cascader-panel v-model="value" :options="options" />
</template>

<script>
export default {
  data() {
    return {
      value: [],
      options: [
        {
          value: 'zhinan',
          label: '指南',
          children: [
            { value: 'sheji', label: '设计原则' },
            { value: 'daohang', label: '导航' }
          ]
        },
        {
          value: 'zujian',
          label: '组件',
          children: [
            { value: 'basic', label: 'Basic' },
            { value: 'form', label: 'Form' }
          ]
        }
      ]
    }
  }
}
</script>
```

## 多选

```vue
<template>
  <el-cascader-panel v-model="value" :options="options" :props="{ multiple: true }" />
</template>
```

## 严格勾选

```vue
<template>
  <el-cascader-panel v-model="value" :options="options" check-strictly />
</template>
```

## 自定义字段名

```vue
<template>
  <el-cascader-panel v-model="value" :options="options" :props="{ value: 'id', label: 'name', children: 'items' }" />
</template>

<script>
export default {
  data() {
    return {
      value: [],
      options: [
        {
          id: 'zhinan',
          name: '指南',
          items: [
            { id: 'sheji', name: '设计原则' }
          ]
        }
      ]
    }
  }
}
</script>
```

## 懒加载

```vue
<template>
  <el-cascader-panel v-model="value" :props="lazyProps" />
</template>

<script>
export default {
  data() {
    return {
      value: [],
      lazyProps: {
        lazy: true,
        lazyLoad: (node, resolve) => {
          setTimeout(() => {
            resolve([
              { value: 'vue', label: 'Vue.js', leaf: true },
              { value: 'react', label: 'React', leaf: true }
            ])
          }, 500)
        }
      }
    }
  }
}
</script>
```

## 何时使用

- 需要将级联面板嵌入到自定义弹层或页面中。
- 作为 Cascader 组件的内核单独使用。
- 需要多选、严格勾选等高级选择模式时。

## API

### Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| value / v-model | 绑定值 | string / number / array | — |
| options | 可选项数据源 | array | `[]` |
| props | 配置选项，支持 value / label / children / disabled / leaf / multiple / lazy / lazyLoad / checkStrictly / emitPath | object | `{}` |
| separator | 显示值时连接各层级的符号 | string | ` / ` |
| disabled | 是否禁用 | boolean | `false` |
| clearable | 是否可清空 | boolean | `false` |
| show-all-levels | 是否显示完整路径 | boolean | `true` |
| collapse-tags | 多选时是否折叠标签 | boolean | `false` |
| debounce | 搜索防抖延迟（ms） | number | `300` |
| check-strictly | 是否严格勾选（父子不关联） | boolean | `false` |
| active-color | 选中高亮色 | string | `#1989fa` |
| placeholder | 占位提示文本 | string | — |

### Events

| Name | Description | Parameters |
| ---- | ----------- | ---------- |
| input | 选中值变化时触发 | 当前值 |
| change | 选中值变化时触发 | 当前值 |
| expand-change | 展开层级变化时触发 | 当前展开路径值数组 |
| close | 选中后关闭面板时触发（非多选/严格勾选模式） | — |

### Slots

| Name | Description | Scope |
| ---- | ----------- | ----- |
| default | 自定义选项标签内容 | { node, data } |
| empty | 空数据时显示的内容 | — |
