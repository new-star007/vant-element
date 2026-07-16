# InputNumber 数字输入框

数字输入框用于输入标准的数字值，通过上下按钮或键盘直接输入数字。适用于价格、数量、年龄等需要数值输入的场景。

与普通输入框不同，数字输入框内置了增减按钮，支持设置最小值、最大值和步长，防止用户输入非法数字。当需要精确控制小数位数或限定取值范围时，数字输入框比手动校验更加可靠。

## 基础用法

```vue
<template>
  <el-input-number v-model="num" :min="1" :max="10" />
</template>

<script>
export default {
  data() {
    return {
      num: 1
    }
  }
}
</script>
```

## 步长

```vue
<template>
  <el-input-number v-model="num" :min="0" :max="20" :step="2" />
</template>

<script>
export default {
  data() {
    return {
      num: 0
    }
  }
}
</script>
```

## 小数精度

```vue
<template>
  <el-input-number v-model="num" :min="0" :max="10" :step="0.1" :precision="2" />
</template>

<script>
export default {
  data() {
    return {
      num: 0
    }
  }
}
</script>
```

## 禁用

```vue
<template>
  <el-input-number v-model="num" disabled />
</template>

<script>
export default {
  data() {
    return {
      num: 0
    }
  }
}
</script>
```

## 隐藏控制按钮

```vue
<template>
  <el-input-number v-model="num" :controls="false" />
</template>

<script>
export default {
  data() {
    return {
      num: 0
    }
  }
}
</script>
```

## 尺寸

```vue
<template>
  <el-input-number v-model="num" size="large" />
  <el-input-number v-model="num" size="medium" />
  <el-input-number v-model="num" size="small" />
  <el-input-number v-model="num" size="mini" />
</template>

<script>
export default {
  data() {
    return {
      num: 0
    }
  }
}
</script>
```

## step-strictly

```vue
<template>
  <el-input-number v-model="num" :min="0" :max="20" :step="5" step-strictly />
</template>

<script>
export default {
  data() {
    return {
      num: 0
    }
  }
}
</script>
```

## 负数和范围

```vue
<template>
  <el-input-number v-model="num" :min="-10" :max="10" />
</template>

<script>
export default {
  data() {
    return {
      num: 0
    }
  }
}
</script>
```

## 何时使用

- 需要用户输入价格、数量、年龄等数值型数据时。
- 需要限定输入范围（如 1-100）并自动阻止非法输入时。
- 需要以固定步长调整数值（如每次加减 5）时。
- 需要精确控制小数位数（如金额保留两位小数）时。

## API

### Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| value / v-model | 绑定值，当前数字值同步到该变量 | number / string | — |
| min | 最小值限制，低于此值时减按钮置灰不可点击 | number | — |
| max | 最大值限制，高于此值时加按钮置灰不可点击 | number | — |
| step | 步长，每次点击加减按钮时数值变化的幅度 | number | `1` |
| precision | 小数精度，控制小数点后保留的位数（如 2 表示保留两位小数） | number | — |
| disabled | 是否禁用。禁用后输入框和按钮均不可交互，文字颜色变浅 | boolean | `false` |
| controls | 是否显示加减控制按钮。设为 false 时只保留输入框 | boolean | `true` |
| size | 尺寸大小，影响输入框和按钮的整体高度 | `large` / `medium` / `small` / `mini` | — |
| stepStrictly | 是否严格遵循步长。开启后输入的值必须是 step 的整数倍，否则自动修正 | boolean | `false` |

### Events

| Name | Description | Parameters |
| ---- | ----------- | ---------- |
| input | 输入或点击按钮时实时触发 | 当前值 |
| change | 绑定值改变时触发（点击按钮或输入后失去焦点） | 当前值 |
| blur | 输入框失去焦点时触发 | — |
| focus | 输入框获得焦点时触发 | — |
