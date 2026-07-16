<template>
  <div class="el-cascader-panel" :class="{ 'is-disabled': disabled }">
    <van-loading v-if="pageLoading" class="el-cascader-panel__loading" />

    <van-tabs
      v-else
      v-model="activeTab"
      animated
      swipeable
      :swipe-threshold="0"
      :color="activeColor"
    >
      <van-tab
        v-for="(tab, idx) in tabs"
        :key="idx"
        :title="tab.selectedOption ? tab.selectedOption[labelKey] : (placeholder || '请选择')"
        :title-class="tab.selectedOption ? 'el-cascader-panel__tab--selected' : 'el-cascader-panel__tab--unselected'"
      >
        <van-loading v-if="tab.loading" class="el-cascader-panel__loading" />
        <div v-else-if="!tab.options || !tab.options.length" class="el-cascader-panel__empty">
          <slot name="empty">暂无数据</slot>
        </div>
        <ul v-else class="el-cascader-panel__options">
          <li
            v-for="opt in tab.options"
            :key="opt[valueKey]"
            class="el-cascader-panel__option"
            :class="optionClasses(opt, idx)"
            @click="handleItemClick(opt, idx, $event)"
          >
            <span
              v-if="isMultiple"
              class="el-cascader-panel__custom-checkbox"
              :class="{
                checked: isNodeChecked(opt),
                indeterminate: isIndeterminate(opt),
                disabled: opt[disabledKey]
              }"
            >
              <van-icon v-if="isNodeChecked(opt)" name="success" />
              <van-icon v-else-if="isIndeterminate(opt)" name="minus" />
            </span>
            <span
              v-else-if="isCheckStrictly"
              class="el-cascader-panel__custom-radio"
              :class="{
                checked: isNodeChecked(opt),
                disabled: opt[disabledKey]
              }"
            >
              <span v-if="isNodeChecked(opt)" class="el-cascader-panel__radio-dot"></span>
            </span>
            <slot name="default" :node="opt" :data="opt">
              <span class="el-cascader-panel__label">{{ opt[labelKey] }}</span>
            </slot>
            <van-icon
              v-if="hasChildren(opt)"
              name="arrow"
              class="el-cascader-panel__option-arrow"
            />
            <van-icon
              v-if="!isMultiple && !isCheckStrictly && isOptionSelected(opt, idx)"
              name="success"
              class="el-cascader-panel__option-check"
            />
          </li>
        </ul>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tabs, Tab, Icon, Loading } from 'vant'

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

function collectLeafValues(opt, vKey, cKey) {
  const result = []
  function walk(node) {
    if (node[cKey] && node[cKey].length) {
      node[cKey].forEach(walk)
    } else {
      result.push(node[vKey])
    }
  }
  walk(opt)
  return result
}

