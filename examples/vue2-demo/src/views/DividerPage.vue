<template>
  <div class="page-divider">
    <van-nav-bar title="el-divider 分割线" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">基础分割线</div>
        <span>上部分内容</span>
        <el-divider />
        <span>下部分内容</span>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">带文字</div>
        <span>内容区域</span>
        <el-divider content-position="left">左侧文字</el-divider>
        <span>内容区域</span>
        <el-divider content-position="center">居中文字</el-divider>
        <span>内容区域</span>
        <el-divider content-position="right">右侧文字</el-divider>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">纵向</div>
        <div style="display:flex;align-items:center;gap:12px">
          <span>左侧</span>
          <el-divider direction="vertical" />
          <span>中间</span>
          <el-divider direction="vertical" />
          <span>右侧</span>
        </div>
        <div style="margin-top:12px;display:flex;align-items:center;gap:12px">
          <el-tag>标签A</el-tag>
          <el-divider direction="vertical" />
          <el-tag type="success">标签B</el-tag>
          <el-divider direction="vertical" />
          <el-tag type="warning">标签C</el-tag>
        </div>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">自定义样式</div>
        <span>上部分</span>
        <el-divider style="border-color: #409eff; border-width: 2px" />
        <span>中部分</span>
        <el-divider style="border-color: #67c23a; border-style: dashed" />
        <span>下部分</span>
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  name: 'DividerPage',
  components: { [NavBar.name]: NavBar }
}
</script>

<style scoped>
.page-divider {
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
