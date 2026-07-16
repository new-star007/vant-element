<template>
  <van-popover
    v-model="show"
    :trigger="trigger"
    :placement="placement"
    :offset="popoverOffset"
    :overlay="overlay"
    :close-on-click-outside="closeOnClickOutside"
    :get-container="getContainer"
    :show-arrow="showArrow"
    :theme="effect === 'dark' ? 'dark' : 'light'"
  >
    <div class="el-tooltip__content" :style="contentStyle">
      <slot name="content">{{ content }}</slot>
    </div>
    <template #reference>
      <span class="el-tooltip__trigger" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
        <slot />
      </span>
    </template>
  </van-popover>
</template>

<script>
import { Popover } from 'vant'

export default {
  components: { [Popover.name]: Popover },
  name: 'ElTooltip',
  props: {
    value: Boolean,
    content: { type: String, default: '' },
    placement: { type: String, default: 'top' },
    trigger: { type: String, default: 'hover' },
    effect: { type: String, default: 'dark' },
    disabled: Boolean,
    offset: { type: Number, default: 0 },
    openDelay: { type: Number, default: 0 },
    closeDelay: { type: Number, default: 200 },
    visibleArrow: { type: Boolean, default: true },
    enterable: { type: Boolean, default: true },
    tabindex: { type: Number, default: 0 },
    popperClass: String,
    transition: { type: String, default: 'fade-in-linear' }
  },
  data() {
    return {
      show: false,
      hoverTimer: null,
      leaveTimer: null
    }
  },
  computed: {
    popoverOffset() {
      return [0, this.offset]
    },
    showArrow() {
      return this.visibleArrow
    },
    overlay() {
      return false
    },
    closeOnClickOutside() {
      return this.trigger !== 'hover'
    },
    getContainer() {
      return undefined
    },
    contentStyle() {
      return {
        maxWidth: '200px',
        fontSize: '12px',
        lineHeight: '1.5'
      }
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (!this.disabled) {
          this.show = val
        }
      }
    },
    show(val) {
      this.$emit('input', val)
      this.$emit('change', val)
    }
  },
  methods: {
    onMouseEnter() {
      if (this.disabled || this.trigger !== 'hover') return
      clearTimeout(this.leaveTimer)
      this.hoverTimer = setTimeout(() => {
        this.show = true
      }, this.openDelay)
    },
    onMouseLeave() {
      if (this.disabled || this.trigger !== 'hover') return
      clearTimeout(this.hoverTimer)
      this.leaveTimer = setTimeout(() => {
        this.show = false
      }, this.closeDelay)
    },
    showPopper() {
      if (!this.disabled) {
        this.show = true
      }
    },
    hidePopper() {
      this.show = false
    }
  },
  beforeDestroy() {
    clearTimeout(this.hoverTimer)
    clearTimeout(this.leaveTimer)
  }
}
</script>

<style>
.van-popover--dark .van-popover__content {
  background-color: #303133;
}

.van-popover--dark .van-popover__arrow {
  color: #303133;
}

.el-tooltip__trigger {
  display: inline-block;
}

.el-tooltip__content {
  color: #fff;
  background-color: #303133;
  padding: 8px 12px;
  border-radius: 4px;
  word-break: break-all;
}
</style>