export default {
  name: 'ElCascaderPanel',

  components: {
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Icon.name]: Icon,
    [Loading.name]: Loading,
  },

  props: {
    value: [String, Number, Array],
    options: { type: Array, default: () => [] },
    props: {
      type: Object,
      default: () => ({}),
    },
    separator: { type: String, default: ' / ' },
    disabled: Boolean,
    clearable: Boolean,
    showAllLevels: { type: Boolean, default: true },
    collapseTags: Boolean,
    debounce: { type: Number, default: 300 },
    checkStrictly: Boolean,
    activeColor: { type: String, default: '#1989fa' },
    placeholder: String,
  },

  data() {
    return {
      activeTab: 0,
      tabs: [],
      pageLoading: true,
      _lastToggleTime: 0,
    }
  },

  computed: {
    valueKey() { return this.props.value || 'value' },
    labelKey() { return this.props.label || 'label' },
    childrenKey() { return this.props.children || 'children' },
    disabledKey() { return this.props.disabled || 'disabled' },
    leafKey() { return this.props.leaf || 'leaf' },

    isMultiple() { return !!this.props.multiple },
    isCheckStrictly() {
      return this.checkStrictly || !!this.props.checkStrictly
    },
    isEmitPath() { return this.props.emitPath !== false },
    isLazy() { return !!this.props.lazy },
    lazyLoadFn() { return this.props.lazyLoad },

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
  },

  watch: {
    value: {
      immediate: true,
      handler() {
        if (this.isMultiple && this.tabs.length) return
        this.initTabs()
      },
    },
    options(newVal, oldVal) {
      if (oldVal && newVal === oldVal) return
      this.initTabs()
    },
  },

  created() {
    this.pageLoading = false
    this.initTabs()
  },

  methods: {
    initTabs() {
      if (!this.options || !this.options.length) {
        this.tabs = [{ options: [], selectedOption: null, loading: false }]
        return
      }

      if (this.isMultiple || this.value == null || this.value === '') {
        this.tabs = [{ options: this.options, selectedOption: null, loading: false }]
        return
      }

      const leafVal = this.isEmitPath && Array.isArray(this.value)
        ? this.value[this.value.length - 1]
        : this.value

      const path = findPath(this.options, leafVal, this.valueKey, this.childrenKey)
      if (path) {
        this.tabs = []
        let cursor = this.options
        for (let i = 0; i < path.length; i++) {
          this.tabs.push({ options: cursor, selectedOption: path[i], loading: false })
          cursor = path[i][this.childrenKey]
        }
        if (cursor && cursor.length) {
          this.tabs.push({ options: cursor, selectedOption: null, loading: false })
        }
        this.$nextTick(() => { this.activeTab = this.tabs.length - 1 })
      } else {
        this.tabs = [{ options: this.options, selectedOption: null, loading: false }]
      }
    },

    findPathByValue(val) {
      return findPath(this.options, val, this.valueKey, this.childrenKey)
    },

    hasChildren(opt) {
      if (this.isLazy) return opt[this.leafKey] !== true
      return opt[this.childrenKey] && opt[this.childrenKey].length > 0
    },

    isNodeChecked(opt) {
      if (this.isCheckStrictly) {
        return this.selectedLeafValues.indexOf(opt[this.valueKey]) !== -1
      }
      if (opt[this.childrenKey] && opt[this.childrenKey].length) {
        const descendants = collectLeafValues(opt, this.valueKey, this.childrenKey)
        return descendants.length > 0 && descendants.every(v => this.selectedLeafValues.indexOf(v) !== -1)
      }
      return this.selectedLeafValues.indexOf(opt[this.valueKey]) !== -1
    },

    isIndeterminate(opt) {
      if (!this.isMultiple || this.isCheckStrictly) return false
      if (!opt[this.childrenKey] || !opt[this.childrenKey].length) return false
      const descendants = collectLeafValues(opt, this.valueKey, this.childrenKey)
      const selected = descendants.filter(v => this.selectedLeafValues.indexOf(v) !== -1)
      return selected.length > 0 && selected.length < descendants.length
    },

    isOptionSelected(opt, tabIndex) {
      const tab = this.tabs[tabIndex]
      return !!(tab && tab.selectedOption && tab.selectedOption[this.valueKey] === opt[this.valueKey])
    },

    optionClasses(opt, tabIndex) {
      return {
        'is-disabled': !!opt[this.disabledKey],
        'is-selected': !this.isMultiple && this.isOptionSelected(opt, tabIndex),
        'is-active': this.isMultiple || this.isCheckStrictly ? this.isNodeChecked(opt) : false,
        'is-indeterminate': this.isIndeterminate(opt),
      }
    },

    buildEmitValue(leafValOrVals) {
      if (this.isMultiple) {
        const leafValues = Array.isArray(leafValOrVals) ? leafValOrVals : [leafValOrVals]
        if (this.isEmitPath) {
          return leafValues.map(v => {
            const path = this.findPathByValue(v)
            return path ? path.map(n => n[this.valueKey]) : [v]
          })
        }
        return leafValues
      }

      const leafValue = Array.isArray(leafValOrVals) ? leafValOrVals[leafValOrVals.length - 1] : leafValOrVals
      if (this.isEmitPath) {
        const path = this.findPathByValue(leafValue)
        return path ? path.map(n => n[this.valueKey]) : [leafValue]
      }
      return leafValue
    },

    emitValue(leafValOrVals) {
      const emitVal = this.buildEmitValue(leafValOrVals)
      this.$emit('input', emitVal)
      this.$emit('change', emitVal)
    },

    handleItemClick(opt, tabIndex, event) {
      if (opt[this.disabledKey]) return

      if (event && event.target && event.target.closest) {
        if (event.target.closest('.el-cascader-panel__custom-checkbox')) {
          this.toggleMultiSelect(opt)
          return
        }
        if (event.target.closest('.el-cascader-panel__custom-radio')) {
          this.selectAndClose(opt)
          return
        }
      }

      if (this.isLazy && this.lazyLoadFn && !opt[this.childrenKey] && opt[this.leafKey] !== true) {
        this.lazyLoadNode(opt, tabIndex)
        return
      }

      const hasCh = this.hasChildren(opt)

      this.$set(this.tabs[tabIndex], 'selectedOption', opt)

      if (this.tabs.length > tabIndex + 1) {
        this.tabs = this.tabs.slice(0, tabIndex + 1)
      }

      if (hasCh) {
        this.tabs.push({
          options: opt[this.childrenKey] || [],
          selectedOption: null,
          loading: false,
        })
        this.$nextTick(() => { this.activeTab = this.tabs.length - 1 })

        const pathValues = this.tabs
          .map(t => t.selectedOption)
          .filter(Boolean)
          .map(o => o[this.valueKey])
        this.$emit('expand-change', pathValues)
      }

      const isLeaf = !hasCh

      if (this.isMultiple) {
        if (this.isCheckStrictly || isLeaf) {
          this.toggleMultiSelect(opt)
        }
        return
      }

      if (this.isCheckStrictly) {
        if (isLeaf) {
          this.selectAndClose(opt)
        }
        return
      }

      if (isLeaf) {
        this.selectAndClose(opt)
      }
    },

    toggleMultiSelect(opt) {
      const now = Date.now()
      if (now - this._lastToggleTime < 200) return
      this._lastToggleTime = now

      const val = opt[this.valueKey]
      let current = [...this.selectedLeafValues]

      if (this.isCheckStrictly) {
        if (current.indexOf(val) !== -1) {
          current = current.filter(v => v !== val)
        } else {
          current.push(val)
        }
      } else if (opt[this.childrenKey]) {
        const descendants = collectLeafValues(opt, this.valueKey, this.childrenKey)
        const allSelected = descendants.every(v => current.indexOf(v) !== -1)
        if (allSelected) {
          current = current.filter(v => descendants.indexOf(v) === -1)
        } else {
          descendants.forEach(v => {
            if (current.indexOf(v) === -1) current.push(v)
          })
        }
      } else {
        if (current.indexOf(val) !== -1) {
          current = current.filter(v => v !== val)
        } else {
          current.push(val)
        }
      }

      this.emitValue(current)
    },

    lazyLoadNode(opt, tabIndex) {
      const tab = this.tabs[tabIndex]
      if (tab.loading) return
      tab.loading = true

      const node = {
        value: opt[this.valueKey],
        label: opt[this.labelKey],
        level: tabIndex,
        isLeaf: opt[this.leafKey] === true,
        isDisabled: !!opt[this.disabledKey],
        children: opt[this.childrenKey] || [],
        data: opt,
      }

      this.lazyLoadFn(node, (children) => {
          tab.loading = false
        if (children && children.length) {
          this.$set(opt, this.childrenKey, children)
          this.$set(opt, 'loaded', true)
          this.$set(this.tabs[tabIndex], 'selectedOption', opt)
          if (this.tabs.length > tabIndex + 1) {
            this.tabs = this.tabs.slice(0, tabIndex + 1)
          }
          this.tabs.push({
            options: children,
            selectedOption: null,
            loading: false,
          })
          this.$nextTick(() => { this.activeTab = this.tabs.length - 1 })
          const pathValues = this.tabs
            .map(t => t.selectedOption)
            .filter(Boolean)
            .map(o => o[this.valueKey])
          this.$emit('expand-change', pathValues)
        } else {
          this.$set(opt, this.leafKey, true)
          if (this.isMultiple) {
            this.toggleMultiSelect(opt)
          } else {
            this.selectAndClose(opt)
          }
        }
      })
    },

    selectAndClose(opt) {
      this.emitValue(opt[this.valueKey])
      this.$emit('close')
    },

    getCheckedNodes(leafOnly) {
      const nodes = this.selectedLeafValues.map(v => {
        const path = this.findPathByValue(v)
        if (!path) return null
        const leaf = path[path.length - 1]
        return {
          value: leaf[this.valueKey],
          label: leaf[this.labelKey],
          data: leaf,
          pathNodes: path,
          pathValues: path.map(n => n[this.valueKey]),
          pathLabels: path.map(n => n[this.labelKey]),
          isLeaf: !this.hasChildren(leaf),
          level: path.length - 1,
        }
      }).filter(Boolean)

      if (leafOnly) return nodes.filter(n => n.isLeaf)
      return nodes
    },
  },
}
</script>

