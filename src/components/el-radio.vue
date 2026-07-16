<template>
  <van-radio
    :value="model"
    @input="onInput"
    @change="onChange"
    :name="label"
    :disabled="disabled"
    :checked-color="checkedColor"
    :label-position="labelPosition"
    :icon-size="iconSize"
    v-bind="$attrs"
  >
    <slot />
  </van-radio>
</template>

<script>
import { Radio } from 'vant'
import valueModel from '../mixins/value-model'

export default {
  components: { [Radio.name]: Radio },
  name: 'ElRadio',
  mixins: [valueModel],
  props: {
    value: [String, Number, Boolean],
    label: [String, Number, Boolean],
    disabled: Boolean,
    checkedColor: String,
    border: Boolean,
    size: String,
    iconSize: [String, Number],
    labelPosition: { type: String, default: 'right' }
  }
}
</script>
