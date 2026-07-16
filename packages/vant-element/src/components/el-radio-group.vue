<template>
  <van-radio-group
    class="el-radio-group"
    :value="value"
    @input="onInput"
    @change="onChange"
    :disabled="disabled"
    :icon-size="iconSize"
    :checked-color="checkedColor"
    :direction="direction"
  >
    <slot />
  </van-radio-group>
</template>

<script>
import { RadioGroup } from 'vant'

export default {
  components: { [RadioGroup.name]: RadioGroup },
  name: 'ElRadioGroup',
  provide() {
    return { radioGroup: this }
  },
  props: {
    value: [String, Number, Boolean],
    disabled: Boolean,
    iconSize: [String, Number],
    checkedColor: String,
    fill: String,
    textColor: String,
    size: String,
    direction: { type: String, default: 'vertical' }
  },
  methods: {
    onInput(val) {
      this.$emit('input', val)
    },
    onChange(val) {
      this.$emit('change', val)
    }
  }
}
</script>

<style>
.el-radio-group.van-radio-group--vertical > .van-radio {
  margin-bottom: 12px;
}
.el-radio-group.van-radio-group--vertical > .van-radio:last-child {
  margin-bottom: 0;
}
</style>