<style>
.el-cascader-panel {
  border-radius: 4px;
  font-size: 14px;
}

.el-cascader-panel.is-disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.el-cascader-panel .van-tabs__wrap {
  border-bottom: 1px solid #ebedf0;
  height: 44px;
}

.el-cascader-panel .van-tab {
  font-size: 14px;
  line-height: 44px;
  height: 44px;
  flex: none;
  padding: 0 16px;
}

.el-cascader-panel .van-tabs__content {
  min-height: 100px;
}

.el-cascader-panel__loading {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
}

.el-cascader-panel__empty {
  text-align: center;
  color: #969799;
  font-size: 14px;
  padding: 40px 0;
}

.el-cascader-panel__options {
  box-sizing: border-box;
  max-height: 300px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 6px 0;
  margin: 0;
  list-style: none;
}

.el-cascader-panel__option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;
  transition: background-color 0.1s;
}

.el-cascader-panel__option:active {
  background-color: #f2f3f5;
}

.el-cascader-panel__option.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.el-cascader-panel__option.is-selected,
.el-cascader-panel__option.is-active {
  color: #1989fa;
  font-weight: 500;
}

.el-cascader-panel__custom-checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: 1px solid #c8c9cc;
  border-radius: 50%;
  box-sizing: border-box;
  margin-right: 8px;
  flex-shrink: 0;
  cursor: pointer;
  transition: all 0.2s;
  background: #fff;
}

