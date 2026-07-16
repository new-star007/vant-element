<template>
  <div class="page-button-group">
    <van-nav-bar title="el-button-group 按钮组" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">基础组合</div>
        <el-button-group>
          <el-button>左</el-button>
          <el-button>中</el-button>
          <el-button>右</el-button>
        </el-button-group>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">胶囊组合</div>
        <el-button-group capsule>
          <el-button>左</el-button>
          <el-button>中</el-button>
          <el-button>右</el-button>
        </el-button-group>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">块级组合</div>
        <el-button-group block>
          <el-button>块级左</el-button>
          <el-button>块级中</el-button>
          <el-button>块级右</el-button>
        </el-button-group>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">混合类型</div>
        <el-button-group capsule>
          <el-button type="primary">主要</el-button>
          <el-button type="success">成功</el-button>
          <el-button type="warning">警告</el-button>
        </el-button-group>
        <div style="margin-top:12px">
          <el-button-group capsule>
            <el-button type="danger">删除</el-button>
            <el-button type="info">信息</el-button>
            <el-button>默认</el-button>
          </el-button-group>
        </div>
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  name: 'ButtonGroupPage',
  components: { [NavBar.name]: NavBar }
}
</script>

<style scoped>
.page-button-group {
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
