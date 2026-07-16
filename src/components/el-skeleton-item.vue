<template>
  <div class="el-skeleton-item" :class="`el-skeleton-item--${variant}`">
    <div v-if="variant === 'text'" class="el-skeleton-item__text" :style="textStyle" />
    <div v-else-if="variant === 'circle'" class="el-skeleton-item__circle" :style="circleStyle" />
    <div v-else-if="variant === 'rect'" class="el-skeleton-item__rect" :style="rectStyle" />
    <div v-else-if="variant === 'image'" class="el-skeleton-item__image" :style="imageStyle" />
    <div v-else class="el-skeleton-item__text" :style="textStyle" />
  </div>
</template>

<script>
export default {
  name: 'ElSkeletonItem',
  props: {
    variant: {
      type: String,
      default: 'text',
      validator: (val) => ['text', 'circle', 'rect', 'image'].includes(val)
    },
    width: [String, Number],
    height: [String, Number]
  },
  computed: {
    textStyle() {
      return {
        width: this.width ? `${this.width}px` : '100%',
        height: this.height ? `${this.height}px` : '16px'
      }
    },
    circleStyle() {
      const size = this.width || this.height || 40
      return {
        width: `${size}px`,
        height: `${size}px`
      }
    },
    rectStyle() {
      return {
        width: this.width ? `${this.width}px` : '100%',
        height: this.height ? `${this.height}px` : '100px'
      }
    },
    imageStyle() {
      return {
        width: this.width ? `${this.width}px` : '100%',
        height: this.height ? `${this.height}px` : '200px'
      }
    }
  }
}
</script>

<style>
.el-skeleton-item {
  background-color: #f2f3f5;
  border-radius: 4px;
  overflow: hidden;
  animation: skeleton-loading 1.4s ease infinite;
}

.el-skeleton-item--text {
  border-radius: 4px;
}

.el-skeleton-item--circle {
  border-radius: 50%;
}

.el-skeleton-item--rect {
  border-radius: 4px;
}

.el-skeleton-item--image {
  border-radius: 4px;
}

@keyframes skeleton-loading {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
}
</style>
