<template>
  <van-popover
    :value="show"
    @input="onPopoverInput"
    trigger="manual"
    theme="light"
    :placement="placement"
    :offset="offset"
    :get-container="teleport"
    class="el-popconfirm"
  >
    <div class="el-popconfirm__main">
      <van-icon v-if="icon && !hideIcon" :name="icon" class="el-popconfirm__icon" :style="{ color: iconColor }" />
      <span class="el-popconfirm__title">{{ title }}</span>
    </div>
    <div class="el-popconfirm__actions">
      <van-button
        v-if="showCancel"
        size="small"
        :type="cancelButtonType"
        @click="onCancel"
      >
        {{ cancelButtonText }}
      </van-button>
      <van-button
        size="small"
        :type="confirmButtonType"
        @click="onConfirm"
      >
        {{ confirmButtonText }}
      </van-button>
    </div>
    <template #reference>
      <span class="el-popconfirm__trigger" @click.stop="toggle">
        <slot name="reference">
          <slot />
        </slot>
      </span>
    </template>
  </van-popover>
</template>

<script>
import { Popover, Icon, Button } from 'vant'

export default {
  components: {
    [Popover.name]: Popover,
    [Icon.name]: Icon,
    [Button.name]: Button
  },
  name: 'ElPopconfirm',
  props: {
    title: { type: String, default: '' },
    placement: { type: String, default: 'top' },
    disabled: Boolean,
    icon: { type: String, default: 'info-o' },
    iconColor: { type: String, default: '#f90' },
    confirmButtonType: { type: String, default: 'primary' },
    cancelButtonType: { type: String, default: 'default' },
    confirmButtonText: { type: String, default: '确定' },
    cancelButtonText: { type: String, default: '取消' },
    teleport: { type: [String, Function], default: null },
    offset: { type: Array, default: () => [0, 10] },
    showCancel: { type: Boolean, default: true },
    hideIcon: Boolean,
    hideAfterClick: { type: Boolean, default: true }
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    toggle() {
      if (!this.disabled) {
        this.show = true
      }
    },
    onPopoverInput(val) {
      if (!val) this.show = false
    },
    onConfirm() {
      this.$emit('confirm')
      if (this.hideAfterClick) {
        this.show = false
      }
    },
    onCancel() {
      this.$emit('cancel')
      if (this.hideAfterClick) {
        this.show = false
      }
    }
  }
}
</script>
<style>
.el-popconfirm {
  display: inline-block;
}

.el-popconfirm__main {
  display: flex;
  align-items: center;
  padding: 12px 16px 8px;
  font-size: 14px;
  line-height: 1.5;
}

.el-popconfirm__icon {
  margin-right: 8px;
  font-size: 18px;
}

.el-popconfirm__actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 8px 16px 12px;
}
</style>
