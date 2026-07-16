import { Notify } from 'vant'

const ElNotification = function (options) {
  if (typeof options === 'string') {
    options = { message: options }
  }

  const typeMap = {
    success: 'success',
    warning: 'warning',
    info: 'primary',
    error: 'danger'
  }

  const type = options.type || 'info'
  const vantType = typeMap[type] || 'primary'

  Notify({
    message: options.message,
    color: options.color,
    background: options.backgroundColor,
    duration: options.duration !== undefined ? options.duration : 3000,
    type: vantType,
    onClick: options.onClick || (() => {}),
    onClose: options.onClose || (() => {}),
    className: options.customClass
  })
}

ElNotification.success = (msg) => ElNotification({ message: msg, type: 'success' })
ElNotification.warning = (msg) => ElNotification({ message: msg, type: 'warning' })
ElNotification.info = (msg) => ElNotification({ message: msg, type: 'info' })
ElNotification.error = (msg) => ElNotification({ message: msg, type: 'error' })

ElNotification.close = () => Notify.clear()

export default ElNotification
