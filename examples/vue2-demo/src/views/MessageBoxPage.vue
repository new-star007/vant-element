<template>
  <div class="page-messagebox">
    <van-nav-bar title="this.$alert / $confirm / $prompt 弹框" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">$alert</div>
        <el-button type="primary" @click="showAlert">打开 Alert</el-button>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">$confirm</div>
        <el-button type="success" @click="showConfirm">打开 Confirm</el-button>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">$prompt</div>
        <el-button type="warning" @click="showPrompt">打开 Prompt</el-button>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">$msgbox</div>
        <el-button type="info" @click="showMsgbox">打开 Msgbox</el-button>
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  name: 'MessageBoxPage',
  components: { [NavBar.name]: NavBar },
  methods: {
    showAlert() {
      this.$alert('这是提示内容', '标题')
    },
    showConfirm() {
      this.$confirm('确定执行操作吗？', '确认').then(() => {
        this.$message.success('已确认')
      }).catch(() => {
        this.$message.info('已取消')
      })
    },
    showPrompt() {
      this.$prompt('请输入内容', '提示').then(({ value }) => {
        this.$message.success('输入内容: ' + value)
      }).catch(() => {
        this.$message.info('已取消')
      })
    },
    showMsgbox() {
      this.$msgbox({
        title: '自定义',
        message: '消息',
        showCancelButton: true,
        confirmButtonText: '好的',
        cancelButtonText: '算了',
      }).then(() => {
        this.$message.success('已确认')
      }).catch(() => {
        this.$message.info('已取消')
      })
    },
  },
}
</script>

<style scoped>
.page-messagebox {
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
