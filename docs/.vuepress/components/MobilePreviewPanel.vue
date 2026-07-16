<template>
  <div v-if="showPreview" class="mobile-preview-panel">
    <div class="phone-frame">
      <div class="phone-statusbar">
        <span class="statusbar-time">09:41</span>
        <div class="statusbar-icons">
          <svg viewBox="0 0 18 12" width="18" height="12"><rect x="0.5" y="1.5" width="17" height="9" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.2"/><rect x="3" y="4" width="12" height="4" rx="0.5" fill="currentColor"/></svg>
        </div>
      </div>
      <div class="phone-notch"></div>
      <div class="phone-screen" ref="phoneScreenRef">
        <iframe
          v-if="demoUrl"
          ref="iframeRef"
          :src="demoUrl"
          class="phone-iframe"
          frameborder="0"
          loading="lazy"
        />
        <div v-else class="phone-placeholder">
          暂无演示
        </div>
      </div>
      <div class="phone-homebar">
        <div class="homebar-indicator"></div>
      </div>
    </div>
    <p class="phone-label">移动端预览</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vuepress/client'

const DEMO_BASE = 'http://localhost:8080'

const EXAMPLE_ROUTES: Record<string, string> = {
  'list': 'list-demo',
  'list-page': 'list-page',
  'user-list': 'list',
  'user-table': 'user-table',
}

const route = useRoute()
const phoneScreenRef = ref<HTMLDivElement>()
const iframeRef = ref<HTMLIFrameElement>()

const showPreview = computed(() => {
  const path = route.path
  return /^\/(components|examples)\/[^/]+(\.html)?$/.test(path)
})

const demoUrl = computed(() => {
  const path = route.path
  const match = path.match(/^\/(?:components|examples)\/([^/.]+)/)
  if (!match) return ''
  
  const name = match[1]
  const routePath = EXAMPLE_ROUTES[name] || name
  return `${DEMO_BASE}/#/${routePath}`
})
</script>

<style>
.mobile-preview-panel {
  position: fixed;
  right: 20px;
  top: 80px;
  width: 375px;
  z-index: 100;
  pointer-events: auto;
}

.mobile-preview-panel .phone-frame {
  width: 100%;
  background: #1a1a1a;
  border-radius: 40px;
  padding: 12px;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.1),
    0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
}

.mobile-preview-panel .phone-statusbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 20px 4px;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
}

.mobile-preview-panel .statusbar-icons {
  display: flex;
  align-items: center;
  gap: 4px;
  opacity: 0.8;
}

.mobile-preview-panel .phone-notch {
  width: 150px;
  height: 28px;
  background: #1a1a1a;
  border-radius: 0 0 18px 18px;
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}

.mobile-preview-panel .phone-screen {
  background: #fff;
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  z-index: 0;
  margin-top: -10px;
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
}

.mobile-preview-panel .phone-iframe {
  display: block;
  width: 100%;
  height: 667px;
  max-height: 80vh;
  pointer-events: auto;
}

.mobile-preview-panel .phone-placeholder {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 14px;
}

.mobile-preview-panel .phone-homebar {
  display: flex;
  justify-content: center;
  padding: 8px 0 4px;
}

.mobile-preview-panel .homebar-indicator {
  width: 120px;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

.mobile-preview-panel .phone-label {
  margin-top: 12px;
  font-size: 13px;
  color: #999;
  text-align: center;
}
</style>
