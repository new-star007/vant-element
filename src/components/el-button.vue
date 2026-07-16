<template>
  <van-button
    class="el-button"
    :type="mapType"
    :size="mapSize"
    :plain="plain"
    :block="block"
    :round="circle || round"
    :square="false"
    :disabled="disabled"
    :loading="loading"
    :icon="mapIcon"
    :native-type="nativeType"
    :loading-text="loadingText"
    v-bind="$attrs"
    @click="handleClick"
  >
    <slot />
  </van-button>
</template>

<script>
import { Button } from 'vant'
import { iconMap } from '../utils'

export default {
  components: { [Button.name]: Button },
  name: 'ElButton',
  inject: {
    elButtonGroup: { default: null }
  },
  props: {
    type: { type: String, default: 'default' },
    size: String,
    plain: Boolean,
    round: Boolean,
    circle: Boolean,
    block: Boolean,
    disabled: Boolean,
    loading: Boolean,
    icon: String,
    nativeType: { type: String, default: 'button' },
    loadingText: String
  },
  computed: {
    mapType() {
      const map = { info: 'default', text: 'default', default: 'default', primary: 'info', success: 'primary', warning: 'warning', danger: 'danger' }
      return map[this.type] || 'default'
    },
    mapSize() {
      const effectiveSize = this.size || (this.elButtonGroup && this.elButtonGroup.size)
      const map = { medium: 'normal', small: 'small', mini: 'small', large: 'large' }
      return map[effectiveSize] || 'normal'
    },
    mapIcon() {
      return this.icon ? iconMap(this.icon) : ''
    }
  },
  methods: {
    handleClick(event) {
      if (!this.loading && !this.disabled) {
        this.$emit('click', event)
      }
    }
  }
}
</script>
