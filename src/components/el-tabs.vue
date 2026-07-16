<template>
  <van-tabs
    :value="value"
    @input="onInput"
    @change="onChange"
    @click="onClick"
    @disabled="onDisabled"
    :color="color"
    :border="border"
    :sticky="sticky"
    :animated="animated"
    :swipeable="swipeable"
    :background="background"
    :line-width="lineWidth"
    :line-height="lineHeight"
    :before-change="beforeChange"
    :title-active-color="titleActiveColor"
    :title-inactive-color="titleInactiveColor"
    :type="tabType"
    :duration="duration"
    :offset-top="offsetTop"
    :lazy-render="lazyRender"
    :swipe-threshold="swipeThreshold"
    :direction="tabDirection"
  >
    <slot />
  </van-tabs>
</template>

<script>
import { Tabs } from 'vant'

export default {
  components: { [Tabs.name]: Tabs },
  name: 'ElTabs',
  props: {
    value: [String, Number],
    type: { type: String, default: 'line' },
    color: String,
    border: Boolean,
    sticky: Boolean,
    animated: Boolean,
    swipeable: Boolean,
    background: String,
    lineWidth: [String, Number],
    lineHeight: [String, Number],
    beforeChange: Function,
    titleActiveColor: String,
    titleInactiveColor: String,
    duration: { type: [Number, String], default: 0.3 },
    offsetTop: { type: [Number, String], default: 0 },
    lazyRender: { type: Boolean, default: true },
    swipeThreshold: { type: [Number, String], default: 5 },
    stretch: Boolean,
    closable: Boolean,
    addable: Boolean,
    tabPosition: { type: String, default: 'top' },
    editable: Boolean
  },
  computed: {
    tabType() {
      if (this.type === 'card') return 'card'
      return 'line'
    },
    tabDirection() {
      if (this.tabPosition === 'left' || this.tabPosition === 'right') return 'vertical'
      return 'horizontal'
    }
  },
  provide() {
    return {
      elTabs: this
    }
  },
  methods: {
    onInput(val) {
      this.$emit('input', val)
    },
    onChange(name, title) {
      this.$emit('change', name)
      if (this.value !== undefined) {
        this.$emit('tab-click', { name, title })
      }
    },
    onClick(name, title) {
      this.$emit('tab-click', { name, title })
    },
    onDisabled(name, title) {
      this.$emit('tab-click', { name, title })
    },
    onTabRemove(name) {
      this.$emit('tab-remove', name)
    }
  }
}
</script>
