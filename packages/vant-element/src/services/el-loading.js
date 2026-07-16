import { Toast } from 'vant'

let loadingToast = null

const ElLoading = function (options = {}) {
  const opts = typeof options === 'string' ? { text: options } : options

  ElLoading.close()

  loadingToast = Toast.loading({
    message: opts.text || opts.message || opts.body || '',
    forbidClick: opts.mask !== false,
    duration: 0
  })

  return { close: ElLoading.close }
}

ElLoading.close = () => {
  if (loadingToast) {
    loadingToast.clear()
    loadingToast = null
  }
}

ElLoading.service = ElLoading

export default ElLoading
