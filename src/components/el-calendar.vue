<template>
  <div class="el-calendar">
    <div class="el-calendar__header">
      <div class="el-calendar__title">{{ title }}</div>
      <div class="el-calendar__button-group">
        <van-button size="small" @click="prevMonth">上个月</van-button>
        <van-button size="small" @click="today">今天</van-button>
        <van-button size="small" @click="nextMonth">下个月</van-button>
      </div>
    </div>
    <div class="el-calendar__body">
      <van-calendar
        ref="calendarRef"
        :poppable="false"
        :show-title="false"
        :show-subtitle="false"
        :show-confirm="false"
        :first-day-of-week="firstDayOfWeek"
        :min-date="computedMinDate"
        :max-date="computedMaxDate"
        :default-date="selectedDate"
        :formatter="calendarFormatter"
        @select="onSelect"
        @month-show="onMonthShow"
      >
        <template #top-info="day">
          <slot name="dateCell" :data="{ date: day.date, day: parseInt(day.text, 10) }">
            <div v-if="day.events && day.events.length" class="el-calendar-day__events">
              <div
                v-for="(event, eventIndex) in day.events"
                :key="eventIndex"
                class="el-calendar-day__event"
                :style="{ backgroundColor: event.color || '#409eff' }"
              >
                {{ event.title }}
              </div>
            </div>
          </slot>
        </template>
      </van-calendar>
    </div>
  </div>
</template>

<script>
import { Calendar, Button } from 'vant'

export default {
  components: { [Calendar.name]: Calendar, [Button.name]: Button },
  name: 'ElCalendar',
  props: {
    value: [String, Date],
    range: Array,
    locale: String,
    firstDayOfWeek: { type: Number, default: 0 },
    data: Object
  },
  data() {
    return {
      currentDate: this.value ? this.toDate(this.value) : new Date()
    }
  },
  computed: {
    selectedDate() {
      return this.value ? this.toDate(this.value) : null
    },
    title() {
      const year = this.currentDate.getFullYear()
      const month = this.currentDate.getMonth() + 1
      return `${year}年${month}月`
    },
    computedMinDate() {
      if (this.range && this.range.length) {
        return this.toDate(this.range[0])
      }
      return new Date(2010, 0, 1)
    },
    computedMaxDate() {
      if (this.range && this.range.length > 1) {
        return this.toDate(this.range[1])
      }
      const now = new Date()
      return new Date(now.getFullYear() + 5, now.getMonth(), now.getDate())
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (val) {
          this.currentDate = this.toDate(val)
        }
      }
    }
  },
  methods: {
    toDate(val) {
      if (!val) return new Date()
      if (val instanceof Date) return val
      if (typeof val === 'string') {
        const d = new Date(val.replace(/-/g, '/'))
        return isNaN(d.getTime()) ? new Date() : d
      }
      return new Date(val)
    },
    formatDate(date) {
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      return `${year}-${month}-${day}`
    },
    isToday(date) {
      const today = new Date()
      return date.getFullYear() === today.getFullYear() &&
             date.getMonth() === today.getMonth() &&
             date.getDate() === today.getDate()
    },
    calendarFormatter(day) {
      day.className = day.className || ''
      if (this.isToday(day.date)) {
        day.className += ' is-today'
      }
      if (this.data) {
        const key = this.formatDate(day.date)
        if (this.data[key]) {
          day.events = this.data[key]
        }
      }
      return day
    },
    prevMonth() {
      const date = new Date(this.currentDate)
      date.setMonth(date.getMonth() - 1)
      this.currentDate = date
      this.scrollToDate(date)
      this.$emit('month-change', date)
    },
    nextMonth() {
      const date = new Date(this.currentDate)
      date.setMonth(date.getMonth() + 1)
      this.currentDate = date
      this.scrollToDate(date)
      this.$emit('month-change', date)
    },
    today() {
      const now = new Date()
      this.currentDate = now
      this.scrollToDate(now)
      this.$emit('input', this.formatDate(now))
    },
    onSelect(date) {
      this.currentDate = date
      this.$emit('input', this.formatDate(date))
      this.$emit('day-click', { date: this.formatDate(date), day: date.getDate() })
    },
    onMonthShow({ date }) {
      this.currentDate = date
    },
    scrollToDate(date) {
      this.$nextTick(() => {
        if (this.$refs.calendarRef) {
          this.$refs.calendarRef.scrollToDate(date)
        }
      })
    }
  }
}
</script>

<style>
.el-calendar {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.el-calendar__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #ebeef5;
}

.el-calendar__title {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

.el-calendar__button-group {
  display: flex;
  gap: 8px;
}

.el-calendar__body .van-calendar__body {
  max-height: 370px;
  overflow-y: auto;
}

.el-calendar-day__events {
  margin-top: 4px;
}

.el-calendar-day__event {
  padding: 2px 4px;
  margin-bottom: 2px;
  font-size: 12px;
  color: #fff;
  border-radius: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.el-calendar .van-calendar-month__title {
  display: none;
}

.el-calendar .van-calendar__body {
  padding: 12px;
}

.el-calendar .van-calendar-day.is-today {
  color: #409eff;
}

.el-calendar .van-calendar-day.is-today .van-calendar__selected-day {
  background: #409eff;
}

.el-calendar .van-calendar-day.van-calendar-day--selected {
  color: #fff;
}

.el-calendar .van-calendar-day.van-calendar-day--start,
.el-calendar .van-calendar-day.van-calendar-day--end,
.el-calendar .van-calendar-day.van-calendar-day--start-end,
.el-calendar .van-calendar-day.van-calendar-day--multiple-selected,
.el-calendar .van-calendar-day.van-calendar-day--multiple-middle {
  color: #fff;
}
</style>
