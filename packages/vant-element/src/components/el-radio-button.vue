<template>
  <label
    class="el-radio-button"
    :class="[
      buttonSize ? `el-radio-button--${buttonSize}` : '',
      {
        'is-active': isChecked,
        'is-disabled': isDisabled
      }
    ]"
    role="radio"
    :aria-checked="isChecked"
    :aria-disabled="isDisabled"
  >
    <input
      ref="radio"
      class="el-radio-button__original-radio"
      type="radio"
      :value="label"
      :name="name"
      :disabled="isDisabled"
      :checked="isChecked"
      @change="handleChange"
    >
    <span
      class="el-radio-button__inner"
      :style="isChecked ? innerStyle : undefined"
    >
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script>
export default {
  name: 'ElRadioButton',
  props: {
    label: [String, Number],
    disabled: Boolean,
    name: String,
    checkedColor: { type: String, default: '#409eff' },
    size: String
  },
  inject: {
    radioGroup: { default: null }
  },
  computed: {
    isChecked() {
      return this.radioGroup ? this.radioGroup.value === this.label : false
    },
    isDisabled() {
      return this.radioGroup ? this.radioGroup.disabled || this.disabled : this.disabled
    },
    buttonSize() {
      return this.size || (this.radioGroup ? this.radioGroup.size : '')
    },
    buttonCheckedColor() {
      return this.radioGroup && this.radioGroup.checkedColor
        ? this.radioGroup.checkedColor
        : this.checkedColor
    },
    activeFill() {
      return this.radioGroup ? this.radioGroup.fill : ''
    },
    activeTextColor() {
      return this.radioGroup ? this.radioGroup.textColor : ''
    },
    innerStyle() {
      const fill = this.activeFill || this.buttonCheckedColor
      const style = {}
      if (fill) {
        style.backgroundColor = fill
        style.borderColor = fill
      }
      if (this.activeTextColor) {
        style.color = this.activeTextColor
      }
      return style
    }
  },
  methods: {
    handleChange() {
      if (this.isDisabled) return
      if (this.radioGroup) {
        this.radioGroup.$emit('input', this.label)
        this.radioGroup.$emit('change', this.label)
      }
    }
  }
}
</script>

<style>
.el-radio-button {
  display: inline-block;
  vertical-align: middle;
  position: relative;
  cursor: pointer;
  outline: none;
}

.el-radio-button__original-radio {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
}

.el-radio-button__inner {
  display: inline-block;
  padding: 10px 20px;
  font-size: 14px;
  color: #606266;
  background: #fff;
  border: 1px solid #dcdfe6;
  transition: all 0.3s;
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
  line-height: 1;
}

.el-radio-button:first-child .el-radio-button__inner {
  border-radius: 4px 0 0 4px;
}

.el-radio-button:last-child .el-radio-button__inner {
  border-radius: 0 4px 4px 0;
}

.el-radio-button:not(:first-child) .el-radio-button__inner {
  margin-left: -1px;
}

.el-radio-button:hover .el-radio-button__inner {
  color: #409eff;
}

.el-radio-button.is-active .el-radio-button__inner {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
  z-index: 1;
}

.el-radio-button.is-disabled {
  cursor: not-allowed;
}

.el-radio-button.is-disabled .el-radio-button__inner {
  color: #c0c4cc;
  cursor: not-allowed;
  background-color: #f5f7fa;
  border-color: #e4e7ed;
}

.el-radio-button.is-disabled:hover .el-radio-button__inner {
  color: #c0c4cc;
}

.el-radio-button--medium .el-radio-button__inner {
  padding: 10px 20px;
  font-size: 14px;
}

.el-radio-button--small .el-radio-button__inner {
  padding: 8px 15px;
  font-size: 12px;
}

.el-radio-button--mini .el-radio-button__inner {
  padding: 6px 12px;
  font-size: 12px;
}
</style>
