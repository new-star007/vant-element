<template>
  <div class="el-input" :class="['el-input--' + size, { 'el-input--prefix': !!prefixIcon, 'el-input--suffix': !!suffixIcon }]">
    <span v-if="prefixIcon" class="el-input__prefix">
      <van-icon :name="mapIcon(prefixIcon)" />
    </span>
    <textarea
      v-if="type === 'textarea'"
      ref="input"
      :value="value"
      @input="onInput"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      :rows="rows"
      class="el-input__inner el-textarea__inner"
      :style="textareaStyle"
    />
    <input
      v-else
      ref="input"
      :value="value"
      @input="onInput"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
      :type="inputType"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      class="el-input__inner"
    />
    <span v-if="suffixIcon && !showClear" class="el-input__suffix">
      <van-icon :name="mapIcon(suffixIcon)" />
    </span>
    <span v-if="showClear" class="el-input__clear" @touchstart.prevent="onClear" @mousedown.prevent="onClear">
      <van-icon name="clear" />
    </span>
    <span v-if="showWordLimit && maxlength" class="el-input__word-limit">
      {{ (value || '').length }} / {{ maxlength }}
    </span>
  </div>
</template>

<script>
import { Icon } from 'vant'
import { iconMap } from '../utils'

export default {
  components: { [Icon.name]: Icon },
  name: 'ElInput',
  inject: {
    elFormItem: { default: null },
    elFormItemFieldState: { default: null }
  },
  props: {
    value: [String, Number],
    type: { type: String, default: 'text' },
    placeholder: String,
    disabled: Boolean,
    readonly: Boolean,
    clearable: Boolean,
    showPassword: Boolean,
    prefixIcon: String,
    suffixIcon: String,
    maxlength: [Number, String],
    rows: [Number, String],
    showWordLimit: Boolean,
    size: String,
    autosize: { type: [Boolean, Object], default: false }
  },
  data() {
    return {
      focused: false,
      showPwd: !this.showPassword,
      resizeObserver: null
    }
  },
  computed: {
    inputType() {
      if (this.type === 'password' && this.showPassword) {
        return this.showPwd ? 'password' : 'text'
      }
      return this.type
    },
    showClear() {
      if (!this.clearable || this.readonly || this.disabled) return false
      return !!(this.value || this.value === 0)
    },
    textareaStyle() {
      if (!this.autosize || this.type !== 'textarea') return {}
      const style = {}
      if (typeof this.autosize === 'object' && this.autosize.minRows) {
        style.minHeight = this.autosize.minRows * 1.5 + 'em'
      }
      if (typeof this.autosize === 'object' && this.autosize.maxRows) {
        style.maxHeight = this.autosize.maxRows * 1.5 + 'em'
      }
      return style
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
  mounted() {
    if (this.autosize && this.type === 'textarea') {
      this.$nextTick(this.autoResize)
    }
  },
  beforeDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
    }
  },
  methods: {
    autoResize() {
      const el = this.$refs.input
      if (!el || el.tagName !== 'TEXTAREA') return
      el.style.height = 'auto'
      let height = el.scrollHeight
      if (typeof this.autosize === 'object') {
        const lineHeight = parseFloat(getComputedStyle(el).lineHeight) || 20
        if (this.autosize.minRows) {
          const minH = this.autosize.minRows * lineHeight
          height = Math.max(height, minH)
        }
        if (this.autosize.maxRows) {
          const maxH = this.autosize.maxRows * lineHeight
          height = Math.min(height, maxH)
        }
      }
      el.style.height = height + 'px'
    },
    mapIcon(name) {
      return iconMap(name)
    },
    onInput(event) {
      if (this.autosize && this.type === 'textarea') {
        this.$nextTick(this.autoResize)
      }
      const val = event.target.value
      if (this.type === 'number') {
        this.$emit('input', isNaN(Number(val)) ? '' : Number(val))
      } else {
        this.$emit('input', val)
      }
    },
    onChange(event) {
      this.$emit('change', event.target.value)
    },
    onFocus(event) {
      this.focused = true
      this.$emit('focus', event)
    },
    onBlur(event) {
      this.focused = false
      this.$emit('blur', event)
      if (this.elFormItem && this.elFormItem.$refs.vanField) {
        this.elFormItem.$refs.vanField.validateWithTrigger('onBlur')
      }
    },
    onClear() {
      this.$emit('input', '')
      this.$emit('change', '')
      this.$emit('clear')
      if (this.$refs.input) {
        this.$refs.input.value = ''
      }
    },
    focus() {
      this.$refs.input && this.$refs.input.focus()
    },
    blur() {
      this.$refs.input && this.$refs.input.blur()
    },
    select() {
      this.$refs.input && this.$refs.input.select && this.$refs.input.select()
    }
  }
}
</script>

<style scoped>
.el-input {
  display: flex;
  align-items: center;
  flex: 1;
  min-height: 24px;
  position: relative;
}
.el-input__inner {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: inherit;
  color: #323233;
  padding: 0;
  margin: 0;
  line-height: 1.5;
}
.el-input__inner::placeholder {
  color: #c8c9cc;
}
.el-textarea__inner {
  resize: vertical;
  min-height: 60px;
}
.el-input__prefix {
  display: flex;
  align-items: center;
  margin-right: 4px;
  color: #969799;
  font-size: 16px;
}
.el-input__suffix {
  display: flex;
  align-items: center;
  margin-left: 4px;
  color: #969799;
  font-size: 16px;
}
.el-input__clear {
  display: flex;
  align-items: center;
  margin-left: 4px;
  color: #c8c9cc;
  font-size: 16px;
  cursor: pointer;
}
.el-input__word-limit {
  margin-left: auto;
  flex-shrink: 0;
  padding-left: 4px;
  font-size: 12px;
  color: #c8c9cc;
  white-space: nowrap;
}
</style>
