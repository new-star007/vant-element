<template>
  <van-popover
    :value="localVisible"
    :style="popoverStyle"
    @input="onInput"
    @select="onSelect"
    @open="onShow"
    @close="onHide"
    :trigger="trigger"
    :placement="placement"
    :theme="effect"
    :offset="popoverOffset"
    :actions="mapActions"
    :overlay="overlay"
    :close-on-click-action="closeOnClickAction"
    :close-on-click-outside="closeOnClickOutside"
    :get-container="getContainer"
    :show-arrow="visibleArrow"
  >
    <div v-if="title" class="el-popover__title">{{ title }}</div>
    <div v-if="content" class="el-popover__body">{{ content }}</div>
    <div v-if="$slots.default" class="el-popover__body">
      <slot />
    </div>
    <template #reference>
      <slot name="reference" />
    </template>
  </van-popover>
</template>

<script>
import { Popover } from 'vant'

export default {
  components: { [Popover.name]: Popover },
  name: 'ElPopover',
  props: {
    visible: Boolean,
    trigger: { type: String, default: 'click' },
    placement: { type: String, default: 'bottom' },
    effect: { type: String, default: 'light' },
    offset: { type: Number, default: 0 },
    title: String,
    content: String,
    width: [String, Number],
    popperClass: String,
    transition: { type: String, default: 'fade-in-linear' },
    visibleArrow: { type: Boolean, default: true },
    disabled: Boolean,
    openDelay: { type: Number, default: 0 },
    closeDelay: { type: Number, default: 0 },
    tabindex: { type: Number, default: 0 },
    enterable: { type: Boolean, default: true },
    popperOptions: Object,
    reference: {},
    value: Boolean,
    actions: Array,
    overlay: Boolean,
    closeOnClickAction: Boolean,
    closeOnClickOutside: { type: Boolean, default: true },
    getContainer: [String, Function]
  },
  computed: {
    popoverStyle() {
      if (this.width) {
        return { width: /^\d+$/.test(this.width) ? this.width + 'px' : this.width }
      }
      return {}
    },
    popoverOffset() {
      return [0, this.offset]
    },
    mapActions() {
      if (this.actions && this.actions.length) {
        return this.actions.map(a => ({
          text: a.text || a.content || a,
          icon: a.icon || '',
          disabled: a.disabled || false
        }))
      }
      return []
    }
  },
  data() {
    return {
      localVisible: false
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler(val) {
        if (val !== undefined) this.localVisible = val
      }
    }
  },
  methods: {
    onInput(val) {
      this.localVisible = val
      this.$emit('input', val)
      this.$emit('update:visible', val)
    },
    onSelect(action) {
      this.$emit('select', action, this)
    },
    onShow() {
      this.$emit('show')
    },
    onHide() {
      this.$emit('hide')
    }
  }
}
</script>

<style>
.el-popover__title {
  padding: 8px 12px 0;
  font-weight: 600;
  font-size: 14px;
  color: #303133;
}
.el-popover__body {
  padding: 12px;
}
</style>
