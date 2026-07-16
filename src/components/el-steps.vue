<template>
  <van-steps
    :active="resolvedValue"
    @click-step="onClickStep"
    :direction="direction"
    :active-color="activeColor"
    :inactive-color="inactiveColor"
    :icon-prefix="iconPrefix"
    :finish-icon="finishIcon"
    :active-icon="activeIcon"
    :inactive-icon="inactiveIcon"
    :center="alignCenter"
  >
    <slot />
  </van-steps>
</template>

<script>
import { Steps } from 'vant'

export default {
  components: { [Steps.name]: Steps },
  name: 'ElSteps',
  props: {
    active: [String, Number],
    value: [String, Number],
    space: [Number, String],
    direction: { type: String, default: 'horizontal' },
    activeColor: String,
    processStatus: { type: String, default: 'process' },
    finishStatus: { type: String, default: 'finish' },
    alignCenter: Boolean,
    simple: Boolean,
    inactiveColor: String,
    iconPrefix: String,
    finishIcon: String,
    activeIcon: String,
    inactiveIcon: String
  },
  computed: {
    resolvedValue() {
      return this.active !== undefined ? this.active : this.value
    }
  },
  methods: {
    onClickStep(val) {
      this.$emit('change', val)
      this.$emit('input', val)
    }
  }
}
</script>
