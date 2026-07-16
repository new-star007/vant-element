<template>
  <div class="el-button-group" :class="{ 'is-capsule': capsule, 'is-block': block }">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ElButtonGroup',
  props: {
    size: String,
    capsule: Boolean,
    block: Boolean
  },
  provide() {
    return {
      elButtonGroup: this
    }
  }
}
</script>

<style scoped>
.el-button-group {
  display: inline-flex;
  align-items: center;
}
.el-button-group.is-block,
.el-button-group.is-capsule {
  display: flex;
  width: 100%;
}
.el-button-group.is-block > .el-button,
.el-button-group.is-capsule > .el-button {
  flex: 1;
}
</style>

<style>
.el-button-group > .el-button {
  margin: 0 !important;
}
.el-button-group > .el-button:not(:last-child) {
  margin-right: -1px !important;
}
.el-button-group.is-capsule > .el-button:first-child {
  border-radius: 999px 0 0 999px !important;
  overflow: hidden;
}
.el-button-group.is-capsule > .el-button:last-child {
  border-radius: 0 999px 999px 0 !important;
  overflow: hidden;
}
.el-button-group.is-capsule > .el-button:not(:first-child):not(:last-child) {
  border-radius: 0 !important;
}
</style>
