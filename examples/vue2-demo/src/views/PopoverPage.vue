<template>
  <div class="page-popover">
    <van-nav-bar title="el-popover 弹出框" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">基础用法</div>
        <el-popover placement="bottom" title="提示" trigger="click" :visible.sync="popoverVisible1">
          <div>这是 popover 的内容</div>
          <el-button slot="reference">点击触发</el-button>
        </el-popover>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">不同触发方式</div>
        <el-popover placement="bottom" trigger="hover" title="悬浮提示">
          <div>hover 触发的内容</div>
          <el-button slot="reference">Hover 触发</el-button>
        </el-popover>
        <el-popover placement="bottom" trigger="click" title="点击提示">
          <div>click 触发的内容</div>
          <el-button slot="reference">点击触发</el-button>
        </el-popover>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">标题</div>
        <el-popover placement="bottom" title="这是标题" trigger="click">
          <div>带有标题的 popover 内容</div>
          <el-button slot="reference">显示标题</el-button>
        </el-popover>
        <el-popover placement="bottom" trigger="click">
          <div>没有标题的 popover</div>
          <el-button slot="reference">无标题</el-button>
        </el-popover>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">自定义内容</div>
        <el-popover placement="bottom" trigger="click" width="200">
          <div class="rich-content">
            <p style="font-weight: 600; margin-bottom: 8px;">自定义区域</p>
            <el-tag type="success">标签1</el-tag>
            <el-tag type="warning">标签2</el-tag>
            <el-tag type="danger">标签3</el-tag>
            <p style="margin-top: 8px; font-size: 12px; color: #999;">支持任意自定义内容</p>
          </div>
          <el-button slot="reference">自定义内容</el-button>
        </el-popover>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">弹出位置</div>
        <div class="placement-group">
          <el-popover placement="top" trigger="click" title="顶部">
            <div>top 弹出内容</div>
            <el-button slot="reference">top</el-button>
          </el-popover>
          <el-popover placement="bottom" trigger="click" title="底部">
            <div>bottom 弹出内容</div>
            <el-button slot="reference">bottom</el-button>
          </el-popover>
          <el-popover placement="left" trigger="click" title="左侧">
            <div>left 弹出内容</div>
            <el-button slot="reference">left</el-button>
          </el-popover>
          <el-popover placement="right" trigger="click" title="右侧">
            <div>right 弹出内容</div>
            <el-button slot="reference">right</el-button>
          </el-popover>
        </div>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">深色风格 (effect=dark)</div>
        <el-popover placement="bottom" trigger="click" effect="dark">
          <div>深色背景的 popover 内容</div>
          <el-button slot="reference">深色弹窗</el-button>
        </el-popover>
        <el-popover placement="bottom" trigger="click" effect="dark" title="深色标题">
          <div>带有标题的深色 popover</div>
          <el-button slot="reference">深色+标题</el-button>
        </el-popover>
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  name: 'PopoverPage',
  components: { [NavBar.name]: NavBar },
  data() {
    return {
      popoverVisible1: false,
    }
  },
}
</script>

<style scoped>
.page-popover {
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
.rich-content {
  padding: 4px 0;
}
</style>
