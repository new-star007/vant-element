<template>
  <div class="page-drawer">
    <van-nav-bar title="el-drawer 抽屉" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">基础用法</div>
        <el-button @click="visible1 = true">打开抽屉</el-button>
        <el-drawer v-model="visible1" title="标题">
          <p>这是一段内容</p>
          <p>这是抽屉的内容区域</p>
        </el-drawer>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">不同方向</div>
        <el-button @click="visible2 = true">右侧抽屉</el-button>
        <el-button @click="visible3 = true">左侧抽屉</el-button>
        <el-button @click="visible4 = true">上方抽屉</el-button>
        <el-button @click="visible5 = true">下方抽屉</el-button>
        <el-drawer v-model="visible2" title="右侧" direction="rtl">
          <p>从右侧滑出</p>
        </el-drawer>
        <el-drawer v-model="visible3" title="左侧" direction="ltr">
          <p>从左侧滑出</p>
        </el-drawer>
        <el-drawer v-model="visible4" title="上方" direction="ttb">
          <p>从上方滑出</p>
        </el-drawer>
        <el-drawer v-model="visible5" title="下方" direction="btt">
          <p>从下方滑出</p>
        </el-drawer>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">自定义大小</div>
        <el-button @click="visible6 = true">宽度 300px</el-button>
        <el-drawer v-model="visible6" title="自定义宽度" size="300px">
          <p>抽屉宽度为 300px</p>
        </el-drawer>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">嵌套内容</div>
        <el-button @click="visible7 = true">打开</el-button>
        <el-drawer v-model="visible7" title="嵌套内容">
          <div>
            <p>可以在抽屉中放置任意内容</p>
            <el-input placeholder="输入框" />
            <el-button type="primary" style="margin-top: 12px">提交</el-button>
          </div>
        </el-drawer>
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  name: 'DrawerPage',
  components: { [NavBar.name]: NavBar },
  data() {
    return {
      visible1: false,
      visible2: false,
      visible3: false,
      visible4: false,
      visible5: false,
      visible6: false,
      visible7: false
    }
  }
}
</script>

<style scoped>
.page-drawer {
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
