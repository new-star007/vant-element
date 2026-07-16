<template>
  <div class="page-date-picker">
    <van-nav-bar title="el-date-picker 日期选择器" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">选择日期</div>
        <el-date-picker v-model="date1" placeholder="选择日期" />
        <div class="demo-value">值: {{ date1 }}</div>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">选择日期时间</div>
        <el-date-picker v-model="date2" type="datetime" placeholder="选择日期时间" />
        <div class="demo-value">值: {{ date2 }}</div>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">选择年份</div>
        <el-date-picker v-model="date3" type="year" placeholder="选择年份" />
        <div class="demo-value">值: {{ date3 }}</div>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">选择月份</div>
        <el-date-picker v-model="date4" type="month" placeholder="选择月份" />
        <div class="demo-value">值: {{ date4 }}</div>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">带默认值</div>
        <el-date-picker v-model="date5" placeholder="选择日期" />
        <div class="demo-value">值: {{ date5 }}</div>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">禁用状态</div>
        <el-date-picker v-model="date6" placeholder="已禁用" disabled />
      </el-card>

      <el-card class="demo-card">
        <div slot="header">可清空</div>
        <el-date-picker v-model="date7" placeholder="可清空" clearable />
        <div class="demo-value">值: {{ date7 }}</div>
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  name: 'DatePickerPage',
  components: { [NavBar.name]: NavBar },
  data() {
    return {
      date1: '',
      date2: '',
      date3: '',
      date4: '',
      date5: new Date('2026-06-15'),
      date6: new Date('2026-07-01'),
      date7: '',
    }
  },
}
</script>

<style scoped>
.page-date-picker {
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
