<template>
  <div class="page-dropdown">
    <van-nav-bar title="el-dropdown 下拉菜单" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">基础用法</div>
        <p class="demo-desc">默认 hover 触发，点击菜单项触发 <code>command</code> 事件</p>
        <el-dropdown @command="handleCommand">
          <el-button type="primary">
            下拉菜单 <van-icon name="arrow-down" />
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">黄金糕</el-dropdown-item>
            <el-dropdown-item command="b">狮子头</el-dropdown-item>
            <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
            <el-dropdown-item command="d">双皮奶</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <p v-if="lastCommand" class="demo-result">上次选择: <el-tag type="info">{{ lastCommand }}</el-tag></p>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">触发方式</div>
        <p class="demo-desc">设置 <code>trigger</code> 为 <code>click</code>，点击触发</p>
        <el-dropdown trigger="click" @command="handleCommand">
          <el-button>点击触发</el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">选项一</el-dropdown-item>
            <el-dropdown-item command="b">选项二</el-dropdown-item>
            <el-dropdown-item command="c">选项三</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">下拉按钮</div>
        <p class="demo-desc">设置 <code>split-button</code> 属性，左侧按钮触发 <code>click</code> 事件，右侧箭头触发下拉</p>
        <el-dropdown split-button type="primary" @click="handleSplitClick" @command="handleCommand">
          下拉菜单
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">黄金糕</el-dropdown-item>
            <el-dropdown-item command="b">狮子头</el-dropdown-item>
            <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <p v-if="splitBtnClicked" class="demo-result">主按钮已点击</p>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">菜单项禁用</div>
        <p class="demo-desc">通过 <code>disabled</code> 属性禁用单个菜单项</p>
        <el-dropdown trigger="click">
          <el-button>禁用项</el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">可用选项</el-dropdown-item>
            <el-dropdown-item command="b" disabled>禁用选项</el-dropdown-item>
            <el-dropdown-item command="c" disabled>禁用选项二</el-dropdown-item>
            <el-dropdown-item command="d">可用选项</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">菜单分组</div>
        <p class="demo-desc">通过 <code>divided</code> 属性添加分割线</p>
        <el-dropdown trigger="click">
          <el-button>分组菜单</el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a" icon="gold-coin">黄金糕</el-dropdown-item>
            <el-dropdown-item command="b" icon="shop">狮子头</el-dropdown-item>
            <el-dropdown-item command="c" divided icon="fire">螺蛳粉</el-dropdown-item>
            <el-dropdown-item command="d" icon="smile">双皮奶</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">不自动隐藏</div>
        <p class="demo-desc">设置 <code>hide-on-click</code> 为 <code>false</code>，点击菜单项不会关闭</p>
        <el-dropdown :hide-on-click="false" trigger="click" @command="handleCommand">
          <el-button>点击选择</el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">黄金糕</el-dropdown-item>
            <el-dropdown-item command="b">狮子头</el-dropdown-item>
            <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <p v-if="lastCommand" class="demo-result">已选: <el-tag type="info">{{ lastCommand }}</el-tag></p>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">不同弹出位置</div>
        <p class="demo-desc">通过 <code>placement</code> 控制弹出方向</p>
        <div class="placement-group">
          <el-dropdown trigger="click" placement="top" @command="handleCommand">
            <el-button size="small">top</el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="top">顶部弹出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown trigger="click" placement="bottom" @command="handleCommand">
            <el-button size="small">bottom</el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="bottom">底部弹出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown trigger="click" placement="left" @command="handleCommand">
            <el-button size="small">left</el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="left">左侧弹出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown trigger="click" placement="right" @command="handleCommand">
            <el-button size="small">right</el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="right">右侧弹出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">禁用状态</div>
        <p class="demo-desc">设置 <code>disabled</code> 禁用整个下拉菜单</p>
        <el-dropdown disabled trigger="click">
          <el-button disabled>不可用</el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">黄金糕</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">自定义菜单内容</div>
        <el-dropdown trigger="click" @command="handleCommand">
          <el-button type="warning">自定义菜单</el-button>
          <el-dropdown-menu slot="dropdown" style="min-width: 200px;">
            <el-dropdown-item command="profile">
              <van-icon name="contact" style="margin-right: 6px;" />个人中心
            </el-dropdown-item>
            <el-dropdown-item command="setting">
              <van-icon name="setting" style="margin-right: 6px;" />系统设置
            </el-dropdown-item>
            <el-dropdown-item command="order">
              <van-icon name="orders" style="margin-right: 6px;" />我的订单
            </el-dropdown-item>
            <el-dropdown-item command="logout" divided>
              <van-icon name="logout" style="margin-right: 6px; color: #e74c3c;" />退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar, Icon } from 'vant'

export default {
  name: 'DropdownPage',
  components: { [NavBar.name]: NavBar, [Icon.name]: Icon },
  data() {
    return {
      lastCommand: '',
      splitBtnClicked: false,
      visibleStatus: false
    }
  },
  methods: {
    handleCommand(command) {
      this.lastCommand = command
      this.$toast('选中: ' + command)
    },
    handleSplitClick() {
      this.splitBtnClicked = true
      this.$toast('主按钮点击')
    }
  }
}
</script>

<style scoped>
.page-dropdown {
  background: #f7f8fa;
  min-height: 100vh;
}
.page-body {
  padding: 16px;
}
.demo-card {
  margin-bottom: 12px;
}
.demo-desc {
  font-size: 12px;
  color: #999;
  margin: 0 0 12px;
}
.demo-result {
  font-size: 13px;
  margin: 12px 0 0;
}
.placement-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
