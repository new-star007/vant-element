<template>
  <div class="page-spinner">
    <van-nav-bar title="el-spinner 加载" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">基础用法</div>
        <el-spinner />
      </el-card>

      <el-card class="demo-card">
        <div slot="header">自定义大小</div>
        <div style="display: flex; align-items: center; gap: 24px;">
          <el-spinner :size="20" />
          <el-spinner :size="40" />
          <el-spinner :size="60" />
        </div>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">自定义颜色</div>
        <div style="display: flex; align-items: center; gap: 24px;">
          <el-spinner color="#409eff" />
          <el-spinner color="#67c23a" />
          <el-spinner color="#e6a23c" />
          <el-spinner color="#f56c6c" />
        </div>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">加载中状态</div>
        <div style="position: relative; padding: 20px; border: 1px solid #eee; border-radius: 4px;">
          <p>这里是内容区域</p>
          <p>可以放置任意内容</p>
          <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.8);">
            <el-spinner :size="36" color="#409eff" />
          </div>
        </div>
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  name: 'SpinnerPage',
  components: { [NavBar.name]: NavBar }
}
</script>

<style scoped>
.page-spinner {
  background: #f7f8fa;
  min-height: 100vh;
}
.page-body {
  padding: 16px;
}
.demo-card {
  margin-bottom: 12px;
}
</style>
