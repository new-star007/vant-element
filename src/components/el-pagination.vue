<template>
  <div :class="['el-pagination', { 'el-pagination--small': small }]">
    <span v-if="showTotal" class="el-pagination__total">共 {{ total }} 条</span>
    <van-pagination
      :value="internalCurrent"
      @change="onChange"
      :total-items="total"
      :items-per-page="pageSize"
      :mode="mode"
      :show-page-size="showPageSize"
      :prev-text="prevText || '上一页'"
      :next-text="nextText || '下一页'"
      :force-ellipses="true"
      :disabled="disabled"
    />
  </div>
</template>

<script>
import { Pagination } from 'vant'

export default {
  components: { [Pagination.name]: Pagination },
  name: 'ElPagination',
  props: {
    currentPage: { type: Number, default: 1 },
    pageSize: { type: Number, default: 10 },
    total: { type: Number, default: 0 },
    pagerCount: { type: Number, default: 7 },
    layout: { type: String, default: 'prev, pager, next' },
    pageSizes: { type: Array, default: () => [10, 20, 30, 40] },
    background: Boolean,
    small: Boolean,
    popperClass: String,
    prevText: String,
    nextText: String,
    showTotal: Boolean,
    disabled: Boolean,
    hideOnSinglePage: { type: Boolean, default: true }
  },
  data() {
    return {
      internalCurrent: this.currentPage
    }
  },
  computed: {
    mode() {
      return 'multi'
    },
    showPageSize() {
      return Math.min(this.pagerCount, 5)
    }
  },
  watch: {
    currentPage(val) {
      this.internalCurrent = val
    }
  },
  methods: {
    onChange(val) {
      this.internalCurrent = val
      this.$emit('current-change', val)
      this.$emit('update:currentPage', val)
    }
  }
}
</script>

<style scoped>
.el-pagination {
  display: flex;
  align-items: center;
  gap: 8px;
}
.el-pagination--small {
  transform: scale(0.8);
  transform-origin: left center;
}
.el-pagination__total {
  font-size: 14px;
  color: #606266;
  white-space: nowrap;
}
</style>
