import Vue from 'vue'
import { Toast } from 'vant'

const ElMessage = function (options) {
  if (typeof options === 'string') {
    options = { message: options }
  }

  const typeMap = {
    success: 'success',
    warning: 'warning',
    info: 'text',
    error: 'fail'
  }

  const durationMap = {
    success: 2000,
    warning: 3000,
    info: 2000,
    error: 3000
  }

  const iconMap = {
    success: 'success',
    warning: 'warning-o',
    info: 'info-o',
    error: 'cross'
  }

  const type = options.type || 'info'

  Toast({
    message: options.message,
    type: typeMap[type] || 'text',
    duration: options.duration !== undefined ? options.duration : (durationMap[type] || 2000),
    icon: iconMap[type],
    onClose: options.onClose || (() => {}),
    position: options.position || 'bottom'
  })
}

ElMessage.success = (msg) => ElMessage({ message: msg, type: 'success' })
ElMessage.warning = (msg) => ElMessage({ message: msg, type: 'warning' })
ElMessage.info = (msg) => ElMessage({ message: msg, type: 'info' })
ElMessage.error = (msg) => ElMessage({ message: msg, type: 'error' })

ElMessage.close = () => Toast.clear()

export default ElMessage
