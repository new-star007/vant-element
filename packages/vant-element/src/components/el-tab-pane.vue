<template>
  <van-tab
    :title="label"
    :name="name"
    :disabled="disabled"
    :dot="dot"
    :badge="badge"
    :title-style="titleStyle"
    :title-class="titleClass"
    v-bind="$attrs"
  >
    <slot />
    <template slot="title">
      <span class="el-tab-pane__title">
        <slot name="label">{{ label }}</slot>
        <van-icon v-if="tabClosable" name="cross" class="el-tab-pane__close" @click.stop="onTabRemove" />
      </span>
    </template>
  </van-tab>
</template>

<script>
import { Tab, Icon } from 'vant'

export default {
  components: { [Tab.name]: Tab, [Icon.name]: Icon },
  name: 'ElTabPane',
  props: {
    label: String,
    name: [String, Number],
    disabled: Boolean,
    dot: Boolean,
    badge: [Number, String],
    titleStyle: [String, Object],
    titleClass: String,
    closable: Boolean,
    lazy: Boolean
  },
  inject: {
    elTabs: { default: null }
  },
  computed: {
    tabClosable() {
      return this.closable || (this.elTabs && this.elTabs.closable)
    }
  },
  methods: {
    onTabRemove() {
      if (this.elTabs) {
        this.elTabs.onTabRemove(this.name)
      }
    }
  }
}
</script>

<style scoped>
.el-tab-pane__title {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.el-tab-pane__close {
  font-size: 12px;
  cursor: pointer;
  opacity: 0.6;
}
.el-tab-pane__close:hover {
  opacity: 1;
}
</style>
