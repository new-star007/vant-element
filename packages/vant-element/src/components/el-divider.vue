<template>
  <van-divider
    v-if="direction === 'horizontal'"
    :content-position="contentPosition"
    :hairline="hairline"
    :dashed="dashed"
    v-bind="$attrs"
  >
    <slot />
  </van-divider>
  <div
    v-else
    class="el-divider el-divider--vertical"
    v-bind="$attrs"
  />
</template>

<script>
import { Divider } from 'vant'

export default {
  components: { [Divider.name]: Divider },
  name: 'ElDivider',
  props: {
    direction: { type: String, default: 'horizontal' },
    contentPosition: { type: String, default: 'center' },
    hairline: { type: Boolean, default: true },
    dashed: Boolean
  }
}
</script>

<style>
.el-divider--vertical {
  display: inline-block;
  width: 1px;
  height: 1em;
  margin: 0 8px;
  vertical-align: middle;
  border-left: 1px solid #dcdfe6;
}
</style>
