<template>
  <div class="page-notification">
    <van-nav-bar title="this.$notify 通知" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">基础通知</div>
        <el-button type="primary" @click="showBasic">基础通知</el-button>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">成功/警告/错误</div>
        <el-button type="success" @click="showSuccess">成功</el-button>
        <el-button type="warning" @click="showWarning">警告</el-button>
        <el-button type="danger" @click="showError">错误</el-button>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">自定义时长</div>
        <el-button type="primary" @click="showDuration">持续5秒</el-button>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">自定义颜色</div>
        <el-button type="primary" @click="showCustomColor">自定义颜色</el-button>
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  name: 'NotificationPage',
  components: { [NavBar.name]: NavBar },
  methods: {
    showBasic() {
      this.$notify('通知内容')
    },
    showSuccess() {
      this.$notify.success('成功通知')
    },
    showWarning() {
      this.$notify.warning('警告通知')
    },
    showError() {
      this.$notify.error('错误通知')
    },
    showDuration() {
      this.$notify({ message: '这条通知显示5秒', duration: 5000 })
    },
    showCustomColor() {
      this.$notify({
        message: '自定义颜色通知',
        backgroundColor: '#1989fa',
        duration: 3000,
      })
    },
  },
}
</script>

<style scoped>
.page-notification {
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
