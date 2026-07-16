<template>
  <van-swipe
    :value="currentIndex"
    @input="onInput"
    @change="onChange"
    :autoplay="swipeAutoplay"
    :duration="duration"
    :loop="loop"
    :vertical="swipeVertical"
    :touchable="touchable"
    :lazy-render="lazyRender"
    :indicator-color="indicatorColor"
    :width="width"
    :height="swipeHeight"
    :style="height ? { height } : {}"
    :initial-swipe="initialIndex"
    v-bind="$attrs"
    ref="swipe"
  >
    <slot />
    <template #indicator>
      <div v-if="indicatorPosition !== 'none'" class="el-carousel__indicators">
        <span
          v-for="(_, idx) in itemsCount"
          :key="idx"
          :class="['el-carousel__indicator', { 'is-active': idx === currentIndex }]"
          @click="indicatorClick(idx)"
        >
          <button class="el-carousel__button" />
        </span>
      </div>
    </template>
  </van-swipe>
</template>

<script>
import { Swipe } from 'vant'

export default {
  components: { [Swipe.name]: Swipe },
  name: 'ElCarousel',
  props: {
    value: Number,
    initialIndex: { type: Number, default: 0 },
    height: { type: String, default: '200px' },
    width: String,
    autoplay: { type: Boolean, default: true },
    interval: { type: Number, default: 3000 },
    indicator: { type: Boolean, default: true },
    arrow: { type: String, default: 'hover' },
    type: String,
    loop: { type: Boolean, default: true },
    direction: { type: String, default: 'horizontal' },
    pauseOnHover: { type: Boolean, default: true },
    duration: { type: Number, default: 300 },
    indicatorPosition: String,
    trigger: { type: String, default: 'hover' },
    touchable: { type: Boolean, default: true },
    lazyRender: { type: Boolean, default: false },
    indicatorColor: String
  },
  computed: {
    swipeAutoplay() {
      return this.autoplay ? this.interval : 0
    },
    swipeHeight() {
      const val = parseInt(this.height, 10)
      return isNaN(val) ? 0 : val
    },
    swipeVertical() {
      return this.direction === 'vertical'
    }
  },
  data() {
    return {
      currentIndex: this.initialIndex || 0,
      itemsCount: 0
    }
  },
  watch: {
    initialIndex(val) {
      this.currentIndex = val
    }
  },
  mounted() {
    this.updateItemsCount()
  },
  methods: {
    updateItemsCount() {
      this.itemsCount = this.$children.filter(c => c.$options.name === 'ElCarouselItem').length
    },
    onInput(val) {
      this.currentIndex = val
      this.$emit('input', val)
    },
    onChange(val) {
      this.currentIndex = val
      this.$emit('change', val)
    },
    indicatorClick(idx) {
      this.currentIndex = idx
      this.$emit('input', idx)
    },
    setActiveItem(index) {
      this.currentIndex = index
      this.$emit('input', index)
    },
    prev() {
      this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.itemsCount - 1
      this.$emit('input', this.currentIndex)
    },
    next() {
      this.currentIndex = (this.currentIndex + 1) % this.itemsCount
      this.$emit('input', this.currentIndex)
    }
  }
}
</script>

<style>
.el-carousel {
  width: 100%;
}
.el-carousel__indicators {
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: center;
}
.el-carousel__indicator button {
  display: block;
  width: 30px;
  height: 2px;
  border: 0;
  padding: 0;
  background: rgba(255,255,255,0.5);
  cursor: pointer;
  outline: none;
}
.el-carousel__indicator.is-active button {
  background: #fff;
}
</style>
