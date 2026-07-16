<template>
  <div class="page-list-page">
    <van-nav-bar title="el-list-page 列表页" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <van-tabs v-model="activeTab" sticky offset-top="46">
      <van-tab title="基础列表页">
        <el-list-page
          ref="listPage"
          :fetch="fetchBasicList"
          :page-size="5"
          border
          stripe
          @row-click="handleRowClick"
        >
          <el-list-item type="index" />
          <el-list-item prop="name" label="名称" />
          <el-list-item prop="category" label="分类" />
          <el-list-item prop="price" label="价格" />
        </el-list-page>
      </van-tab>
      <van-tab title="带搜索">
        <div style="padding:12px 16px 0">
          <el-input v-model="searchQuery" placeholder="搜索名称" prefix-icon="el-icon-search" clearable @input="handleSearch" />
        </div>
        <el-list-page
          ref="searchList"
          :fetch="fetchSearchList"
          :page-size="5"
          border
          stripe
          @row-click="handleRowClick"
        >
          <el-list-item type="index" />
          <el-list-item prop="name" label="名称" />
          <el-list-item prop="category" label="分类" />
          <el-list-item prop="price" label="价格">
            <template slot-scope="{ row }">
              <el-tag type="danger" size="small">¥{{ row.price }}</el-tag>
            </template>
          </el-list-item>
        </el-list-page>
      </van-tab>
      <van-tab title="带操作按钮">
        <el-list-page
          ref="actionList"
          :fetch="fetchActionList"
          :page-size="5"
          border
          stripe
        >
          <el-list-item type="index" />
          <el-list-item prop="name" label="名称" />
          <el-list-item prop="category" label="分类" />
          <el-list-item prop="price" label="价格" />
          <el-list-item type="footer" label="操作">
            <template slot-scope="{ row }">
              <el-button type="primary" size="mini" @click.stop="handleEdit(row)">编辑</el-button>
              <el-button type="danger" size="mini" @click.stop="handleDelete(row)">删除</el-button>
            </template>
          </el-list-item>
        </el-list-page>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { NavBar, Tab, Tabs } from 'vant'

const mockProducts = [
  { id: 1, name: '笔记本电脑', category: '电子产品', price: 5999 },
  { id: 2, name: '机械键盘', category: '外设', price: 399 },
  { id: 3, name: '无线鼠标', category: '外设', price: 129 },
  { id: 4, name: '显示器', category: '电子产品', price: 1999 },
  { id: 5, name: '耳机', category: '音频', price: 299 },
  { id: 6, name: '平板电脑', category: '电子产品', price: 3499 },
  { id: 7, name: '手机', category: '电子产品', price: 4999 },
  { id: 8, name: '移动电源', category: '配件', price: 99 },
  { id: 9, name: 'U盘', category: '存储', price: 79 },
  { id: 10, name: '摄像头', category: '外设', price: 199 },
  { id: 11, name: '打印机', category: '办公', price: 899 },
  { id: 12, name: '路由器', category: '网络', price: 249 }
]

export default {
  name: 'ListPagePage',
  components: { [NavBar.name]: NavBar, [Tab.name]: Tab, [Tabs.name]: Tabs },
  data() {
    return {
      activeTab: 0,
      searchQuery: ''
    }
  },
  methods: {
    fetchBasicList({ page, pageSize }) {
      return new Promise(resolve => {
        setTimeout(() => {
          const start = (page - 1) * pageSize
          const list = mockProducts.slice(start, start + pageSize)
          resolve({ list, total: mockProducts.length })
        }, 300)
      })
    },
    fetchSearchList({ page, pageSize }) {
      return new Promise(resolve => {
        setTimeout(() => {
          const filtered = this.searchQuery
            ? mockProducts.filter(p => p.name.includes(this.searchQuery))
            : mockProducts
          const start = (page - 1) * pageSize
          const list = filtered.slice(start, start + pageSize)
          resolve({ list, total: filtered.length })
        }, 300)
      })
    },
    fetchActionList({ page, pageSize }) {
      return new Promise(resolve => {
        setTimeout(() => {
          const start = (page - 1) * pageSize
          const list = mockProducts.slice(start, start + pageSize)
          resolve({ list, total: mockProducts.length })
        }, 300)
      })
    },
    handleSearch() {
      this.$refs.searchList && this.$refs.searchList.refresh()
    },
    handleRowClick(row) {
      this.$message({ message: '点击: ' + row.name, type: 'info' })
    },
    handleEdit(row) {
      this.$message({ message: '编辑: ' + row.name, type: 'success' })
    },
    handleDelete(row) {
      this.$confirm('确定删除 "' + row.name + '" 吗？', '提示').then(() => {
        this.$message({ message: '已删除: ' + row.name, type: 'success' })
        this.$refs.actionList && this.$refs.actionList.refresh()
      }).catch(() => {})
    }
  }
}
</script>

<style scoped>
.page-list-page {
  background: #f7f8fa;
  min-height: 100vh;
}
</style>
