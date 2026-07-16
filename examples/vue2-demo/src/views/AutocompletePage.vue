<template>
  <div class="page-autocomplete">
    <van-nav-bar title="el-autocomplete 自动补全" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">基础用法</div>
        <el-autocomplete
          v-model="value1"
          :fetch-suggestions="querySearch"
          placeholder="输入门店名称"
          @select="onSelect"
        />
        <p class="demo-value">输入值：{{ value1 }}</p>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">可清除</div>
        <el-autocomplete
          v-model="value2"
          :fetch-suggestions="querySearch"
          clearable
          placeholder="可清除的自动补全"
          @select="onSelect"
          @clear="onClear"
        />
        <p class="demo-value">输入值：{{ value2 }}</p>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">自定义选项</div>
        <el-autocomplete
          v-model="value3"
          :fetch-suggestions="querySearch"
          placeholder="输入门店名称"
          @select="onSelect"
        >
          <template #item="{ item }">
            <van-icon name="shop" style="margin-right:6px;color:#1989fa" />
            {{ item.value }}
          </template>
        </el-autocomplete>
        <p class="demo-value">输入值：{{ value3 }}</p>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">禁用状态</div>
        <el-autocomplete
          v-model="value4"
          :fetch-suggestions="querySearch"
          disabled
          placeholder="已禁用"
        />
      </el-card>

      <el-card class="demo-card">
        <div slot="header">首次高亮</div>
        <el-autocomplete
          v-model="value5"
          :fetch-suggestions="querySearch"
          highlight-first-item
          placeholder="默认高亮第一项"
          @select="onSelect"
        />
        <p class="demo-value">输入值：{{ value5 }}</p>
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar, Icon } from 'vant'

const restaurants = [
  { value: '三全鲜食（北新泾店）' },
  { value: 'Hot honey 首尔炸鸡（仙霞路）' },
  { value: '新长福酒家（华强北店）' },
  { value: 'Bangp 港式茶餐厅（华强北店）' },
  { value: '蔡澜港式点心（华强北店）' },
  { value: '爱尚龙虾（国展店）' },
  { value: '八合里牛肉火锅（华强北店）' },
  { value: '胖哥俩肉蟹煲（华强北店）' },
  { value: '海底捞火锅（华强北店）' },
  { value: '瑞幸咖啡（华强北店）' },
  { value: '喜茶（华强北店）' },
  { value: '奈雪の茶（华强北店）' }
]

export default {
  name: 'AutocompletePage',
  components: { [NavBar.name]: NavBar, [Icon.name]: Icon },
  data() {
    return {
      value1: '',
      value2: '',
      value3: '',
      value4: '三全鲜食（北新泾店）',
      value5: ''
    }
  },
  methods: {
    querySearch(queryString, callback) {
      const results = queryString
        ? restaurants.filter(item => item.value.toLowerCase().includes(queryString.toLowerCase()))
        : restaurants
      callback(results)
    },
    onSelect(item) {
      console.log('选中:', item)
    },
    onClear() {
      console.log('清空')
    }
  }
}
</script>

<style scoped>
.page-autocomplete {
  background: #f7f8fa;
  min-height: 100vh;
}
.page-body {
  padding: 16px;
}
.demo-card {
  margin-bottom: 12px;
}
.demo-value {
  margin-top: 12px;
  color: #909399;
  font-size: 14px;
}
</style>
