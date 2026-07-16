<template>
  <div class="el-descriptions" :class="[{ 'is-border': border }, sizeClass]">
    <div class="el-descriptions__body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ElDescriptions',
  props: {
    column: { type: Number, default: 2 },
    border: Boolean,
    size: String
  },
  computed: {
    sizeClass() {
      return this.size ? `el-descriptions--${this.size}` : ''
    }
  },
  provide() {
    return { elDescriptions: this }
  }
}
</script>

<style scoped>
.el-descriptions__body {
  display: flex;
  flex-wrap: wrap;
}
.el-descriptions.is-border .el-descriptions-item {
  border: 1px solid #ebedf0;
  border-radius: 4px;
}
.el-descriptions--large { font-size: 16px; }
.el-descriptions--small { font-size: 12px; }
</style>
