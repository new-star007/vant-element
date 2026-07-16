<template>
  <div class="page-collapse">
    <van-nav-bar title="el-collapse / el-collapse-item 折叠面板" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">基础用法</div>
        <el-collapse v-model="activeNames" accordion>
          <el-collapse-item title="面板一" name="1">
            <div>内容一：这是折叠面板的内容区域</div>
          </el-collapse-item>
          <el-collapse-item title="面板二" name="2">
            <div>内容二：展示更多信息</div>
          </el-collapse-item>
          <el-collapse-item title="面板三" name="3">
            <div>内容三：可以放置任意内容</div>
          </el-collapse-item>
        </el-collapse>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">手风琴模式</div>
        <el-collapse v-model="accordionActive" accordion>
          <el-collapse-item title="标题 A" name="a">
            <div>手风琴模式每次只展开一个面板</div>
          </el-collapse-item>
          <el-collapse-item title="标题 B" name="b">
            <div>点击其他面板会自动关闭当前面板</div>
          </el-collapse-item>
          <el-collapse-item title="标题 C" name="c">
            <div>适合层级较少的内容展示</div>
          </el-collapse-item>
        </el-collapse>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">自定义标题</div>
        <el-collapse v-model="customActive" accordion>
          <el-collapse-item name="x">
            <template slot="title">
              <span style="color:#409eff">自定义标题 <el-tag size="mini" type="primary">NEW</el-tag></span>
            </template>
            <div>使用 slot="title" 可以自定义标题区域</div>
          </el-collapse-item>
          <el-collapse-item name="y">
            <template slot="title">
              <el-icon name="el-icon-star-on" style="margin-right:4px" />
              <span>带图标的标题</span>
            </template>
            <div>可以在标题中嵌入图标、标签等元素</div>
          </el-collapse-item>
        </el-collapse>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">禁用</div>
        <el-collapse v-model="disabledActive" accordion>
          <el-collapse-item title="可用的面板" name="a">
            <div>此面板可正常展开</div>
          </el-collapse-item>
          <el-collapse-item title="禁用的面板" name="b" disabled>
            <div>此面板已被禁用，无法展开</div>
          </el-collapse-item>
          <el-collapse-item title="正常的面板" name="c">
            <div>正常交互的面板</div>
          </el-collapse-item>
        </el-collapse>
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  name: 'CollapsePage',
  components: { [NavBar.name]: NavBar },
  data() {
    return {
      activeNames: '1',
      accordionActive: 'a',
      customActive: 'x',
      disabledActive: 'a'
    }
  }
}
</script>

<style scoped>
.page-collapse {
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
