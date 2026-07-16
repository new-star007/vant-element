<template>
  <div class="el-descriptions-item" :style="itemStyle">
    <div class="el-descriptions-item__label">{{ label }}</div>
    <div class="el-descriptions-item__content"><slot /></div>
  </div>
</template>

<script>
export default {
  name: 'ElDescriptionsItem',
  props: {
    label: { type: String, default: '' },
    span: { type: Number, default: 1 }
  },
  inject: ['elDescriptions'],
  computed: {
    itemStyle() {
      const column = this.elDescriptions.column || 2
      const width = (this.span / column) * 100
      return { width: width + '%' }
    }
  }
}
</script>

<style scoped>
.el-descriptions-item {
  box-sizing: border-box;
  padding: 8px;
}
.el-descriptions-item__label {
  font-size: 13px;
  color: #969799;
  margin-bottom: 4px;
}
.el-descriptions-item__content {
  font-size: 14px;
  color: #323233;
}
</style>
