import { onMounted, onUnmounted, Ref } from 'vue'

/**
 * Parallax scroll depth effect
 * 参考 kungfudata.com 的景深滚动效果
 */
export function useParallax(element: Ref<HTMLElement | null>, speed: number = 0.5) {
  let rafId: number | null = null

  const handleScroll = () => {
    if (!element.value) return

    const rect = element.value.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const elementTop = rect.top
    const elementHeight = rect.height

    // 计算元素在视口中的位置（0 到 1）
    const scrollProgress = Math.max(0, Math.min(1, (windowHeight - elementTop) / (windowHeight + elementHeight)))

    // 应用 parallax 效果
    const translateY = (scrollProgress - 0.5) * speed * 100

    element.value.style.transform = `translateY(${translateY}px)`
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // 初始调用
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    if (rafId) {
      cancelAnimationFrame(rafId)
    }
  })
}

