<template>
  <div
    class="el-cascader"
    :class="[
      size ? 'el-cascader--' + size : '',
      { 'is-disabled': disabled, 'is-focused': focused }
    ]"
    tabindex="0"
    @click="handleTriggerClick"
  >
    <div class="el-cascader__trigger">
      <template v-if="isMultiple && multipleSelectedNodes.length">
        <van-tag
          v-for="(item, idx) in displayTags"
          :key="idx"
          closeable
          size="small"
          class="el-cascader__tag"
          @close="handleRemoveTag(item)"
          @click.stop
        >
          {{ item.displayLabel }}
        </van-tag>
        <span v-if="collapsedCount" class="el-cascader__collapse-tags">+{{ collapsedCount }}</span>
      </template>
      <span v-else-if="displayText" class="el-cascader__value">{{ displayText }}</span>
      <span v-else class="el-cascader__placeholder">{{ placeholder || '请选择' }}</span>
      <van-icon v-if="showClear" name="clear" class="el-cascader__clear" @click.stop="handleClear" />
    </div>

    <van-popup
      v-model="popupVisible"
      position="bottom"
      round
      :class="popupClass"
      get-container="body"
      @opened="handlePopupOpened"
      @closed="handlePopupClosed"
    >
      <van-search
        v-if="filterable"
        v-model="searchInput"
        placeholder="请输入关键词搜索"
        shape="round"
        @input="handleSearchInput"
      />

      <div v-show="searchKeyword" class="el-cascader__suggestions">
        <div v-if="!filteredResults.length" class="el-cascader__empty">
          <slot name="empty">无匹配数据</slot>
        </div>
        <ul v-else class="el-cascader__suggestions-list">
          <li
            v-for="item in filteredResults"
            :key="item.node[valueKey]"
            class="el-cascader__suggestion-item"
            :class="{ 'is-checked': isLeafChecked(item.node) }"
            @click="handleSuggestionClick(item)"
          >
            <slot name="default" :node="item.node" :data="item.node">
              <span>{{ item.pathLabels.join(separator || ' / ') }}</span>
            </slot>
            <van-icon v-if="isLeafChecked(item.node)" name="success" class="el-cascader__option-check" />
          </li>
        </ul>
      </div>

      <div v-show="!searchKeyword">
        <el-cascader-panel
          ref="panel"
          :value="value"
          :options="options"
          :props="panelProps"
          :disabled="disabled"
          :check-strictly="checkStrictly"
          :active-color="activeColor"
          @input="handlePanelChange"
          @close="handlePanelClose"
          @expand-change="handleExpandChange"
        >
          <template #default="{ node, data }">
            <slot name="default" :node="node" :data="data" />
          </template>
        </el-cascader-panel>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Popup, Icon, Tag, Search } from 'vant'
import ElCascaderPanel from './el-cascader-panel.vue'

function findPath(options, value, vKey, cKey) {
  if (!options) return null
  for (let i = 0; i < options.length; i++) {
    const opt = options[i]
    if (opt[vKey] === value) return [opt]
    if (opt[cKey]) {
      const p = findPath(opt[cKey], value, vKey, cKey)
      if (p) return [opt, ...p]
    }
  }
  return null
}

