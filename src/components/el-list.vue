<template>
  <div class="el-list">
    <div style="display:none"><slot /></div>
    <div v-if="data && data.length" class="el-list__wrapper">
      <div
        v-for="(row, rowIndex) in data"
        :key="rowIndex"
        class="el-list__card"
        :class="{
          'el-list__card--border': border,
          'el-list__card--striped': stripe && rowIndex % 2 === 1
        }"
        @click="onRowClick(row, rowIndex)"
      >
        <div v-if="indexCol" class="el-list__index-bg">{{ getIndexValue(rowIndex, indexCol) }}</div>

        <div v-if="headerCols.length" class="el-list__header">
          <div v-for="col in headerCols" :key="col._id" class="el-list__header-item" @click.stop>
            <CellRenderer
              v-if="col._renderCell"
              :render-fn="col._renderCell"
              :data="{ row, column: col, index: rowIndex }"
            />
          </div>
        </div>

        <div v-if="headerCols.length && bodyCols.length" class="el-list__divider" />

        <div v-if="bodyCols.length" class="el-list__body">
          <div v-if="selectionCol" class="el-list__body-selection" @click.stop="toggleRowSelection(row)">
            <van-checkbox :value="selectedRows.includes(row)" />
          </div>
          <div class="el-list__body-items" :class="{ 'el-list__body-items--with-selection': selectionCol }">
            <div
              v-for="col in bodyCols"
              :key="col._id"
              class="el-list__body-item"
              :class="col.className"
            >
              <div class="el-list__body-label">{{ col.label }}</div>
              <div class="el-list__body-value" @click.stop>
                <slot :name="'cell-' + col.prop" :row="row" :column="col" :index="rowIndex">
                  <CellRenderer
                    v-if="col._renderCell"
                    :render-fn="col._renderCell"
                    :data="{ row, column: col, index: rowIndex }"
                  />
                  <template v-else-if="col.showOverflowTooltip">
                    <div @click.stop="showTooltipDialog(row, col)" class="el-list__overflow-text">{{ getCellValue(row, col) }}</div>
                  </template>
                  <template v-else>
                    {{ getCellValue(row, col) }}
                  </template>
                </slot>
              </div>
            </div>
          </div>
        </div>

        <div v-if="bodyCols.length && footerCols.length" class="el-list__divider" />

        <div v-if="footerCols.length" class="el-list__footer">
          <div v-for="col in footerCols" :key="col._id" class="el-list__footer-item" @click.stop>
            <CellRenderer
              v-if="col._renderCell"
              :render-fn="col._renderCell"
              :data="{ row, column: col, index: rowIndex }"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="el-list__empty">
      {{ emptyText || '暂无数据' }}
    </div>
  </div>
</template>

<script>
import { Toast, Checkbox } from 'vant'

const CellRenderer = {
  functional: true,
  props: {
    renderFn: Function,
    data: Object
  },
  render(h, ctx) {
    if (!ctx.props.renderFn || !ctx.props.data || !ctx.props.data.row) return null
    return ctx.props.renderFn(ctx.props.data)
  }
}

export default {
  name: 'ElList',
  components: { CellRenderer, [Checkbox.name]: Checkbox },
  props: {
    data: Array,
    stripe: Boolean,
    border: Boolean,
    emptyText: String,
    rowKey: [String, Function],
    rowClassName: [String, Function]
  },
  data() {
    return {
      columns: [],
      selectedRows: []
    }
  },
  computed: {
    selectionCol() {
      return this.columns.find(c => c.type === 'selection')
    },
    indexCol() {
      return this.columns.find(c => c.type === 'index')
    },
    headerCols() {
      return this.columns.filter(c => c.type === 'header')
    },
    bodyCols() {
      return this.columns.filter(c => !c.type || !['selection', 'index', 'header', 'footer'].includes(c.type))
    },
    footerCols() {
      return this.columns.filter(c => c.type === 'footer')
    }
  },
  methods: {
    showTooltipDialog(row, col) {
      Toast(this.getCellValue(row, col))
    },
    collectColumns() {
      this.columns = []
      let idx = 0
      this.$children.forEach(child => {
        if (child.$options.name === 'ElListItem') {
          const hasSlot = child.$scopedSlots.default !== undefined
          this.columns.push({
            prop: child.prop,
            label: child.label,
            type: child.type,
            formatter: child.formatter,
            showOverflowTooltip: child.showOverflowTooltip,
            className: child.className,
            labelClassName: child.labelClassName,
            index: child.index,
            _renderCell: hasSlot ? child.$scopedSlots.default : null,
            _id: idx++
          })
        }
      })
    },
    getCellValue(row, col) {
      const val = col.prop ? row[col.prop] : undefined
      if (col.formatter) {
        return col.formatter(row, col, val)
      }
      return val !== undefined && val !== null ? val : ''
    },
    getIndexValue(rowIndex, col) {
      if (typeof col.index === 'function') {
        return col.index(rowIndex)
      }
      if (typeof col.index === 'number') {
        return rowIndex + col.index
      }
      return rowIndex + 1
    },
    onRowClick(row, index) {
      this.$emit('row-click', row, null, index)
    },
    toggleRowSelection(row) {
      const idx = this.selectedRows.indexOf(row)
      if (idx >= 0) {
        this.selectedRows.splice(idx, 1)
      } else {
        this.selectedRows.push(row)
      }
      this.$emit('selection-change', this.selectedRows)
    },
    clearSelection() {
      this.selectedRows = []
      this.$emit('selection-change', [])
    }
  },
  mounted() {
    this.collectColumns()
  }
}
</script>

<style scoped>
.el-list {
  font-size: 14px;
  width: 100%;
  padding: 12px;
}

.el-list__card {
  position: relative;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  margin-bottom: 12px;
  overflow: hidden;
}

.el-list__card--border {
  border: 1px solid #ebeef5;
}

.el-list__card--striped {
  background: #fafafa;
}

.el-list__index-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 72px;
  font-weight: 800;
  line-height: 1;
  color: rgba(0, 0, 0, 0.04);
  pointer-events: none;
  user-select: none;
  white-space: nowrap;
}

.el-list__header {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  gap: 8px;
}

.el-list__header-item {
  display: flex;
  align-items: center;
}

.el-list__divider {
  height: 1px;
  background: #ebeef5;
  margin: 0 16px;
}

.el-list__body {
  display: flex;
  padding: 8px 16px;
  align-items: flex-start;
  gap: 8px;
}

.el-list__body {
  display: flex;
  padding: 8px 16px;
  align-items: stretch;
  gap: 8px;
}

.el-list__body-selection {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 4px 4px 0;
  flex-shrink: 0;
}

.el-list__body-items {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px 16px;
}

.el-list__body-item {
  padding: 4px 0;
}

.el-list__body-label {
  font-size: 12px;
  color: #909399;
  margin-bottom: 4px;
  line-height: 1.4;
}

.el-list__body-value {
  font-size: 14px;
  color: #303133;
  word-break: break-all;
  line-height: 1.5;
}

.el-list__footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 12px 16px;
  gap: 8px;
}

.el-list__footer-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.el-list__empty {
  text-align: center;
  color: #909399;
  padding: 20px;
}

.el-list__overflow-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
</style>
