<template>
  <div class="el-select" @click="onClickField">
    <span v-if="displayText" class="el-select__value">{{ displayText }}</span>
    <span v-else class="el-select__placeholder">{{ placeholder }}</span>

    <van-icon v-if="showClear" name="clear" class="el-select__clear" @touchstart.prevent="onClear" @mousedown.prevent="onClear" />

    <div style="display:none"><slot /></div>

    <van-popup
      v-if="!disabled && popupVisible"
      :value="popupVisible"
      @input="onPopupInput"
      position="bottom"
      round
      :style="{ maxHeight: '60vh' }"
      get-container="body"
    >
      <van-search
        v-if="filterable"
        v-model="searchQuery"
        placeholder="搜索"
        shape="round"
        @input="onSearchInput"
      />
      <div v-if="filterable && filteredOptions.length === 0" style="padding:30px 0;text-align:center;color:#969799;font-size:14px">
        {{ noMatchText || '无匹配数据' }}
      </div>

      <!-- 多选模式：自定义列表 -->
      <template v-if="multiple">
        <div class="el-select__toolbar">
          <div class="el-select__toolbar-btn" @click="onCancel">{{ cancelButtonText || '取消' }}</div>
          <div class="el-select__toolbar-title">{{ title || placeholder || '' }}</div>
          <div class="el-select__toolbar-btn" @click="onMultipleConfirm">{{ confirmButtonText || '确定' }}</div>
        </div>
        <div class="el-select__options">
          <div
            v-for="opt in filteredOptions"
            :key="opt.value"
            class="el-select__option"
            :class="{ 'is-selected': isSelected(opt.value), 'is-disabled': opt.disabled }"
            @click="toggleOption(opt)"
          >
            <span class="el-select__option-check">
              <van-icon :name="isSelected(opt.value) ? 'success' : 'circle-o'" :color="isSelected(opt.value) ? '#1989fa' : '#c8c9cc'" />
            </span>
            <span class="el-select__option-label">{{ opt.label }}</span>
          </div>
          <div v-if="filteredOptions.length === 0 && !filterable" style="padding:30px 0;text-align:center;color:#969799;font-size:14px">
            {{ noDataText || '暂无数据' }}
          </div>
        </div>
      </template>

      <!-- 单选模式：van-picker -->
      <van-picker
        v-else
        v-show="!filterable || filteredOptions.length > 0"
        :key="pickerKey"
        :default-index="currentPickerIndex"
        :columns="pickerColumns"
        @confirm="onConfirm"
        @cancel="onCancel"
        :item-height="44"
        :visible-item-count="5"
        :title="placeholder || title"
        show-toolbar
      />
    </van-popup>
  </div>
</template>

<script>
import { Icon, Popup, Picker, Search, Button } from 'vant'

