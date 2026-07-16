<template>
  <div class="page-button">
    <van-nav-bar title="el-button 按钮" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">按钮类型</div>
        <el-button>default</el-button>
        <el-button type="primary">primary</el-button>
        <el-button type="success">success</el-button>
        <el-button type="warning">warning</el-button>
        <el-button type="danger">danger</el-button>
        <el-button type="info">info</el-button>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">朴素按钮</div>
        <el-button plain>default</el-button>
        <el-button type="primary" plain>primary</el-button>
        <el-button type="success" plain>success</el-button>
        <el-button type="warning" plain>warning</el-button>
        <el-button type="danger" plain>danger</el-button>
        <el-button type="info" plain>info</el-button>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">圆角与圆形</div>
        <el-button round>圆角按钮</el-button>
        <el-button type="primary" round>圆角按钮</el-button>
        <el-button type="success" circle>✓</el-button>
        <el-button type="danger" circle>✗</el-button>
        <el-button type="warning" circle>!</el-button>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">尺寸</div>
        <el-form label-width="70px">
          <el-form-item label="large">
            <el-button size="large">large</el-button>
          </el-form-item>
          <el-form-item label="normal">
            <el-button>normal</el-button>
          </el-form-item>
          <el-form-item label="small">
            <el-button size="small">small</el-button>
          </el-form-item>
          <el-form-item label="mini">
            <el-button size="mini">mini</el-button>
          </el-form-item>
        </el-form>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">禁用状态</div>
        <el-button disabled>default</el-button>
        <el-button type="primary" disabled>primary</el-button>
        <el-button type="success" disabled>success</el-button>
        <el-button type="warning" disabled>warning</el-button>
        <el-button type="danger" disabled>danger</el-button>
        <el-button type="info" disabled>info</el-button>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">加载中</div>
        <el-button loading>加载中</el-button>
        <el-button type="primary" loading>加载中</el-button>
        <el-button type="success" loading>加载中</el-button>
        <el-button type="danger" loading>加载中</el-button>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">图标按钮</div>
        <el-button icon="el-icon-search">搜索</el-button>
        <el-button type="primary" icon="el-icon-edit">编辑</el-button>
        <el-button type="success" icon="el-icon-check">确定</el-button>
        <el-button type="danger" icon="el-icon-delete">删除</el-button>
        <el-button type="warning" icon="el-icon-star-on">收藏</el-button>
        <el-button type="info" icon="el-icon-message">消息</el-button>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">按钮组</div>
        <el-button-group capsule>
          <el-button icon="el-icon-arrow-left">上一页</el-button>
          <el-button>中间</el-button>
          <el-button>中间</el-button>
          <el-button>下一页<i class="el-icon-arrow-right el-icon--right" /></el-button>
        </el-button-group>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">块级按钮</div>
        <el-button block>块级按钮 default</el-button>
        <el-button type="primary" block>块级按钮 primary</el-button>
        <el-button type="success" block>块级按钮 success</el-button>
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  name: 'ButtonPage',
  components: { [NavBar.name]: NavBar },
}
</script>

<style scoped>
.page-button {
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
