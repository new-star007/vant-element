<template>
  <div style="display:none" />
</template>

<script>
export default {
  name: 'ElTableColumn',
  props: {
    prop: String,
    label: String,
    width: [String, Number],
    minWidth: [String, Number],
    align: String,
    type: String,
    formatter: Function,
    fixed: [Boolean, String],
    sortable: [Boolean, String],
    sortMethod: Function,
    sortBy: [String, Array, Function],
    sortOrders: { type: Array, default: () => ['ascending', 'descending', null] },
    resizable: { type: Boolean, default: true },
    renderHeader: Function,
    showOverflowTooltip: Boolean,
    index: [Number, Function],
    columnKey: String,
    className: String,
    labelClassName: String,
    selectable: Function,
    reserveSelection: Boolean,
    filters: Array,
    filterPlacement: String,
    filterMultiple: { type: Boolean, default: true },
    filterMethod: Function,
    filteredValue: Array
  }
}
</script>
