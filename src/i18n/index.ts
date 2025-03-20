import { createI18n } from 'vue-i18n'
import zhCN from '../locales/zh-CN'
import enUS from '../locales/en-US'

type LanguageType = 'zh-CN' | 'en-US'

// 获取浏览器语言设置
const getBrowserLanguage = (): LanguageType => {
  const language = navigator.language
  if (language.includes('zh')) {
    return 'zh-CN'
  }
  return 'en-US'
}

// 获取本地存储的语言设置或使用浏览器语言
const getLanguage = (): LanguageType => {
  const savedLanguage = localStorage.getItem('language') as LanguageType
  return savedLanguage || getBrowserLanguage()
}

const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: getLanguage(),
  fallbackLocale: 'en-US',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS
  }
})

export default i18n

// 导出切换语言的函数
export const setLanguage = (language: LanguageType) => {
  i18n.global.locale.value = language
  localStorage.setItem('language', language)
  // 修改 html 的 lang 属性
  document.querySelector('html')?.setAttribute('lang', language)
} 