const InfiniteScroll = {
  name: 'InfiniteScroll',
  bind(el, binding) {
    const handler = () => {
      const { scrollContainer } = el._infiniteScrollOpts || {}
      const container = scrollContainer || el
      const { scrollTop, scrollHeight, clientHeight } = container

      if (scrollHeight - scrollTop - clientHeight < 100) {
        binding.value()
      }
    }

    el._infiniteScrollHandler = handler
    el._infiniteScrollOpts = {
      scrollContainer: el
    }

    setTimeout(() => {
      const container = el._infiniteScrollOpts.scrollContainer || el
      container.addEventListener('scroll', handler)
    }, 0)
  },
  unbind(el) {
    const container = el._infiniteScrollOpts?.scrollContainer || el
    if (el._infiniteScrollHandler) {
      container.removeEventListener('scroll', el._infiniteScrollHandler)
    }
    delete el._infiniteScrollHandler
    delete el._infiniteScrollOpts
  }
}

export default InfiniteScroll

export function install(Vue) {
  Vue.directive('infiniteScroll', InfiniteScroll)
}
