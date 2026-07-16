# Rate 评分

评分组件用于让用户通过点击星星对事物进行快速评级，常见于商品评价、服务反馈、内容打分等场景。

评分支持整星和半星选择，可自定义星星数量、颜色和辅助文字。在只读模式下可展示已有评分结果，禁用状态下不可交互。

## 基础用法

```vue
<template>
  <el-rate v-model="rate" />
</template>

<script>
export default {
  data() {
    return {
      rate: 0
    }
  }
}
</script>
```

## 半星

```vue
<template>
  <el-rate v-model="rate" allow-half />
</template>

<script>
export default {
  data() {
    return {
      rate: 0
    }
  }
}
</script>
```

## 辅助文字

```vue
<template>
  <el-rate v-model="rate" show-text :texts="['极差', '差', '一般', '好', '非常好']" />
</template>

<script>
export default {
  data() {
    return {
      rate: 0
    }
  }
}
</script>
```

## 禁用

```vue
<template>
  <el-rate v-model="rate" disabled />
</template>

<script>
export default {
  data() {
    return {
      rate: 0
    }
  }
}
</script>
```

## 只读

```vue
<template>
  <el-rate v-model="rate" readonly />
</template>

<script>
export default {
  data() {
    return {
      rate: 0
    }
  }
}
</script>
```

## 自定义颜色

```vue
<template>
  <el-rate v-model="rate" void-color="#eee" active-color="#07c160" />
</template>

<script>
export default {
  data() {
    return {
      rate: 0
    }
  }
}
</script>
```

## 何时使用

- 需要用户对商品、服务或内容进行打分评价时。
- 需要展示已有的评分结果（只读模式）时。
- 需要半星精度的评分（如 3.5 星）时，开启 `allow-half`。

## API

### Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| value / v-model | 绑定值，当前选中的评分数值（如 3 表示 3 颗星） | number | `0` |
| allow-half | 是否允许半星选择。开启后可点击星星的左半部分选择 0.5 分 | boolean | `false` |
| showText | 是否显示辅助文字。开启后在星星右侧显示对应分数的文字描述 | boolean | `false` |
| texts | 辅助文字数组，每项对应一个分数的文字描述，需与星星数量一致 | array | `['极差', '差', '一般', '好', '非常好']` |
| disabled | 是否禁用。禁用后不可交互，星星显示为默认颜色 | boolean | `false` |
| readonly | 是否只读。只读状态下显示当前评分但不可点击修改 | boolean | `false` |
| voidColor | 未选中星星的颜色 | string | `#c6d1de` |
| activeColor | 选中星星的颜色 | string | `#ff9900` |

### Events

| Name | Description | Parameters |
| ---- | ----------- | ---------- |
| change | 评分值改变时触发（用户点击选择新的分数时） | 选中的值 |
