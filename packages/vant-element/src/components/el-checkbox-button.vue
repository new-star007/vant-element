<template>
  <label
    class="el-checkbox-button"
    :class="[
      buttonSize ? `el-checkbox-button--${buttonSize}` : '',
      {
        'is-active': isChecked,
        'is-disabled': isDisabled
      }
    ]"
    role="checkbox"
    :aria-checked="isChecked"
    :aria-disabled="isDisabled"
  >
    <input
      ref="checkbox"
      class="el-checkbox-button__original"
      type="checkbox"
      :value="label"
      :name="name"
      :disabled="isDisabled"
      :checked="isChecked"
      @change="handleChange"
    >
    <span
      class="el-checkbox-button__inner"
      :style="isChecked ? innerStyle : undefined"
    >
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script>
export default {
  name: 'ElCheckboxButton',
  props: {
    label: [String, Number, Boolean],
    disabled: Boolean,
    name: String,
    checkedColor: { type: String, default: '#409eff' },
    size: String
  },
  inject: {
    checkboxGroup: { default: null }
  },
  computed: {
    isChecked() {
      if (this.checkboxGroup) {
        return this.checkboxGroup.value.includes(this.label)
      }
      return false
    },
    isDisabled() {
      if (this.checkboxGroup) {
        return this.checkboxGroup.disabled || this.disabled
      }
      return this.disabled
    },
    buttonSize() {
      return this.size || (this.checkboxGroup ? this.checkboxGroup.size : '')
    },
    buttonCheckedColor() {
      return this.checkboxGroup && this.checkboxGroup.checkedColor
        ? this.checkboxGroup.checkedColor
        : this.checkedColor
    },
    activeFill() {
      return this.checkboxGroup ? this.checkboxGroup.fill : ''
    },
    activeTextColor() {
      return this.checkboxGroup ? this.checkboxGroup.textColor : ''
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
      if (this.checkboxGroup) {
        const value = [].concat(this.checkboxGroup.value)
        const index = value.indexOf(this.label)
        if (index > -1) {
          value.splice(index, 1)
        } else {
          value.push(this.label)
        }
        this.checkboxGroup.$emit('input', value)
        this.checkboxGroup.$emit('change', value)
      }
    }
  }
}
</script>

<style>
.el-checkbox-button {
  position: relative;
  display: inline-block;
  outline: none;
  cursor: pointer;
}

.el-checkbox-button__original {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
}

.el-checkbox-button__inner {
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

.el-checkbox-button:first-child .el-checkbox-button__inner {
  border-radius: 4px 0 0 4px;
}

.el-checkbox-button:last-child .el-checkbox-button__inner {
  border-radius: 0 4px 4px 0;
}

.el-checkbox-button:not(:first-child) .el-checkbox-button__inner {
  margin-left: -1px;
}

.el-checkbox-button:hover .el-checkbox-button__inner {
  color: #409eff;
}

.el-checkbox-button.is-active .el-checkbox-button__inner {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
  z-index: 1;
}

.el-checkbox-button.is-disabled {
  cursor: not-allowed;
}

.el-checkbox-button.is-disabled .el-checkbox-button__inner {
  color: #c0c4cc;
  cursor: not-allowed;
  background-color: #f5f7fa;
  border-color: #e4e7ed;
}

.el-checkbox-button.is-disabled:hover .el-checkbox-button__inner {
  color: #c0c4cc;
}

.el-checkbox-button--medium .el-checkbox-button__inner {
  padding: 10px 20px;
  font-size: 14px;
}

.el-checkbox-button--small .el-checkbox-button__inner {
  padding: 8px 15px;
  font-size: 12px;
}

.el-checkbox-button--mini .el-checkbox-button__inner {
  padding: 6px 12px;
  font-size: 12px;
}
</style>
