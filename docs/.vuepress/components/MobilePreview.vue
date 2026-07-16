<template>
  <div class="mobile-preview">
    <div class="mobile-preview-frame">
      <div class="mobile-preview-screen">
        <iframe
          v-if="src"
          :src="fullUrl"
          class="mobile-preview-iframe"
          frameborder="0"
          loading="lazy"
          @load="onLoad"
        />
        <div v-else class="mobile-preview-placeholder">
          请在 frontmatter 中设置 demoUrl
        </div>
      </div>
      <div class="mobile-preview-homebar">
        <div class="homebar-indicator"></div>
      </div>
    </div>
    <p class="mobile-preview-label">{{ label }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePageFrontmatter } from 'vuepress/client'
import type { DemoFrontmatter } from '../types'

const props = withDefaults(defineProps<{
  src?: string
  baseUrl?: string
  label?: string
}>(), {
  baseUrl: 'http://localhost:8080',
  label: '移动端预览',
})

const emit = defineEmits<{
  load: [event: Event]
}>()

const frontmatter = usePageFrontmatter<DemoFrontmatter>()

const fullUrl = computed(() => {
  const path = props.src || frontmatter.value.demoUrl
  if (!path) return ''
  return `${props.baseUrl}${path}`
})

function onLoad(e: Event) {
  emit('load', e)
}
</script>

<style scoped>
.mobile-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mobile-preview-frame {
  width: 100%;
  max-width: 375px;
  background: #1a1a1a;
  border-radius: 40px;
  padding: 12px;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.1),
    0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
}


.mobile-preview-screen {
  background: #fff;
  border-radius: 24px;
  position: relative;
  z-index: 0;
}

.mobile-preview-iframe {
  display: block;
  width: 100%;
  height: 667px;
  max-height: 80vh;
}

.mobile-preview-placeholder {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 14px;
}

.mobile-preview-homebar {
  display: flex;
  justify-content: center;
  padding: 8px 0 4px;
}

.homebar-indicator {
  width: 120px;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

.mobile-preview-label {
  margin-top: 12px;
  font-size: 13px;
  color: #999;
  text-align: center;
}
</style>
