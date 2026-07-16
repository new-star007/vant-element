<template>
  <div class="page-tabs">
    <van-nav-bar title="el-tabs / el-tab-pane 标签页" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">基础用法</div>
        <el-tabs v-model="activeTab">
          <el-tab-pane label="用户管理" name="first">用户管理内容</el-tab-pane>
          <el-tab-pane label="角色管理" name="second">角色管理内容</el-tab-pane>
          <el-tab-pane label="权限管理" name="third">权限管理内容</el-tab-pane>
        </el-tabs>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">卡片风格</div>
        <el-tabs v-model="cardTab" type="card">
          <el-tab-pane label="Tab A" name="a">卡片风格内容 A</el-tab-pane>
          <el-tab-pane label="Tab B" name="b">卡片风格内容 B</el-tab-pane>
          <el-tab-pane label="Tab C" name="c">卡片风格内容 C</el-tab-pane>
        </el-tabs>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">可关闭</div>
        <el-tabs v-model="closableTab" closable @tab-remove="handleTabRemove">
          <el-tab-pane v-for="tab in closableTabs" :key="tab.name" :label="tab.label" :name="tab.name">
            {{ tab.content }}
          </el-tab-pane>
        </el-tabs>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">禁用</div>
        <el-tabs v-model="disabledTab">
          <el-tab-pane label="可用标签" name="a">此标签页可用</el-tab-pane>
          <el-tab-pane label="禁用标签" name="b" disabled>此标签页已禁用</el-tab-pane>
          <el-tab-pane label="可用标签" name="c">此标签页可用</el-tab-pane>
        </el-tabs>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">不同位置</div>
        <p class="section-title">left</p>
        <el-tabs v-model="posTab" tab-position="left" style="height:100px">
          <el-tab-pane label="左侧 A" name="l1">左侧内容 A</el-tab-pane>
          <el-tab-pane label="左侧 B" name="l2">左侧内容 B</el-tab-pane>
          <el-tab-pane label="左侧 C" name="l3">左侧内容 C</el-tab-pane>
        </el-tabs>
        <p class="section-title">bottom</p>
        <el-tabs v-model="posTab2" tab-position="bottom">
          <el-tab-pane label="底部 A" name="b1">底部内容 A</el-tab-pane>
          <el-tab-pane label="底部 B" name="b2">底部内容 B</el-tab-pane>
        </el-tabs>
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  name: 'TabsPage',
  components: { [NavBar.name]: NavBar },
  data() {
    return {
      activeTab: 'first',
      cardTab: 'a',
      closableTab: 'tab1',
      closableTabs: [
        { name: 'tab1', label: '标签一', content: '标签一内容' },
        { name: 'tab2', label: '标签二', content: '标签二内容' },
        { name: 'tab3', label: '标签三', content: '标签三内容' }
      ],
      disabledTab: 'a',
      posTab: 'l1',
      posTab2: 'b1'
    }
  },
  methods: {
    handleTabRemove(name) {
      this.closableTabs = this.closableTabs.filter(t => t.name !== name)
      if (this.closableTab === name) {
        this.closableTab = this.closableTabs[0] ? this.closableTabs[0].name : ''
      }
    }
  }
}
</script>

<style scoped>
.page-tabs {
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
