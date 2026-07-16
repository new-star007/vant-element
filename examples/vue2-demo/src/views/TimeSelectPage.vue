<template>
  <div class="page-time-select">
    <van-nav-bar title="el-time-select 时间选择器" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">基础用法</div>
        <el-time-select v-model="value1" placeholder="请选择时间" />
        <p class="demo-value">选中值: {{ value1 }}</p>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">限可选时间范围</div>
        <p class="demo-desc">在 8:00 - 20:00 之间选择，间隔 30 分钟</p>
        <el-time-select
          v-model="value2"
          placeholder="选择时间"
          :picker-options="{
            start: '08:00',
            end: '20:00',
            step: '00:30'
          }"
        />
        <p class="demo-value">选中值: {{ value2 }}</p>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">自定义步长</div>
        <p class="demo-desc">每 15 分钟一个选项</p>
        <el-time-select
          v-model="value3"
          placeholder="选择时间"
          :picker-options="{
            start: '00:00',
            end: '23:59',
            step: '00:15'
          }"
        />
        <p class="demo-value">选中值: {{ value3 }}</p>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">禁用状态</div>
        <el-time-select
          v-model="value4"
          placeholder="请选择时间"
          disabled
        />
      </el-card>

      <el-card class="demo-card">
        <div slot="header">设置 minTime 和 maxTime</div>
        <p class="demo-desc">只允许选择 9:30 - 18:00 之间的时间</p>
        <el-time-select
          v-model="value5"
          placeholder="选择时间"
          :picker-options="{
            start: '00:00',
            end: '23:59',
            step: '00:30',
            minTime: '09:30',
            maxTime: '18:00'
          }"
        />
        <p class="demo-value">选中值: {{ value5 }}</p>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">直接传入 props</div>
        <p class="demo-desc">也支持直接通过 props 传入配置</p>
        <el-time-select
          v-model="value6"
          placeholder="选择时间"
          start="10:00"
          end="16:00"
          step="00:15"
        />
        <p class="demo-value">选中值: {{ value6 }}</p>
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  name: 'TimeSelectPage',
  components: { [NavBar.name]: NavBar },
  data() {
    return {
      value1: '',
      value2: '',
      value3: '',
      value4: '09:00',
      value5: '',
      value6: ''
    }
  }
}
</script>

<style scoped>
.page-time-select {
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
.demo-desc {
  margin-bottom: 12px;
  color: #606266;
  font-size: 13px;
}
</style>
