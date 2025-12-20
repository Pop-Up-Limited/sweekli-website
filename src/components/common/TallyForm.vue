<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

interface Props {
  formId: string
  alignLeft?: boolean
  hideTitle?: boolean
  transparentBackground?: boolean
  dynamicHeight?: boolean
  height?: string
}

const props = withDefaults(defineProps<Props>(), {
  alignLeft: true,
  hideTitle: true,
  transparentBackground: true,
  dynamicHeight: true,
  height: '276'
})

let scriptLoaded = false

const loadTallyScript = () => {
  if (typeof document === 'undefined') return
  
  if (scriptLoaded) {
    loadEmbeds()
    return
  }

  // 检查是否已经加载了脚本
  if (document.querySelector('script[src="https://tally.so/widgets/embed.js"]')) {
    scriptLoaded = true
    loadEmbeds()
    return
  }

  const script = document.createElement('script')
  script.src = 'https://tally.so/widgets/embed.js'
  script.onload = loadEmbeds
  script.onerror = loadEmbeds
  if (document.body) {
    document.body.appendChild(script)
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      document.body.appendChild(script)
    })
  }
  scriptLoaded = true
}

const loadEmbeds = () => {
  if (typeof document === 'undefined') return
  
  if (typeof (window as any).Tally !== 'undefined') {
    ;(window as any).Tally.loadEmbeds()
  } else {
    // 延迟加载，确保 DOM 已准备好
    setTimeout(() => {
      document.querySelectorAll('iframe[data-tally-src]:not([src])').forEach((iframe: Element) => {
        const iframeEl = iframe as HTMLIFrameElement
        if (iframeEl.dataset.tallySrc) {
          iframeEl.src = iframeEl.dataset.tallySrc
        }
      })
    }, 100)
  }
}

onMounted(() => {
  // 确保在客户端执行
  if (typeof window !== 'undefined') {
    loadTallyScript()
  }
})

onUnmounted(() => {
  // 清理脚本（可选）
})
</script>

<template>
  <div class="tally-form-wrapper">
    <iframe
      :data-tally-src="`https://tally.so/embed/${formId}?alignLeft=${alignLeft ? 1 : 0}&hideTitle=${hideTitle ? 1 : 0}&transparentBackground=${transparentBackground ? 1 : 0}&dynamicHeight=${dynamicHeight ? 1 : 0}`"
      loading="lazy"
      width="100%"
      :height="height"
      frameborder="0"
      marginheight="0"
      marginwidth="0"
      :title="'Sweekli Form'"
      class="tally-form"
    ></iframe>
  </div>
</template>

<style scoped>
.tally-form-wrapper {
  width: 100%;
  min-height: 276px;
}

.tally-form {
  width: 100%;
  border: none;
  border-radius: var(--radius-xl, 12px);
  overflow: hidden;
}
</style>

