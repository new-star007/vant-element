<template>
  <div class="page-slider">
    <van-nav-bar title="el-slider 滑块" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">基础用法</div>
        <el-slider v-model="slider1" />
        <div class="demo-value">值: {{ slider1 }}</div>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">显示数值 (show-input)</div>
        <el-slider v-model="slider2" show-input />
      </el-card>

      <el-card class="demo-card">
        <div slot="header">范围选择 (range)</div>
        <el-slider v-model="slider3" range />
        <div class="demo-value">值: {{ slider3 }}</div>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">步进 (step=10)</div>
        <el-slider v-model="slider4" :step="10" show-input />
      </el-card>

      <el-card class="demo-card">
        <div slot="header">禁用 (disabled)</div>
        <el-slider v-model="slider5" disabled />
      </el-card>

      <el-card class="demo-card">
        <div slot="header">自定义范围 (min/max)</div>
        <el-slider v-model="slider6" :min="-50" :max="50" show-input />
        <div class="demo-value">值: {{ slider6 }}</div>
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  name: 'SliderPage',
  components: { [NavBar.name]: NavBar },
  data() {
    return {
      slider1: 30,
      slider2: 40,
      slider3: [20, 60],
      slider4: 0,
      slider5: 50,
      slider6: 0,
    }
  },
}
</script>

<style scoped>
.page-slider {
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
