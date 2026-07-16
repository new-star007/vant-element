<template>
  <a
    class="el-link"
    :class="linkClass"
    :href="href"
    :target="target"
    @click="handleClick"
  >
    <span v-if="$slots.default" class="el-link__inner">
      <slot />
    </span>
    <span v-if="icon" class="el-link__icon">
      <van-icon :name="mapIcon(icon)" />
    </span>
    <span v-if="$slots.icon" class="el-link__icon">
      <slot name="icon" />
    </span>
  </a>
</template>

<script>
import { Icon } from 'vant'
import { iconMap } from '../utils'

export default {
  components: { [Icon.name]: Icon },
  name: 'ElLink',
  props: {
    type: { type: String, default: 'default' },
    underline: { type: Boolean, default: true },
    disabled: Boolean,
    href: String,
    icon: String,
    target: String
  },
  computed: {
    linkClass() {
      return {
        [`el-link--${this.type}`]: this.type,
        'is-underline': this.underline,
        'is-disabled': this.disabled
      }
    }
  },
  methods: {
    mapIcon(name) {
      return iconMap(name)
    },
    handleClick(e) {
      if (this.disabled) {
        e.preventDefault()
        return
      }
      this.$emit('click', e)
    }
  }
}
</script>

<style>
.el-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #606266;
  cursor: pointer;
  transition: color 0.3s;
  text-decoration: none;
  outline: none;
}

.el-link:hover {
  color: #409eff;
}

.el-link.is-underline:hover {
  text-decoration: underline;
}

.el-link.is-disabled {
  color: #c0c4cc;
  cursor: not-allowed;
}

.el-link.is-disabled:hover {
  color: #c0c4cc;
  text-decoration: none;
}

.el-link--primary {
  color: #409eff;
}

.el-link--primary:hover {
  color: #66b1ff;
}

.el-link--success {
  color: #67c23a;
}

.el-link--success:hover {
  color: #85ce61;
}

.el-link--warning {
  color: #e6a23c;
}

.el-link--warning:hover {
  color: #ebb563;
}

.el-link--danger {
  color: #f56c6c;
}

.el-link--danger:hover {
  color: #f78989;
}

.el-link--info {
  color: #909399;
}

.el-link--info:hover {
  color: #a6a9ad;
}

.el-link__inner {
  display: inline-flex;
  align-items: center;
}

.el-link__icon {
  margin-left: 4px;
}
</style>
