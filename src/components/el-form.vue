<template>
  <van-form
    ref="vanForm"
    class="el-form"
    :class="{ 'el-form--inline': inline }"
    @submit="onSubmit"
    @failed="onFailed"
    :label-width="labelWidth"
    :label-align="mapLabelAlign"
    :input-align="inputAlign"
    :error-message-align="errorMessageAlign"
    :show-error="showError"
    :show-error-message="showErrorMessage"
    :submit-on-enter="submitOnEnter"
    :validate-trigger="validateTrigger"
    :disabled="disabled"
    :readonly="readonly"
    :scroll-to-error="scrollToError"
    v-bind="$attrs"
  >
    <slot />
  </van-form>
</template>

<script>
import { Form } from 'vant'

export default {
  components: { [Form.name]: Form },
  name: 'ElForm',
  provide() {
    return {
      elForm: this,
      elFormProvider: {
        hideRequiredAsterisk: () => this.hideRequiredAsterisk,
        colon: () => this.colon,
        inline: () => this.inline
      }
    }
  },
  watch: {
    rules: {
      deep: true,
      handler() {
        if (this.validateOnRuleChange) {
          this.$nextTick(() => {
            this.$refs.vanForm && this.$refs.vanForm.validate().catch(() => {})
          })
        }
      }
    }
  },
  props: {
    model: Object,
    rules: Object,
    labelWidth: [String, Number],
    labelPosition: String,
    labelAlign: String,
    inputAlign: String,
    errorMessageAlign: String,
    showError: { type: Boolean, default: true },
    showErrorMessage: { type: Boolean, default: true },
    submitOnEnter: { type: Boolean, default: true },
    validateTrigger: { type: String, default: 'onBlur' },
    validateOnRuleChange: { type: Boolean, default: true },
    border: { type: Boolean, default: true },
    disabled: Boolean,
    readonly: Boolean,
    scrollToError: Boolean,
    colon: Boolean,
    hideRequiredAsterisk: Boolean,
    statusIcon: Boolean,
    inline: Boolean
  },
  data() {
    return {
      fields: {},
      initialValues: {}
    }
  },
  computed: {
    mapLabelAlign() {
      return this.labelAlign || this.labelPosition || 'left'
    }
  },
  mounted() {
    if (this.model) {
      this.initialValues = Object.keys(this.model).reduce((acc, key) => {
        acc[key] = this.model[key]
        return acc
      }, {})
    }
    if (this.statusIcon) {
      console.warn('[ElForm] statusIcon is not supported by Vant, ignoring.')
    }
  },
  methods: {
    addField(item) {
      if (item.prop) {
        this.$set(this.fields, item.prop, item)
      }
    },
    removeField(item) {
      if (item.prop) {
        this.$delete(this.fields, item.prop)
      }
    },
    validate(callback) {
      return this.$refs.vanForm.validate().then(() => {
        callback && callback(true)
      }).catch((errors) => {
        const invalidFields = {}
        if (Array.isArray(errors)) {
          errors.forEach(err => {
            if (!err || !err.name) return
            if (!invalidFields[err.name]) {
              invalidFields[err.name] = []
            }
            invalidFields[err.name].push({
              message: err.message || '',
              field: err.name
            })
          })
        }
        callback && callback(false, invalidFields)
      })
    },
    validateField(prop, callback) {
      return this.$refs.vanForm.validateField(prop).then(() => {
        callback && callback()
      }).catch((err) => {
        callback && callback(err)
      })
    },
    resetFields() {
      Object.keys(this.fields).forEach(prop => {
        if (this.model && prop in this.initialValues) {
          this.$set(this.model, prop, this.initialValues[prop])
        }
      })
      this.$refs.vanForm.resetValidation()
    },
    clearValidate(props) {
      if (props) {
        props.forEach(p => {
          if (this.fields[p] && this.fields[p].$refs.vanField) {
            this.fields[p].$refs.vanField.resetValidation()
          }
        })
      } else {
        this.$refs.vanForm.resetValidation()
      }
    },
    onSubmit(values) {
      this.$emit('submit', values)
    },
    onFailed(errorInfo) {
      this.$emit('failed', errorInfo)
    }
  }
}
</script>
