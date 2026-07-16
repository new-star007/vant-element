<template>
  <div class="el-progress" :class="['el-progress--' + type, status ? 'is-' + status : '', { 'el-progress--without-text': !showText }]">
    <van-circle
      v-if="type === 'circle'"
      :value="percentage"
      :size="circleSize"
      :stroke-width="circleStrokeWidth"
      :color="circleColor"
      :layer-color="trackColor"
      :text="circleText"
      :speed="duration * 1000"
    />
    <van-progress
      v-else
      :percentage="percentage"
      :stroke-width="strokeWidth"
      :color="barColor"
      :track-color="trackColor"
      :pivot-text="text"
      :pivot-color="pivotColor"
      :show-pivot="showText"
      :inactive="inactive"
    >
      <template #pivot>
        <slot name="pivot" />
      </template>
    </van-progress>
  </div>
</template>

<script>
import { Progress, Circle } from 'vant'

const STATUS_COLOR_MAP = {
  success: '#67c23a',
  warning: '#e6a23c',
  exception: '#f56c6c'
}

export default {
  components: { [Progress.name]: Progress, [Circle.name]: Circle },
  name: 'ElProgress',
  props: {
    percentage: { type: Number, default: 0 },
    type: { type: String, default: 'line' },
    strokeWidth: { type: [Number, String], default: 6 },
    textInside: Boolean,
    showText: { type: Boolean, default: true },
    color: { type: [String, Array, Function], default: '#1989fa' },
    trackColor: String,
    width: [Number, String],
    status: String,
    pivotText: String,
    pivotColor: String,
    format: Function,
    duration: { type: Number, default: 3 },
    text: String,
    inactive: Boolean
  },
  computed: {
    circleSize() {
      return this.width || 126
    },
    circleStrokeWidth() {
      const s = Number(this.strokeWidth)
      const size = this.circleSize
      return Math.round((s * 1000) / (size - s))
    },
    barColor() {
      if (this.status && STATUS_COLOR_MAP[this.status]) return STATUS_COLOR_MAP[this.status]
      return this.color
    },
    circleColor() {
      if (this.status && STATUS_COLOR_MAP[this.status]) return STATUS_COLOR_MAP[this.status]
      if (typeof this.color === 'function') return '#1989fa'
      return this.color
    },
    circleText() {
      if (!this.showText) return ''
      if (this.text) return this.text
      if (this.format) return this.format(this.percentage)
      return this.percentage + '%'
    }
  }
}
</script>

<style>
.el-progress {
  margin-bottom: 12px;
}
.el-progress:last-child {
  margin-bottom: 0;
}
.el-progress--circle {
  display: inline-flex;
  margin-right: 16px;
}
.el-progress--circle:last-child {
  margin-right: 0;
}
</style>
