<template>
  <div class="page-tag">
    <van-nav-bar title="el-tag 标签" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">基础用法</div>
        <el-tag>default</el-tag>
        <el-tag type="success">success</el-tag>
        <el-tag type="info">info</el-tag>
        <el-tag type="warning">warning</el-tag>
        <el-tag type="danger">danger</el-tag>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">可关闭</div>
        <el-tag v-for="tag in closableTags" :key="tag.name" closable :type="tag.type" @close="handleClose(tag)">
          {{ tag.name }}
        </el-tag>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">不同尺寸</div>
        <el-tag size="small">small</el-tag>
        <el-tag size="medium">medium</el-tag>
        <el-tag size="large">large</el-tag>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">自定义颜色</div>
        <el-tag color="#409eff">蓝色标签</el-tag>
        <el-tag color="#67c23a">绿色标签</el-tag>
        <el-tag color="#e6a23c">橙色标签</el-tag>
        <el-tag color="#f56c6c">红色标签</el-tag>
        <el-tag color="#909399">灰色标签</el-tag>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">圆角</div>
        <el-tag round>圆角标签</el-tag>
        <el-tag type="primary" round>圆角 primary</el-tag>
        <el-tag type="success" round>圆角 success</el-tag>
        <el-tag type="warning" round>圆角 warning</el-tag>
        <el-tag type="danger" round>圆角 danger</el-tag>
        <el-tag type="info" round>圆角 info</el-tag>
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  name: 'TagPage',
  components: { [NavBar.name]: NavBar },
  data() {
    return {
      closableTags: [
        { name: '标签一', type: '' },
        { name: '标签二', type: 'success' },
        { name: '标签三', type: 'info' },
        { name: '标签四', type: 'warning' },
        { name: '标签五', type: 'danger' }
      ]
    }
  },
  methods: {
    handleClose(tag) {
      this.closableTags = this.closableTags.filter(t => t !== tag)
      this.$message({ message: '关闭: ' + tag.name, type: 'info' })
    }
  }
}
</script>

<style scoped>
.page-tag {
  background: #f7f8fa;
  min-height: 100vh;
}
.page-body {
  padding: 16px;
}
.demo-card {
  margin-bottom: 12px;
}
.el-tag {
  margin-right: 8px;
}
</style>
