<template>
  <div class="page-upload">
    <van-nav-bar title="el-upload 上传" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">基础上传</div>
        <el-upload v-model="fileList1" action="#" />
        <div class="demo-value">文件列表: {{ fileList1 }}</div>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">限制数量 (max-count=3)</div>
        <el-upload v-model="fileList2" action="#" :max-count="3" />
        <div class="demo-value">最多上传3个文件</div>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">限制大小 (max-size=1MB)</div>
        <el-upload v-model="fileList3" action="#" :max-size="1" />
        <div class="demo-value">单文件不超过 1MB</div>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">禁用 (disabled)</div>
        <el-upload v-model="fileList4" action="#" disabled />
      </el-card>

      <el-card class="demo-card">
        <div slot="header">预览 (preview-size)</div>
        <el-upload v-model="fileList5" action="#" :preview-size="60" />
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  name: 'UploadPage',
  components: { [NavBar.name]: NavBar },
  data() {
    return {
      fileList1: [],
      fileList2: [],
      fileList3: [],
      fileList4: [],
      fileList5: [],
    }
  },
}
</script>

<style scoped>
.page-upload {
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
  margin-top: 8px;
  font-size: 12px;
  color: #969799;
}
</style>
