<template>
  <div class="el-input-number">
    <van-stepper
      :value="value"
      @input="onInput"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
      :min="computedMin"
      :max="computedMax"
      :step="step"
      :disabled="disabled"
      :decimal-length="precision"
      :placeholder="placeholder"
      :name="name"
      :show-plus="showControls"
      :show-minus="showControls"
      :button-size="buttonSize"
      :input-width="inputWidth"
      v-bind="$attrs"
    />
  </div>
</template>

<script>
import { Stepper } from 'vant'

export default {
  components: { [Stepper.name]: Stepper },
  name: 'ElInputNumber',
  inject: {
    elFormItem: { default: null },
    elFormItemFieldState: { default: null }
  },
  props: {
    value: [Number, String],
    min: { type: Number, default: -Infinity },
    max: { type: Number, default: Infinity },
    step: { type: Number, default: 1 },
    stepStrictly: Boolean,
    precision: { type: Number, default: undefined },
    size: String,
    disabled: Boolean,
    controls: { type: Boolean, default: true },
    controlsPosition: { type: String, default: 'right' },
    valueOnClear: { type: Number, default: null },
    name: { type: [String, Number], default: '' },
    placeholder: String,
    label: String,
    id: String
  },
  computed: {
    computedMin() {
      if (this.min === -Infinity || this.min === undefined) return undefined
      return this.min
    },
    computedMax() {
      if (this.max === Infinity || this.max === undefined) return undefined
      return this.max
    },
    showControls() {
      return this.controls === true || this.controls === ''
    },
    buttonSize() {
      const map = { large: 36, medium: 32, small: 28, mini: 24 }
      return map[this.size] || undefined
    },
    inputWidth() {
      const map = { large: '48px', medium: '44px', small: '40px', mini: '36px' }
      return this.size ? map[this.size] || map.medium : undefined
    }
  },
  watch: {
    disabled: {
      immediate: true,
      handler(val) {
        if (this.elFormItemFieldState) this.elFormItemFieldState.disabled = val
      }
    }
  },
  methods: {
    onInput(val) {
      const v = this.enforceStepStrictly(val)
      this.$emit('input', v)
    },
    onChange(val) {
      const v = this.enforceStepStrictly(val)
      this.$emit('change', v)
    },
    onFocus(e) {
      this.$emit('focus', e)
    },
    onBlur(e) {
      this.$emit('blur', e)
    },
    enforceStepStrictly(val) {
      if (!this.stepStrictly) return val
      if (val == null || val === '') return val
      const step = Number(this.step)
      const minVal = this.min === -Infinity ? 0 : Number(this.min)
      const diff = Number(val) - minVal
      const remainder = diff % step
      if (remainder === 0) return Number(val)
      let rounded = Math.round(diff / step) * step + minVal
      if (this.max !== Infinity && rounded > this.max) rounded = this.max
      if (this.min !== -Infinity && rounded < this.min) rounded = this.min
      if (this.precision != null) rounded = Number(rounded.toFixed(this.precision))
      return rounded
    }
  }
}
</script>

<style scoped>
.el-input-number {
  display: inline-flex;
}
</style>
