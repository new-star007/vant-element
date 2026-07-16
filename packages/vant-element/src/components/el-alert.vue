<template>
  <div :class="['el-alert', 'el-alert--' + type, isCenter, effectClass]">
    <van-icon
      v-if="showIcon"
      :name="iconMap"
      :class="'el-alert__icon'"
      :color="iconColor"
    />
    <div class="el-alert__content">
      <span v-if="title" class="el-alert__title">{{ title }}</span>
      <slot />
      <span v-if="!$slots.default && description" class="el-alert__description">{{ description }}</span>
    </div>
    <span v-if="closable && closeText" class="el-alert__closebtn" @click="onClose">{{ closeText }}</span>
    <van-icon
      v-else-if="closable"
      name="cross"
      class="el-alert__closebtn"
      @click="onClose"
    />
  </div>
</template>

<script>
import { Icon } from 'vant'

export default {
  components: { [Icon.name]: Icon },
  name: 'ElAlert',
  props: {
    title: String,
    type: { type: String, default: 'info' },
    description: String,
    closable: { type: Boolean, default: true },
    center: Boolean,
    closeText: String,
    showIcon: { type: Boolean, default: false },
    effect: { type: String, default: 'light' }
  },
  computed: {
    isCenter() {
      return this.center ? 'is-center' : ''
    },
    effectClass() {
      return this.effect === 'dark' ? 'is-dark' : ''
    },
    iconColor() {
      const colors = { success: '#67c23a', warning: '#e6a23c', info: '#909399', error: '#f56c6c' }
      return colors[this.type] || colors.info
    },
    iconMap() {
      const icons = { success: 'success', warning: 'warning-o', info: 'info-o', error: 'cross' }
      return icons[this.type] || icons.info
    }
  },
  methods: {
    onClose() {
      this.$emit('close')
      this.$destroy()
    }
  }
}
</script>

<style scoped>
.el-alert {
  display: flex;
  align-items: flex-start;
  padding: 8px 16px;
  border-radius: 4px;
  margin-bottom: 8px;
  font-size: 13px;
}
.el-alert--success { background: #f0f9eb; color: #67c23a; }
.el-alert--warning { background: #fdf6ec; color: #e6a23c; }
.el-alert--info { background: #f4f4f5; color: #909399; }
.el-alert--error { background: #fef0f0; color: #f56c6c; }
.el-alert.is-center { justify-content: center; }
.el-alert__icon { margin-right: 8px; margin-top: 2px; font-size: 16px; }
.el-alert__content { flex: 1; }
.el-alert__title { font-weight: 600; }
.el-alert__description { font-size: 12px; margin-top: 4px; display: block; }
.el-alert__closebtn { margin-left: 8px; font-size: 12px; cursor: pointer; }
.el-alert.is-dark.el-alert--success { background: #67c23a; color: #fff; }
.el-alert.is-dark.el-alert--warning { background: #e6a23c; color: #fff; }
.el-alert.is-dark.el-alert--info { background: #909399; color: #fff; }
.el-alert.is-dark.el-alert--error { background: #f56c6c; color: #fff; }
</style>
