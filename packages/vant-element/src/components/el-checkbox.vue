<template>
  <van-checkbox
    :value="indeterminate ? true : model"
    @input="onInput"
    @change="onChange"
    :name="label"
    :shape="mapShape"
    :disabled="disabled"
    :checked-color="checkedColor"
    :label-position="labelPosition"
    :icon-size="iconSize"
    v-bind="$attrs"
    class="el-checkbox"
    :class="{ 'is-indeterminate': indeterminate }"
  >
    <slot />
  </van-checkbox>
</template>

<script>
import { Checkbox } from 'vant'
import valueModel from '../mixins/value-model'

export default {
  components: { [Checkbox.name]: Checkbox },
  name: 'ElCheckbox',
  mixins: [valueModel],
  props: {
    value: Boolean,
    label: [String, Number, Boolean],
    disabled: Boolean,
    checkedColor: String,
    trueLabel: [String, Number],
    falseLabel: [String, Number],
    border: Boolean,
    size: String,
    iconSize: [String, Number],
    labelPosition: { type: String, default: 'right' },
    indeterminate: Boolean
  },
  computed: {
    mapShape() {
      return 'square'
    }
  }
}
</script>

<style>
.el-checkbox.is-indeterminate .van-checkbox__icon--square .van-icon-success::before { content: '' !important; }
.el-checkbox.is-indeterminate .van-checkbox__icon--square .van-icon-success::after { content: '' !important; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 8px; height: 0; border-top: 2px solid #fff; border-bottom: 2px solid #fff; background: none; }
</style>
