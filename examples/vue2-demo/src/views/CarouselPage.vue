<template>
  <div class="page-carousel">
    <van-nav-bar title="el-carousel / el-carousel-item 走马灯" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">基础用法</div>
        <el-carousel height="150px">
          <el-carousel-item v-for="i in 4" :key="i">
            <div class="carousel-item" :style="{ background: colors[i - 1] }">Slide {{ i }}</div>
          </el-carousel-item>
        </el-carousel>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">自动轮播</div>
        <el-carousel height="150px" autoplay>
          <el-carousel-item v-for="i in 4" :key="i">
            <div class="carousel-item" :style="{ background: colors[i - 1] }">Slide {{ i }}</div>
          </el-carousel-item>
        </el-carousel>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">指示器位置</div>
        <p class="section-title">outside</p>
        <el-carousel height="120px" indicator-position="outside">
          <el-carousel-item v-for="i in 4" :key="i">
            <div class="carousel-item" :style="{ background: colors[i - 1] }">{{ i }}</div>
          </el-carousel-item>
        </el-carousel>
        <p class="section-title">none</p>
        <el-carousel height="120px" indicator-position="none">
          <el-carousel-item v-for="i in 3" :key="i">
            <div class="carousel-item" :style="{ background: colors[i + 1] }">{{ i }}</div>
          </el-carousel-item>
        </el-carousel>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">切换间隔</div>
        <el-carousel height="150px" :interval="2000" autoplay>
          <el-carousel-item v-for="i in 4" :key="i">
            <div class="carousel-item" :style="{ background: colors[i - 1] }">间隔 2s</div>
          </el-carousel-item>
        </el-carousel>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">纵向</div>
        <el-carousel height="200px" direction="vertical" autoplay>
          <el-carousel-item v-for="i in 4" :key="i">
            <div class="carousel-item" :style="{ background: colors[i - 1] }">纵向 {{ i }}</div>
          </el-carousel-item>
        </el-carousel>
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  name: 'CarouselPage',
  components: { [NavBar.name]: NavBar },
  data() {
    return {
      colors: ['#409eff', '#67c23a', '#e6a23c', '#f56c6c', '#909399', '#b37feb']
    }
  }
}
</script>

<style scoped>
.page-carousel {
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
.carousel-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  border-radius: 4px;
}
</style>
