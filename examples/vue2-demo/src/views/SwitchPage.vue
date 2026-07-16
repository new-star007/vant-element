<template>
  <div class="page-switch">
    <van-nav-bar title="el-switch 开关" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">基础用法</div>
        <el-switch v-model="switch1" />
        <div class="demo-value">值: {{ switch1 }}</div>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">自定义颜色</div>
        <el-form label-width="120px">
          <el-form-item label="active-color">
            <el-switch v-model="switch2" active-color="#07c160" inactive-color="#eee" />
          </el-form-item>
          <el-form-item label="inactive-color">
            <el-switch v-model="switch2" inactive-color="#f56c6c" />
          </el-form-item>
        </el-form>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">自定义文字</div>
        <el-switch v-model="switch3" active-text="开启" inactive-text="关闭" />
      </el-card>

      <el-card class="demo-card">
        <div slot="header">禁用 (disabled)</div>
        <el-switch v-model="switch4" disabled />
        <el-switch :value="true" disabled style="margin-left: 12px" />
      </el-card>

      <el-card class="demo-card">
        <div slot="header">大小 (size)</div>
        <el-form label-width="80px">
          <el-form-item label="18px">
            <el-switch v-model="switch5" :size="18" />
          </el-form-item>
          <el-form-item label="24px">
            <el-switch v-model="switch5" :size="24" />
          </el-form-item>
          <el-form-item label="30px">
            <el-switch v-model="switch5" :size="30" />
          </el-form-item>
        </el-form>
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  name: 'SwitchPage',
  components: { [NavBar.name]: NavBar },
  data() {
    return {
      switch1: false,
      switch2: true,
      switch3: false,
      switch4: false,
      switch5: false,
    }
  },
}
</script>

<style scoped>
.page-switch {
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
