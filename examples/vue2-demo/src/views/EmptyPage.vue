<template>
  <div class="page-empty">
    <van-nav-bar title="el-empty 空状态" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">基础用法</div>
        <el-empty />
      </el-card>

      <el-card class="demo-card">
        <div slot="header">自定义描述</div>
        <el-empty description="暂无可用的数据" />
      </el-card>

      <el-card class="demo-card">
        <div slot="header">自定义图片</div>
        <el-empty image="https://img.yzcdn.cn/vant/ipad.jpeg" description="自定义图片" />
      </el-card>

      <el-card class="demo-card">
        <div slot="header">底部操作</div>
        <el-empty description="购物车是空的">
          <template slot="bottom">
            <el-button type="primary" size="small">去逛逛</el-button>
          </template>
        </el-empty>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">小型</div>
        <el-empty size="small" description="小型空状态" />
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  name: 'EmptyPage',
  components: { [NavBar.name]: NavBar }
}
</script>

<style scoped>
.page-empty {
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
