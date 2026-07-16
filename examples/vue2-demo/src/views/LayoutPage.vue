<template>
  <div class="page-layout">
    <van-nav-bar title="el-row / el-col 布局" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">基础布局</div>
        <el-row>
          <el-col :span="12"><div class="grid-content bg-primary-light">span-12</div></el-col>
          <el-col :span="12"><div class="grid-content bg-primary">span-12</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="6"><div class="grid-content bg-primary-light">span-6</div></el-col>
          <el-col :span="6"><div class="grid-content bg-primary">span-6</div></el-col>
          <el-col :span="6"><div class="grid-content bg-primary-light">span-6</div></el-col>
          <el-col :span="6"><div class="grid-content bg-primary">span-6</div></el-col>
        </el-row>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">分栏间隔</div>
        <p class="section-title">gutter: 10</p>
        <el-row :gutter="10">
          <el-col :span="6"><div class="grid-content bg-primary-light">span-6</div></el-col>
          <el-col :span="6"><div class="grid-content bg-primary">span-6</div></el-col>
          <el-col :span="6"><div class="grid-content bg-primary-light">span-6</div></el-col>
          <el-col :span="6"><div class="grid-content bg-primary">span-6</div></el-col>
        </el-row>
        <p class="section-title">gutter: 20</p>
        <el-row :gutter="20">
          <el-col :span="6"><div class="grid-content bg-primary-light">span-6</div></el-col>
          <el-col :span="6"><div class="grid-content bg-primary">span-6</div></el-col>
          <el-col :span="6"><div class="grid-content bg-primary-light">span-6</div></el-col>
          <el-col :span="6"><div class="grid-content bg-primary">span-6</div></el-col>
        </el-row>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">混合布局</div>
        <el-row>
          <el-col :span="16"><div class="grid-content bg-primary-light">span-16</div></el-col>
          <el-col :span="8"><div class="grid-content bg-primary">span-8</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="6"><div class="grid-content bg-primary-light">span-6</div></el-col>
          <el-col :span="6"><div class="grid-content bg-primary">span-6</div></el-col>
          <el-col :span="6"><div class="grid-content bg-primary-light">span-6</div></el-col>
          <el-col :span="6"><div class="grid-content bg-primary">span-6</div></el-col>
        </el-row>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">偏移</div>
        <el-row>
          <el-col :span="8"><div class="grid-content bg-primary-light">span-8</div></el-col>
          <el-col :span="8" :offset="8"><div class="grid-content bg-primary">span-8 offset-8</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="6"><div class="grid-content bg-primary-light">span-6 offset-6</div></el-col>
          <el-col :span="6" :offset="6"><div class="grid-content bg-primary">span-6 offset-6</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="4" :offset="4"><div class="grid-content bg-primary-light">span-4 offset-4</div></el-col>
          <el-col :span="4" :offset="4"><div class="grid-content bg-primary">span-4 offset-4</div></el-col>
          <el-col :span="4" :offset="4"><div class="grid-content bg-primary-light">span-4 offset-4</div></el-col>
        </el-row>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">栅格对齐 (justify)</div>
        <p class="section-title">flex-start</p>
        <el-row justify="flex-start">
          <el-col :span="4"><div class="grid-content bg-primary-light">span-4</div></el-col>
          <el-col :span="4"><div class="grid-content bg-primary">span-4</div></el-col>
        </el-row>
        <p class="section-title">center</p>
        <el-row justify="center">
          <el-col :span="4"><div class="grid-content bg-primary-light">span-4</div></el-col>
          <el-col :span="4"><div class="grid-content bg-primary">span-4</div></el-col>
        </el-row>
        <p class="section-title">flex-end</p>
        <el-row justify="flex-end">
          <el-col :span="4"><div class="grid-content bg-primary-light">span-4</div></el-col>
          <el-col :span="4"><div class="grid-content bg-primary">span-4</div></el-col>
        </el-row>
        <p class="section-title">space-between</p>
        <el-row justify="space-between">
          <el-col :span="4"><div class="grid-content bg-primary-light">span-4</div></el-col>
          <el-col :span="4"><div class="grid-content bg-primary">span-4</div></el-col>
        </el-row>
        <p class="section-title">space-around</p>
        <el-row justify="space-around">
          <el-col :span="4"><div class="grid-content bg-primary-light">span-4</div></el-col>
          <el-col :span="4"><div class="grid-content bg-primary">span-4</div></el-col>
        </el-row>
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  name: 'LayoutPage',
  components: { [NavBar.name]: NavBar },
}
</script>

<style scoped>
.page-layout {
  background: #f7f8fa;
  min-height: 100vh;
}
.page-body {
  padding: 16px;
}
.demo-card {
  margin-bottom: 12px;
}
.section-title {
  margin: 8px 0;
  font-size: 12px;
  color: #909399;
}
.el-row {
  margin-bottom: 12px;
}
.grid-content {
  border-radius: 4px;
  text-align: center;
  padding: 10px 0;
  font-size: 13px;
  color: #fff;
}
.bg-primary-light {
  background: #66b1ff;
}
.bg-primary {
  background: #409eff;
}
</style>
