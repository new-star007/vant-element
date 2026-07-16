<template>
  <div class="page-radio">
    <van-nav-bar title="el-radio / el-radio-group 单选框" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">基础用法</div>
        <el-radio-group v-model="radio1">
          <el-radio label="A">A</el-radio>
          <el-radio label="B">B</el-radio>
          <el-radio label="C">C</el-radio>
        </el-radio-group>
        <div class="demo-value">选中值: {{ radio1 }}</div>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">水平排列 (direction)</div>
        <el-radio-group v-model="radio2" direction="horizontal">
          <el-radio label="A">A</el-radio>
          <el-radio label="B">B</el-radio>
          <el-radio label="C">C</el-radio>
        </el-radio-group>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">禁用状态</div>
        <el-radio-group v-model="radio3">
          <el-radio label="A">A</el-radio>
          <el-radio label="B" disabled>B (禁用)</el-radio>
          <el-radio label="C">C</el-radio>
        </el-radio-group>
        <div class="demo-value" style="margin-top: 12px">整组禁用:</div>
        <el-radio-group v-model="radio4" disabled>
          <el-radio label="X">X</el-radio>
          <el-radio label="Y">Y</el-radio>
          <el-radio label="Z">Z</el-radio>
        </el-radio-group>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">自定义颜色</div>
        <el-radio-group v-model="radio5" checked-color="#07c160">
          <el-radio label="A">选项 A</el-radio>
          <el-radio label="B">选项 B</el-radio>
          <el-radio label="C">选项 C</el-radio>
        </el-radio-group>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">按钮模式</div>
        <el-radio-group v-model="radio6">
          <el-radio-button label="上海">上海</el-radio-button>
          <el-radio-button label="北京">北京</el-radio-button>
          <el-radio-button label="广州">广州</el-radio-button>
          <el-radio-button label="深圳">深圳</el-radio-button>
        </el-radio-group>
        <div class="demo-value">选中值: {{ radio6 }}</div>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">按钮模式 - 禁用</div>
        <el-radio-group v-model="radio7" disabled>
          <el-radio-button label="A">A</el-radio-button>
          <el-radio-button label="B">B</el-radio-button>
          <el-radio-button label="C">C</el-radio-button>
        </el-radio-group>
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  name: 'RadioPage',
  components: { [NavBar.name]: NavBar },
  data() {
    return {
      radio1: 'A',
      radio2: 'A',
      radio3: 'A',
      radio4: 'X',
      radio5: 'A',
      radio6: '上海',
      radio7: 'A',
    }
  },
}
</script>

<style scoped>
.page-radio {
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
