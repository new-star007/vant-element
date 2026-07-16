<template>
  <div class="page-checkbox">
    <van-nav-bar title="el-checkbox / el-checkbox-group 多选框" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">基础用法</div>
        <el-checkbox v-model="checked">选项 {{ checked }}</el-checkbox>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">多选组</div>
        <el-checkbox-group v-model="checkedList" direction="vertical">
          <el-checkbox label="A">A</el-checkbox>
          <el-checkbox label="B">B</el-checkbox>
          <el-checkbox label="C">C</el-checkbox>
          <el-checkbox label="D">D</el-checkbox>
        </el-checkbox-group>
        <div class="demo-value">选中值: {{ checkedList }}</div>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">水平排列</div>
        <el-checkbox-group v-model="checkedList2" direction="horizontal">
          <el-checkbox label="A">A</el-checkbox>
          <el-checkbox label="B">B</el-checkbox>
          <el-checkbox label="C">C</el-checkbox>
          <el-checkbox label="D">D</el-checkbox>
        </el-checkbox-group>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">限制数量 (max=2)</div>
        <el-checkbox-group v-model="limitedList" :max="2">
          <el-checkbox label="A">A</el-checkbox>
          <el-checkbox label="B">B</el-checkbox>
          <el-checkbox label="C">C</el-checkbox>
          <el-checkbox label="D">D</el-checkbox>
        </el-checkbox-group>
        <div class="demo-value">最多选2个: {{ limitedList }}</div>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">禁用状态</div>
        <el-checkbox v-model="checked" disabled>禁用</el-checkbox>
        <el-checkbox :value="true" disabled>已选中禁用</el-checkbox>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">自定义颜色</div>
        <el-checkbox v-model="checked" checked-color="#07c160">自定义颜色</el-checkbox>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">按钮模式</div>
        <el-checkbox-group v-model="buttonList">
          <el-checkbox-button label="上海">上海</el-checkbox-button>
          <el-checkbox-button label="北京">北京</el-checkbox-button>
          <el-checkbox-button label="广州">广州</el-checkbox-button>
          <el-checkbox-button label="深圳">深圳</el-checkbox-button>
        </el-checkbox-group>
        <div class="demo-value">选中值: {{ buttonList }}</div>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">按钮模式 - 禁用</div>
        <el-checkbox-group v-model="buttonDisabledList" disabled>
          <el-checkbox-button label="A">A</el-checkbox-button>
          <el-checkbox-button label="B">B</el-checkbox-button>
          <el-checkbox-button label="C">C</el-checkbox-button>
        </el-checkbox-group>
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  name: 'CheckboxPage',
  components: { [NavBar.name]: NavBar },
  data() {
    return {
      checked: false,
      checkedList: ['A', 'B'],
      checkedList2: [],
      limitedList: [],
      buttonList: ['上海'],
      buttonDisabledList: ['A', 'C'],
    }
  },
}
</script>

<style scoped>
.page-checkbox {
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
