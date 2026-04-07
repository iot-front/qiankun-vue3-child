/**
 * i18n 配置
 */
import { createI18n } from 'vue-i18n'
const SUPPORTED_LOCALES = ['zh', 'en'];
// 语言包缓存
const messageCache = new Map()

// 初始化缓存
SUPPORTED_LOCALES.forEach(locale => {
  messageCache.set(locale, {})
})

/**
 * 动态加载语言包
 * @param {string} locale - 语言代码
 * @returns {Promise<Object>} 语言包对象
 */
export function loadLocaleMessages(locale) {
  // 检查缓存
  const cached = messageCache.get(locale)
  if (cached && Object.keys(cached).length > 0) {
    return cached
  }
  try {
    // 动态导入所有模块
    const context = require.context('./', true, /([a-z]+)\/([a-z]+)\.json$/);
    const localeMessages = {}
    
    // 遍历加载该语言的所有文件
    context.keys().forEach(key => {
      const match = key.match(/\.\/([a-z]+)\/([a-z]+)\.json$/);
      if (match && match[1] === locale) {
        const namespace = match[2];
        const module = context(key);
        localeMessages[namespace] = module;
      }
    })
    
    // 更新缓存
    messageCache.set(locale, localeMessages)
    
    return localeMessages
  } catch (error) {
    console.error(`Failed to load locale messages for ${locale}:`, error)
    
    // 加载失败时返回空对象，使用fallback
    return {}
  }
}
// 创建i18n实例
const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('dplocale') || 'zh',
  fallbackLocale: 'zh',
  silentFallbackWarn: true,   // 关闭fallback警告
  silentTranslationWarn: true, // 关闭翻译警告
  messages: {},               // 初始为空，动态加载
  missing: (locale, key) => {
    return key
  }
})

// 初始化加载当前语言包
const initLocale = async () => {
  const locale = i18n.global.locale.value
  const messages = await loadLocaleMessages(locale)
  
  // 设置语言包
  Object.entries(messages).forEach(([namespace, msgs]) => {
    i18n.global.setLocaleMessage(locale, {
      ...i18n.global.getLocaleMessage(locale),
      [namespace]: msgs
    })
  })
}

// 执行初始化
initLocale()

export default i18n