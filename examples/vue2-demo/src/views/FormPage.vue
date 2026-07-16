<template>
  <div class="page-form">
    <van-nav-bar title="el-form / el-form-item 表单" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">基础表单</div>
        <el-form ref="basicForm" :model="basicForm" label-width="80px">
          <el-form-item label="姓名">
            <el-input v-model="basicForm.name" placeholder="请输入姓名" />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="basicForm.email" placeholder="请输入邮箱" />
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="basicForm.gender">
              <el-radio label="male">男</el-radio>
              <el-radio label="female">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="爱好">
            <el-checkbox-group v-model="basicForm.hobby">
              <el-checkbox label="reading">阅读</el-checkbox>
              <el-checkbox label="music">音乐</el-checkbox>
              <el-checkbox label="sports">运动</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="城市">
            <el-select v-model="basicForm.city" placeholder="请选择城市">
              <el-option label="北京" value="beijing" />
              <el-option label="上海" value="shanghai" />
              <el-option label="广州" value="guangzhou" />
              <el-option label="深圳" value="shenzhen" />
            </el-select>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker v-model="basicForm.date" placeholder="选择日期" />
          </el-form-item>
          <el-form-item label="简介">
            <el-input v-model="basicForm.intro" type="textarea" :rows="3" placeholder="请输入简介" />
          </el-form-item>
        </el-form>
        <div class="demo-value">表单数据: {{ basicForm }}</div>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">表单验证</div>
        <el-form ref="validForm" :model="validForm" :rules="rules" label-width="80px">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="validForm.name" placeholder="请输入姓名" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="validForm.email" placeholder="请输入邮箱" />
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="validForm.gender">
              <el-radio label="male">男</el-radio>
              <el-radio label="female">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="城市" prop="city">
            <el-select v-model="validForm.city" placeholder="请选择城市">
              <el-option label="北京" value="beijing" />
              <el-option label="上海" value="shanghai" />
              <el-option label="广州" value="guangzhou" />
              <el-option label="深圳" value="shenzhen" />
            </el-select>
          </el-form-item>
          <el-form-item label="简介" prop="intro">
            <el-input v-model="validForm.intro" type="textarea" :rows="3" placeholder="请输入简介" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSubmit">提交</el-button>
            <el-button @click="handleReset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">行内表单</div>
        <el-form ref="inlineForm" :model="inlineForm" inline label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="inlineForm.name" placeholder="姓名" />
          </el-form-item>
          <el-form-item label="城市">
            <el-select v-model="inlineForm.city" placeholder="城市">
              <el-option label="北京" value="beijing" />
              <el-option label="上海" value="shanghai" />
            </el-select>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker v-model="inlineForm.date" placeholder="日期" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleInlineSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  name: 'FormPage',
  components: { [NavBar.name]: NavBar },
  data() {
    return {
      basicForm: {
        name: '',
        email: '',
        gender: '',
        hobby: [],
        city: '',
        date: '',
        intro: '',
      },
      validForm: {
        name: '',
        email: '',
        gender: '',
        city: '',
        intro: '',
      },
      inlineForm: {
        name: '',
        city: '',
        date: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' },
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' },
        ],
        city: [
          { required: true, message: '请选择城市', trigger: 'change' },
        ],
        intro: [
          { required: true, message: '请输入简介', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.validForm.validate((valid) => {
        if (valid) {
          alert('提交成功!')
        } else {
          alert('验证失败!')
          return false
        }
      })
    },
    handleReset() {
      this.$refs.validForm.resetFields()
    },
    handleInlineSubmit() {
      alert('查询参数: ' + JSON.stringify(this.inlineForm))
    },
  },
}
</script>

<style scoped>
.page-form {
  background: #f7f8fa;
  min-height: 100vh;
}
.page-body {
  padding: 16px;
}
.demo-card {
  margin-bottom: 12px;
}
.demo-value {
  margin-top: 8px;
  font-size: 12px;
  color: #969799;
}
</style>
