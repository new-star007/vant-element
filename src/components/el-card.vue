<template>
  <div :class="['el-card', shadowClass]">
    <div v-if="header || $slots.header" class="el-card-header">
      <slot name="header">{{ header }}</slot>
    </div>
    <div v-if="description" class="el-card-desc">{{ description }}</div>
    <div class="el-card-body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ElCard',
  props: {
    header: String,
    description: String,
    body: String,
    shadow: { type: String, default: 'always' },
    border: { type: Boolean, default: true }
  },
  computed: {
    shadowClass() {
      return `is-${this.shadow}-shadow`
    }
  }
}
</script>

<style>
.el-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
}
.el-card.is-always-shadow {
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.el-card.is-hover-shadow:hover {
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.el-card.is-never-shadow {
  box-shadow: none;
}
.el-card-header {
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  color: #323233;
  background: #fff;
}
.el-card-header::after {
  position: absolute;
  box-sizing: border-box;
  content: ' ';
  pointer-events: none;
  right: 16px;
  bottom: 0;
  left: 16px;
  border-bottom: 1px solid #ebedf0;
  transform: scaleY(.5);
}
.el-card-desc {
  padding: 0 16px 8px;
  font-size: 12px;
  line-height: 18px;
  color: #969799;
}
.el-card-body {
  padding: 10px 16px;
  font-size: 14px;
  line-height: 24px;
  color: #323233;
}
</style>
