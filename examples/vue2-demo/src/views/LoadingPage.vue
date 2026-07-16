<template>
  <div class="page-loading">
    <van-nav-bar title="this.$loading 加载中" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">文字加载</div>
        <el-button type="primary" @click="showLoading">显示加载</el-button>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">自定义图标</div>
        <el-button type="success" @click="showCustomLoading">自定义加载</el-button>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">全屏加载</div>
        <el-button type="warning" @click="showFullLoading">全屏加载</el-button>
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  name: 'LoadingPage',
  components: { [NavBar.name]: NavBar },
  methods: {
    showLoading() {
      const loading = this.$loading({ text: '加载中...' })
      setTimeout(() => {
        loading.close()
      }, 2000)
    },
    showCustomLoading() {
      const loading = this.$loading({ text: '自定义加载中...' })
      setTimeout(() => {
        loading.close()
      }, 2000)
    },
    showFullLoading() {
      const loading = this.$loading({ text: '全屏加载中...' })
      setTimeout(() => {
        loading.close()
      }, 2000)
    },
  },
}
</script>

<style scoped>
.page-loading {
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
