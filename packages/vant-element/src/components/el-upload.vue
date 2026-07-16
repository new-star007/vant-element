<template>
  <div class="el-upload">
    <van-uploader
      :value="fileList"
      @input="onInput"
      @delete="onDelete"
      :multiple="multiple"
      :accept="accept"
      :max-count="resolvedLimit"
      :max-size="mapMaxSize"
      :preview-size="previewSize"
      :preview-image="showPreview"
      :deletable="!disabled"
      :upload-text="uploadText"
      :before-read="mapBeforeUpload"
      :after-read="afterRead"
      :result-type="resultType"
      :disabled="disabled"
      :capture="capture"
      v-bind="$attrs"
    >
      <slot />
      <template #preview-cover="{ file }">
        <slot name="file" :file="file">
          <div>{{ file ? file.name || file.url : '' }}</div>
        </slot>
      </template>
    </van-uploader>
  </div>
</template>

<script>
import { Uploader } from 'vant'

export default {
  components: { [Uploader.name]: Uploader },
  name: 'ElUpload',
  props: {
    value: Array,
    fileList: Array,
    action: String,
    headers: Object,
    data: Object,
    multiple: Boolean,
    accept: String,
    maxCount: [Number, String],
    limit: [Number, String],
    disabled: Boolean,
    drag: Boolean,
    autoUpload: { type: Boolean, default: true },
    showFileList: { type: Boolean, default: true },
    listType: { type: String, default: 'text' },
    beforeUpload: Function,
    beforeRemove: Function,
    onRemove: Function,
    onSuccess: Function,
    onError: Function,
    onProgress: Function,
    onChange: Function,
    onPreview: Function,
    onExceed: Function,
    httpRequest: Function,
    withCredentials: Boolean,
    name: { type: String, default: 'file' },
    previewSize: { type: [Number, String], default: 80 },
    showPreview: { type: Boolean, default: true },
    uploadText: String,
    maxSize: [Number, String],
    resultType: { type: String, default: 'dataUrl' },
    capture: String
  },
  data() {
    return {
      _xhrMap: new Map()
    }
  },
  computed: {
    resolvedLimit() {
      return this.limit || this.maxCount
    },
    mapMaxSize() {
      return this.maxSize ? Number(this.maxSize) : undefined
    },
    mapBeforeUpload() {
      return this.beforeUpload ? (file) => {
        return this.beforeUpload(file)
      } : null
    }
  },
  methods: {
    onInput(files) {
      this.$emit('input', files)
      if (this.onChange) this.onChange(files)
    },
    onDelete(file) {
      if (this.beforeRemove) {
        const result = this.beforeRemove(file)
        if (result === false) return
      }
      if (this.onRemove) this.onRemove(file)
    },
    afterRead(file) {
      if (this.action && this.autoUpload) {
        this.uploadFile(file)
      }
    },
    uploadFile(file) {
      const formData = new FormData()
      formData.append(this.name, file.file)
      if (this.data) {
        Object.entries(this.data).forEach(([k, v]) => formData.append(k, v))
      }
      const xhr = new XMLHttpRequest()
      xhr.open('POST', this.action)
      if (this.headers) {
        Object.entries(this.headers).forEach(([k, v]) => xhr.setRequestHeader(k, v))
      }
      xhr.timeout = 60000
      xhr.upload.onprogress = (e) => {
        if (this.onProgress) this.onProgress(e, file)
      }
      xhr.onload = () => {
        this._xhrMap.delete(file)
        if (xhr.status >= 200 && xhr.status < 300) {
          if (this.onSuccess) this.onSuccess(JSON.parse(xhr.responseText), file)
        } else {
          if (this.onError) this.onError(new Error('upload fail'), file)
        }
      }
      xhr.onerror = () => {
        this._xhrMap.delete(file)
        if (this.onError) this.onError(new Error('upload error'), file)
      }
      xhr.ontimeout = () => {
        this._xhrMap.delete(file)
        if (this.onError) this.onError(new Error('upload timeout'), file)
      }
      this._xhrMap.set(file, xhr)
      xhr.send(formData)
    },
    abort(file) {
      if (file && this._xhrMap.has(file)) {
        this._xhrMap.get(file).abort()
        this._xhrMap.delete(file)
      } else {
        this._xhrMap.forEach(xhr => xhr.abort())
        this._xhrMap.clear()
      }
    },
    clearFiles() {
      this.$emit('input', [])
    }
  }
}
</script>

<style scoped>
.el-upload { display: inline-block; }
</style>
