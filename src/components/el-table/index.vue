<template>
  <div
    ref="elTable"
    class="el-table"
    :class="[
      { 'el-table--striped': stripe, 'el-table--border': border },
      size ? `el-table--${size}` : '',
      scrollStateClass
    ]"
    :style="layout.containerStyle"
  >
    <div style="display:none"><slot /></div>

    <template v-if="store.filteredData && store.filteredData.length">
      <div v-if="showHeader !== false" ref="headerWrapper" class="el-table__header-wrapper" :style="layout.headerWrapperStyle">
        <table-header :store="store" :layout="layout" @header-click="emitHeaderClick" @header-dblclick="emitHeaderDblClick" @header-contextmenu="emitHeaderContextmenu" />
      </div>

      <div ref="bodyWrapper" class="el-table__body-wrapper" :style="layout.bodyWrapperStyle" @scroll="onBodyScroll">
        <table-body
          :store="store"
          :layout="layout"
          @row-click="emitRowClick"
          @row-dblclick="emitRowDblClick"
          @row-contextmenu="emitRowContextmenu"
          @cell-click="emitCellClick"
          @cell-dblclick="emitCellDblClick"
          @cell-mouse-enter="emitCellMouseEnter"
          @cell-mouse-leave="emitCellMouseLeave"
        >
          <template v-for="name in passthroughSlotNames" :slot="name" slot-scope="props">
            <slot :name="name" v-bind="props" />
          </template>
        </table-body>
      </div>

      <div v-if="layout.hasFixedLeft" ref="fixedWrapper" class="el-table__fixed" :style="layout.fixedWrapperStyle">
        <div ref="fixedHeaderWrapper" class="el-table__fixed-header-wrapper">
          <table-header :store="store" :layout="layout" fixed="left" />
        </div>
        <div ref="fixedBodyWrapper" class="el-table__fixed-body-wrapper" :style="{ height: fixedBodyHeight }" @mousewheel="handleFixedMousewheel">
          <table-body :store="store" :layout="layout" fixed="left">
            <template v-for="name in passthroughSlotNames" :slot="name" slot-scope="props">
              <slot :name="name" v-bind="props" />
            </template>
          </table-body>
        </div>
      </div>

      <div v-if="layout.hasFixedRight" ref="rightFixedWrapper" class="el-table__fixed-right" :style="layout.rightFixedWrapperStyle">
        <div ref="rightFixedHeaderWrapper" class="el-table__fixed-header-wrapper">
          <table-header :store="store" :layout="layout" fixed="right" />
        </div>
        <div ref="rightFixedBodyWrapper" class="el-table__fixed-body-wrapper" :style="{ height: fixedBodyHeight }" @mousewheel="handleFixedMousewheel">
          <table-body :store="store" :layout="layout" fixed="right">
            <template v-for="name in passthroughSlotNames" :slot="name" slot-scope="props">
              <slot :name="name" v-bind="props" />
            </template>
          </table-body>
        </div>
      </div>

      <div v-if="layout.hasFixedRight" ref="rightFixedPatch" class="el-table__fixed-right-patch" :style="layout.rightFixedPatchStyle" />

      <div v-if="store.activeFilterCol && activeFilterColData" ref="filterPanel" class="el-table__filter-panel" :style="store.filterPanelStyle" @click.stop>
        <div class="el-table__filter-panel-content">
          <label
            v-for="(filter, fi) in activeFilterColData.filters"
            :key="fi"
            class="el-table__filter-panel-item"
          >
            <input
              v-if="activeFilterColData.filterMultiple !== false"
              type="checkbox"
              :value="filter.value"
              :checked="store.isFilterSelected(activeFilterColData, filter.value)"
              @change="store.handleFilterChange(activeFilterColData, filter.value, $event)"
            />
            <input
              v-else
              type="radio"
              :name="'el-filter-' + activeFilterColData.prop"
              :value="filter.value"
              :checked="store.isFilterSelected(activeFilterColData, filter.value)"
              @change="store.handleFilterChange(activeFilterColData, filter.value, $event)"
            />
            <span>{{ filter.text }}</span>
          </label>
        </div>
        <div class="el-table__filter-panel-footer">
          <button class="el-table__filter-panel-btn" @click="store.handleFilterConfirm(activeFilterColData)">筛选</button>
          <button class="el-table__filter-panel-btn el-table__filter-panel-btn--reset" @click="store.handleFilterReset(activeFilterColData)">重置</button>
        </div>
      </div>
    </template>

    <div v-else class="el-table__empty">
      <slot name="empty">{{ emptyText || '暂无数据' }}</slot>
    </div>
  </div>
