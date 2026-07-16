<template>
  <div class="page-progress">
    <van-nav-bar title="el-progress 进度条" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">基础用法</div>
        <div style="margin-bottom: 12px;">
          <span>20%</span>
          <el-progress :percentage="20" />
        </div>
        <div style="margin-bottom: 12px;">
          <span>40%</span>
          <el-progress :percentage="40" />
        </div>
        <div style="margin-bottom: 12px;">
          <span>60%</span>
          <el-progress :percentage="60" />
        </div>
        <div style="margin-bottom: 12px;">
          <span>80%</span>
          <el-progress :percentage="80" />
        </div>
        <div>
          <span>100%</span>
          <el-progress :percentage="100" />
        </div>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">不同状态</div>
        <el-progress :percentage="100" status="success" />
        <el-progress :percentage="80" status="warning" />
        <el-progress :percentage="40" status="exception" />
        <el-progress :percentage="60" inactive />
      </el-card>

      <el-card class="demo-card">
        <div slot="header">自定义颜色</div>
        <el-progress :percentage="30" color="#f56c6c" />
        <el-progress :percentage="60" color="#e6a23c" />
        <el-progress :percentage="100" color="#67c23a" />
      </el-card>

      <el-card class="demo-card">
        <div slot="header">显示文字</div>
        <el-progress :percentage="50" :show-text="true" />
        <el-progress :percentage="50" :show-text="false" />
      </el-card>

      <el-card class="demo-card">
        <div slot="header">环形进度</div>
        <div class="circle-group">
          <el-progress type="circle" :percentage="25" />
          <el-progress type="circle" :percentage="50" color="#67c23a" />
          <el-progress type="circle" :percentage="75" color="#e6a23c" />
          <el-progress type="circle" :percentage="100" color="#f56c6c" />
        </div>
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  name: 'ProgressPage',
  components: { [NavBar.name]: NavBar },
}
</script>

<style scoped>
.page-progress {
  background: #f7f8fa;
  min-height: 100vh;
}
.page-body {
  padding: 16px;
}
.demo-card {
  margin-bottom: 12px;
}
.circle-group {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}
</style>
