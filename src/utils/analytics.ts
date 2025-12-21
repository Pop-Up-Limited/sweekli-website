/**
 * Analytics 工具函数
 * 支持 Google Analytics 和 Vercel Analytics
 */

// Google Analytics 配置
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || ''

/**
 * 初始化 Google Analytics
 */
export function initGoogleAnalytics() {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') {
    return
  }

  // 加载 gtag.js
  const script1 = document.createElement('script')
  script1.async = true
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script1)

  // 初始化 gtag
  window.dataLayer = window.dataLayer || []
  function gtag(...args: any[]) {
    window.dataLayer.push(args)
  }
  ;(window as any).gtag = gtag

  gtag('js', new Date())
  gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
  })
}

/**
 * 跟踪页面浏览
 */
export function trackPageView(path: string) {
  if (typeof window === 'undefined') return

  // Vercel Analytics (优先使用，自动跟踪)
  if ((window as any).va) {
    ;(window as any).va('pageview', { path })
  }

  // Google Analytics (可选)
  if ((window as any).gtag && GA_MEASUREMENT_ID) {
    ;(window as any).gtag('config', GA_MEASUREMENT_ID, {
      page_path: path,
    })
  }
}

/**
 * 跟踪事件
 */
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window === 'undefined') return

  // Google Analytics
  if ((window as any).gtag) {
    ;(window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

/**
 * 跟踪表单提交
 */
export function trackFormSubmit(formName: string) {
  trackEvent('submit', 'form', formName)
}

/**
 * 跟踪按钮点击
 */
export function trackButtonClick(buttonName: string) {
  trackEvent('click', 'button', buttonName)
}

/**
 * 跟踪外部链接点击
 */
export function trackOutboundLink(url: string) {
  trackEvent('click', 'outbound', url)
}

