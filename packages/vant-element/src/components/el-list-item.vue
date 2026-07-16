<template>
  <div style="display:none" />
</template>

<script>
export default {
  name: 'ElListItem',
  props: {
    prop: String,
    label: String,
    type: String,
    formatter: Function,
    sortable: [Boolean, String],
    sortMethod: Function,
    sortBy: [String, Array, Function],
    sortOrders: { type: Array, default: () => ['ascending', 'descending', null] },
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