</template>

<script>
import './table.css'
import createTableStore from './table-store.js'
import createTableLayout from './table-layout.js'
import TableHeader from './table-header.vue'
import TableBody from './table-body.vue'
import { Checkbox } from 'vant'

export default {
  name: 'ElTable',
  components: { TableHeader, TableBody, [Checkbox.name]: Checkbox },
  props: {
    data: Array,
    stripe: Boolean,
    border: Boolean,
    showHeader: { type: Boolean, default: true },
    highlightCurrentRow: Boolean,
    emptyText: String,
    rowKey: [String, Function],
    rowClassName: [String, Function],
    rowStyle: [Object, Function],
    height: [String, Number],
    maxHeight: [String, Number],
    size: String,
    fit: { type: Boolean, default: true },
    width: [String, Number],
    cellClassName: [String, Function],
    cellStyle: [Object, Function],
    headerRowClassName: [String, Function],
    headerRowStyle: [Object, Function],
    headerCellClassName: [String, Function],
    headerCellStyle: [Object, Function],
    tooltipEffect: { type: String, default: 'dark' },
    context: {},
    sumText: String,
    showSummary: Boolean,
    summaryMethod: Function,
    defaultSort: Object,
    expandRowKeys: Array,
    defaultExpandAll: Boolean,
    highlightSelectionRow: Boolean,
    selectOnIndeterminate: { type: Boolean, default: true },
    currentRowKey: [String, Number],
    spanMethod: Function,
  },
  data() {
    return {
      store: null,
      layout: null,
      _resizeObserver: null,
    }
  },
  computed: {
    scrollStateClass() {
      if (!this.layout.isScrollableX) return 'is-scrolling-none'
      if (this.store.scrollLeft <= 0) return 'is-scrolling-left'
      const maxScroll = this.layout.tableTotalWidth - this.layout.bodyWidth
      if (this.store.scrollLeft >= maxScroll - 1) return 'is-scrolling-right'
      return 'is-scrolling-middle'
    },
    passthroughSlotNames() {
      return Object.keys(this.$scopedSlots).filter(n => n !== 'default' && n !== 'empty')
    },
    fixedBodyHeight() {
      if (!this.$refs.bodyWrapper) return ''
      const headerEl = this.$refs.headerWrapper
      const headerH = headerEl ? headerEl.offsetHeight : 0
      return `calc(100% - ${headerH}px)`
    },
    activeFilterColData() {
      if (!this.store || !this.store.activeFilterCol) return null
      return this.store.columns.find(c => c.prop === this.store.activeFilterCol) || null
    },
  },
  methods: {
    onBodyScroll() {
      const wrapper = this.$refs.bodyWrapper
      if (!wrapper) return
      this.store.scrollLeft = wrapper.scrollLeft
      if (this.$refs.headerWrapper) {
        this.$refs.headerWrapper.scrollLeft = wrapper.scrollLeft
      }
      if (this.$refs.fixedBodyWrapper) {
        this.$refs.fixedBodyWrapper.scrollTop = wrapper.scrollTop
      }
      if (this.$refs.rightFixedBodyWrapper) {
        this.$refs.rightFixedBodyWrapper.scrollTop = wrapper.scrollTop
      }
      this.updateFilterPanelPosition()
    },

    handleFixedMousewheel(event) {
      event.preventDefault()
      if (this.$refs.bodyWrapper) {
        this.$refs.bodyWrapper.scrollTop += event.deltaY
      }
    },

    emitHeaderClick(col, event) {
      this.$emit('header-click', col, event)
    },

    emitHeaderDblClick(col, event) {
      this.$emit('header-dblclick', col, event)
    },

    emitHeaderContextmenu(col, event) {
      this.$emit('header-contextmenu', col, event)
    },

    emitRowClick(row, col, event) {
      this.$emit('row-click', row, col, event)
    },

    emitRowDblClick(row, col, event) {
      this.$emit('row-dblclick', row, col, event)
    },

    emitRowContextmenu(row, col, event) {
      this.$emit('row-contextmenu', row, col, event)
    },

    emitCellClick(row, col, cell, event) {
      this.$emit('cell-click', row, col, cell, event)
    },

    emitCellDblClick(row, col, cell, event) {
      this.$emit('cell-dblclick', row, col, cell, event)
    },

    emitCellMouseEnter(row, col, cell, event) {
      this.$emit('cell-mouse-enter', row, col, cell, event)
    },

    emitCellMouseLeave(row, col, cell, event) {
      this.$emit('cell-mouse-leave', row, col, cell, event)
    },

    updateFilterPanelPosition() {
      this.$nextTick(() => {
        if (!this.store.activeFilterCol) {
          this.store.filterPanelStyle = null
          return
        }
        const ths = this.$el.querySelectorAll('th')
        let el = null
        for (let i = 0; i < ths.length; i++) {
          if (ths[i].getAttribute('data-prop') === this.store.activeFilterCol) {
            el = ths[i]
            break
          }
        }
        if (!el) return
        const thRect = el.getBoundingClientRect()
        const tableRect = this.$el.getBoundingClientRect()
        this.store.filterPanelStyle = {
          position: 'absolute',
          top: (thRect.bottom - tableRect.top + 4) + 'px',
          left: (thRect.left - tableRect.left) + 'px',
        }
      })
    },

    doLayout() {
      this.store.collectColumns()
      this.$nextTick(() => {
        this.$forceUpdate()
        this.syncRowHeights()
      })
    },

    syncRowHeights() {
      this.$nextTick(() => {
        const mainBody = this.$refs.bodyWrapper
        if (!mainBody) return
        const mainRows = mainBody.querySelectorAll('tbody tr')

        const sync = (wrapper) => {
          if (!wrapper) return
          const rows = wrapper.querySelectorAll('tbody tr')
          mainRows.forEach((row, i) => {
            if (!rows[i]) return
            const h = row.getBoundingClientRect().height
            const cur = rows[i].getBoundingClientRect().height
            if (Math.abs(h - cur) > 1) {
              rows[i].style.height = h + 'px'
            }
          })
        }

        sync(this.$refs.fixedBodyWrapper)
        sync(this.$refs.rightFixedBodyWrapper)
      })
    },
  },
  created() {
    this.store = createTableStore(this)
    this.layout = createTableLayout(this, this.store)

    if (this.defaultSort && this.defaultSort.prop) {
      this.store.sortState = {
        prop: this.defaultSort.prop,
        order: this.defaultSort.order || 'ascending',
      }
    }
    if (this.expandRowKeys && this.expandRowKeys.length) {
      this.store.expandedRows = this.expandRowKeys.slice()
    }
    if (this.defaultExpandAll) {
      this.$nextTick(() => {
        if (this.data && this.data.length) {
          this.store.expandedRows = this.data.map(row => this.store.getRowKey(row))
        }
      })
    }
  },
  mounted() {
    this.store.collectColumns()
    this.store.initFilteredValues()
    this._resizeObserver = new ResizeObserver(() => {
      if (this.$refs.bodyWrapper) {
        this.layout.bodyWidth = this.$refs.bodyWrapper.clientWidth
      }
      this.syncRowHeights()
    })
    if (this.$refs.elTable) {
      this._resizeObserver.observe(this.$refs.elTable)
    }
    this._handleDocClick = (e) => {
      if (this.store.activeFilterCol && !this.$el.contains(e.target)) {
        this.store.activeFilterCol = ''
      }
    }
    document.addEventListener('click', this._handleDocClick)
    this.syncRowHeights()
  },

  updated() {
    this.syncRowHeights()
  },
  watch: {
    expandRowKeys(val) {
      this.store.expandedRows = val ? val.slice() : []
    },
    currentRowKey(val) {
      if (val !== undefined && this.data) {
        const row = this.data.find(r => this.store.getRowKey(r) === val)
        if (row) this.store.setCurrentRow(row)
      }
    },
    activeFilterColData() {
      this.updateFilterPanelPosition()
    },
  },
  beforeDestroy() {
    document.removeEventListener('click', this._handleDocClick)
    if (this._resizeObserver) {
      this._resizeObserver.disconnect()
    }
  },
}
</script>
