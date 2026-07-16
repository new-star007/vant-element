<template>
  <van-switch
    :value="value"
    @input="onInput"
    @change="onChange"
    :loading="loading"
    :disabled="disabled"
    :size="size"
    :active-color="activeColor"
    :inactive-color="inactiveColor"
  />
</template>

<script>
import { Switch } from 'vant'

export default {
  components: { [Switch.name]: Switch },
  name: 'ElSwitch',
  props: {
    value: Boolean,
    disabled: Boolean,
    loading: Boolean,
    size: [String, Number],
    activeColor: String,
    inactiveColor: String,
    width: [String, Number],
    activeIconClass: String,
    inactiveIconClass: String,
    activeText: String,
    inactiveText: String,
    activeValue: { default: true },
    inactiveValue: { default: false }
  },
  methods: {
    onInput(val) {
      const emitVal = val ? this.activeValue : this.inactiveValue
      this.$emit('input', emitVal)
    },
    onChange(val) {
      const emitVal = val ? this.activeValue : this.inactiveValue
      this.$emit('change', emitVal)
    }
  }
}
</script>
