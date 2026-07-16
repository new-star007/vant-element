<template>
  <div class="page-calendar">
    <van-nav-bar title="el-calendar 日历" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">基础用法</div>
        <el-calendar v-model="value1" />
        <p class="demo-value">选中日期: {{ value1 }}</p>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">周一起始</div>
        <el-calendar v-model="value2" :first-day-of-week="1" />
        <p class="demo-value">选中日期: {{ value2 }}</p>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">限定范围 (2026-06 ~ 2026-08)</div>
        <el-calendar v-model="value3" :range="['2026-06-01', '2026-08-31']" />
        <p class="demo-value">选中日期: {{ value3 }}</p>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">日程事件</div>
        <el-calendar v-model="value4" :data="events" />
        <p class="demo-value">选中日期: {{ value4 }}</p>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">自定义日期单元格</div>
        <el-calendar v-model="value5">
          <template #dateCell="{ data }">
            <div class="custom-cell">
              <span class="custom-cell__day">{{ data.day }}</span>
              <span v-if="data.day % 5 === 0" class="custom-cell__badge">促</span>
            </div>
          </template>
        </el-calendar>
        <p class="demo-value">选中日期: {{ value5 }}</p>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">事件监听</div>
        <el-calendar
          v-model="value6"
          @day-click="onDayClick"
          @month-change="onMonthChange"
        />
        <p class="demo-value">操作日志请查看控制台</p>
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar, Toast } from 'vant'

export default {
  name: 'CalendarPage',
  components: { [NavBar.name]: NavBar, [Toast.name]: Toast },
  data() {
    return {
      value1: '2026-07-11',
      value2: '2026-07-11',
      value3: '2026-07-11',
      value4: '2026-07-10',
      value5: '2026-07-11',
      value6: '2026-07-11',
      events: {
        '2026-07-01': [{ title: '建党节', color: '#ee0a24' }],
        '2026-07-10': [{ title: '会议', color: '#409eff' }],
        '2026-07-15': [{ title: '截止日', color: '#e6a23c' }],
        '2026-07-20': [
          { title: '汇报', color: '#67c23a' },
          { title: '评审', color: '#909399' }
        ]
      }
    }
  },
  methods: {
    onDayClick(day) {
      Toast(`点击了 ${day.date}`)
    },
    onMonthChange(date) {
      const m = date.getMonth() + 1
      Toast(`切换到 ${date.getFullYear()}年${m}月`)
    }
  }
}
</script>

<style scoped>
.page-calendar {
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
.custom-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
}
.custom-cell__badge {
  font-size: 10px;
  background: #ee0a24;
  color: #fff;
  border-radius: 8px;
  padding: 0 4px;
  line-height: 1.4;
}
</style>
