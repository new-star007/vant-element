<template>
  <div class="el-spinner" :style="spinnerStyle">
    <div class="el-spinner__circle" :style="circleStyle">
      <svg viewBox="0 0 50 50">
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          :stroke="color"
          :stroke-width="strokeWidth"
          stroke-linecap="round"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ElSpinner',
  props: {
    size: { type: Number, default: 40 },
    color: { type: String, default: '#409eff' },
    strokeWidth: { type: Number, default: 4 }
  },
  computed: {
    spinnerStyle() {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`
      }
    },
    circleStyle() {
      return {
        strokeWidth: `${this.strokeWidth}px`
      }
    }
  }
}
</script>

<style>
.el-spinner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.el-spinner__circle {
  width: 100%;
  height: 100%;
  animation: spinner-rotate 1.4s linear infinite;
}

.el-spinner__circle svg {
  width: 100%;
  height: 100%;
}

.el-spinner__circle circle {
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  animation: spinner-dash 1.4s ease-in-out infinite;
}

@keyframes spinner-rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes spinner-dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
</style>
