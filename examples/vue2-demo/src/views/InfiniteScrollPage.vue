<template>
  <div class="page-infinite-scroll">
    <van-nav-bar title="v-infinite-scroll 无限滚动" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">基础用法</div>
        <div class="scroll-container" v-infinite-scroll="loadMore">
          <div v-for="item in list" :key="item" class="scroll-item">
            <el-card shadow="hover" style="margin-bottom: 8px;">
              <span>列表项 {{ item }}</span>
            </el-card>
          </div>
          <div v-if="loading" style="text-align: center; padding: 16px;">
            <el-spinner :size="24" />
          </div>
          <div v-if="finished" style="text-align: center; padding: 16px; color: #909399; font-size: 14px;">
            没有更多了
          </div>
        </div>
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  name: 'InfiniteScrollPage',
  components: { [NavBar.name]: NavBar },
  directives: {
    infiniteScroll: {
      inserted(el, binding) {
        const cb = binding.value
        const sentinel = document.createElement('div')
        sentinel.style.height = '1px'
        el.appendChild(sentinel)
        const observer = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting) {
            cb()
          }
        }, {
          root: el,
          rootMargin: '0px 0px 100px 0px'
        })
        observer.observe(sentinel)
        el._infiniteScrollObserver = observer
        el._infiniteScrollSentinel = sentinel
      },
      unbind(el) {
        el._infiniteScrollObserver?.disconnect()
        el._infiniteScrollSentinel?.remove()
      }
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      count: 0
    }
  },
  mounted() {
    this.loadMore()
  },
  methods: {
    loadMore() {
      if (this.loading || this.finished) return
      this.loading = true
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        this.loading = false
        this.count++
        if (this.count >= 5) {
          this.finished = true
        }
      }, 1000)
    }
  }
}
</script>

<style scoped>
.page-infinite-scroll {
  background: #f7f8fa;
  min-height: 100vh;
}
.page-body {
  padding: 16px;
}
.demo-card {
  margin-bottom: 12px;
}
.scroll-container {
  height: 400px;
  overflow-y: auto;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 8px;
}
.scroll-item {
  padding: 4px 0;
}
</style>
