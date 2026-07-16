# Form 表单

表单用于收集、校验和提交用户输入的数据，由输入框、选择器、单选框、多选框等各类表单控件组合而成。是后台管理系统和用户注册/登录页面的核心组件。

表单支持声明式校验规则，可对每个字段设置必填、格式、长度等约束，自动提示错误信息。提供行内布局和垂直布局两种排列方式，通过 FormItem 的 label 属性统一管理标签对齐。配合 Form 的 validate 方法，可在提交前一次性校验所有字段。

## 基础表单

```vue
<template>
  <el-form :model="form" label-width="80px">
    <el-form-item label="姓名">
      <el-input v-model="form.name" placeholder="请输入姓名" />
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="form.email" placeholder="请输入邮箱" />
    </el-form-item>
    <el-form-item label="性别">
      <el-radio-group v-model="form.gender">
        <el-radio label="male">男</el-radio>
        <el-radio label="female">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="城市">
      <el-select v-model="form.city" placeholder="请选择城市">
        <el-option label="北京" value="beijing" />
        <el-option label="上海" value="shanghai" />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        gender: '',
        city: ''
      }
    }
  }
}
</script>
```

## 表单验证

```vue
<template>
  <el-form :model="form" :rules="rules" label-width="80px">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="form.name" placeholder="请输入姓名" />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="form.email" placeholder="请输入邮箱" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSubmit">提交</el-button>
      <el-button @click="handleReset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        email: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          alert('提交成功')
        }
      })
    },
    handleReset() {
      this.$refs.form.resetFields()
    }
  }
}
</script>
```

## 行内表单

```vue
<template>
  <el-form :model="form" inline label-width="60px">
    <el-form-item label="姓名">
      <el-input v-model="form.name" placeholder="姓名" />
    </el-form-item>
    <el-form-item label="城市">
      <el-select v-model="form.city" placeholder="城市">
        <el-option label="北京" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">查询</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        city: ''
      }
    }
  }
}
</script>
```

## 何时使用

- 需要收集用户多项信息并统一提交时，如注册表单、编辑资料。
- 需要对用户输入进行格式校验（如邮箱格式、必填项）时。
- 需要行内布局（搜索栏）或垂直布局（详情表单）的灵活排列时。

## API

### Form Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| model | 表单数据对象，包含所有表单字段的值，与 FormItem 的 prop 对应 | object | — |
| rules | 表单验证规则对象，key 为字段名，value 为该校验规则数组 | object | — |
| label-width | 标签宽度，所有 FormItem 的标签统一宽度（如 "80px"） | string | — |
| inline | 是否为行内表单。开启后所有 FormItem 水平排列，适用于搜索栏场景 | boolean | `false` |

### FormItem Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| label | 标签文本，显示在表单控件左侧的说明文字 | string | — |
| prop | 表单域字段名，与 Form 的 model 中的 key 对应，用于校验和重置 | string | — |
| required | 是否必填。开启后标签前自动显示红色星号 * 标记 | boolean | `false` |

### Form Methods

| Name | Description | Parameters |
| ---- | ----------- | ---------- |
| validate | 触发表单验证，校验所有设置了 prop 的字段。回调参数 valid 为 boolean，true 表示全部通过 | (valid: boolean) => void |
| resetFields | 重置表单，将所有字段值恢复为初始值并清除校验错误提示 | — |
