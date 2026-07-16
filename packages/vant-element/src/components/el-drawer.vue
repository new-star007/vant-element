<template>
  <van-popup
    :value="value"
    @input="onInput"
    :position="position"
    :overlay="modal"
    :overlay-class="modalClass"
    :overlay-style="modalStyle"
    :lock-scroll="lockScroll"
    :get-container="getContainer"
    :close-on-click-overlay="closeOnClickModal"
    :z-index="zIndex"
    :class="popupClass"
    :style="popupStyle"
  >
    <div class="el-drawer">
      <div v-if="title || $slots.title" class="el-drawer__header">
        <slot name="title">
          <span class="el-drawer__title">{{ title }}</span>
        </slot>
        <button type="button" class="el-drawer__close-btn" @click="onClose">
          <i class="el-icon-close"></i>
        </button>
      </div>
      <div class="el-drawer__body" :style="{ overflow: bodyOverflow }">
        <slot />
      </div>
      <div v-if="$slots.footer" class="el-drawer__footer">
        <slot name="footer" />
      </div>
    </div>
  </van-popup>
</template>

<script>
import { Popup } from 'vant'

export default {
  components: { [Popup.name]: Popup },
  name: 'ElDrawer',
  props: {
    value: Boolean,
    title: String,
    size: { type: [String, Number], default: '30%' },
    direction: { type: String, default: 'rtl' },
    modal: { type: Boolean, default: true },
    modalClass: String,
    modalStyle: Object,
    visible: Boolean,
    showClose: { type: Boolean, default: true },
    beforeClose: Function,
    closeOnClickModal: { type: Boolean, default: true },
    closeOnPressEscape: { type: Boolean, default: true },
    openDelay: { type: Number, default: 0 },
    closeDelay: { type: Number, default: 0 },
    customClass: String,
    destroyOnClose: { type: Boolean, default: false },
    appendToBody: { type: Boolean, default: true },
    zIndex: { type: Number, default: 2000 },
    lockScroll: { type: Boolean, default: true }
  },
  data() {
    return {
      closed: false
    }
  },
  computed: {
    position() {
      const posMap = {
        rtl: 'right',
        ltr: 'left',
        ttb: 'top',
        btt: 'bottom'
      }
      return posMap[this.direction] || 'right'
    },
    popupClass() {
      return ['el-drawer__popup', this.customClass]
    },
    popupStyle() {
      if (this.direction === 'rtl' || this.direction === 'ltr') {
        return { width: this.size, height: '100%' }
      }
      return { height: this.size }
    },
    bodyOverflow() {
      return 'auto'
    },
    getContainer() {
      return this.appendToBody ? () => document.body : undefined
    }
  },
  watch: {
    value(val) {
      if (val) {
        this.$emit('open')
        if (this.openDelay > 0) {
          setTimeout(() => {
            this.$emit('opened')
          }, this.openDelay)
        } else {
          this.$emit('opened')
        }
      } else {
        this.$emit('close')
        if (!this.closed) {
          this.$emit('closed')
        }
      }
      this.closed = false
    }
  },
  methods: {
    onInput(val) {
      this.$emit('input', val)
      this.$emit('update:visible', val)
    },
    onClose() {
      if (this.beforeClose) {
        this.beforeClose((action) => {
          if (action === 'close') {
            this.onInput(false)
          }
        })
      } else {
        this.onInput(false)
      }
    }
  }
}
</script>

<style>
.el-drawer {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fff;
}

.el-drawer__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #e8e8e8;
}

.el-drawer__title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.el-drawer__close-btn {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 18px;
  color: #909399;
  padding: 0;
}

.el-drawer__close-btn:hover {
  color: #409eff;
}

.el-drawer__body {
  flex: 1;
  padding: 20px;
  overflow: auto;
}

.el-drawer__footer {
  padding: 16px 20px;
  border-top: 1px solid #e8e8e8;
}
</style>
