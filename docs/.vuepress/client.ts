import { defineClientConfig } from 'vuepress/client'
import MobilePreviewPanel from './components/MobilePreviewPanel.vue'

export default defineClientConfig({
  rootComponents: [MobilePreviewPanel],
})
