# Checkbox 多选框

多选框用于在一组选项中选择一个或多个，适用于用户需要勾选多个项目的场景，如兴趣爱好、权限配置、批量操作等。

多选框支持单独使用（开关式）和组内使用（CheckboxGroup），组内可限制最大可选数量。与 Radio 不同，Checkbox 允许用户同时选中多个选项，适用于各选项之间互不排斥的场景。

## 基础用法

```vue
<template>
  <el-checkbox v-model="checked">选项 {{ checked }}</el-checkbox>
</template>

<script>
export default {
  data() {
    return {
      checked: false
    }
  }
}
</script>
```

## 多选组

```vue
<template>
  <el-checkbox-group v-model="checkedList" direction="vertical">
    <el-checkbox label="A">A</el-checkbox>
    <el-checkbox label="B">B</el-checkbox>
    <el-checkbox label="C">C</el-checkbox>
    <el-checkbox label="D">D</el-checkbox>
  </el-checkbox-group>
</template>

<script>
export default {
  data() {
    return {
      checkedList: []
    }
  }
}
</script>
```

## 水平排列

```vue
<template>
  <el-checkbox-group v-model="checkedList" direction="horizontal">
    <el-checkbox label="A">A</el-checkbox>
    <el-checkbox label="B">B</el-checkbox>
    <el-checkbox label="C">C</el-checkbox>
  </el-checkbox-group>
</template>

<script>
export default {
  data() {
    return {
      checkedList: []
    }
  }
}
</script>
```

## 限制数量

```vue
<template>
  <el-checkbox-group v-model="list" :max="2">
    <el-checkbox label="A">A</el-checkbox>
    <el-checkbox label="B">B</el-checkbox>
    <el-checkbox label="C">C</el-checkbox>
  </el-checkbox-group>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  }
}
</script>
```

## 禁用状态

```vue
<template>
  <el-checkbox v-model="checked" disabled>禁用</el-checkbox>
  <el-checkbox :value="true" disabled>已选中禁用</el-checkbox>
</template>

<script>
export default {
  data() {
    return {
      checked: false
    }
  }
}
</script>
```

## 自定义颜色

```vue
<template>
  <el-checkbox v-model="checked" checked-color="#07c160">自定义颜色</el-checkbox>
</template>

<script>
export default {
  data() {
    return {
      checked: false
    }
  }
}
</script>
```

## 半选状态

`indeterminate` 用于表示表头复选框的半选状态，常用于树形表格或全选场景中部分选中时。

```vue
<template>
  <el-checkbox :value="allChecked" :indeterminate="indeterminate" @change="onAllChange">
    全选
  </el-checkbox>
  <el-checkbox-group v-model="checkedList">
    <el-checkbox label="A">A</el-checkbox>
    <el-checkbox label="B">B</el-checkbox>
    <el-checkbox label="C">C</el-checkbox>
  </el-checkbox-group>
</template>

<script>
export default {
  data() {
    return {
      checkedList: ['A', 'B'],
      allOptions: ['A', 'B', 'C']
    }
  },
  computed: {
    allChecked() {
      return this.checkedList.length === this.allOptions.length
    },
    indeterminate() {
      return this.checkedList.length > 0 && this.checkedList.length < this.allOptions.length
    }
  },
  methods: {
    onAllChange(val) {
      this.checkedList = val ? [...this.allOptions] : []
    }
  }
}
</script>
```

## 图标大小

```vue
<template>
  <el-checkbox v-model="checked" icon-size="22">大图标</el-checkbox>
</template>

<script>
export default {
  data() {
    return {
      checked: true
    }
  }
}
</script>
```

## 标签位置

```vue
<template>
  <el-checkbox v-model="checked" label-position="left">标签在左</el-checkbox>
  <el-checkbox v-model="checked" label-position="right">标签在右</el-checkbox>
</template>

<script>
export default {
  data() {
    return {
      checked: true
    }
  }
}
</script>
```

## 边框样式

```vue
<template>
  <el-checkbox v-model="checked1" label="A" border>A</el-checkbox>
  <el-checkbox v-model="checked2" label="B" border>B</el-checkbox>
</template>

<script>
export default {
  data() {
    return {
      checked1: true,
      checked2: false
    }
  }
}
</script>
```

## 按钮形式

通过 `el-checkbox-button` 组件将多选框显示为按钮组样式。

