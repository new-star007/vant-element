<template>
  <div class="el-form-item">
    <van-field
      ref="vanField"
      :name="prop"
      :rules="computedRules"
      :label="label"
      :value="fieldValue"
      :required="requiredVisible"
      :error="!!error || undefined"
      :error-message="error || undefined"
      :disabled="fieldState.disabled || undefined"
      :readonly="fieldState.readonly || undefined"
      :is-link="fieldState.isLink || undefined"
      :clearable="fieldState.clearable || undefined"
      :label-align="mapLabelAlign"
      :border="computedBorder"
      v-bind="$attrs"
    >
      <template v-if="hasLabelSlot" slot="label">
        <span v-if="requiredVisible && !hideRequired" style="color:#ee0a24;margin-right:2px">*</span>
        <slot name="label" />
      </template>
      <template slot="input">
        <slot />
      </template>
    </van-field>
  </div>
</template>

<script>
import { Field } from 'vant'

export default {
  components: { [Field.name]: Field },
  name: 'ElFormItem',
  inject: {
    elForm: { default: null },
    elFormProvider: { default: null }
  },
  provide() {
    return {
      elFormItem: this,
      elFormItemFieldState: this.fieldState
    }
  },
  props: {
    label: String,
    prop: String,
    rules: [Object, Array],
    required: Boolean,
    labelWidth: [String, Number],
    labelPosition: { type: String, default: 'left' },
    error: String,
    showMessage: { type: Boolean, default: true },
    inline: Boolean,
    size: String,
    border: Boolean
  },
  data() {
    return {
      fieldState: {
        isLink: false,
        readonly: false,
        disabled: false,
        clearable: false
      }
    }
  },
  computed: {
    hasLabelSlot() {
      return !!this.$slots.label
    },
    computedBorder() {
      if (this.border !== undefined) return this.border
      if (this.elForm && this.elForm.border !== undefined) return this.elForm.border
      return true
    },
    requiredVisible() {
      if (this.required === true) return true
      if (this.rules) {
        const arr = Array.isArray(this.rules) ? this.rules : [this.rules]
        if (arr.some(r => r.required)) return true
      }
      if (this.elForm && this.elForm.rules && this.prop) {
        const rules = this.elForm.rules[this.prop]
        if (rules) {
          const arr = Array.isArray(rules) ? rules : [rules]
          if (arr.some(r => r.required)) return true
        }
      }
      return false
    },
    fieldValue() {
      if (this.elForm && this.elForm.model && this.prop) {
        return this.elForm.model[this.prop]
      }
      return undefined
    },
    computedRules() {
      if (this.rules) return this.rules
      if (this.elForm && this.elForm.rules && this.prop) {
        return this.elForm.rules[this.prop]
      }
      return undefined
    },
    mapLabelAlign() {
      if (this.labelPosition === 'top') return 'top'
      if (this.labelPosition === 'right') return 'right'
      return 'left'
    },
    hideRequired() {
      if (this.elFormProvider) return this.elFormProvider.hideRequiredAsterisk()
      if (this.elForm) return this.elForm.hideRequiredAsterisk
      return false
    },
    showColon() {
      if (this.elFormProvider) return this.elFormProvider.colon()
      if (this.elForm) return this.elForm.colon
      return false
    }
  },
  created() {
    if (this.elForm) {
      this.elForm.addField(this)
    }
  },
  beforeDestroy() {
    if (this.elForm) {
      this.elForm.removeField(this)
    }
  },
  methods: {
    setError(msg) {
      const field = this.$refs.vanField
      if (field) {
        field.validateFailed = !!msg
        field.validateMessage = msg || ''
      }
    },
    clearError() {
      const field = this.$refs.vanField
      if (field) {
        field.validateFailed = false
        field.validateMessage = ''
      }
    }
  }
}
</script>

<style scoped>
.el-form-item {
  font-size: 14px;
}
</style>

<style>
.el-form-item > .van-field:last-child::after {
  display: block;
}
</style>
