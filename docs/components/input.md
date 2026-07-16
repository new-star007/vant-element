# Input 输入框

输入框用于通过键盘输入文本内容，是表单中最基础的交互元素。用户可以在输入框中填写文本、密码、数字等各类信息，是数据采集的入口。

输入框支持多种类型（文本、密码、文本域），可配合前缀/后缀图标、字数统计、清空按钮、密码切换等辅助功能使用。在表单场景中，通常与 Form 组件搭配实现数据收集和校验，也可作为搜索框独立使用。

## 基础用法

```vue
<template>
  <el-input v-model="text1" placeholder="请输入内容" />
  <div class="demo-value">值: {{ text1 }}</div>
</template>

<script>
export default {
  data() {
    return {
      text1: ''
    }
  }
}
</script>
```

## 不同类型

```vue
<template>
  <el-form label-width="80px">
    <el-form-item label="文本">
      <el-input v-model="text2" placeholder="文本输入" />
    </el-form-item>
    <el-form-item label="文本域">
      <el-input v-model="text2" type="textarea" :rows="3" placeholder="文本域" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="text2" type="password" placeholder="密码" />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      text2: ''
    }
  }
}
</script>
```

## 密码框

```vue
<template>
  <el-input v-model="password" type="password" placeholder="请输入密码" show-password />
</template>

<script>
export default {
  data() {
    return {
      password: ''
    }
  }
}
</script>
```

## 禁用与只读

```vue
<template>
  <el-form label-width="80px">
    <el-form-item label="禁用">
      <el-input v-model="text3" placeholder="已禁用" disabled />
    </el-form-item>
    <el-form-item label="只读">
      <el-input v-model="text3" placeholder="只读" readonly />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      text3: '固定内容'
    }
  }
}
</script>
```

## 清空

```vue
<template>
  <el-input v-model="text4" placeholder="可清空" clearable />
</template>

<script>
export default {
  data() {
    return {
      text4: '可清除的文字'
    }
  }
}
</script>
```

## 前缀/后缀图标

```vue
<template>
  <el-form label-width="80px">
    <el-form-item label="前缀">
      <el-input v-model="text5" placeholder="搜索" prefix-icon="el-icon-search" />
    </el-form-item>
    <el-form-item label="后缀">
      <el-input v-model="text5" placeholder="日期" suffix-icon="el-icon-date" />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      text5: ''
    }
  }
}
</script>
```

## 最大长度

```vue
<template>
  <el-input v-model="text6" maxlength="10" show-word-limit placeholder="最多10个字符" />
</template>

<script>
export default {
  data() {
    return {
      text6: ''
    }
  }
}
</script>
```

## 文本域

```vue
<template>
  <el-input v-model="text7" type="textarea" :rows="4" placeholder="多行文本域" />
</template>

<script>
export default {
  data() {
    return {
      text7: ''
    }
  }
}
</script>
```

## 何时使用

- 需要用户输入文本信息时，如姓名、邮箱、地址等表单字段。
- 需要搜索功能时，搭配 prefix-icon 实现搜索框。
- 需要输入密码时，使用 `type="password"` 并配合 `show-password` 提供明文切换。
- 需要输入多行内容时，使用 `type="textarea"` 文本域模式。

## API

### Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| value / v-model | 绑定值，输入内容实时同步到该变量 | string / number | — |
| type | 输入框类型。`text` 为普通文本，`password` 为密码（遮罩显示），`textarea` 为多行文本域 | `text` / `password` / `textarea` | `text` |
| placeholder | 占位提示文本，输入内容后自动消失 | string | — |
| disabled | 是否禁用。禁用后输入框不可编辑，文字颜色变浅，鼠标变为不可点击状态 | boolean | `false` |
| readonly | 是否只读。只读状态下可查看内容但不可修改，不会触发键盘输入 | boolean | `false` |
| clearable | 是否可清空。启用后输入框右侧出现清除按钮，点击可一键清空内容 | boolean | `false` |
| prefix-icon | 前缀图标，显示在输入框内部左侧，常用于搜索图标等 | string | — |
| suffix-icon | 后缀图标，显示在输入框内部右侧，常用于日期选择图标等 | string | — |
| maxlength | 最大输入字符数，超出后禁止继续输入 | number | — |
| show-word-limit | 是否显示字数统计，配合 maxlength 使用，在输入框右下角显示已输入/最大字符数 | boolean | `false` |
| show-password | 是否显示密码切换按钮，点击可在明文和密文之间切换显示 | boolean | `false` |
| rows | textarea 模式下的显示行数，超出后出现滚动条 | number | — |
| size | 输入框尺寸，影响输入框高度和字体大小 | string | — |

### Events

| Name | Description | Parameters |
| ---- | ----------- | ---------- |
| input | 输入内容时实时触发，每输入一个字符都会触发 | 输入值 |
| change | 输入框内容改变且失去焦点时触发，用于获取最终值 | 输入值 |
| blur | 输入框失去焦点时触发 | — |
| focus | 输入框获得焦点时触发 | — |
| clear | 点击清空按钮时触发 | — |
