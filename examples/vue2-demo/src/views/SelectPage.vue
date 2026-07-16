<template>
  <div class="page-select">
    <van-nav-bar title="el-select / el-option 选择器" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">基础用法</div>
        <el-select v-model="select1" placeholder="请选择">
          <el-option label="选项一" value="1" />
          <el-option label="选项二" value="2" />
          <el-option label="选项三" value="3" />
        </el-select>
        <div class="demo-value">选中值: {{ select1 }}</div>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">可搜索 (filterable)</div>
        <el-select v-model="select2" filterable placeholder="请输入关键词">
          <el-option label="Apple" value="apple" />
          <el-option label="Banana" value="banana" />
          <el-option label="Orange" value="orange" />
          <el-option label="Grape" value="grape" />
          <el-option label="Watermelon" value="watermelon" />
        </el-select>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">清空 (clearable)</div>
        <el-select v-model="select3" clearable placeholder="可清空">
          <el-option label="选项一" value="1" />
          <el-option label="选项二" value="2" />
          <el-option label="选项三" value="3" />
        </el-select>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">禁用 (disabled)</div>
        <el-select v-model="select4" disabled placeholder="已禁用">
          <el-option label="选项一" value="1" />
          <el-option label="选项二" value="2" />
        </el-select>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">禁用选项</div>
        <el-select v-model="select5" placeholder="请选择">
          <el-option label="正常选项" value="1" />
          <el-option label="禁用选项" value="2" disabled />
          <el-option label="正常选项" value="3" />
          <el-option label="禁用选项" value="4" disabled />
        </el-select>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">多选 (multiple)</div>
        <el-select v-model="select6" multiple placeholder="请选择">
          <el-option label="选项一" value="1" />
          <el-option label="选项二" value="2" />
          <el-option label="选项三" value="3" />
          <el-option label="选项四" value="4" />
        </el-select>
        <div class="demo-value">选中值: {{ select6 }}</div>
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  name: 'SelectPage',
  components: { [NavBar.name]: NavBar },
  data() {
    return {
      select1: '',
      select2: '',
      select3: '',
      select4: '1',
      select5: '',
      select6: [],
    }
  },
}
</script>

<style scoped>
.page-select {
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
