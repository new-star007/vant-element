<template>
  <div style="display:none"><slot /></div>
</template>

<script>
export default {
  name: 'ElOption',
  inject: {
    elSelect: { default: null }
  },
  props: {
    value: [String, Number],
    label: [String, Number],
    disabled: Boolean
  },
  created() {
    if (this.elSelect) {
      this.elSelect.addOption(this)
    }
  },
  beforeDestroy() {
    if (this.elSelect) {
      this.elSelect.removeOption(this)
    }
  }
}
</script>
