<template>
  <div class="page-time-picker">
    <van-nav-bar title="el-time-picker 时间选择器" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">选择时间</div>
        <el-time-picker v-model="time1" placeholder="选择时间" />
        <div class="demo-value">值: {{ time1 }}</div>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">显示秒</div>
        <el-time-picker v-model="time2" placeholder="选择时间" />
        <div class="demo-value">值: {{ time2 }}</div>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">禁用 (disabled)</div>
        <el-time-picker v-model="time3" placeholder="已禁用" disabled />
      </el-card>

      <el-card class="demo-card">
        <div slot="header">清空 (clearable)</div>
        <el-time-picker v-model="time4" placeholder="可清空" clearable />
        <div class="demo-value">值: {{ time4 }}</div>
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  name: 'TimePickerPage',
  components: { [NavBar.name]: NavBar },
  data() {
    return {
      time1: '',
      time2: '',
      time3: new Date(2026, 0, 1, 12, 30, 0),
      time4: '',
    }
  },
}
</script>

<style scoped>
.page-time-picker {
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
