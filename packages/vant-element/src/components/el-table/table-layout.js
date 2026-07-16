import Vue from 'vue'

const DEFAULT_COL_WIDTH = 120

export default function createTableLayout(tableVm, store) {
  return new Vue({
    data: {
      tableVm,
      store,
      bodyWidth: 0,
    },

    computed: {
      tableWidth() {
        if (this.tableVm.width) {
          const w = Number(this.tableVm.width)
          if (!isNaN(w) && w > 0) return w + 'px'
          if (typeof this.tableVm.width === 'string') return this.tableVm.width
        }
        if (!this.store.columns.length) return '100%'
        const total = this.store.columns.reduce((s, c) => {
          if (c.type === 'expand') return s
          const w = Number(c.width)
          return s + (isNaN(w) || w <= 0 ? DEFAULT_COL_WIDTH : w)
        }, 0)
        return total + 'px'
      },

      hasHeightConstraint() {
        return !!(this.tableVm.height || this.tableVm.maxHeight)
      },

      containerStyle() {
        const style = {}
        if (this.tableVm.height) {
          const h = Number(this.tableVm.height)
          if (!isNaN(h) && h > 0) style.height = h + 'px'
          else if (typeof this.tableVm.height === 'string') style.height = this.tableVm.height
          style.overflow = 'hidden'
        }
        if (this.tableVm.maxHeight) {
          const mh = Number(this.tableVm.maxHeight)
          if (!isNaN(mh) && mh > 0) style.maxHeight = mh + 'px'
          else if (typeof this.tableVm.maxHeight === 'string') style.maxHeight = this.tableVm.maxHeight
          style.overflow = 'hidden'
        }
        return style
      },

      headerWrapperStyle() {
        if (!this.hasHeightConstraint) return {}
        return { overflow: 'hidden' }
      },

      bodyWrapperStyle() {
        if (!this.hasHeightConstraint) return {}
        return { overflow: 'auto', flex: 1 }
      },

      fixedWidth() {
        return this.store.leftFixedColumns.reduce((s, c) => {
          const w = Number(c.width)
          return s + (isNaN(w) || w <= 0 ? DEFAULT_COL_WIDTH : w)
        }, 0)
      },

      rightFixedWidth() {
        return this.store.rightFixedColumns.reduce((s, c) => {
          const w = Number(c.width)
          return s + (isNaN(w) || w <= 0 ? DEFAULT_COL_WIDTH : w)
        }, 0)
      },

      hasFixedLeft() {
        return this.store.leftFixedColumns.length > 0
      },

      hasFixedRight() {
        return this.store.rightFixedColumns.length > 0
      },

      fixedWrapperStyle() {
        if (!this.hasFixedLeft) return {}
        return {
          width: this.fixedWidth + 'px',
          height: '100%',
        }
      },

      rightFixedWrapperStyle() {
        if (!this.hasFixedRight) return {}
        return {
          width: this.rightFixedWidth + 'px',
          height: '100%',
        }
      },

      rightFixedPatchStyle() {
        if (!this.hasFixedRight) return {}
        return {
          width: '17px',
          height: '40px',
        }
      },

      tableTotalWidth() {
        const total = this.store.columns.reduce((s, c) => {
          if (c.type === 'expand') return s
          const w = Number(c.width)
          return s + (isNaN(w) || w <= 0 ? DEFAULT_COL_WIDTH : w)
        }, 0)
        return total
      },

      isScrollableX() {
        return this.store.normalColumns.length > 0 && this.bodyWidth > 0 && this.tableTotalWidth > this.bodyWidth
      },
    },
  })
}
