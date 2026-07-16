<template>
  <div class="page-badge">
    <van-nav-bar title="el-badge 徽标" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">基础用法</div>
        <el-badge value="3">
          <el-button>消息</el-button>
        </el-badge>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">最大值</div>
        <el-badge value="100" max="99">
          <el-button>消息</el-button>
        </el-badge>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">小圆点</div>
        <el-badge is-dot>
          <el-button>消息</el-button>
        </el-badge>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">隐藏</div>
        <el-badge :hidden="badgeHidden" value="3">
          <el-button>消息</el-button>
        </el-badge>
        <el-button size="mini" @click="badgeHidden = !badgeHidden">{{ badgeHidden ? '显示' : '隐藏' }}徽标</el-button>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">自定义颜色</div>
        <el-badge value="3" color="#67c23a">
          <el-button>绿色</el-button>
        </el-badge>
        <el-badge value="3" color="#e6a23c">
          <el-button>橙色</el-button>
        </el-badge>
        <el-badge value="3" color="#909399">
          <el-button>灰色</el-button>
        </el-badge>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">不同类型</div>
        <el-badge value="3" type="danger">
          <el-button>danger</el-button>
        </el-badge>
        <el-badge value="3" type="primary">
          <el-button>primary</el-button>
        </el-badge>
        <el-badge value="3" type="success">
          <el-button>success</el-button>
        </el-badge>
        <el-badge value="3" type="warning">
          <el-button>warning</el-button>
        </el-badge>
        <el-badge value="3" type="info">
          <el-button>info</el-button>
        </el-badge>
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  name: 'BadgePage',
  components: { [NavBar.name]: NavBar },
  data() {
    return {
      badgeHidden: false
    }
  }
}
</script>

<style scoped>
.page-badge {
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

<style>
.demo-card .van-cell__value {
  padding-top: 8px;
  padding-bottom: 8px;
}
</style>
