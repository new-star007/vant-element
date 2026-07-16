<template>
  <div class="page-radio-button">
    <van-nav-bar title="el-radio-button 单选按钮" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">基础用法</div>
        <el-radio-group v-model="radio1">
          <el-radio-button label="上海">上海</el-radio-button>
          <el-radio-button label="北京">北京</el-radio-button>
          <el-radio-button label="广州">广州</el-radio-button>
          <el-radio-button label="深圳">深圳</el-radio-button>
        </el-radio-group>
        <p class="demo-value">选中值: {{ radio1 }}</p>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">禁用状态</div>
        <el-radio-group v-model="radio2" disabled>
          <el-radio-button label="禁用">禁用</el-radio-button>
          <el-radio-button label="选中禁用">选中禁用</el-radio-button>
          <el-radio-button label="A">A</el-radio-button>
        </el-radio-group>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">不同尺寸</div>
        <el-radio-group v-model="radio3" size="medium">
          <el-radio-button label="Medium">Medium</el-radio-button>
          <el-radio-button label="Small">Small</el-radio-button>
          <el-radio-button label="Mini">Mini</el-radio-button>
        </el-radio-group>
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  name: 'RadioButtonPage',
  components: { [NavBar.name]: NavBar },
  data() {
    return {
      radio1: '上海',
      radio2: '选中禁用',
      radio3: 'Medium'
    }
  }
}
</script>

<style scoped>
.page-radio-button {
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
  margin-top: 12px;
  color: #909399;
  font-size: 14px;
}
</style>
