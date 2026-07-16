<template>
  <div class="page-descriptions">
    <van-nav-bar title="el-descriptions / el-descriptions-item 描述列表" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">基础用法</div>
        <el-descriptions :column="2">
          <el-descriptions-item label="姓名">张三</el-descriptions-item>
          <el-descriptions-item label="手机">13800000000</el-descriptions-item>
          <el-descriptions-item label="邮箱">zhangsan@example.com</el-descriptions-item>
          <el-descriptions-item label="地址">北京市朝阳区</el-descriptions-item>
        </el-descriptions>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">不同列数</div>
        <el-descriptions :column="3">
          <el-descriptions-item label="姓名">张三</el-descriptions-item>
          <el-descriptions-item label="手机">13800000000</el-descriptions-item>
          <el-descriptions-item label="邮箱">zhangsan@example.com</el-descriptions-item>
          <el-descriptions-item label="地址">北京市朝阳区</el-descriptions-item>
          <el-descriptions-item label="部门">技术部</el-descriptions-item>
          <el-descriptions-item label="职位">前端工程师</el-descriptions-item>
        </el-descriptions>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">带边框</div>
        <el-descriptions :column="2" border>
          <el-descriptions-item label="姓名">张三</el-descriptions-item>
          <el-descriptions-item label="手机">13800000000</el-descriptions-item>
          <el-descriptions-item label="邮箱">zhangsan@example.com</el-descriptions-item>
          <el-descriptions-item label="地址">北京市朝阳区</el-descriptions-item>
        </el-descriptions>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">不同尺寸</div>
        <p class="section-title">large</p>
        <el-descriptions :column="2" border size="large">
          <el-descriptions-item label="姓名">张三</el-descriptions-item>
          <el-descriptions-item label="手机">13800000000</el-descriptions-item>
        </el-descriptions>
        <p class="section-title">small</p>
        <el-descriptions :column="2" border size="small">
          <el-descriptions-item label="姓名">张三</el-descriptions-item>
          <el-descriptions-item label="手机">13800000000</el-descriptions-item>
        </el-descriptions>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">自定义内容</div>
        <el-descriptions :column="2" border>
          <el-descriptions-item label="姓名">张三</el-descriptions-item>
          <el-descriptions-item label="角色">
            <el-tag type="danger" size="small">管理员</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="标签">
            <el-tag size="small">前端</el-tag>
            <el-tag size="small" type="success">Vue</el-tag>
            <el-tag size="small" type="warning">React</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="评分">
            <el-rate :value="4" disabled size="16" />
          </el-descriptions-item>
        </el-descriptions>
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  name: 'DescriptionsPage',
  components: { [NavBar.name]: NavBar }
}
</script>

<style scoped>
.page-descriptions {
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