export default {
  name: 'ElCascader',

  components: {
    [Popup.name]: Popup,
    [Icon.name]: Icon,
    [Tag.name]: Tag,
    [Search.name]: Search,
    ElCascaderPanel,
  },

  inject: {
    elFormItem: { default: null },
    elFormItemFieldState: { default: null },
  },

  props: {
    value: [String, Number, Array],
    options: { type: Array, default: () => [] },
    props: {
      type: Object,
      default: () => ({}),
    },
    placeholder: String,
    size: String,
    disabled: Boolean,
    clearable: Boolean,
    showAllLevels: { type: Boolean, default: true },
    collapseTags: Boolean,
    separator: { type: String, default: ' / ' },
    filterable: Boolean,
    filterMethod: Function,
    debounce: { type: Number, default: 300 },
    beforeFilter: Function,
    popperClass: String,
    title: String,
    activeColor: { type: String, default: '#1989fa' },
    checkStrictly: Boolean,
  },

  data() {
    return {
      popupVisible: false,
      searchInput: '',
      searchKeyword: '',
      debounceTimer: null,
      focused: false,
      _lastRemoveTime: 0,
    }
  },

  computed: {
    valueKey() { return this.props.value || 'value' },
    labelKey() { return this.props.label || 'label' },
    childrenKey() { return this.props.children || 'children' },
    disabledKey() { return this.props.disabled || 'disabled' },

    isMultiple() { return !!this.props.multiple },
    isCheckStrictly() { return !!this.props.checkStrictly },
    isEmitPath() { return this.props.emitPath !== false },

    panelProps() {
      return {
        ...this.props,
        emitPath: this.isEmitPath,
      }
    },

    popupClass() {
      return ['el-cascader__popup', this.popperClass].filter(Boolean)
    },

    selectedLeafValues() {
      if (!this.isMultiple) {
        const val = this.isEmitPath && Array.isArray(this.value)
          ? this.value[this.value.length - 1]
          : this.value
        return (val != null && val !== '') ? [val] : []
      }
      if (!Array.isArray(this.value) || !this.value.length) return []
      if (this.isEmitPath) {
        return this.value.map(p => Array.isArray(p) ? p[p.length - 1] : p)
      }
      return this.value
    },

    multipleSelectedNodes() {
      if (!this.isMultiple) return []
      return this.selectedLeafValues.map(v => {
        const path = findPath(this.options, v, this.valueKey, this.childrenKey)
        if (!path) return null
        const labels = path.map(n => n[this.labelKey])
        return {
          node: path[path.length - 1],
          path,
          displayLabel: this.showAllLevels
            ? labels.join(this.separator)
            : labels[labels.length - 1],
        }
      }).filter(Boolean)
    },

    displayTags() {
      if (this.collapseTags) {
        return this.multipleSelectedNodes.slice(0, 1)
      }
      return this.multipleSelectedNodes
    },

    collapsedCount() {
      if (!this.collapseTags) return 0
      const total = this.multipleSelectedNodes.length
      return Math.max(0, total - 1)
    },

    displayText() {
      const vals = this.selectedLeafValues
      if (!vals.length) return ''
      const path = findPath(this.options, vals[0], this.valueKey, this.childrenKey)
      if (!path) return ''
      const labels = path.map(n => n[this.labelKey])
      return this.showAllLevels ? labels.join(this.separator) : labels[labels.length - 1]
    },

    showClear() {
      if (!this.clearable || this.disabled) return false
      if (this.isMultiple) return Array.isArray(this.value) && this.value.length > 0
      return !!(this.value || this.value === 0)
    },

    filteredResults() {
      if (!this.searchKeyword) return []
      const keyword = this.searchKeyword.toLowerCase()
      const results = []
      const collectDescendants = (parent, parentPath) => {
        const children = parent[this.childrenKey]
        if (!children || !children.length) return
        for (const child of children) {
          const childPath = [...parentPath, child]
          results.push({
            node: child,
            path: childPath,
            pathLabels: childPath.map(n => n[this.labelKey]),
          })
          if (child[this.childrenKey]) {
            collectDescendants(child, childPath)
          }
        }
      }
      const walk = (opts, ancestors) => {
        for (const opt of opts) {
          const label = String(opt[this.labelKey] || '').toLowerCase()
          const match = this.filterMethod
            ? this.filterMethod(opt, this.searchKeyword)
            : label.indexOf(keyword) !== -1
          if (match) {
            const path = [...ancestors, opt]
            results.push({
              node: opt,
              path,
              pathLabels: path.map(n => n[this.labelKey]),
            })
            if (opt[this.childrenKey]) {
              collectDescendants(opt, path)
            }
          }
          if (opt[this.childrenKey]) {
            walk(opt[this.childrenKey], [...ancestors, opt])
          }
        }
      }
      walk(this.options || [], [])
      const seen = new Set()
      return results.filter(r => {
        const key = r.node[this.valueKey]
        if (seen.has(key)) return false
        seen.add(key)
        return true
      })
    },
  },

  watch: {
    value() {
      this.searchKeyword = ''
      this.searchInput = ''
    },
  },

  created() {
    if (this.elFormItemFieldState) {
      this.elFormItemFieldState.isLink = true
      this.elFormItemFieldState.readonly = true
    }
  },

  methods: {
    isLeafChecked(opt) {
      return this.selectedLeafValues.indexOf(opt[this.valueKey]) !== -1
    },

    handleTriggerClick() {
      if (this.disabled || this.popupVisible) return
      this.$emit('focus')
      this.focused = true
      this.searchInput = ''
      this.searchKeyword = ''
      this.popupVisible = true
      this.$emit('visible-change', true)
    },

    handleSearchInput(val) {
      if (this.beforeFilter) {
        const result = this.beforeFilter(val)
        if (result === false) return
      }
      clearTimeout(this.debounceTimer)
      this.debounceTimer = setTimeout(() => {
        this.searchKeyword = this.searchInput
      }, this.debounce)
    },

    handleSuggestionClick(item) {
      if (item.node[this.disabledKey]) return

      if (this.isMultiple) {
        this.$refs.panel && this.$refs.panel.toggleMultiSelect(item.node)
      } else {
        this.$refs.panel && this.$refs.panel.selectAndClose(item.node)
      }
    },

    handlePanelChange(val) {
      this.$emit('input', val)
      this.$emit('change', val)
      if (!this.isMultiple) {
        this.popupVisible = false
      }
    },

    handlePanelClose() {
      this.popupVisible = false
    },

    handleExpandChange(pathValues) {
      this.$emit('expand-change', pathValues)
    },

    handleClear() {
      if (this.isMultiple) {
        this.$emit('input', [])
        this.$emit('change', [])
      } else {
        this.$emit('input', '')
        this.$emit('change', '')
      }
      this.$emit('clear')
    },

    handleRemoveTag(item) {
      const now = Date.now()
      if (now - this._lastRemoveTime < 200) return
      this._lastRemoveTime = now
      const key = item.node[this.valueKey]
      let current = [...this.selectedLeafValues]
      current = current.filter(v => v !== key)
      this.$emit('input', current)
      this.$emit('change', current)
      this.$emit('remove-tag', key)
    },

    handlePopupOpened() {
      this.$emit('visible-change', true)
    },

    handlePopupClosed() {
      this.focused = false
      this.$emit('blur')
      this.$emit('visible-change', false)
      this.searchKeyword = ''
      this.searchInput = ''
    },

    getCheckedNodes(leafOnly) {
      if (this.$refs.panel) {
        return this.$refs.panel.getCheckedNodes(leafOnly)
      }
      return []
    },
  },
}
</script>

