<template>
  <div class="page-input">
    <van-nav-bar title="el-input 输入框" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">基础用法</div>
        <el-input v-model="text1" placeholder="请输入内容" />
        <div class="demo-value">值: {{ text1 }}</div>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">不同类型</div>
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
      </el-card>

      <el-card class="demo-card">
        <div slot="header">密码框 (show-password)</div>
        <el-input v-model="password" type="password" placeholder="请输入密码" show-password />
      </el-card>

      <el-card class="demo-card">
        <div slot="header">禁用与只读</div>
        <el-form label-width="80px">
          <el-form-item label="禁用">
            <el-input v-model="text3" placeholder="已禁用" disabled />
          </el-form-item>
          <el-form-item label="只读">
            <el-input v-model="text3" placeholder="只读" readonly />
          </el-form-item>
        </el-form>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">清空 (clearable)</div>
        <el-input v-model="text4" placeholder="可清空" clearable />
      </el-card>

      <el-card class="demo-card">
        <div slot="header">前缀/后缀图标</div>
        <el-form label-width="80px">
          <el-form-item label="前缀">
            <el-input v-model="text5" placeholder="搜索" prefix-icon="el-icon-search" />
          </el-form-item>
          <el-form-item label="后缀">
            <el-input v-model="text5" placeholder="日期" suffix-icon="el-icon-date" />
          </el-form-item>
        </el-form>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">最大长度 (show-word-limit)</div>
        <el-input v-model="text6" maxlength="10" show-word-limit placeholder="最多10个字符" />
      </el-card>

      <el-card class="demo-card">
        <div slot="header">文本域 (rows)</div>
        <el-input v-model="text7" type="textarea" :rows="4" placeholder="多行文本域" />
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  name: 'InputPage',
  components: { [NavBar.name]: NavBar },
  data() {
    return {
      text1: '',
      text2: '',
      password: '',
      text3: '固定内容',
      text4: '可清除的文字',
      text5: '',
      text6: '',
      text7: '',
    }
  },
}
</script>

<style scoped>
.page-input {
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
