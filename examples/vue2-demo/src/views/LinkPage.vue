<template>
  <div class="page-link">
    <van-nav-bar title="el-link 文字链接" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">基础用法</div>
        <div style="display: flex; flex-wrap: wrap; gap: 16px;">
          <el-link>默认链接</el-link>
          <el-link type="primary">主要链接</el-link>
          <el-link type="success">成功链接</el-link>
          <el-link type="warning">警告链接</el-link>
          <el-link type="danger">危险链接</el-link>
          <el-link type="info">信息链接</el-link>
        </div>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">下划线</div>
        <div style="display: flex; flex-wrap: wrap; gap: 16px;">
          <el-link :underline="false">无下划线</el-link>
          <el-link type="primary" :underline="false">无下划线</el-link>
          <el-link type="primary">有下划线</el-link>
        </div>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">禁用状态</div>
        <div style="display: flex; flex-wrap: wrap; gap: 16px;">
          <el-link disabled>默认禁用</el-link>
          <el-link type="primary" disabled>主要禁用</el-link>
        </div>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">图标</div>
        <div style="display: flex; flex-wrap: wrap; gap: 16px;">
          <el-link type="primary">
            查看
            <van-icon name="eye-o" slot="icon" />
          </el-link>
          <el-link type="primary">
            编辑
            <van-icon name="edit" slot="icon" />
          </el-link>
          <el-link type="danger">
            删除
            <van-icon name="delete-o" slot="icon" />
          </el-link>
        </div>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">点击事件</div>
        <el-link type="primary" @click="handleClick">点击触发事件</el-link>
        <p class="demo-value" v-if="clicked">链接被点击了！</p>
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar, Icon } from 'vant'

export default {
  name: 'LinkPage',
  components: { [NavBar.name]: NavBar, [Icon.name]: Icon },
  data() {
    return {
      clicked: false
    }
  },
  methods: {
    handleClick() {
      this.clicked = true
    }
  }
}
</script>

<style scoped>
.page-link {
  background: #f7f8fa;
  min-height: 100vh;
}
.page-body {
  padding: 16px;
}
.demo-card {
  margin-bottom: 12px;
}
.demo-value {
  margin-top: 12px;
  color: #409eff;
  font-size: 14px;
}
</style>
