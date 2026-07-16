<template>
  <van-rate
    :value="value"
    @input="onInput"
    @change="onChange"
    :count="max"
    :size="size"
    :color="computedColor"
    :void-color="voidColor"
    :void-icon="voidIcon"
    :icon="icon"
    :disabled="disabled"
    :readonly="readonly"
    :allow-half="allowHalf"
    :gutter="gutter"
    :touchable="touchable"
  />
</template>

<script>
import { Rate } from 'vant'

export default {
  components: { [Rate.name]: Rate },
  name: 'ElRate',
  props: {
    value: { type: Number, default: 0 },
    max: { type: Number, default: 5 },
    size: [String, Number],
    color: [String, Array],
    voidColor: { type: String, default: '#c6d1de' },
    voidIcon: { type: String, default: 'star-o' },
    icon: { type: String, default: 'star' },
    disabled: Boolean,
    readonly: Boolean,
    allowHalf: Boolean,
    gutter: [String, Number],
    touchable: { type: Boolean, default: true },
    lowThreshold: { type: Number, default: 2 },
    highThreshold: { type: Number, default: 4 },
    colors: [String, Array],
    texts: Array,
    scoreTemplate: String,
    showText: Boolean,
    showScore: Boolean,
    textColor: { type: String, default: '#1f2d3d' }
  },
  computed: {
    computedColor() {
      const raw = this.colors || this.color
      if (Array.isArray(raw)) {
        const idx = Math.min(Math.max(0, Math.ceil(this.value) - 1), raw.length - 1)
        return raw[idx] || raw[0]
      }
      return raw || '#f7ba2a'
    }
  },
  methods: {
    onInput(val) {
      this.$emit('input', val)
    },
    onChange(val) {
      this.$emit('change', val)
    }
  }
}
</script>
