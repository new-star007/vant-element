<template>
  <div :class="['el-empty', sizeClass]">
    <van-empty
      :image="image"
      :description="description"
      v-bind="$attrs"
    >
      <template slot="image">
        <slot name="image" />
      </template>
      <template slot="description">
        <slot name="description">{{ description }}</slot>
      </template>
      <slot />
    </van-empty>
    <div v-if="$slots.bottom" class="el-empty__bottom">
      <slot name="bottom" />
    </div>
  </div>
</template>

<script>
import { Empty } from 'vant'

export default {
  components: { [Empty.name]: Empty },
  name: 'ElEmpty',
  props: {
    image: { type: String, default: 'default' },
    description: String,
    imageSize: [Number, String],
    size: { type: String, default: 'normal' }
  },
  computed: {
    sizeClass() {
      return this.size ? `el-empty--${this.size}` : ''
    }
  }
}
</script>

<style scoped>
.el-empty--small {
  transform: scale(0.8);
  transform-origin: top center;
}
.el-empty__bottom {
  margin-top: 16px;
  text-align: center;
}
</style>
