<template>
  <div class="page-checkbox-button">
    <van-nav-bar title="el-checkbox-button 复选按钮" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">基础用法</div>
        <el-checkbox-group v-model="checkList1">
          <el-checkbox-button label="上海">上海</el-checkbox-button>
          <el-checkbox-button label="北京">北京</el-checkbox-button>
          <el-checkbox-button label="广州">广州</el-checkbox-button>
          <el-checkbox-button label="深圳">深圳</el-checkbox-button>
        </el-checkbox-group>
        <p class="demo-value">选中值: {{ checkList1 }}</p>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">禁用状态</div>
        <el-checkbox-group v-model="checkList2" disabled>
          <el-checkbox-button label="A">A</el-checkbox-button>
          <el-checkbox-button label="B" disabled>B</el-checkbox-button>
          <el-checkbox-button label="C">C</el-checkbox-button>
        </el-checkbox-group>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">可选数量限制</div>
        <el-checkbox-group v-model="checkList3" :min="1" :max="3">
          <el-checkbox-button label="A">A</el-checkbox-button>
          <el-checkbox-button label="B">B</el-checkbox-button>
          <el-checkbox-button label="C">C</el-checkbox-button>
          <el-checkbox-button label="D">D</el-checkbox-button>
          <el-checkbox-button label="E">E</el-checkbox-button>
        </el-checkbox-group>
        <p class="demo-value">选中值: {{ checkList3 }}（最少1个，最多3个）</p>
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  name: 'CheckboxButtonPage',
  components: { [NavBar.name]: NavBar },
  data() {
    return {
      checkList1: ['上海'],
      checkList2: ['A', 'C'],
      checkList3: ['A']
    }
  }
}
</script>

<style scoped>
.page-checkbox-button {
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
