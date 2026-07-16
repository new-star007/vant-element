<template>
  <table :style="{ width: tableWidth }">
    <colgroup>
      <col v-for="col in columns" :key="'bcol-' + col._id" :style="store.getColStyle(col)" />
    </colgroup>
    <tbody>
      <template v-for="(row, rowIndex) in displayData">
        <tr
          :key="'row-' + rowIndex"
          :class="store.getRowClass(row, rowIndex)"
          :style="store.getRowStyle(row, rowIndex)"
          @click="onRowClick(row, rowIndex, $event)"
          @dblclick="onRowDblClick(row, rowIndex, $event)"
          @contextmenu.prevent="onRowContextmenu(row, rowIndex, $event)"
        >
          <td
            v-for="(col, colIndex) in columns"
            :key="col._id"
            v-show="!store.isCellSkipped(rowIndex, col)"
            :rowspan="store.getCellRowspan(rowIndex, col)"
            :colspan="store.getCellColspan(rowIndex, col)"
            :class="[
              {
                'el-table__cell--selection': col.type === 'selection',
                'el-table__cell--index': col.type === 'index',
                'el-table__cell--expand': col.type === 'expand'
              },
              col.className || '',
              store.getCellClassName(row, col, rowIndex, colIndex)
            ]"
            :style="store.getCellStyle(row, col, rowIndex, colIndex)"
            @click="onCellClick(row, col, rowIndex, colIndex, $event)"
            @dblclick="onCellDblClick(row, col, rowIndex, colIndex, $event)"
            @mouseenter="onCellMouseEnter(row, col, rowIndex, colIndex, $event)"
            @mouseleave="onCellMouseLeave(row, col, rowIndex, colIndex, $event)"
          >
            <template v-if="col.type === 'selection'">
              <div class="el-table__cell-checkbox" @click.stop="store.toggleRowSelection(row)">
                <van-checkbox :value="store.selectedRows.includes(row)" shape="square" />
              </div>
            </template>
            <template v-else-if="col.type === 'index'">
              {{ rowIndex + 1 }}
            </template>
            <template v-else-if="col.type === 'expand'">
              <div class="el-table__expand-icon" :class="{ 'is-expanded': store.isRowExpanded(row) }" @click.stop="store.toggleRowExpansion(row)">
                <span class="el-table__expand-icon-inner">&#9654;</span>
              </div>
            </template>
            <template v-else-if="col.showOverflowTooltip && !col._renderCell">
              <div @click.stop="store.showTooltipDialog(row, col)" class="el-table__cell-text">{{ store.getCellValue(row, col) }}</div>
            </template>
            <template v-else>
              <slot :name="'cell-' + col.prop" :row="row" :column="col" :index="rowIndex">
                <CellRenderer
                  v-if="col._renderCell"
                  :render-fn="col._renderCell"
                  :data="{ row, column: col, index: rowIndex }"
                />
                <template v-else>
                  {{ store.getCellValue(row, col) }}
                </template>
              </slot>
            </template>
          </td>
        </tr>
        <tr v-if="store.isRowExpanded(row)" :key="'expand-' + rowIndex" class="el-table__expanded-row">
          <td :colspan="columns.length" class="el-table__expanded-cell">
            <slot name="expand" :row="row" :index="rowIndex">
              <CellRenderer
                v-if="store.expandColumn && store.expandColumn._renderCell"
                :render-fn="store.expandColumn._renderCell"
                :data="{ row, column: store.expandColumn, index: rowIndex }"
              />
            </slot>
          </td>
        </tr>
      </template>
    </tbody>
    <table-footer v-if="hasFooter" :store="store" :layout="layout" :fixed="fixed" />
  </table>
</template>

<script>
import { CellRenderer } from './table-utils.js'
import TableFooter from './table-footer.vue'
import { Checkbox } from 'vant'

export default {
  name: 'ElTableBody',
  components: { CellRenderer, TableFooter, [Checkbox.name]: Checkbox },
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
    displayData() {
      return this.store.filteredData
    },
    hasFooter() {
      return this.store.summaryData && !this.fixed
    },
    tableWidth() {
      if (this.fixed === 'left') return this.layout.fixedWidth + 'px'
      if (this.fixed === 'right') return this.layout.rightFixedWidth + 'px'
      return this.layout.tableWidth
    },
  },
  methods: {
    onRowClick(row, index, event) {
      this.$emit('row-click', row, null, event)
    },
    onRowDblClick(row, index, event) {
      this.$emit('row-dblclick', row, null, event)
    },
    onRowContextmenu(row, index, event) {
      this.$emit('row-contextmenu', row, null, event)
    },
    onCellClick(row, col, rowIndex, colIndex, event) {
      this.$emit('cell-click', row, col, event.target, event)
    },
    onCellDblClick(row, col, rowIndex, colIndex, event) {
      this.$emit('cell-dblclick', row, col, event.target, event)
    },
    onCellMouseEnter(row, col, rowIndex, colIndex, event) {
      this.$emit('cell-mouse-enter', row, col, event.target, event)
    },
    onCellMouseLeave(row, col, rowIndex, colIndex, event) {
      this.$emit('cell-mouse-leave', row, col, event.target, event)
    },
  },
}
</script>
