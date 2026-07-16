<template>
  <div class="page-alert">
    <van-nav-bar title="el-alert 提示" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">基本用法</div>
        <el-alert title="成功提示" type="success" />
        <el-alert title="警告提示" type="warning" />
        <el-alert title="信息提示" type="info" />
        <el-alert title="错误提示" type="error" />
      </el-card>

      <el-card class="demo-card">
        <div slot="header">带描述</div>
        <el-alert title="成功提示" type="success" description="这是一条成功的描述信息，用于补充说明" />
        <el-alert title="警告提示" type="warning" description="这是一条警告的描述信息，请用户注意" />
      </el-card>

      <el-card class="demo-card">
        <div slot="header">图标</div>
        <el-alert title="成功提示" type="success" show-icon />
        <el-alert title="警告提示" type="warning" show-icon />
        <el-alert title="信息提示" type="info" show-icon />
        <el-alert title="错误提示" type="error" show-icon />
      </el-card>

      <el-card class="demo-card">
        <div slot="header">居中</div>
        <el-alert title="成功提示" type="success" center show-icon />
        <el-alert title="错误提示" type="error" center show-icon />
      </el-card>

      <el-card class="demo-card">
        <div slot="header">可关闭</div>
        <el-alert title="可关闭的提示" type="success" closable />
        <el-alert title="不可关闭的提示" type="warning" :closable="false" />
      </el-card>

      <el-card class="demo-card">
        <div slot="header">无标题</div>
        <el-alert type="success" show-icon description="只有描述没有标题的提示" />
        <el-alert type="warning" show-icon description="纯描述信息" />
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  name: 'AlertPage',
  components: { [NavBar.name]: NavBar },
}
</script>

<style scoped>
.page-alert {
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
