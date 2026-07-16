<template>
  <span class="el-badge" :class="'el-badge--' + type">
    <van-badge
      :content="mapValue"
      :max="max"
      :dot="isDot"
      :color="color"
      :tag="tag"
      :position="position"
      :offset="offset"
      v-bind="$attrs"
    >
      <slot />
    </van-badge>
  </span>
</template>

<script>
import { Badge } from 'vant'

export default {
  components: { [Badge.name]: Badge },
  name: 'ElBadge',
  props: {
    value: [String, Number],
    max: Number,
    isDot: Boolean,
    hidden: Boolean,
    type: { type: String, default: 'danger' },
    color: String,
    tag: { type: String, default: 'div' },
    position: String,
    offset: Array
  },
  computed: {
    mapValue() {
      if (this.isDot) return ''
      if (this.hidden) return ''
      return this.value
    }
  }
}
</script>

<style>
.el-badge--primary .van-badge--fixed { background: #1989fa; }
.el-badge--success .van-badge--fixed { background: #07c160; }
.el-badge--warning .van-badge--fixed { background: #ff976a; }
.el-badge--danger  .van-badge--fixed { background: #ee0a24; }
.el-badge--info    .van-badge--fixed { background: #c8c9cc; }
</style>
