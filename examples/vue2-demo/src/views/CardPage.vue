<template>
  <div class="page-card">
    <van-nav-bar title="el-card 卡片" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">基础卡片</div>
        <p>这是一张基础卡片，没有任何额外配置。</p>
        <p>可以直接在 el-card 中放置内容。</p>
      </el-card>

      <el-card class="demo-card" header="卡片标题">
        <p>通过 header 属性设置卡片标题。</p>
        <p>标题会显示在卡片顶部区域。</p>
      </el-card>

      <el-card class="demo-card" header="带描述卡片" description="这是卡片的描述信息，显示在标题下方">
        <p>通过 description 属性可以添加描述文本。</p>
        <p>描述信息会显示在标题和内容之间。</p>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">
          <span>插槽标题</span>
          <el-button type="primary" size="small" style="float: right;">操作</el-button>
        </div>
        <p>通过 slot="header" 可以自定义标题区域。</p>
        <p>可以在标题区域放置按钮或其他组件。</p>
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  name: 'CardPage',
  components: { [NavBar.name]: NavBar },
}
</script>

<style scoped>
.page-card {
  background: #f7f8fa;
  min-height: 100vh;
}
.page-body {
  padding: 16px;
}
.demo-card {
  margin-bottom: 12px;
}
.demo-card p {
  margin: 4px 0;
  font-size: 14px;
  color: #333;
  line-height: 1.6;
}
</style>
