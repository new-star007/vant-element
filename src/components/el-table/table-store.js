import Vue from 'vue'
import { Dialog } from 'vant'

const BOOLEAN_PROPS = ['sortable', 'resizable', 'showOverflowTooltip', 'reserveSelection', 'filterMultiple', 'fixed']
const NUMERIC_PROPS = ['width', 'minWidth']
const DEFAULT_COL_WIDTH = 120

export default function createTableStore(tableVm) {
  const store = new Vue({
    data: {
      tableVm,
      columns: [],
      columnTree: [],
      selectedRows: [],
      sortState: { prop: '', order: '' },
      filtersState: {},
      activeFilterCol: '',
      filterPanelStyle: null,
      expandedRows: [],
      currentRow: null,
      scrollLeft: 0,
    },

    computed: {
      leafColumns() {
        return this.columns
      },

      leftFixedColumns() {
        return this.columns.filter(c => c.fixed === true || c.fixed === 'left')
      },

      rightFixedColumns() {
        return this.columns.filter(c => c.fixed === 'right')
      },

      normalColumns() {
        return this.columns.filter(c => !c.fixed || c.fixed === 'right')
      },

      expandColumn() {
        return this.columns.find(c => c.type === 'expand')
      },

      visibleColumnCount() {
        return this.columns.length
      },

      isAllSelected() {
        return this.filteredData.length > 0 && this.selectedRows.length === this.filteredData.length
      },

      isIndeterminate() {
        return this.selectedRows.length > 0 && this.selectedRows.length < this.filteredData.length
      },

      headerRows() {
        return this.convertToRows(this.columnTree)
      },

      sortedData() {
        const data = this.tableVm.data
        if (!data) return []
        if (!this.sortState.prop || !this.sortState.order) return data
        const col = this.columns.find(c => c.prop === this.sortState.prop)
        if (!col) return data
        const sorted = data.slice()
        const prop = this.sortState.prop
        const order = this.sortState.order
        const sortMethod = col.sortMethod
        const sortBy = col.sortBy
        if (sortMethod) {
          sorted.sort((a, b) => sortMethod(a, b) * (order === 'ascending' ? 1 : -1))
        } else {
          sorted.sort((a, b) => {
            let valA = a[prop]
            let valB = b[prop]
            if (sortBy) {
              if (typeof sortBy === 'function') {
                valA = sortBy(a)
                valB = sortBy(b)
              } else if (typeof sortBy === 'string') {
                valA = a[sortBy]
                valB = b[sortBy]
              } else if (Array.isArray(sortBy)) {
                for (let i = 0; i < sortBy.length; i++) {
                  valA = a[sortBy[i]]
                  valB = b[sortBy[i]]
                  if (valA !== valB) break
                }
              }
            }
            if (valA === valB) return 0
            if (valA === null || valA === undefined) return 1
            if (valB === null || valB === undefined) return -1
            if (typeof valA === 'number' && typeof valB === 'number') {
              return (valA - valB) * (order === 'ascending' ? 1 : -1)
            }
            return String(valA).localeCompare(String(valB)) * (order === 'ascending' ? 1 : -1)
          })
        }
        return sorted
      },

      filteredData() {
        let data = this.sortedData
        Object.keys(this.filtersState).forEach(prop => {
          const values = this.filtersState[prop]
          if (!values || !values.length) return
          const col = this.columns.find(c => c.prop === prop)
          if (!col) return
          if (col.filterMethod) {
            data = data.filter(row => values.some(v => col.filterMethod(v, row)))
          } else {
            data = data.filter(row => values.includes(row[prop]))
          }
        })
        return data
      },

      summaryData() {
        const table = this.tableVm
        if (!table.showSummary || !this.filteredData || !this.filteredData.length) return null
        if (table.summaryMethod) {
          return table.summaryMethod({ columns: this.columns.filter(c => c.type !== 'expand'), data: this.filteredData })
        }
        const sums = []
        let first = true
        this.columns.forEach(col => {
          if (col.type === 'expand') return
          if (first) {
            sums.push(table.sumText || '合计')
            first = false
            return
          }
          const values = this.filteredData.map(item => Number(item[col.prop]))
          if (!values.every(isNaN)) {
            const v = values.reduce((prev, curr) => {
              const num = Number(curr)
              return isNaN(num) ? prev : prev + num
            }, 0)
            sums.push(v)
          } else {
            sums.push('')
          }
        })
        return sums
      },

      spanMap() {
        const table = this.tableVm
        if (!table.spanMethod || !this.filteredData || !this.filteredData.length) return null
        const data = this.filteredData
        const cols = this.columns.filter(c => c.type !== 'expand')
        const map = {}
        for (let r = 0; r < data.length; r++) {
          map[r] = {}
          for (let c = 0; c < cols.length; c++) {
            map[r][c] = { rowspan: 1, colspan: 1, skip: false }
          }
        }
        for (let r = 0; r < data.length; r++) {
          for (let c = 0; c < cols.length; c++) {
            if (map[r][c].skip) continue
            const result = table.spanMethod({ row: data[r], column: cols[c], rowIndex: r, columnIndex: c })
            if (!result) continue
            const { rowspan = 1, colspan = 1 } = result
            if (rowspan <= 0 || colspan <= 0) {
              map[r][c] = { rowspan: 0, colspan: 0, skip: true }
              continue
            }
            map[r][c] = { rowspan, colspan, skip: false }
            for (let dr = 0; dr < rowspan; dr++) {
              for (let dc = 0; dc < colspan; dc++) {
                if (dr === 0 && dc === 0) continue
                const nr = r + dr
                const nc = c + dc
                if (nr < data.length && nc < cols.length) {
                  map[nr][nc] = { rowspan: 0, colspan: 0, skip: true }
                }
              }
            }
          }
        }
        return map
      },
    },

    methods: {
      /* ============ Column Processing ============ */

      buildColumnTree() {
        let colId = 0

        const walkVNodes = (vnodes) => {
          const result = []
          if (!vnodes) return result
          const arr = Array.isArray(vnodes) ? vnodes : [vnodes]
          arr.forEach(vnode => {
            if (!vnode || !vnode.componentOptions) return
            const comp = vnode.componentOptions
            const props = { ...(comp.propsData || {}) }
            BOOLEAN_PROPS.forEach(key => {
              if (props[key] === '') props[key] = true
            })
            NUMERIC_PROPS.forEach(key => {
              if (typeof props[key] === 'string' && /^\d+$/.test(props[key])) {
                props[key] = Number(props[key])
              }
            })
            const scopedSlots = (vnode.data && vnode.data.scopedSlots) || {}
            const config = {
              prop: props.prop,
              label: props.label,
              width: props.width,
              minWidth: props.minWidth,
              align: props.align || 'center',
              type: props.type,
              formatter: props.formatter,
              fixed: props.fixed,
              sortable: props.sortable,
              sortMethod: props.sortMethod,
              sortBy: props.sortBy,
              sortOrders: props.sortOrders,
              resizable: props.resizable,
              renderHeader: props.renderHeader,
              showOverflowTooltip: props.showOverflowTooltip,
              index: props.index,
              columnKey: props.columnKey,
              className: props.className,
              labelClassName: props.labelClassName,
              selectable: props.selectable,
              filters: props.filters,
              filterPlacement: props.filterPlacement,
              filterMultiple: props.filterMultiple,
              filterMethod: props.filterMethod,
              filteredValue: props.filteredValue,
              children: [],
              level: 1,
              colSpan: 1,
              rowSpan: 1,
              leafIndex: -1,
              _id: ++colId,
              _renderCell: scopedSlots.default || null
            }
            if (comp.children) {
              walkVNodes(comp.children).forEach(c => config.children.push(c))
            }
            result.push(config)
          })
          return result
        }

        const vnode = this.tableVm.$vnode
        const slotVNodes = vnode && vnode.componentOptions && vnode.componentOptions.children
        this.columnTree = walkVNodes(slotVNodes)
        this.processColumns()
      },

      processColumns() {
        const leafColumns = this.getLeafColumns(this.columnTree)
        leafColumns.forEach((col, i) => { col.leafIndex = i })
        this.columns = leafColumns
      },

      getAllColumns(columns) {
        const result = []
        columns.forEach(col => {
          result.push(col)
          if (col.children && col.children.length) {
            result.push.apply(result, this.getAllColumns(col.children))
          }
        })
        return result
      },

      getLeafColumns(columns) {
        const result = []
        columns.forEach(col => {
          if (col.children && col.children.length) {
            result.push.apply(result, this.getLeafColumns(col.children))
          } else {
            result.push(col)
          }
        })
        return result
      },

      convertToRows(originColumns) {
        if (!originColumns || !originColumns.length) return []
        let maxLevel = 1
        const traverse = (column, parent) => {
          if (parent) {
            column.level = parent.level + 1
            if (maxLevel < column.level) maxLevel = column.level
          }
          if (column.children && column.children.length) {
            let colSpan = 0
            column.children.forEach(sub => {
              traverse(sub, column)
              colSpan += sub.colSpan
            })
            column.colSpan = colSpan
          } else {
            column.colSpan = 1
          }
        }
        originColumns.forEach(col => {
          col.level = 1
          traverse(col, null)
        })
        const rows = []
        for (let i = 0; i < maxLevel; i++) rows.push([])
        const allCols = this.getAllColumns(originColumns)
        allCols.forEach(col => {
          if (!col.children || !col.children.length) {
            col.rowSpan = maxLevel - col.level + 1
          } else {
            col.rowSpan = 1
            col.children.forEach(sub => { sub.isSubColumn = true })
          }
          rows[col.level - 1].push(col)
        })
        return rows
      },

      collectColumns() {
        this.buildColumnTree()
      },

      /* ============ Style Helpers ============ */

      getColStyle(col) {
        const style = {}
        if (col.type === 'expand') {
          style.width = '40px'
        } else if (col.width) {
          style.width = typeof col.width === 'number' ? col.width + 'px' : col.width
        } else if (col.minWidth) {
          style.minWidth = typeof col.minWidth === 'number' ? col.minWidth + 'px' : col.minWidth
        } else {
          style.width = DEFAULT_COL_WIDTH + 'px'
        }
        return style
      },

      getCellValue(row, col) {
        const val = col.prop ? row[col.prop] : undefined
        if (col.formatter) {
          const rowIndex = this.filteredData.indexOf(row)
          return col.formatter(row, col, val, rowIndex)
        }
        return val !== undefined && val !== null ? val : ''
      },

      getRowClass(row, rowIndex) {
        const table = this.tableVm
        const classes = {
          'el-table__row--striped': table.stripe && rowIndex % 2 === 1,
          'el-table__row--current': table.highlightCurrentRow && this.selectedRows.includes(row),
          'el-table__row--highlight-selection': table.highlightSelectionRow && this.selectedRows.includes(row),
          'el-table__row--current-row': this.currentRow && this.getRowKey(this.currentRow) === this.getRowKey(row)
        }
        if (table.rowClassName) {
          if (typeof table.rowClassName === 'string') {
            classes[table.rowClassName] = true
          } else if (typeof table.rowClassName === 'function') {
            const result = table.rowClassName({ row, rowIndex })
            if (result) {
              if (typeof result === 'string') {
                result.split(' ').forEach(c => { if (c) classes[c] = true })
              } else if (typeof result === 'object') {
                Object.assign(classes, result)
              }
            }
          }
        }
        return classes
      },

      getRowStyle(row, rowIndex) {
        const fn = this.tableVm.rowStyle
        if (typeof fn === 'function') {
          return fn({ row, rowIndex }) || {}
        }
        return fn || {}
      },

      getHeaderRowClass() {
        const fn = this.tableVm.headerRowClassName
        if (fn) {
          if (typeof fn === 'string') return fn
          if (typeof fn === 'function') {
            return fn({ row: null, rowIndex: -1 }) || ''
          }
        }
        return ''
      },

      getHeaderRowStyle() {
        const fn = this.tableVm.headerRowStyle
        if (fn) {
          if (typeof fn === 'function') {
            return fn({ row: null, rowIndex: -1 }) || {}
          }
          return fn
        }
        return {}
      },

      getHeaderCellClass(col) {
        const fn = this.tableVm.headerCellClassName
        const classes = {}
        if (this.sortState.prop === col.prop && this.sortState.order) {
          classes['ascending'] = this.sortState.order === 'ascending'
          classes['descending'] = this.sortState.order === 'descending'
        }
        if (fn) {
          if (typeof fn === 'string') return fn
          if (typeof fn === 'function') {
            return fn({ row: null, column: col, columnIndex: this.columns.indexOf(col) }) || ''
          }
        }
        return classes
      },

      getHeaderCellStyle(col) {
        const style = { textAlign: col.type === 'selection' || col.type === 'index' ? 'center' : (col.align || 'center') }
        if (col.minWidth) style.minWidth = (typeof col.minWidth === 'number' ? col.minWidth + 'px' : col.minWidth)
        if (col.width) style.width = (typeof col.width === 'number' ? col.width + 'px' : col.width)
        const fn = this.tableVm.headerCellStyle
        if (fn) {
          if (typeof fn === 'function') {
            const s = fn({ row: null, column: col, columnIndex: this.columns.indexOf(col) })
            if (s) Object.assign(style, s)
          } else {
            Object.assign(style, fn)
          }
        }
        return style
      },

      getCellClassName(row, col, rowIndex, colIndex) {
        const fn = this.tableVm.cellClassName
        if (fn) {
          if (typeof fn === 'string') return fn
          if (typeof fn === 'function') {
            return fn({ row, column: col, rowIndex, columnIndex: colIndex }) || ''
          }
        }
        return ''
      },

      getCellStyle(row, col, rowIndex, colIndex) {
        const style = { textAlign: col.type === 'selection' || col.type === 'index' ? 'center' : (col.align || 'center') }
        if (col.minWidth) style.minWidth = (typeof col.minWidth === 'number' ? col.minWidth + 'px' : col.minWidth)
        if (col.width) style.width = (typeof col.width === 'number' ? col.width + 'px' : col.width)
        const fn = this.tableVm.cellStyle
        if (fn) {
          if (typeof fn === 'function') {
            const s = fn({ row, column: col, rowIndex, columnIndex: colIndex })
            if (s) Object.assign(style, s)
          } else {
            Object.assign(style, fn)
          }
        }
        return style
      },

      /* ============ Selection ============ */

      toggleRowSelection(row, selected) {
        const col = this.columns.find(c => c.type === 'selection')
        if (col && col.selectable && typeof col.selectable === 'function') {
          const rowIndex = this.filteredData.indexOf(row)
          if (!col.selectable(row, rowIndex)) return
        }
        const idx = this.selectedRows.indexOf(row)
        const isSelected = selected !== undefined ? selected : idx < 0
        if (isSelected) {
          if (idx < 0) this.selectedRows.push(row)
        } else {
          if (idx >= 0) this.selectedRows.splice(idx, 1)
        }
        this.tableVm.$emit('select', this.selectedRows, row)
        this.tableVm.$emit('selection-change', this.selectedRows)
      },

      clearSelection() {
        this.selectedRows = []
        this.tableVm.$emit('selection-change', [])
      },

      toggleAllSelection() {
        const allSelected = this.selectedRows.length === this.filteredData.length
        if (allSelected) {
          this.selectedRows = []
        } else {
          this.selectedRows = this.filteredData.slice()
        }
        this.tableVm.$emit('select-all', this.selectedRows)
        this.tableVm.$emit('selection-change', this.selectedRows)
      },

      /* ============ Sort ============ */

      handleSortClick(col, order) {
        if (!col.sortable) return
        const sortOrders = col.sortOrders || ['ascending', 'descending', null]
        let newOrder = order
        if (this.sortState.prop === col.prop) {
          const currentIdx = sortOrders.indexOf(this.sortState.order)
          const nextIdx = (currentIdx + 1) % sortOrders.length
          newOrder = sortOrders[nextIdx]
        }
        this.sortState = { prop: newOrder ? col.prop : '', order: newOrder || '' }
        this.tableVm.$emit('sort-change', {
          column: col,
          prop: this.sortState.prop,
          order: this.sortState.order
        })
      },

      sort(prop, order) {
        const col = this.columns.find(c => c.prop === prop)
        if (col && col.sortable) {
          this.sortState = { prop, order }
          this.tableVm.$emit('sort-change', { column: col, prop, order })
        }
      },

      clearSort() {
        this.sortState = { prop: '', order: '' }
        this.tableVm.$emit('sort-change', { column: null, prop: '', order: '' })
      },

      /* ============ Filter ============ */

      toggleFilterPanel(col) {
        this.activeFilterCol = this.activeFilterCol === col.prop ? '' : col.prop
      },

      isFilterSelected(col, value) {
        const selected = this.filtersState[col.prop]
        if (!selected) return false
        return selected.includes(value)
      },

      handleFilterChange(col, value, event) {
        if (!this.filtersState[col.prop]) {
          this.filtersState[col.prop] = []
        }
        if (col.filterMultiple === false) {
          this.filtersState[col.prop] = [value]
        } else {
          const selected = this.filtersState[col.prop]
          if (event.target.checked) {
            selected.push(value)
          } else {
            const idx = selected.indexOf(value)
            if (idx >= 0) selected.splice(idx, 1)
          }
        }
        this.filtersState = { ...this.filtersState }
      },

      handleFilterConfirm(col) {
        this.activeFilterCol = ''
        this.tableVm.$emit('filter-change', { ...this.filtersState })
      },

      handleFilterReset(col) {
        this.filtersState[col.prop] = []
        this.filtersState = { ...this.filtersState }
        this.activeFilterCol = ''
        this.tableVm.$emit('filter-change', { ...this.filtersState })
      },

      clearFilter(columnKeys) {
        if (columnKeys) {
          const keys = Array.isArray(columnKeys) ? columnKeys : [columnKeys]
          keys.forEach(key => { this.filtersState[key] = [] })
        } else {
          this.filtersState = {}
        }
        this.filtersState = { ...this.filtersState }
        this.tableVm.$emit('filter-change', { ...this.filtersState })
      },

      initFilteredValues() {
        this.columns.forEach(col => {
          if (col.filteredValue && col.filteredValue.length && !this.filtersState[col.prop]) {
            this.filtersState[col.prop] = col.filteredValue.slice()
          }
        })
        if (Object.keys(this.filtersState).length) {
          this.filtersState = { ...this.filtersState }
        }
      },

      /* ============ Expand ============ */

      getRowKey(row) {
        const table = this.tableVm
        if (typeof table.rowKey === 'function') return table.rowKey(row)
        if (typeof table.rowKey === 'string') return row[table.rowKey]
        return row
      },

      isRowExpanded(row) {
        return this.expandedRows.includes(this.getRowKey(row))
      },

      toggleRowExpansion(row, expanded) {
        const key = this.getRowKey(row)
        const idx = this.expandedRows.indexOf(key)
        const isExpanding = expanded !== undefined ? expanded : idx < 0
        if (isExpanding) {
          if (idx < 0) this.expandedRows.push(key)
        } else {
          if (idx >= 0) this.expandedRows.splice(idx, 1)
        }
        this.tableVm.$emit('expand-change', row, this.expandedRows.slice())
      },

      /* ============ Current Row ============ */

      setCurrentRow(row) {
        const oldRow = this.currentRow
        this.currentRow = row
        this.tableVm.$emit('current-change', row, oldRow)
      },

      /* ============ Cell Span ============ */

      getVisibleColumnIndex(col) {
        return this.columns.filter(c => c.type !== 'expand').indexOf(col)
      },

      getCellSpanInfo(rowIndex, col) {
        if (!this.spanMap) return null
        const vcIdx = this.getVisibleColumnIndex(col)
        if (vcIdx < 0) return null
        return this.spanMap[rowIndex] && this.spanMap[rowIndex][vcIdx]
      },

      isCellSkipped(rowIndex, col) {
        const info = this.getCellSpanInfo(rowIndex, col)
        return info && info.skip
      },

      getCellRowspan(rowIndex, col) {
        const info = this.getCellSpanInfo(rowIndex, col)
        return info ? info.rowspan : 1
      },

      getCellColspan(rowIndex, col) {
        const info = this.getCellSpanInfo(rowIndex, col)
        return info ? info.colspan : 1
      },

      /* ============ Tooltip ============ */

      showTooltipDialog(row, col) {
        Dialog.alert({
          message: this.getCellValue(row, col),
          title: col.label || '',
          confirmButtonText: '关闭'
        }).catch(() => {})
      },
    },
  })

  return store
}
