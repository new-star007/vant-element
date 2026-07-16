<template>
  <van-dialog
    v-if="dialogMounted"
    :value="visible"
    @input="onInput"
    @confirm="onConfirm"
    @cancel="onCancel"
    @close="onClose"
    @opened="onOpened"
    @closed="onClosed"
    :title="title"
    :message="hasFooterSlot ? undefined : message"
    :message-align="messageAlign"
    :show-cancel-button="hasFooterSlot ? false : showCancelButton"
    :show-confirm-button="hasFooterSlot ? false : showConfirmButton"
    :cancel-button-text="cancelButtonText"
    :confirm-button-text="confirmButtonText"
    :cancel-button-color="cancelButtonColor"
    :confirm-button-color="confirmButtonColor"
    :close-on-click-overlay="closeOnClickModal"
    :before-close="mapBeforeClose"
    :overlay="modal"
    :overlay-style="overlayStyle"
    :lazy-render="lazyRender"
    :class="$attrs.class"
    :style="dialogStyle"
  >
    <template v-if="hasFooterSlot">
      <div class="el-dialog__body">
        <slot />
      </div>
      <div class="el-dialog__footer">
        <slot name="footer" />
      </div>
    </template>
    <slot v-else />
    <slot slot="title" name="title" />
  </van-dialog>
</template>

<script>
import { Dialog } from 'vant'

export default {
  components: { [Dialog.Component.name]: Dialog.Component },
  name: 'ElDialog',
  props: {
    visible: Boolean,
    title: String,
    message: String,
    messageAlign: String,
    width: [String, Number],
    top: [String, Number],
    modal: { type: Boolean, default: true },
    showClose: { type: Boolean, default: true },
    closeOnClickModal: { type: Boolean, default: true },
    showCancelButton: Boolean,
    showConfirmButton: { type: Boolean, default: true },
    cancelButtonText: String,
    confirmButtonText: String,
    cancelButtonColor: String,
    confirmButtonColor: String,
    beforeClose: Function,
    lazyRender: { type: Boolean, default: true },
    fullscreen: Boolean,
    customClass: String,
    overlayStyle: Object,
    closeOnHashChange: { type: Boolean, default: true },
    closeOnPressEscape: { type: Boolean, default: true },
    destroyOnClose: Boolean,
    center: Boolean,
    lockScroll: { type: Boolean, default: true },
    showHeader: { type: Boolean, default: true },
    modalAppendToBody: { type: Boolean, default: true }
  },
  computed: {
    dialogMounted() {
      return !this.destroyOnClose || this.visible
    },
    hasFooterSlot() {
      return !!this.$slots.footer
    },
    dialogStyle() {
      const style = {}
      if (this.width) {
        const val = isNaN(Number(this.width)) ? this.width : this.width + 'px'
        style.width = val
      }
      return style
    },
    mapBeforeClose() {
      return this.beforeClose || null
    }
  },
  watch: {
    visible(val) {
      this.$emit('input', val)
    }
  },
  methods: {
    onInput(val) {
      if (!val && this.visible) {
        this.$emit('update:visible', false)
      }
    },
    onConfirm() {
      this.$emit('confirm')
    },
    onCancel() {
      this.$emit('cancel')
    },
    onClose() {
      this.$emit('close')
    },
    onOpened() {
      this.$emit('open')
      this.$emit('opened')
    },
    onClosed() {
      this.$emit('closed')
    },
    handleClose() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped>
.el-dialog__footer {
  border-top: 1px solid #ebedf0;
  padding: 12px 16px;
}
</style>
