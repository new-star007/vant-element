<template>
  <div class="page-image">
    <van-nav-bar title="el-image 图片" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">基础用法</div>
        <div class="img-demo">
          <el-image
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            style="width: 200px; height: 200px;"
          />
        </div>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">填充模式 (fit)</div>
        <div class="img-row">
          <div v-for="mode in fitModes" :key="mode" class="img-box">
            <span class="img-label">{{ mode }}</span>
            <el-image
              src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
              :fit="mode"
              style="width: 120px; height: 120px; background: #f0f0f0;"
            />
          </div>
        </div>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">圆角图片</div>
        <div class="img-row">
          <el-image
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            round
            style="width: 120px; height: 120px;"
          />
          <el-image
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            round
            style="width: 80px; height: 80px;"
          />
          <el-image
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            round
            style="width: 60px; height: 60px;"
          />
        </div>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">懒加载</div>
        <el-image
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          lazy
          style="width: 200px; height: 200px;"
        />
        <p class="img-hint">下滑页面即可看到懒加载效果</p>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">自定义宽高</div>
        <div class="img-row">
          <el-image
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            width="150"
            height="100"
          />
          <el-image
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            width="100"
            height="150"
          />
          <el-image
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            width="200"
            height="80"
          />
        </div>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">加载失败</div>
        <div class="img-row">
          <el-image
            src="https://example.com/broken-image.jpg"
            style="width: 200px; height: 200px;"
          />
          <el-image
            src="https://invalid.url/non-existent.png"
            style="width: 200px; height: 200px;"
          >
            <div slot="error" class="img-error-slot">
              <el-icon name="el-icon-warning" color="#999" size="24" />
              <span>图片加载失败</span>
            </div>
          </el-image>
        </div>
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  name: 'ImagePage',
  components: { [NavBar.name]: NavBar },
  data() {
    return {
      fitModes: ['fill', 'contain', 'cover', 'none', 'scale-down'],
    }
  },
}
</script>

<style scoped>
.page-image {
  background: #f7f8fa;
  min-height: 100vh;
}
.page-body {
  padding: 16px;
}
.demo-card {
  margin-bottom: 12px;
}
.img-demo {
  display: flex;
  justify-content: center;
}
.img-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
}
.img-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.img-label {
  margin-bottom: 6px;
  font-size: 12px;
  color: #666;
}
.img-hint {
  margin-top: 8px;
  font-size: 12px;
  color: #999;
  text-align: center;
}
.img-error-slot {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 8px;
  color: #999;
  font-size: 14px;
}
</style>
