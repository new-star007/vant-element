<template>
  <van-step v-bind="$attrs">
    <template v-if="activeIcon || icon" slot="active-icon">
      <van-icon :name="activeIcon || icon" :class-prefix="iconPrefix" />
    </template>
    <template v-if="icon" slot="finish-icon">
      <van-icon :name="icon" :class-prefix="iconPrefix" />
    </template>
    <template v-if="inactiveIcon || icon" slot="inactive-icon">
      <van-icon :name="inactiveIcon || icon" :class-prefix="iconPrefix" />
    </template>
    <div>
      <slot name="title">{{ title }}</slot>
      <div v-if="hasDescription" class="el-step__description">
        <slot name="description">{{ description }}</slot>
      </div>
    </div>
  </van-step>
</template>

<script>
import { Step, Icon } from 'vant'

export default {
  components: { [Step.name]: Step, [Icon.name]: Icon },
  name: 'ElStep',
  props: {
    title: String,
    description: String,
    icon: String,
    iconPrefix: String,
    activeIcon: String,
    inactiveIcon: String,
    status: String
  },
  computed: {
    hasDescription() {
      return this.description || this.$slots.description
    }
  }
}
</script>

<style>
.van-step--horizontal .el-step__description {
  display: none;
}

.van-step--vertical .el-step__description {
  font-size: 12px;
  color: #969799;
  line-height: 1.4;
  margin-top: 2px;
}
</style>
