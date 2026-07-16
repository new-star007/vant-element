<template>
  <div class="page-input-number">
    <van-nav-bar title="el-input-number 数字输入框" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">基础用法（min=1, max=10）</div>
        <el-input-number v-model="num1" :min="1" :max="10" />
        <div class="demo-value">值: {{ num1 }}</div>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">步长 (step=2)</div>
        <el-input-number v-model="num2" :min="0" :max="20" :step="2" />
        <div class="demo-value">值: {{ num2 }}</div>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">小数精度 (precision=2)</div>
        <el-input-number v-model="num3" :min="0" :max="10" :step="0.1" :precision="2" />
        <div class="demo-value">值: {{ num3 }}</div>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">禁用 (disabled)</div>
        <el-input-number v-model="num4" disabled />
      </el-card>

      <el-card class="demo-card">
        <div slot="header">隐藏控制按钮 (controls=false)</div>
        <el-input-number v-model="num5" :controls="false" />
        <div class="demo-value">值: {{ num5 }}</div>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">尺寸 (size)</div>
        <el-form label-width="60px">
          <el-form-item label="large">
            <el-input-number v-model="num6" size="large" />
          </el-form-item>
          <el-form-item label="medium">
            <el-input-number v-model="num6" size="medium" />
          </el-form-item>
          <el-form-item label="small">
            <el-input-number v-model="num6" size="small" />
          </el-form-item>
          <el-form-item label="mini">
            <el-input-number v-model="num6" size="mini" />
          </el-form-item>
        </el-form>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">step-strictly（值必须是 step 的倍数）</div>
        <el-input-number v-model="num7" :min="0" :max="20" :step="5" step-strictly />
        <div class="demo-value">值: {{ num7 }}</div>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">负数和范围</div>
        <el-input-number v-model="num8" :min="-10" :max="10" />
        <div class="demo-value">值: {{ num8 }}</div>
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  name: 'InputNumberPage',
  components: { [NavBar.name]: NavBar },
  data() {
    return {
      num1: 1,
      num2: 0,
      num3: 0,
      num4: 5,
      num5: 0,
      num6: 0,
      num7: 0,
      num8: 0,
    }
  },
}
</script>

<style scoped>
.page-input-number {
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
