<template>
  <div class="page-backtop">
    <van-nav-bar title="el-backtop 回到顶部" left-arrow fixed placeholder @click-left="$router.push('/home')" />

    <van-notice-bar left-icon="info-o" text="当前模式" mode="link">
      <template #left-icon>
        <van-icon :name="mode === 'basic' ? 'arrow-down' : 'setting-o'" />
      </template>
      当前: {{ mode === 'basic' ? '基础用法' : '自定义位置' }}
    </van-notice-bar>

    <div class="mode-switch">
      <van-button
        :type="mode === 'basic' ? 'primary' : 'default'"
        size="small"
        @click="mode = 'basic'"
      >基础用法</van-button>
      <van-button
        :type="mode === 'custom' ? 'primary' : 'default'"
        size="small"
        @click="mode = 'custom'"
      >自定义位置</van-button>
    </div>

    <div v-show="mode === 'basic'" class="page-body">
      <el-card class="demo-card">
        <div slot="header">基础用法</div>
        <p style="color: #909399; font-size: 14px;">向下滚动页面，右下角会出现回到顶部按钮</p>
        <p v-for="i in 20" :key="i" style="padding: 8px 0; border-bottom: 1px solid #eee;">内容行 {{ i }}</p>
      </el-card>
    </div>

    <div v-show="mode === 'custom'" class="page-body">
      <el-card class="demo-card">
        <div slot="header">自定义位置</div>
        <p style="color: #909399; font-size: 14px;">按钮出现在右上角（距离顶部 200px 时显示）</p>
        <p v-for="i in 20" :key="'a' + i" style="padding: 8px 0; border-bottom: 1px solid #eee;">内容行 {{ i }}</p>
      </el-card>
    </div>

    <el-backtop
      v-if="mode === 'basic'"
      :visibility-height="100"
      :bottom="60"
    />
    <el-backtop
      v-if="mode === 'custom'"
      :visibility-height="200"
      :right="20"
      :bottom="60"
    />
  </div>
</template>

<script>
import { NavBar, NoticeBar, Button, Icon } from 'vant'

export default {
  name: 'BacktopPage',
  components: { [NavBar.name]: NavBar, [NoticeBar.name]: NoticeBar, [Button.name]: Button, [Icon.name]: Icon },
  data() {
    return {
      mode: 'basic'
    }
  }
}
</script>

<style scoped>
.page-backtop {
  background: #f7f8fa;
  min-height: 200vh;
}
.mode-switch {
  display: flex;
  gap: 12px;
  justify-content: center;
  padding: 12px 16px;
}
.page-body {
  padding: 0 16px 16px;
}
.demo-card {
  margin-bottom: 12px;
}
</style>
