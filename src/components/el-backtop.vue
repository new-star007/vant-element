<template>
  <div class="el-backtop" :style="positionStyle" @click="scrollToTop">
    <slot>
      <div class="el-backtop__inner">
        <van-icon name="arrow-up" />
      </div>
    </slot>
  </div>
</template>

<script>
import { Icon } from 'vant'

export default {
  components: { [Icon.name]: Icon },
  name: 'ElBacktop',
  props: {
    visibilityHeight: { type: Number, default: 200 },
    target: { type: String, default: '' },
    right: { type: Number, default: 40 },
    bottom: { type: Number, default: 40 }
  },
  data() {
    return {
      visible: false,
      container: null
    }
  },
  computed: {
    positionStyle() {
      return {
        position: 'fixed',
        right: `${this.right}px`,
        bottom: `${this.bottom}px`,
        display: this.visible ? 'flex' : 'none'
      }
    }
  },
  mounted() {
    this.container = this.target
      ? document.querySelector(this.target)
      : window
    this.container.addEventListener('scroll', this.handleScroll)
    this.handleScroll()
  },
  beforeDestroy() {
    if (this.container) {
      this.container.removeEventListener('scroll', this.handleScroll)
    }
  },
  methods: {
    handleScroll() {
      if (this.container === window) {
        this.visible = window.pageYOffset >= this.visibilityHeight
      } else {
        this.visible = this.container.scrollTop >= this.visibilityHeight
      }
    },
    scrollToTop() {
      if (this.container === window) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      } else {
        this.container.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }
      this.$emit('click')
    }
  }
}
</script>

<style>
.el-backtop {
  position: fixed;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  z-index: 1000;
  transition: all 0.3s;
}

.el-backtop:hover {
  background-color: #f5f7fa;
}

.el-backtop__inner {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #409eff;
  font-size: 20px;
}
</style>
