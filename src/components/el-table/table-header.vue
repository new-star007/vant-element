<template>
  <table :style="{ width: tableWidth }">
    <colgroup>
      <col v-for="col in columns" :key="'hcol-' + col._id" :style="store.getColStyle(col)" />
    </colgroup>
    <thead>
      <tr v-for="(row, rowIndex) in headerRows" :key="rowIndex"
        :class="store.getHeaderRowClass()" :style="store.getHeaderRowStyle()">
        <th
          v-for="(col, colIndex) in row"
          :key="col._id"
          :data-prop="col.prop"
          :colspan="col.colSpan"
          :rowspan="col.rowSpan"
          :class="[
            {
              'el-table__cell--selection': col.type === 'selection',
              'el-table__cell--index': col.type === 'index',
              'el-table__cell--expand': col.type === 'expand',
              'is-sortable': col.sortable
            },
            col.className || '',
            store.getHeaderCellClass(col)
          ]"
          :style="store.getHeaderCellStyle(col)"
          @dblclick="$emit('header-dblclick', col, $event)"
          @contextmenu.prevent="$emit('header-contextmenu', col, $event)"
        >
          <div class="el-table__cell-wrapper" @click="handleHeaderClick(col, $event)">
            <template v-if="col.type === 'selection'">
              <div @click.stop="handleToggleAllSelection">
                <el-checkbox :value="store.isAllSelected" :indeterminate="store.isIndeterminate && !store.isAllSelected" />
              </div>
            </template>
            <template v-else-if="col.type === 'expand'">
              <span>&nbsp;</span>
            </template>
            <template v-else-if="col.children && col.children.length">
              <span v-if="col.renderHeader">
                <CellRenderer :render-fn="col.renderHeader" :data="{ column: col, columnIndex }" />
              </span>
              <span v-else>{{ col.label }}</span>
            </template>
            <template v-else>
              <span v-if="col.renderHeader">
                <CellRenderer :render-fn="col.renderHeader" :data="{ column: col, columnIndex: col.leafIndex }" />
              </span>
              <span v-else>{{ col.label }}</span>
              <span v-if="col.sortable" class="el-table__sort-caret-wrapper" @click.stop>
                <span
                  class="el-table__sort-caret ascending-caret"
                  :class="{ 'is-active': store.sortState.prop === col.prop && store.sortState.order === 'ascending' }"
                  @click.stop="store.handleSortClick(col, 'ascending')"
                />
                <span
                  class="el-table__sort-caret descending-caret"
                  :class="{ 'is-active': store.sortState.prop === col.prop && store.sortState.order === 'descending' }"
                  @click.stop="store.handleSortClick(col, 'descending')"
                />
              </span>
              <span
                v-if="col.filters && col.filters.length"
                class="el-table__filter-trigger"
                :class="{ 'is-active': store.filtersState[col.prop] && store.filtersState[col.prop].length > 0 }"
                @click.stop="store.toggleFilterPanel(col)"
              >&#9660;</span>

            </template>
          </div>
        </th>
      </tr>
    </thead>
  </table>
</template>

<script>
import ElCheckbox from '../el-checkbox.vue'
import { CellRenderer } from './table-utils.js'

export default {
  name: 'ElTableHeader',
  components: { ElCheckbox, CellRenderer },
  props: {
    store: { type: Object, required: true },
    layout: { type: Object, required: true },
    fixed: { type: String, default: '' },
  },
  computed: {
    columns() {
      if (this.fixed === 'left') return this.store.leftFixedColumns
      if (this.fixed === 'right') return this.store.rightFixedColumns
      return this.store.leafColumns
    },
    headerRows() {
      if (this.fixed) {
        const filteredTree = this.filterTreeByFixed(this.store.columnTree, this.fixed)
        return this.store.convertToRows(filteredTree)
      }
      return this.store.headerRows
    },
    tableWidth() {
      if (this.fixed === 'left') return this.layout.fixedWidth + 'px'
      if (this.fixed === 'right') return this.layout.rightFixedWidth + 'px'
      return this.layout.tableWidth
    },
  },
  methods: {
    filterTreeByFixed(tree, fixed) {
      return tree.reduce((result, col) => {
        if (col.children && col.children.length) {
          const filteredChildren = this.filterTreeByFixed(col.children, fixed)
          if (filteredChildren.length) {
            const clone = { ...col, children: filteredChildren }
            result.push(clone)
          }
        } else {
          if ((fixed === 'left' && (col.fixed === true || col.fixed === 'left')) ||
              (fixed === 'right' && col.fixed === 'right')) {
            result.push(col)
          }
        }
        return result
      }, [])
    },
    handleHeaderClick(col, event) {
      this.$emit('header-click', col, event)
    },
    handleToggleAllSelection() {
      this.store.toggleAllSelection()
    },
  },
}
</script>
