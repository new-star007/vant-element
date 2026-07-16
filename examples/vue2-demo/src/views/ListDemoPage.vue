<template>
  <div class="page-list-demo">
    <van-nav-bar title="el-list / el-list-item 列表" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">基础列表</div>
        <el-list :data="basicData">
          <el-list-item label="选项" prop="value" />
        </el-list>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">索引背景</div>
        <el-list :data="basicData">
          <el-list-item type="index" />
          <el-list-item label="选项" prop="value" />
        </el-list>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">头部栏（类似尾部）</div>
        <el-list :data="headerData">
          <el-list-item type="header">
            <template slot-scope="{ row }">
              <van-tag type="primary">{{ row.status }}</van-tag>
              <span style="font-weight:600;margin-left:8px">{{ row.name }}</span>
            </template>
          </el-list-item>
          <el-list-item label="金额" prop="amount" />
          <el-list-item label="时间" prop="time" />
        </el-list>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">选择框（位于 body 左侧）</div>
        <el-list :data="selectData" @selection-change="onSelectionChange">
          <el-list-item type="selection" />
          <el-list-item type="index" />
          <el-list-item label="姓名" prop="name" />
          <el-list-item label="部门" prop="dept" />
        </el-list>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">综合示例：索引 + 头部 + 选择 + 尾部</div>
        <el-list :data="fullData" @selection-change="onSelectionChange">
          <el-list-item type="selection" />
          <el-list-item type="index" />
          <el-list-item type="header">
            <template slot-scope="{ row }">
              <van-icon :name="row.icon" style="margin-right:6px;font-size:16px" />
              <span style="font-weight:500">{{ row.name }}</span>
            </template>
          </el-list-item>
          <el-list-item label="角色" prop="role">
            <template slot-scope="{ row }">
              <van-tag :type="row.role === '管理员' ? 'danger' : 'primary'" size="small">{{ row.role }}</van-tag>
            </template>
          </el-list-item>
          <el-list-item label="状态" prop="status">
            <template slot-scope="{ row }">
              <van-tag :type="row.status === '启用' ? 'success' : 'default'" size="small">{{ row.status }}</van-tag>
            </template>
          </el-list-item>
          <el-list-item label="评分" prop="rate" />
          <el-list-item type="footer">
            <template slot-scope="{ row }">
              <van-button size="mini" type="primary" @click.stop="handleEdit(row)">编辑</van-button>
              <van-button size="mini" type="danger" @click.stop="handleDelete(row)">删除</van-button>
            </template>
          </el-list-item>
        </el-list>
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar, Tag, Icon } from 'vant'

export default {
  name: 'ListDemoPage',
  components: { [NavBar.name]: NavBar, [Tag.name]: Tag, [Icon.name]: Icon },
  data() {
    return {
      basicData: [
        { value: '选项 A' },
        { value: '选项 B' },
        { value: '选项 C' },
        { value: '选项 D' }
      ],
      headerData: [
        { name: '笔记本电脑', status: '已发货', amount: '¥5999', time: '2025-06-01' },
        { name: '机械键盘', status: '待发货', amount: '¥399', time: '2025-06-03' },
        { name: '无线鼠标', status: '已完成', amount: '¥129', time: '2025-05-28' }
      ],
      selectData: [
        { name: '张三', dept: '技术部' },
        { name: '李四', dept: '产品部' },
        { name: '王五', dept: '设计部' },
        { name: '赵六', dept: '市场部' }
      ],
      fullData: [
        { name: '张伟', icon: 'user-o', role: '管理员', status: '启用', rate: 4.5 },
        { name: '李芳', icon: 'user-o', role: '编辑', status: '启用', rate: 3.8 },
        { name: '王强', icon: 'user-o', role: '访客', status: '禁用', rate: 4.2 },
        { name: '赵敏', icon: 'user-o', role: '管理员', status: '启用', rate: 4.9 }
      ]
    }
  },
  methods: {
    onSelectionChange(rows) {
      this.$message({ message: '已选择 ' + rows.length + ' 项', type: 'success' })
    },
    handleEdit(row) {
      this.$message({ message: '编辑: ' + row.name, type: 'info' })
    },
    handleDelete(row) {
      this.$message({ message: '删除: ' + row.name, type: 'warning' })
    }
  }
}
</script>

<style scoped>
.page-list-demo {
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
