<template>
  <div class="page-tooltip">
    <van-nav-bar title="el-tooltip 文字提示" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">基础用法</div>
        <el-tooltip content="这是一段提示文字" placement="top">
          <el-button>上方提示</el-button>
        </el-tooltip>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">不同位置</div>
        <div class="placement-group">
          <el-tooltip content="top 提示" placement="top">
            <el-button>top</el-button>
          </el-tooltip>
          <el-tooltip content="bottom 提示" placement="bottom">
            <el-button>bottom</el-button>
          </el-tooltip>
          <el-tooltip content="left 提示" placement="left">
            <el-button>left</el-button>
          </el-tooltip>
          <el-tooltip content="right 提示" placement="right">
            <el-button>right</el-button>
          </el-tooltip>
        </div>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">自定义内容</div>
        <el-tooltip placement="top">
          <div slot="content">
            <p style="margin: 0; font-weight: 600;">自定义标题</p>
            <p style="margin: 4px 0 0;">这是一段自定义内容</p>
          </div>
          <el-button>自定义内容</el-button>
        </el-tooltip>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">禁用状态</div>
        <el-tooltip content="不会显示" placement="top" disabled>
          <el-button disabled>禁用提示</el-button>
        </el-tooltip>
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  name: 'TooltipPage',
  components: { [NavBar.name]: NavBar }
}
</script>

<style scoped>
.page-tooltip {
  background: #f7f8fa;
  min-height: 100vh;
}
.page-body {
  padding: 16px;
}
.demo-card {
  margin-bottom: 12px;
}
.placement-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
