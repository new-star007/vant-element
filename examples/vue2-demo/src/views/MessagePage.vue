<template>
  <div class="page-message">
    <van-nav-bar title="this.$message 消息提示" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">成功</div>
        <el-button type="success" @click="showSuccess">成功提示</el-button>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">警告</div>
        <el-button type="warning" @click="showWarning">警告提示</el-button>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">信息</div>
        <el-button type="info" @click="showInfo">信息提示</el-button>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">错误</div>
        <el-button type="danger" @click="showError">错误提示</el-button>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">普通</div>
        <el-button @click="showNormal">普通消息</el-button>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">可关闭</div>
        <el-button type="primary" @click="showClosable">可关闭消息</el-button>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">自定义时长</div>
        <el-button type="primary" @click="showDuration">自定义时长(5s)</el-button>
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  name: 'MessagePage',
  components: { [NavBar.name]: NavBar },
  methods: {
    showSuccess() {
      this.$message.success('成功提示')
    },
    showWarning() {
      this.$message.warning('警告提示')
    },
    showInfo() {
      this.$message.info('信息提示')
    },
    showError() {
      this.$message.error('错误提示')
    },
    showNormal() {
      this.$message('普通消息')
    },
    showClosable() {
      this.$message({ message: '可关闭消息', duration: 0 })
    },
    showDuration() {
      this.$message({ message: '这条消息显示5秒', duration: 5000 })
    },
  },
}
</script>

<style scoped>
.page-message {
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
