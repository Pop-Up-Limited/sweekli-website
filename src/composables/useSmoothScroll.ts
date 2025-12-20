import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

/**
 * Spring Scroll Animation - 非线性滚动效果
 * 参考 kungfudata.com 的滚动体验
 */
export function useSmoothScroll() {
  const router = useRouter()
  let rafId: number | null = null
  let isScrolling = false
  let currentScroll = 0
  let targetScroll = 0
  let velocity = 0

  const spring = (k: number, damping: number) => {
    const smooth = (target: number, current: number, velocity: number) => {
      const distance = target - current
      const springForce = distance * k
      const dampingForce = velocity * damping
      const acceleration = springForce - dampingForce
      
      velocity += acceleration
      current += velocity
      
      // 当接近目标且速度很小时停止
      if (Math.abs(distance) < 0.5 && Math.abs(velocity) < 0.5) {
        current = target
        velocity = 0
        return { current, velocity, done: true }
      }
      
      return { current, velocity, done: false }
    }
    
    return smooth
  }

  const smoothScroll = spring(0.08, 0.75)

  // 重置滚动状态
  const resetScroll = () => {
    if (rafId) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
    isScrolling = false
    currentScroll = 0
    targetScroll = 0
    velocity = 0
    // 立即滚动到顶部
    window.scrollTo(0, 0)
  }

  const animate = () => {
    if (!isScrolling) return

    const result = smoothScroll(targetScroll, currentScroll, velocity)
    currentScroll = result.current
    velocity = result.velocity

    window.scrollTo(0, currentScroll)

    if (!result.done) {
      rafId = requestAnimationFrame(animate)
    } else {
      isScrolling = false
      rafId = null
    }
  }

  const handleWheel = (e: WheelEvent) => {
    // 只在非触摸设备上启用
    if (!window.matchMedia('(pointer: fine)').matches) {
      return
    }
    
    e.preventDefault()
    
    targetScroll += e.deltaY * 0.8
    targetScroll = Math.max(0, Math.min(targetScroll, document.documentElement.scrollHeight - window.innerHeight))
    
    if (!isScrolling) {
      isScrolling = true
      currentScroll = window.scrollY
      velocity = 0
      rafId = requestAnimationFrame(animate)
    }
  }

  let removeAfterEach: (() => void) | null = null

  onMounted(() => {
    // 初始化时重置滚动位置
    resetScroll()
    
    window.addEventListener('wheel', handleWheel, { passive: false })
    
    // 监听路由变化，在路由切换时重置滚动状态
    removeAfterEach = router.afterEach(() => {
      resetScroll()
    })
  })

  onUnmounted(() => {
    window.removeEventListener('wheel', handleWheel)
    if (rafId) {
      cancelAnimationFrame(rafId)
    }
    if (removeAfterEach) {
      removeAfterEach()
    }
  })
}



/**
 * Spring Scroll Animation - 非线性滚动效果
 * 参考 kungfudata.com 的滚动体验
 */
export function useSmoothScroll() {
  const router = useRouter()
  let rafId: number | null = null
  let isScrolling = false
  let currentScroll = 0
  let targetScroll = 0
  let velocity = 0

  const spring = (k: number, damping: number) => {
    const smooth = (target: number, current: number, velocity: number) => {
      const distance = target - current
      const springForce = distance * k
      const dampingForce = velocity * damping
      const acceleration = springForce - dampingForce
      
      velocity += acceleration
      current += velocity
      
      // 当接近目标且速度很小时停止
      if (Math.abs(distance) < 0.5 && Math.abs(velocity) < 0.5) {
        current = target
        velocity = 0
        return { current, velocity, done: true }
      }
      
      return { current, velocity, done: false }
    }
    
    return smooth
  }

  const smoothScroll = spring(0.08, 0.75)

  // 重置滚动状态
  const resetScroll = () => {
    if (rafId) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
    isScrolling = false
    currentScroll = 0
    targetScroll = 0
    velocity = 0
    // 立即滚动到顶部
    window.scrollTo(0, 0)
  }

  const animate = () => {
    if (!isScrolling) return

    const result = smoothScroll(targetScroll, currentScroll, velocity)
    currentScroll = result.current
    velocity = result.velocity

    window.scrollTo(0, currentScroll)

    if (!result.done) {
      rafId = requestAnimationFrame(animate)
    } else {
      isScrolling = false
      rafId = null
    }
  }

  const handleWheel = (e: WheelEvent) => {
    // 只在非触摸设备上启用
    if (!window.matchMedia('(pointer: fine)').matches) {
      return
    }
    
    e.preventDefault()
    
    targetScroll += e.deltaY * 0.8
    targetScroll = Math.max(0, Math.min(targetScroll, document.documentElement.scrollHeight - window.innerHeight))
    
    if (!isScrolling) {
      isScrolling = true
      currentScroll = window.scrollY
      velocity = 0
      rafId = requestAnimationFrame(animate)
    }
  }

  let removeAfterEach: (() => void) | null = null

  onMounted(() => {
    // 初始化时重置滚动位置
    resetScroll()
    
    window.addEventListener('wheel', handleWheel, { passive: false })
    
    // 监听路由变化，在路由切换时重置滚动状态
    removeAfterEach = router.afterEach(() => {
      resetScroll()
    })
  })

  onUnmounted(() => {
    window.removeEventListener('wheel', handleWheel)
    if (rafId) {
      cancelAnimationFrame(rafId)
    }
    if (removeAfterEach) {
      removeAfterEach()
    }
  })
}

