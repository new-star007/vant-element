<template>
  <div :class="['el-card', shadowClass]">
    <van-cell-group :border="border" v-bind="$attrs">
      <van-cell
        v-if="header || $slots.header"
        :title="header"
        :label="description"
        :value="body"
        :is-link="false"
        :border="border"
        class="el-card-header"
      >
        <template slot="title">
          <slot name="header">{{ header }}</slot>
        </template>
      </van-cell>
      <van-cell
        :border="false"
        class="el-card-body"
      >
        <slot />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { Cell, CellGroup } from 'vant'

export default {
  components: { [Cell.name]: Cell, [CellGroup.name]: CellGroup },
  name: 'ElCard',
  props: {
    header: String,
    description: String,
    body: String,
    shadow: { type: String, default: 'always' },
    border: { type: Boolean, default: true }
  },
  computed: {
    shadowClass() {
      return `is-${this.shadow}-shadow`
    }
  }
}
</script>

<style scoped>
.el-card-header {
  font-weight: 500;
}
</style>

<style>
.el-card-body {
  padding-top: 0;
}
.el-card.is-always-shadow {
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.el-card.is-hover-shadow:hover {
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.el-card.is-never-shadow {
  box-shadow: none;
}
</style>
