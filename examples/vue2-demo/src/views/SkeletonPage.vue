<template>
  <div class="page-skeleton">
    <van-nav-bar title="el-skeleton 骨架屏" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">基础用法</div>
        <el-button @click="loading = !loading">{{ loading ? '加载完成' : '加载中' }}</el-button>
        <el-skeleton :loading="loading">
          <p>内容加载完成后的展示区域</p>
          <p>这是一段实际内容</p>
        </el-skeleton>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">多种组合</div>
        <el-button @click="loading2 = !loading2">{{ loading2 ? '加载完成' : '加载中' }}</el-button>
        <el-skeleton :loading="loading2" :rows="3" :row-width="['100%', '80%', '60%']">
          <p>完整内容展示区域</p>
          <p>包含了多行不同宽度的骨架效果</p>
          <p>行宽分别为 100%, 80%, 60%</p>
        </el-skeleton>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">动画</div>
        <el-button @click="loading3 = !loading3">{{ loading3 ? '加载完成' : '加载中' }}</el-button>
        <el-skeleton :loading="loading3" animated :rows="2">
          <p>带动画效果的骨架屏</p>
          <p>加载过渡更加平滑</p>
        </el-skeleton>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">自定义模板</div>
        <el-button @click="loading4 = !loading4">{{ loading4 ? '加载完成' : '加载中' }}</el-button>
        <el-skeleton :loading="loading4">
          <template slot="template">
            <div style="display:flex;align-items:center;gap:12px;padding:12px 0">
              <el-skeleton-item variant="circle" width="48" height="48" />
              <div style="flex:1">
                <el-skeleton-item variant="text" width="60%" height="16" />
              </div>
            </div>
            <el-skeleton-item variant="rect" width="100%" height="100" />
          </template>
          <div>
            <p style="font-weight:bold;margin:0 0 8px">用户信息</p>
            <p style="margin:0">实际加载完成后的内容展示</p>
          </div>
        </el-skeleton>
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  name: 'SkeletonPage',
  components: { [NavBar.name]: NavBar },
  data() {
    return {
      loading: true,
      loading2: true,
      loading3: true,
      loading4: true
    }
  }
}
</script>

<style scoped>
.page-skeleton {
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
