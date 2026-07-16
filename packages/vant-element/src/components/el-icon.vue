<template>
  <van-icon
    :name="mapIcon"
    :color="color"
    :size="size"
    :class-prefix="classPrefix"
    :dot="dot"
    :badge="badge"
    :info="info"
    v-bind="$attrs"
    @click="$emit('click', $event)"
  >
    <slot />
  </van-icon>
</template>

<script>
import { Icon } from 'vant'
import { iconMap } from '../utils'

export default {
  components: { [Icon.name]: Icon },
  name: 'ElIcon',
  props: {
    name: String,
    color: String,
    size: [String, Number],
    classPrefix: String,
    dot: Boolean,
    badge: [Number, String],
    info: [Number, String]
  },
  computed: {
    mapIcon() {
      return this.name ? iconMap(this.name) : this.name
    }
  }
}
</script>