.el-cascader-panel__custom-checkbox.checked,
.el-cascader-panel__custom-checkbox.indeterminate {
  border-color: #1989fa;
  background-color: #1989fa;
}

.el-cascader-panel__custom-checkbox.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.el-cascader-panel__custom-checkbox .van-icon {
  color: #fff;
  font-size: 14px;
}

.el-cascader-panel__custom-radio {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: 1px solid #c8c9cc;
  border-radius: 50%;
  box-sizing: border-box;
  margin-right: 8px;
  flex-shrink: 0;
  cursor: pointer;
  transition: all 0.2s;
  background: #fff;
}

.el-cascader-panel__custom-radio.checked {
  border-color: #1989fa;
}

.el-cascader-panel__custom-radio.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.el-cascader-panel__radio-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #1989fa;
}

.el-cascader-panel__label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.el-cascader-panel__option-arrow {
  color: #c8c9cc;
  font-size: 14px;
  flex-shrink: 0;
  margin-left: 4px;
}

.el-cascader-panel__option-check {
  color: #1989fa;
  font-size: 16px;
  flex-shrink: 0;
  margin-left: 4px;
}

.el-cascader-panel__tab--selected {
  color: #1989fa !important;
  font-weight: 500;
}

.el-cascader-panel__tab--unselected {
  color: #969799;
}
</style>
