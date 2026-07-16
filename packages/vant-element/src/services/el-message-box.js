import Vue from 'vue'
import { Dialog } from 'vant'

function createPromptDialog(options) {
  const vm = new Vue({
    render(h) {
      return h('div', { style: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.7)' } }, [
        h('div', { style: { width: '85%', maxWidth: '320px', background: '#fff', borderRadius: '12px', overflow: 'hidden' } }, [
          options.title ? h('div', { style: { padding: '20px 16px 8px', fontSize: '16px', fontWeight: 600, textAlign: 'center' } }, options.title) : null,
          options.message ? h('div', { style: { padding: '8px 16px 12px', fontSize: '14px', color: '#666', textAlign: 'center' } }, options.message) : null,
          h('div', { style: { padding: '0 16px 16px' } }, [
            h('input', {
              ref: 'input',
              attrs: { type: options.inputType || 'text', placeholder: options.inputPlaceholder || '' },
              domProps: { value: options.inputValue || '' },
              style: { width: '100%', padding: '8px 12px', border: '1px solid #dcdfe6', borderRadius: '4px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' },
              on: {
                input: (e) => { this.inputValue = e.target.value },
                keydown: (e) => { if (e.key === 'Enter' && options.confirmButtonText !== false) this.onConfirm() }
              }
            })
          ]),
          h('div', { style: { display: 'flex', borderTop: '1px solid #ebedf0' } }, [
            options.showCancelButton !== false ? h('button', {
              style: { flex: 1, padding: '14px', border: 'none', background: 'none', fontSize: '15px', color: '#666', borderRight: '1px solid #ebedf0' },
              on: { click: () => this.onCancel() }
            }, options.cancelButtonText || '取消') : null,
            h('button', {
              style: { flex: 1, padding: '14px', border: 'none', background: 'none', fontSize: '15px', color: '#1989fa', fontWeight: 600 },
              on: { click: () => this.onConfirm() }
            }, options.confirmButtonText || '确定')
          ])
        ])
      ])
    },
    data() {
      return { inputValue: options.inputValue || '' }
    },
    methods: {
      onConfirm() {
        const val = this.inputValue
        if (options.inputPattern && !options.inputPattern.test(val)) {
          return
        }
        document.body.removeChild(this.$el)
        this.$destroy()
        options.resolve({ value: val, action: 'confirm' })
      },
      onCancel() {
        document.body.removeChild(this.$el)
        this.$destroy()
        options.reject({ value: this.inputValue, action: 'cancel' })
      }
    }
  })
  vm.$mount()
  document.body.appendChild(vm.$el)
  setTimeout(() => {
    const input = vm.$refs.input
    if (input) input.focus()
  }, 100)
}

function MessageBox(options) {
  return new Promise((resolve, reject) => {
    const type = options.type || 'alert'
    const isConfirm = type === 'confirm'
    const isPrompt = type === 'prompt'

    if (isPrompt) {
      createPromptDialog({ ...options, resolve, reject })
      return
    }

    const dialogOptions = {
      title: options.title || '',
      message: options.message || '',
      showCancelButton: isConfirm,
      showConfirmButton: true,
      confirmButtonText: options.confirmButtonText || '确定',
      cancelButtonText: options.cancelButtonText || '取消',
      confirmButtonColor: options.confirmButtonColor,
      cancelButtonColor: options.cancelButtonColor,
      closeOnClickOverlay: options.closeOnClickModal || false
    }

    if (options.beforeClose) {
      dialogOptions.beforeClose = (action, done) => {
        options.beforeClose(action, done, {})
      }
    }

    Dialog(dialogOptions).then(() => {
      resolve('confirm')
    }).catch(() => {
      reject('cancel')
    })
  })
}

MessageBox.alert = function (message, title, options = {}) {
  if (typeof title === 'object') { options = title; title = undefined }
  return MessageBox({ ...options, type: 'alert', title: title || options.title || '提示', message })
}

MessageBox.confirm = function (message, title, options = {}) {
  if (typeof title === 'object') { options = title; title = undefined }
  return MessageBox({ ...options, type: 'confirm', title: title || options.title || '提示', message })
}

MessageBox.prompt = function (message, title, options = {}) {
  if (typeof title === 'object') { options = title; title = undefined }
  return MessageBox({ ...options, type: 'prompt', title: title || options.title || '提示', message })
}

MessageBox.close = () => Dialog.close()

export default MessageBox