```vue
<template>
  <el-checkbox-group v-model="checkedList">
    <el-checkbox-button label="A">选项 A</el-checkbox-button>
    <el-checkbox-button label="B">选项 B</el-checkbox-button>
    <el-checkbox-button label="C">选项 C</el-checkbox-button>
  </el-checkbox-group>
</template>

<script>
export default {
  data() {
    return {
      checkedList: ['A']
    }
  }
}
</script>
```

## 按钮尺寸

```vue
<template>
  <el-checkbox-group v-model="checkedList" size="medium">
    <el-checkbox-button label="A">medium</el-checkbox-button>
    <el-checkbox-button label="B">medium</el-checkbox-button>
  </el-checkbox-group>
  <el-checkbox-group v-model="checkedList" size="small">
    <el-checkbox-button label="A">small</el-checkbox-button>
    <el-checkbox-button label="B">small</el-checkbox-button>
  </el-checkbox-group>
  <el-checkbox-group v-model="checkedList" size="mini">
    <el-checkbox-button label="A">mini</el-checkbox-button>
    <el-checkbox-button label="B">mini</el-checkbox-button>
  </el-checkbox-group>
</template>

<script>
export default {
  data() {
    return {
      checkedList: ['medium']
    }
  }
}
</script>
```

## 按钮禁用

```vue
<template>
  <el-checkbox-group v-model="checkedList">
    <el-checkbox-button label="A">A</el-checkbox-button>
    <el-checkbox-button label="B" disabled>B (禁用)</el-checkbox-button>
    <el-checkbox-button label="C">C</el-checkbox-button>
  </el-checkbox-group>
</template>

<script>
export default {
  data() {
    return {
      checkedList: ['A']
    }
  }
}
</script>
```

## 何时使用

- 需要用户选择一个或多个选项时，如兴趣爱好、权限分配、批量操作。
- 各选项之间互不排斥，用户可同时选择多个时。
- 需要限制最大可选数量时，通过 `max` 属性控制。
- 单独使用一个 Checkbox 作为开关式布尔值切换时。

## API

### Checkbox Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| value / v-model | 绑定值。单独使用时为 boolean（是否选中），在 CheckboxGroup 中使用时为选项值 | boolean | — |
| label | 选项值，在 CheckboxGroup 中使用时作为该选项的唯一标识 | string / number / boolean | — |
| disabled | 是否禁用。禁用后复选框不可点击，显示为灰色 | boolean | `false` |
| checked-color | 选中状态的勾选颜色，用于自定义品牌色 | string | — |
| true-label | 选中时的取值（非 checkbox 场景下使用） | string / number | — |
| false-label | 未选中时的取值（非 checkbox 场景下使用） | string / number | — |
| border | 是否显示边框 | boolean | `false` |
| size | 尺寸，配合 border 使用 | string | — |
| icon-size | 图标大小，单位 px | string / number | — |
| label-position | 标签文字位置 | `left` / `right` | `right` |
| indeterminate | 半选状态，用于全选场景 | boolean | `false` |

### CheckboxGroup Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| value / v-model | 绑定值，当前已选中的选项值数组 | array | — |
| disabled | 是否禁用。禁用后组内所有选项均不可点击，显示为灰色 | boolean | `false` |
| max | 可被勾选的最大数量，达到上限后其余选项自动禁用 | number | — |
| min | 可被勾选的最小数量 | number | — |
| checked-color | 选中状态的勾选颜色 | string | — |
| icon-size | 图标大小，单位 px | string / number | — |
| fill | 选中状态填充色 | string | — |
| text-color | 文字颜色 | string | — |
| size | 尺寸 | string | — |
| direction | 排列方向。`horizontal` 为水平排列，`vertical` 为垂直排列 | `horizontal` / `vertical` | `vertical` |

### CheckboxButton Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| label | 选项值，在 CheckboxGroup 中使用时作为该选项的唯一标识 | string / number / boolean | — |
| disabled | 是否禁用 | boolean | `false` |
| name | 原生 name 属性 | string | — |
| checked-color | 选中状态高亮色 | string | `#409eff` |
| size | 尺寸，覆盖 CheckboxGroup 的 size 设置 | string | — |

### Events

| Name | Description | Parameters |
| ---- | ----------- | ---------- |
| change | 绑定值变化时触发（用户勾选或取消勾选时） | 更新后的值 |