export default {
  components: { [Icon.name]: Icon, [Popup.name]: Popup, [Picker.name]: Picker, [Search.name]: Search, [Button.name]: Button },
  name: 'ElSelect',
  inject: {
    elFormItem: { default: null },
    elFormItemFieldState: { default: null }
  },
  props: {
    value: [String, Number, Array],
    placeholder: String,
    disabled: Boolean,
    clearable: Boolean,
    filterable: Boolean,
    multiple: Boolean,
    collapseTags: Boolean,
    collapseTagsTooltip: Boolean,
    loading: Boolean,
    loadingText: String,
    noMatchText: String,
    noDataText: String,
    popperClass: String,
    reserveKeyword: Boolean,
    defaultFirstOption: Boolean,
    automaticDropdown: Boolean,
    clearIcon: { type: String, default: 'circle-close' },
    remote: Boolean,
    remoteMethod: Function,
    multipleLimit: { type: Number, default: 0 },
    title: String,
    confirmButtonText: String,
    cancelButtonText: String
  },
  data() {
    return {
      popupVisible: false,
      options: [],
      currentPickerIndex: 0,
      searchQuery: '',
      pickerKey: 0
    }
  },
  computed: {
    displayText() {
      if (this.multiple) {
        const selected = this.options.filter(o => this.value && this.value.includes(o.value))
        if (this.collapseTags) {
          return selected.map(o => o.label).slice(0, 1).join(', ') + (selected.length > 1 ? ` +${selected.length - 1}` : '')
        }
        return selected.map(o => o.label).join(', ')
      }
      const option = this.options.find(o => o.value === this.value)
      return option ? option.label : ''
    },
    showClear() {
      if (!this.clearable || this.disabled) return false
      if (!this.value && this.value !== 0) return false
      if (Array.isArray(this.value) && !this.value.length) return false
      return true
    },
    filteredOptions() {
      if (!this.searchQuery) return this.options
      const q = this.searchQuery.toLowerCase()
      return this.options.filter(o => o.label.toLowerCase().includes(q))
    },
    _pickerSource() {
      let opts = this.filterable ? this.filteredOptions : this.options
      if (!this.multiple) opts = opts.filter(o => !o.disabled)
      return opts
    },
    pickerColumns() {
      return [{ values: this._pickerSource.map(o => o.label) }]
    },
    pickerIndex() {
      const idx = this._pickerSource.findIndex(o => o.value === this.value)
      return idx >= 0 ? idx : 0
    }
  },
  provide() {
    return {
      elSelect: this
    }
  },
  created() {
    this._optionMap = {}
    if (this.elFormItemFieldState) {
      this.elFormItemFieldState.isLink = true
      this.elFormItemFieldState.readonly = true
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
    addOption(option) {
      this._optionMap[option.value] = option
      this.options = Object.values(this._optionMap)
    },
    removeOption(option) {
      delete this._optionMap[option.value]
      this.options = Object.values(this._optionMap)
    },
    onClickField() {
      if (!this.disabled) {
        this.searchQuery = ''
        this.currentPickerIndex = this.pickerIndex
        this.popupVisible = true
        this.$emit('visible-change', true)
      }
    },
    onSearchInput(val) {
      this.pickerKey++
      this.currentPickerIndex = 0
    },
    onPopupInput(val) {
      this.popupVisible = val
      if (!val) this.$emit('visible-change', false)
    },
    isSelected(val) {
      return this.value && this.value.includes(val)
    },
    toggleOption(opt) {
      if (opt.disabled) return
      const current = this.value ? [...this.value] : []
      const idx = current.indexOf(opt.value)
      if (idx >= 0) {
        current.splice(idx, 1)
      } else {
        if (this.multipleLimit && current.length >= this.multipleLimit) return
        current.push(opt.value)
      }
      this.$emit('input', current)
      this.$emit('change', current)
    },
    onMultipleConfirm() {
      this.popupVisible = false
      this.$emit('visible-change', false)
    },
    onConfirm(values, indexes) {
      const selectedIndex = indexes ? indexes[0] : 0
      const filtered = this.filterable ? this.filteredOptions : this.options
      const available = filtered.filter(o => !o.disabled)
      const selected = available[selectedIndex]
      if (!selected) return
      this.$emit('input', selected.value)
      this.$emit('change', selected.value)
      this.popupVisible = false
      this.$emit('visible-change', false)
    },
    onCancel() {
      this.popupVisible = false
      this.$emit('visible-change', false)
    },
    onClear() {
      const newVal = this.multiple ? [] : ''
      this.$emit('input', newVal)
      this.$emit('change', newVal)
      this.$emit('clear')
    }
  }
}
</script>

<style>
.el-select {
  display: flex;
  align-items: center;
  flex: 1;
  min-height: 24px;
  cursor: pointer;
}
.el-select__value {
  color: #323233;
  font-size: inherit;
}
.el-select__placeholder {
  color: #c8c9cc;
  font-size: inherit;
}
.el-select__clear {
  margin-left: auto;
  color: #c8c9cc;
  font-size: 16px;
  cursor: pointer;
}

/* 多选选项列表 */
.el-select__options {
  max-height: 40vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.el-select__option {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  font-size: 14px;
  cursor: pointer;
  border-bottom: 1px solid #f5f6fa;
}
.el-select__option:active {
  background: #f2f3f5;
}
.el-select__option.is-selected {
  color: #1989fa;
  font-weight: 500;
}
.el-select__option-check {
  margin-right: 8px;
  display: flex;
  font-size: 18px;
  flex-shrink: 0;
}
.el-select__option-label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 多选工具栏 — 与 van-picker toolbar 风格一致 */
.el-select__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 44px;
  border-bottom: 1px solid #ebedf0;
}
.el-select__toolbar-title {
  font-size: 16px;
  font-weight: 500;
  color: #323233;
}
.el-select__toolbar-btn {
  font-size: 14px;
  color: #1989fa;
  padding: 0 16px;
  cursor: pointer;
  min-width: 56px;
}
.el-select__toolbar-btn:first-child {
  color: #969799;
}
.el-select__toolbar-btn:active {
  opacity: 0.6;
}

/* 多选禁用选项 */
.el-select__option.is-disabled {
  color: #c8c9cc;
  cursor: not-allowed;
}
.el-select__option.is-disabled:active {
  background: transparent;
}
</style>
