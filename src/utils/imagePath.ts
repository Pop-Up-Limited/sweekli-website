/**
 * 图片路径工具函数
 * 自动处理 GitHub Pages 的 base URL
 */

/**
 * 获取正确的图片路径
 * @param path 图片路径（相对于 public 文件夹，例如：'/images/xxx.jpg'）
 * @returns 处理后的路径
 */
export function getImagePath(path: string): string {
  // 如果路径已经是完整 URL，直接返回
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }
  
  // 获取 base URL（例如：'/sweekli-website/'）
  const base = import.meta.env.BASE_URL
  
  // 确保路径以 / 开头
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  
  // 组合 base URL 和路径
  return `${base}${normalizedPath.slice(1)}`
}

