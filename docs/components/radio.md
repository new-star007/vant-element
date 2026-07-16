# Radio 单选框

单选框用于在一组互斥的选项中选择一个，适用于选项数量较少（2-5个）且需要用户明确表态的场景，如性别选择、是否同意协议等。

与 Select 选择器不同，单选框的所有选项直接可见，无需展开下拉菜单，适合选项少且需要用户一目了然看到全部选项的情况。单选框通过 RadioGroup 组合使用，确保同一组内只能选中一个选项。

## 基础用法

```vue
<template>
  <el-radio-group v-model="radio">
    <el-radio label="A">A</el-radio>
    <el-radio label="B">B</el-radio>
    <el-radio label="C">C</el-radio>
  </el-radio-group>
</template>

<script>
export default {
  data() {
    return {
      radio: ''
    }
  }
}
</script>
```

## 水平排列

```vue
<template>
  <el-radio-group v-model="radio" direction="horizontal">
    <el-radio label="A">A</el-radio>
    <el-radio label="B">B</el-radio>
    <el-radio label="C">C</el-radio>
  </el-radio-group>
</template>

<script>
export default {
  data() {
    return {
      radio: ''
    }
  }
}
</script>
```

## 禁用状态

```vue
<template>
  <el-radio-group v-model="radio">
    <el-radio label="A">A</el-radio>
    <el-radio label="B" disabled>B (禁用)</el-radio>
    <el-radio label="C">C</el-radio>
  </el-radio-group>
  <el-radio-group v-model="radio" disabled>
    <el-radio label="X">X</el-radio>
    <el-radio label="Y">Y</el-radio>
  </el-radio-group>
</template>

<script>
export default {
  data() {
    return {
      radio: ''
    }
  }
}
</script>
```

## 自定义颜色

```vue
<template>
  <el-radio-group v-model="radio" checked-color="#07c160">
    <el-radio label="A">选项 A</el-radio>
    <el-radio label="B">选项 B</el-radio>
  </el-radio-group>
</template>

<script>
export default {
  data() {
    return {
      radio: ''
    }
  }
}
</script>
```

## 图标大小

```vue
<template>
  <el-radio-group v-model="radio" icon-size="20">
    <el-radio label="A">大图标</el-radio>
    <el-radio label="B">大图标</el-radio>
  </el-radio-group>
</template>

<script>
export default {
  data() {
    return {
      radio: 'A'
    }
  }
}
</script>
```

## 标签位置

```vue
<template>
  <el-radio v-model="radio" label="left" label-position="left">标签在左</el-radio>
  <el-radio v-model="radio" label="right" label-position="right">标签在右</el-radio>
</template>

<script>
export default {
  data() {
    return {
      radio: 'left'
    }
  }
}
</script>
```

## 边框样式

```vue
<template>
  <el-radio v-model="radio" label="A" border>A</el-radio>
  <el-radio v-model="radio" label="B" border>B</el-radio>
</template>

<script>
export default {
  data() {
    return {
      radio: 'A'
    }
  }
}
</script>
```

## 按钮形式

通过 `el-radio-button` 组件将单选框显示为按钮组样式。

```vue
<template>
  <el-radio-group v-model="radio">
    <el-radio-button label="A">选项 A</el-radio-button>
    <el-radio-button label="B">选项 B</el-radio-button>
    <el-radio-button label="C">选项 C</el-radio-button>
  </el-radio-group>
</template>

<script>
export default {
  data() {
    return {
      radio: 'A'
    }
  }
}
</script>
```

## 按钮尺寸

```vue
<template>
  <el-radio-group v-model="radio" size="medium">
    <el-radio-button label="A">medium</el-radio-button>
    <el-radio-button label="B">medium</el-radio-button>
  </el-radio-group>
  <el-radio-group v-model="radio" size="small">
    <el-radio-button label="A">small</el-radio-button>
    <el-radio-button label="B">small</el-radio-button>
  </el-radio-group>
  <el-radio-group v-model="radio" size="mini">
    <el-radio-button label="A">mini</el-radio-button>
    <el-radio-button label="B">mini</el-radio-button>
  </el-radio-group>
</template>

<script>
export default {
  data() {
    return {
      radio: 'medium'
    }
  }
}
</script>
```

## 按钮禁用

```vue
<template>
  <el-radio-group v-model="radio">
    <el-radio-button label="A">A</el-radio-button>
    <el-radio-button label="B" disabled>B (禁用)</el-radio-button>
    <el-radio-button label="C">C</el-radio-button>
  </el-radio-group>
</template>

<script>
export default {
  data() {
    return {
      radio: 'A'
    }
  }
}
</script>
```

## 何时使用

- 选项数量较少（2-5个），且需要用户从互斥选项中选择一个时。
- 需要用户明确表态的场景，如性别、是否同意、支付方式等。
- 选项内容需要一目了然展示，不适合用下拉菜单隐藏时。

## API

### RadioGroup Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| value / v-model | 绑定值，当前选中的选项值 | string / number / boolean | — |
| disabled | 是否禁用。禁用后组内所有选项均不可点击，显示为灰色 | boolean | `false` |
| checked-color | 选中状态的高亮颜色，用于自定义品牌色 | string | — |
| direction | 排列方向。`horizontal` 为水平排列，`vertical` 为垂直排列 | `horizontal` / `vertical` | `vertical` |
| icon-size | 图标大小，单位 px | string / number | — |
| fill | 选中状态填充色 | string | — |
| text-color | 文字颜色 | string | — |
| size | 尺寸 | string | — |

### Radio Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| value / v-model | 绑定值 | string / number / boolean | — |
| label | 选项值，选中后赋值给 RadioGroup 的绑定值 | string / number / boolean | — |
| disabled | 是否禁用。禁用后该选项不可点击，显示为灰色 | boolean | `false` |
| checked-color | 选中状态的高亮颜色 | string | — |
| border | 是否显示边框 | boolean | `false` |
| size | 尺寸，配合 border 使用 | string | — |
| icon-size | 图标大小，单位 px | string / number | — |
| label-position | 标签文字位置 | `left` / `right` | `right` |

### RadioButton Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| label | 选项值，选中后赋值给 RadioGroup 的绑定值 | string / number | — |
| disabled | 是否禁用 | boolean | `false` |
| name | 原生 name 属性 | string | — |
| checked-color | 选中状态高亮色 | string | `#409eff` |
| size | 尺寸，覆盖 RadioGroup 的 size 设置 | string | — |

### Events

| Name | Description | Parameters |
| ---- | ----------- | ---------- |
| change | 绑定值变化时触发（用户点击选中新的选项时） | 选中的值 |
