import { onMounted, onUnmounted, ref } from 'vue'

/**
 * 鼠标跟随效果 - 添加细节动画
 */
export function useMouseFollower() {
  const mouseX = ref(0)
  const mouseY = ref(0)
  const cursorX = ref(0)
  const cursorY = ref(0)

  const handleMouseMove = (e: MouseEvent) => {
    mouseX.value = e.clientX
    mouseY.value = e.clientY
  }

  const animateCursor = () => {
    // 使用缓动函数实现平滑跟随
    const dx = mouseX.value - cursorX.value
    const dy = mouseY.value - cursorY.value
    
    cursorX.value += dx * 0.1
    cursorY.value += dy * 0.1
    
    requestAnimationFrame(animateCursor)
  }

  onMounted(() => {
    cursorX.value = window.innerWidth / 2
    cursorY.value = window.innerHeight / 2
    mouseX.value = window.innerWidth / 2
    mouseY.value = window.innerHeight / 2
    
    window.addEventListener('mousemove', handleMouseMove)
    animateCursor()
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove)
  })

  return { cursorX, cursorY }
}

