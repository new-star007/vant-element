<template>
  <van-image
    :src="src"
    :fit="fit"
    :alt="alt"
    :width="width"
    :height="height"
    :radius="radius"
    :round="round"
    :lazy-load="lazy"
    :show-error="showError"
    :show-loading="showLoading"
    @load="onLoad"
    @error="onError"
  >
    <template slot="loading">
      <slot name="loading">
        <slot name="placeholder">
          <van-loading type="spinner" size="20" />
        </slot>
      </slot>
    </template>
    <template slot="error">
      <slot name="error">
        <van-icon name="photo-fail" />
      </slot>
    </template>
  </van-image>
</template>

<script>
import { Image, Loading, Icon } from 'vant'

export default {
  components: { [Image.name]: Image, [Loading.name]: Loading, [Icon.name]: Icon },
  name: 'ElImage',
  props: {
    src: String,
    fit: { type: String, default: 'fill' },
    alt: String,
    width: [String, Number],
    height: [String, Number],
    radius: [String, Number],
    round: Boolean,
    lazy: Boolean,
    showError: { type: Boolean, default: true },
    showLoading: { type: Boolean, default: true },
    scrollContainer: [String, Object],
    previewSrcList: Array,
    zIndex: { type: Number, default: 2000 },
    initialIndex: { type: Number, default: 0 },
    hideOnClickModal: Boolean,
    closeOnPressEscape: Boolean,
    infinite: { type: Boolean, default: true }
  },
  methods: {
    onLoad() {
      this.$emit('load')
    },
    onError() {
      this.$emit('error')
    }
  }
}
</script>
