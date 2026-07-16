<template>
  <div class="page-pagination">
    <van-nav-bar title="el-pagination 分页" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">基础分页</div>
        <el-pagination
          :total="100"
          :page-size="10"
          :current-page.sync="currentPage"
          @current-change="handleCurrentChange"
        />
      </el-card>

      <el-card class="demo-card">
        <div slot="header">显示总数</div>
        <el-pagination
          :total="85"
          :page-size="10"
          :current-page.sync="currentPage2"
          show-total
          @current-change="handleCurrentChange"
        />
      </el-card>

      <el-card class="demo-card">
        <div slot="header">不同尺寸</div>
        <p class="section-title">默认</p>
        <el-pagination :total="50" :page-size="5" :current-page.sync="currentPage3" />
        <p class="section-title">small</p>
        <el-pagination :total="50" :page-size="5" :current-page.sync="currentPage4" small />
      </el-card>

      <el-card class="demo-card">
        <div slot="header">禁用</div>
        <el-pagination
          :total="120"
          :page-size="10"
          :current-page="1"
          disabled
        />
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  name: 'PaginationPage',
  components: { [NavBar.name]: NavBar },
  data() {
    return {
      currentPage: 1,
      currentPage2: 1,
      currentPage3: 1,
      currentPage4: 1
    }
  },
  methods: {
    handleCurrentChange(page) {
      this.$message({ message: '切换到第 ' + page + ' 页', type: 'info', duration: 1500 })
    }
  }
}
</script>

<style scoped>
.page-pagination {
  background: #f7f8fa;
  min-height: 100vh;
}
.page-body {
  padding: 16px;
}
.demo-card {
  margin-bottom: 12px;
}
.section-title {
  margin: 8px 0;
  font-size: 12px;
  color: #909399;
}
</style>
