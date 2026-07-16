<template>
  <tfoot v-if="showFooter">
    <tr class="el-table__summary-row">
      <td
        v-for="(col, index) in columns"
        :key="col._id"
        :class="{ 'el-table__cell--selection': col.type === 'selection', 'el-table__cell--expand': col.type === 'expand' }"
        :style="{ textAlign: col.align || 'center' }"
      >
        <template v-if="col.type === 'expand'">&nbsp;</template>
        <template v-else>{{ store.summaryData[getColIndex(col)] !== undefined ? store.summaryData[getColIndex(col)] : '' }}</template>
      </td>
    </tr>
  </tfoot>
</template>

<script>
export default {
  name: 'ElTableFooter',
  props: {
    store: { type: Object, required: true },
    layout: { type: Object, required: true },
    fixed: { type: String, default: '' },
  },
  computed: {
    showFooter() {
      return this.store.summaryData && !this.fixed
    },
    columns() {
      if (this.fixed === 'left') return this.store.leftFixedColumns
      if (this.fixed === 'right') return this.store.rightFixedColumns
      return this.store.leafColumns
    },
  },
  methods: {
    getColIndex(col) {
      return this.store.leafColumns.filter(c => c.type !== 'expand').indexOf(col)
    },
  },
}
</script>
