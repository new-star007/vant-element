<template>
  <div class="el-dropdown-menu">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ElDropdownMenu',
  inject: {
    dropdown: { default: null }
  }
}
</script>

<style>
.el-dropdown-menu {
  padding: 5px 0;
}
</style>
