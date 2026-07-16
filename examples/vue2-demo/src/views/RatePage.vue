<template>
  <div class="page-rate">
    <van-nav-bar title="el-rate 评分" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">基础用法</div>
        <el-rate v-model="rate1" />
        <div class="demo-value">评分: {{ rate1 }}</div>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">半星 (allow-half)</div>
        <el-rate v-model="rate2" allow-half />
        <div class="demo-value">评分: {{ rate2 }}</div>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">辅助文字 (show-text)</div>
        <el-rate v-model="rate3" show-text :texts="rateTexts" />
      </el-card>

      <el-card class="demo-card">
        <div slot="header">禁用 (disabled)</div>
        <el-rate v-model="rate4" disabled />
      </el-card>

      <el-card class="demo-card">
        <div slot="header">只读 (readonly)</div>
        <el-rate v-model="rate5" readonly />
      </el-card>

      <el-card class="demo-card">
        <div slot="header">自定义颜色</div>
        <el-rate v-model="rate6" void-color="#eee" active-color="#07c160" />
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  name: 'RatePage',
  components: { [NavBar.name]: NavBar },
  data() {
    return {
      rate1: 0,
      rate2: 0,
      rate3: 0,
      rate4: 4,
      rate5: 4,
      rate6: 0,
      rateTexts: ['极差', '差', '一般', '好', '非常好'],
    }
  },
}
</script>

<style scoped>
.page-rate {
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
