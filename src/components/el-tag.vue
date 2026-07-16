<template>
  <van-tag
    :type="mapType"
    :size="size"
    :color="color"
    :plain="plain"
    :round="round"
    :mark="mark"
    :text-color="mapTextColor"
    :closeable="closable"
    @close="onClose"
  >
    <slot />
  </van-tag>
</template>

<script>
import { Tag } from 'vant'

export default {
  components: { [Tag.name]: Tag },
  name: 'ElTag',
  props: {
    type: { type: String, default: 'default' },
    size: String,
    color: String,
    plain: Boolean,
    round: Boolean,
    mark: Boolean,
    closable: Boolean,
    textColor: String,
    hit: Boolean,
    disableTransitions: Boolean,
    effect: { type: String, default: 'light' }
  },
  computed: {
    mapType() {
      const map = { default: 'default', primary: 'primary', success: 'success', info: 'default', warning: 'warning', danger: 'danger' }
      return map[this.type] || 'default'
    },
    mapTextColor() {
      if (this.color && !this.plain) return undefined
      return this.textColor || undefined
    }
  },
  methods: {
    onClose(event) {
      this.$emit('close', event)
    }
  }
}
</script>
