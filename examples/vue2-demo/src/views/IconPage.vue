<template>
  <div class="page-icon">
    <van-nav-bar title="el-icon 图标" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">图标展示</div>
        <div class="icon-grid">
          <div v-for="item in iconList" :key="item" class="icon-item">
            <el-icon :name="item" />
            <span class="icon-label">{{ item }}</span>
          </div>
        </div>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">图标颜色</div>
        <div class="icon-grid">
          <div class="icon-item">
            <el-icon name="el-icon-search" color="#409eff" size="24" />
            <span class="icon-label">蓝色</span>
          </div>
          <div class="icon-item">
            <el-icon name="el-icon-edit" color="#67c23a" size="24" />
            <span class="icon-label">绿色</span>
          </div>
          <div class="icon-item">
            <el-icon name="el-icon-delete" color="#f56c6c" size="24" />
            <span class="icon-label">红色</span>
          </div>
          <div class="icon-item">
            <el-icon name="el-icon-warning" color="#e6a23c" size="24" />
            <span class="icon-label">橙色</span>
          </div>
          <div class="icon-item">
            <el-icon name="el-icon-info" color="#909399" size="24" />
            <span class="icon-label">灰色</span>
          </div>
          <div class="icon-item">
            <el-icon name="el-icon-success" color="#67c23a" size="24" />
            <span class="icon-label">成功绿</span>
          </div>
        </div>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">图标大小</div>
        <div class="icon-grid">
          <div class="icon-item">
            <el-icon name="el-icon-search" size="16" />
            <span class="icon-label">16</span>
          </div>
          <div class="icon-item">
            <el-icon name="el-icon-search" size="20" />
            <span class="icon-label">20</span>
          </div>
          <div class="icon-item">
            <el-icon name="el-icon-search" size="24" />
            <span class="icon-label">24</span>
          </div>
          <div class="icon-item">
            <el-icon name="el-icon-search" size="32" />
            <span class="icon-label">32</span>
          </div>
          <div class="icon-item">
            <el-icon name="el-icon-search" size="40" />
            <span class="icon-label">40</span>
          </div>
        </div>
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  name: 'IconPage',
  components: { [NavBar.name]: NavBar },
  data() {
    return {
      iconList: [
        'el-icon-search',
        'el-icon-edit',
        'el-icon-check',
        'el-icon-delete',
        'el-icon-message',
        'el-icon-star-on',
        'el-icon-star-off',
        'el-icon-upload',
        'el-icon-download',
        'el-icon-plus',
        'el-icon-minus',
        'el-icon-info',
        'el-icon-warning',
        'el-icon-success',
        'el-icon-error',
        'el-icon-close',
        'el-icon-arrow-left',
        'el-icon-arrow-right',
        'el-icon-arrow-up',
        'el-icon-arrow-down',
      ],
    }
  },
}
</script>

<style scoped>
.page-icon {
  background: #f7f8fa;
  min-height: 100vh;
}
.page-body {
  padding: 16px;
}
.demo-card {
  margin-bottom: 12px;
}
.icon-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
  padding: 12px 0;
  border-radius: 8px;
  background: #fafafa;
}
.icon-label {
  margin-top: 8px;
  font-size: 11px;
  color: #666;
  text-align: center;
  word-break: break-all;
  line-height: 1.3;
}
</style>
