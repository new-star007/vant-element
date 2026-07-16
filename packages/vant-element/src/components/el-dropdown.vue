<template>
  <van-popover
    v-model="visible"
    :trigger="popoverTrigger"
    :placement="placement"
    :offset="[0, 4]"
    :close-on-click-action="hideOnClick"
    theme="light"
    @open="onOpen"
    @close="onClose"
  >
    <div class="el-dropdown__popper">
      <slot name="dropdown" />
    </div>
    <template #reference>
      <div
        class="el-dropdown"
        :class="{ 'el-dropdown--split': splitButton }"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
      >
        <template v-if="splitButton">
          <van-button
            :type="mapType"
            :size="mapSize"
            :disabled="disabled"
            @click="handleMainClick"
          >
            <slot />
          </van-button>
          <van-button
            :type="mapType"
            :size="mapSize"
            :disabled="disabled"
            class="el-dropdown__caret-button"
            @click="toggle"
          >
            <van-icon name="arrow-down" />
          </van-button>
        </template>
        <span v-else class="el-dropdown__trigger" @click="onTriggerClick">
          <slot />
        </span>
      </div>
    </template>
  </van-popover>
</template>

<script>
import { Popover, Button, Icon } from 'vant'

export default {
  components: {
    [Popover.name]: Popover,
    [Button.name]: Button,
    [Icon.name]: Icon
  },
  name: 'ElDropdown',
  provide() {
    return {
      dropdown: this
    }
  },
  props: {
    trigger: { type: String, default: 'hover' },
    hideOnClick: { type: Boolean, default: true },
    placement: { type: String, default: 'bottom' },
    size: { type: String, default: 'default' },
    splitButton: Boolean,
    type: String,
    disabled: Boolean,
    hideTimeout: { type: Number, default: 150 }
  },
  data() {
    return {
      visible: false,
      hoverTimer: null
    }
  },
  computed: {
    popoverTrigger() {
      if (this.trigger === 'click' && !this.splitButton) return 'click'
      return 'manual'
    },
    mapType() {
      const map = { info: 'default', text: 'default', default: 'default', primary: 'info', success: 'primary', warning: 'warning', danger: 'danger' }
      return map[this.type] || 'default'
    },
    mapSize() {
      const map = { mini: 'small', small: 'small', default: 'normal', medium: 'normal', large: 'large' }
      return map[this.size] || 'normal'
    }
  },
  methods: {
    toggle() {
      if (this.disabled) return
      this.visible = !this.visible
    },
    onTriggerClick() {
      // click-trigger is handled natively by van-popover
    },
    onMouseEnter() {
      if (this.disabled || this.splitButton || this.trigger !== 'hover') return
      clearTimeout(this.hoverTimer)
      this.visible = true
    },
    onMouseLeave() {
      if (this.disabled || this.splitButton || this.trigger !== 'hover') return
      this.hoverTimer = setTimeout(() => {
        this.visible = false
      }, this.hideTimeout)
    },
    onOpen() {
      this.$emit('visible-change', true)
    },
    onClose() {
      this.$emit('visible-change', false)
    },
    handleMainClick() {
      this.$emit('click')
    },
    handleItemClick(command, instance) {
      this.$emit('command', command, instance)
    },
    hide() {
      if (this.hideOnClick) {
        this.visible = false
      }
    }
  },
  beforeDestroy() {
    clearTimeout(this.hoverTimer)
  }
}
</script>

<style>
.el-dropdown {
  display: inline-block;
}

.el-dropdown__trigger {
  display: inline-block;
}

.el-dropdown--split {
  display: inline-flex;
  align-items: stretch;
}

.el-dropdown--split .van-button:first-child {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.el-dropdown--split .el-dropdown__caret-button {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left: none;
  padding: 0 8px;
}

.van-popover__arrow {
  display: none;
}
</style>