<style scoped>
.el-cascader {
  display: flex;
  align-items: center;
  flex: 1;
  min-height: 36px;
  cursor: pointer;
  position: relative;
  outline: none;
}
.el-cascader.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.el-cascader__trigger {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex: 1;
  min-height: 24px;
  gap: 4px;
}
.el-cascader__value {
  color: #323233;
  font-size: inherit;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.el-cascader__placeholder {
  color: #c8c9cc;
  font-size: inherit;
}
.el-cascader__clear {
  margin-left: auto;
  color: #c8c9cc;
  font-size: 16px;
  cursor: pointer;
  flex-shrink: 0;
}
.el-cascader__tag {
  max-width: 120px;
}
.el-cascader__collapse-tags {
  color: #969799;
  font-size: 12px;
  margin-left: 2px;
}
.el-cascader__empty {
  text-align: center;
  color: #969799;
  font-size: 14px;
  padding: 40px 0;
}
.el-cascader__suggestions-list {
  max-height: 400px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 0;
  margin: 0;
  list-style: none;
}
.el-cascader__suggestion-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;
  border-bottom: 1px solid #ebedf0;
}
.el-cascader__suggestion-item:active {
  background-color: #f2f3f5;
}
.el-cascader__suggestion-item.is-checked {
  color: #1989fa;
}
.el-cascader__option-check {
  color: #1989fa;
  font-size: 16px;
  flex-shrink: 0;
  margin-left: 4px;
}
.el-cascader__popup {
  max-height: 80vh;
}
.el-cascader--large {
  min-height: 44px;
  font-size: 16px;
}
.el-cascader--small {
  min-height: 32px;
  font-size: 13px;
}
.el-cascader--mini {
  min-height: 28px;
  font-size: 12px;
}
</style>
