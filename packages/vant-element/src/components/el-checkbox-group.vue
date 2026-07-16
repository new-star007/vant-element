<template>
  <van-checkbox-group
    class="el-checkbox-group"
    :value="value"
    @input="onInput"
    @change="onChange"
    :disabled="disabled"
    :max="max"
    :icon-size="iconSize"
    :checked-color="checkedColor"
    :direction="direction"
  >
    <slot />
  </van-checkbox-group>
</template>

<script>
import { CheckboxGroup } from 'vant'

export default {
  components: { [CheckboxGroup.name]: CheckboxGroup },
  name: 'ElCheckboxGroup',
  provide() {
    return { checkboxGroup: this }
  },
  props: {
    value: Array,
    disabled: Boolean,
    max: [Number, String],
    min: [Number, String],
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
.el-checkbox-group.van-checkbox-group--vertical > .van-checkbox {
  margin-bottom: 12px;
}
.el-checkbox-group.van-checkbox-group--vertical > .van-checkbox:last-child {
  margin-bottom: 0;
}
</style>
