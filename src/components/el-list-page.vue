<template>
  <div class="el-list-page">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="finishedText"
        :error-text="errorText"
        :error.sync="error"
        :offset="offset"
        :immediate-check="immediate && immediateCheck"
        @load="onLoad"
      >
        <el-list
          ref="list"
          :data="data"
          :stripe="stripe"
          :border="border"
          :empty-text="emptyText"
          v-on="$listeners"
        >
          <slot />
        </el-list>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { PullRefresh, List } from 'vant'

export default {
  name: 'ElListPage',
  components: {
    [PullRefresh.name]: PullRefresh,
    [List.name]: List
  },
  props: {
    fetch: {
      type: Function,
      required: true
    },
    pageSize: {
      type: Number,
      default: 10
    },
    immediate: {
      type: Boolean,
      default: true
    },
    immediateCheck: {
      type: Boolean,
      default: true
    },
    offset: {
      type: Number,
      default: 300
    },
    finishedText: {
      type: String,
      default: '没有更多了'
    },
    errorText: {
      type: String,
      default: '请求失败，点击重新加载'
    },
    stripe: Boolean,
    border: Boolean,
    emptyText: String
  },
  data() {
    return {
      data: [],
      total: 0,
      nextPage: 1,
      loading: false,
      finished: false,
      refreshing: false,
      error: false,
      _loading: false
    }
  },
  methods: {
    async onLoad() {
      if (this._loading || this.finished) return
      this._loading = true
      this.loading = true
      this.error = false
      const page = this.nextPage
      try {
        const result = await this.fetch({ page, pageSize: this.pageSize })
        if (page === 1) {
          this.data = result.list
        } else {
          this.data = this.data.concat(result.list)
        }
        this.total = result.total
        this.nextPage = page + 1
        if (result.list.length === 0 || this.data.length >= this.total) {
          this.finished = true
        }
      } catch (e) {
        this.error = true
      } finally {
        this.loading = false
        this._loading = false
      }
    },
    async onRefresh() {
      this.refreshing = true
      this._loading = true
      this.nextPage = 1
      this.finished = false
      this.error = false
      try {
        const result = await this.fetch({ page: 1, pageSize: this.pageSize })
        this.data = result.list
        this.total = result.total
        this.nextPage = 2
        if (result.list.length === 0 || this.data.length >= this.total) {
          this.finished = true
        }
      } catch (e) {
        this.error = true
      } finally {
        this._loading = false
        this.refreshing = false
      }
    },
    refresh() {
      this.nextPage = 1
      this.finished = false
      this.error = false
      this.data = []
      this.total = 0
      this._loading = false
      this.loading = false
      this.$nextTick(() => {
        this.onLoad()
      })
    }
  }
}
</script>

<style scoped>
.el-list-page {
  min-height: 100%;
}
</style>
