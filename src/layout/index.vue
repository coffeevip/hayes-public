<template>
  <n-layout has-sider class="layout-container">
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
      :collapsed="collapsed"
      show-trigger
      @collapse="collapsed = true"
      @expand="collapsed = false"
      class="layout-sider"
    >
      <div class="logo" @click="router.push('/')">
        <n-icon size="48">
          <deer-icon />
        </n-icon>
        <h1 class="system-title">{{ t('system.title') }}</h1>
      </div>
      <n-menu
        v-model:value="activeKey"
        :collapsed="collapsed"
        :options="menuOptions"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        @update:value="handleMenuUpdate"
      />
    </n-layout-sider>
    <n-layout>
      <n-layout-header bordered>
        <div class="header-content">
          <div class="header-left">
            <n-breadcrumb>
              <n-breadcrumb-item>
                <n-icon>
                  <home-outline />
                </n-icon>
                <span>{{ t('common.home') }}</span>
              </n-breadcrumb-item>
              <n-breadcrumb-item>{{ t(currentRoute) }}</n-breadcrumb-item>
            </n-breadcrumb>
          </div>
          <div class="header-right">
            <n-space>
              <n-dropdown
                :options="languageOptions"
                @select="handleLanguageChange"
                trigger="hover"
              >
                <n-button quaternary circle class="language-toggle bounce-in">
                  <n-icon size="20">
                    <language-outline />
                  </n-icon>
                </n-button>
              </n-dropdown>
              <n-button
                quaternary
                circle
                class="theme-toggle bounce-in"
                @click="toggleTheme"
              >
                <n-icon size="20">
                  <sunny-outline v-if="!isDarkMode" />
                  <moon-outline v-else />
                </n-icon>
              </n-button>
              <n-dropdown :options="userOptions" @select="handleUserSelect">
                <n-avatar round size="small">
                  <n-icon>
                    <person-outline />
                  </n-icon>
                </n-avatar>
              </n-dropdown>
            </n-space>
          </div>
        </div>
      </n-layout-header>
      <n-layout-content class="content">
        <router-view />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import { ref, computed, h, defineComponent, inject, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { setLanguage } from '../i18n'
import type { Ref } from 'vue'
import { 
  NLayout, 
  NLayoutSider, 
  NLayoutHeader, 
  NLayoutContent, 
  NMenu, 
  NBreadcrumb, 
  NBreadcrumbItem, 
  NDropdown, 
  NAvatar,
  NIcon,
  NButton,
  NSpace
} from 'naive-ui'
import { 
  LeafOutline,
  HomeOutline,
  PersonOutline,
  GridOutline,
  LogOutOutline,
  BusinessOutline,
  PricetagsOutline,
  SunnyOutline,
  MoonOutline,
  LanguageOutline
} from '@vicons/ionicons5'

const router = useRouter()
const route = useRoute()
const collapsed = ref(false)
const activeKey = ref('dashboard')

// 获取主题状态并提供默认值
const isDarkMode = inject<Ref<boolean>>('isDarkMode', ref(false))

const { t, locale } = useI18n()

// 监听语言变化，强制更新菜单
watch(locale, () => {
  // 强制更新菜单选项
  menuOptions.value = generateMenuOptions()
})

// 当前路由标题
const currentRoute = computed(() => {
  const title = route.meta.title
  return typeof title === 'string' ? title : ''
})

// 语言选项
const languageOptions = [
  {
    label: '简体中文',
    key: 'zh-CN' as const,
    icon: () => h(NIcon, null, { default: () => h(LanguageOutline) })
  },
  {
    label: 'English',
    key: 'en-US' as const,
    icon: () => h(NIcon, null, { default: () => h(LanguageOutline) })
  }
]

// 切换语言
const handleLanguageChange = (key: 'zh-CN' | 'en-US') => {
  setLanguage(key)
}

// 生成菜单选项函数
const generateMenuOptions = () => [
  {
    label: t('menu.dashboard'),
    key: 'dashboard',
    icon: () => h(NIcon, null, { default: () => h(GridOutline) })
  },
  {
    label: t('menu.farmManagement'),
    key: 'farms',
    icon: () => h(NIcon, null, { default: () => h(BusinessOutline) }),
    children: [
      {
        label: t('menu.hayesFarm'),
        key: 'hayes',
        icon: () => h(NIcon, null, { default: () => h(LeafOutline) })
      },
      {
        label: t('menu.t1005Farm'),
        key: 't1005',
        icon: () => h(NIcon, null, { default: () => h(LeafOutline) })
      },
      {
        label: t('menu.p2Farm'),
        key: 'p2',
        icon: () => h(NIcon, null, { default: () => h(LeafOutline) })
      }
    ]
  },
  {
    label: t('menu.tagManagement'),
    key: 'tags',
    icon: () => h(NIcon, null, { default: () => h(PricetagsOutline) }),
    children: [
      {
        label: t('menu.hayesTags'),
        key: 'hayes-tags',
        icon: () => h(NIcon, null, { default: () => h(PricetagsOutline) })
      },
      {
        label: t('menu.t1005Tags'),
        key: 't1005-tags',
        icon: () => h(NIcon, null, { default: () => h(PricetagsOutline) })
      },
      {
        label: t('menu.p2Tags'),
        key: 'p2-tags',
        icon: () => h(NIcon, null, { default: () => h(PricetagsOutline) })
      }
    ]
  }
]

// 菜单选项
const menuOptions = ref(generateMenuOptions())

// 更新用户选项，使用国际化文本
const userOptions = computed(() => [
  {
    label: t('system.logout'),
    key: 'logout',
    icon: () => h(NIcon, null, { default: () => h(LogOutOutline) })
  }
])

const handleMenuUpdate = (key: string) => {
  router.push({ name: key })
}

const handleUserSelect = (key: string) => {
  if (key === 'logout') {
    router.push('/login')
  }
}

// 添加鹿头图标组件
const DeerIcon = defineComponent({
  name: 'DeerIcon',
  render() {
    return h('svg', 
      { 
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 240 240',
        style: 'fill: currentColor'
      },
      [
        // 简单的正方形
        h('rect', {
          x: '70',
          y: '70',
          width: '100',
          height: '100',
          rx: '20',
          style: 'fill: currentColor'
        })
      ]
    )
  }
})

// 主题切换函数
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.className = isDarkMode.value ? 'dark' : 'light'
}

// 初始化主题类
document.documentElement.className = isDarkMode.value ? 'dark' : 'light'
</script>

<style scoped>
.logo {
  height: 64px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.02), rgba(37, 99, 235, 0.02));
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  position: relative;
  overflow: hidden;
}

.logo::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(37, 99, 235, 0.08));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.logo:hover::after {
  opacity: 1;
}

.logo :deep(svg) {
  width: 32px;
  height: 32px;
  transition: all 0.5s ease;
  position: relative;
  z-index: 1;
}

.logo:hover :deep(svg) {
  transform: scale(1.1) rotate(2deg);
  filter: drop-shadow(0 2px 4px rgba(59, 130, 246, 0.2));
}

.system-title {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: var(--primary-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: 1;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 0.5px;
  line-height: 1.4;
  position: relative;
  z-index: 1;
}

.n-layout-sider-collapsed .system-title {
  opacity: 0;
  width: 0;
}

.logo h1 {
  margin: 0;
  color: v-bind("isDarkMode ? '#f3f4f6' : '#1e293b'");
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
  opacity: 0;
  transform: translateX(-10px);
  transition: var(--hover-transition);
}

:deep(.n-layout-sider-scroll-container:hover) .logo h1 {
  opacity: 1;
  transform: translateX(0);
}

:deep(.n-layout-sider) {
  background: v-bind("isDarkMode ? '#1f2937' : '#ffffff'") !important;
  box-shadow: v-bind("isDarkMode ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'");
  border-right: 1px solid v-bind("isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'");
}

:deep(.n-menu) {
  background: transparent !important;
}

:deep(.n-menu-item) {
  height: 50px !important;
  margin: 4px 8px !important;
  border-radius: 8px !important;
  color: v-bind("isDarkMode ? '#9ca3af' : '#64748b'") !important;
  transition: var(--hover-transition) !important;
}

:deep(.n-menu-item:hover) {
  color: #3b82f6 !important;
  background: v-bind("isDarkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)'") !important;
  transform: translateX(4px);
}

:deep(.n-menu-item-content__icon) {
  color: v-bind("isDarkMode ? '#9ca3af' : '#64748b'") !important;
  transition: var(--hover-transition) !important;
}

:deep(.n-menu-item--selected) {
  color: #ffffff !important;
  background: var(--primary-gradient) !important;
  box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.2) !important;
}

:deep(.n-menu-item--selected .n-menu-item-content__icon) {
  color: #ffffff !important;
}

.header-content {
  height: 64px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: v-bind("isDarkMode ? '#1f2937' : '#ffffff'");
  border-bottom: 1px solid v-bind("isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'");
}

.header-left, .header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.theme-toggle {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: v-bind("isDarkMode ? '#9ca3af' : '#64748b'");
  transition: var(--hover-transition);
}

.theme-toggle:hover {
  color: v-bind("isDarkMode ? '#f3f4f6' : '#1e293b'");
  transform: rotate(30deg);
}

.language-toggle {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: v-bind("isDarkMode ? '#9ca3af' : '#64748b'");
  transition: var(--hover-transition);
}

.language-toggle:hover {
  color: v-bind("isDarkMode ? '#f3f4f6' : '#1e293b'");
  transform: rotate(30deg);
}

:deep(.n-breadcrumb) {
  font-size: 14px;
}

:deep(.n-breadcrumb-item:not(:last-child)) {
  color: v-bind("isDarkMode ? '#9ca3af' : '#64748b'");
}

:deep(.n-breadcrumb-item:last-child) {
  color: v-bind("isDarkMode ? '#f3f4f6' : '#1e293b'");
  font-weight: 500;
}

.content {
  padding: 24px;
  background: var(--secondary-gradient);
  min-height: calc(100vh - 64px);
}

:deep(.n-layout-sider-scroll-container) {
  background: v-bind("isDarkMode ? '#1f2937' : '#ffffff'") !important;
}

:deep(.n-layout-toggle-button) {
  width: 24px !important;
  height: 24px !important;
  background: v-bind("isDarkMode ? '#1f2937' : '#ffffff'") !important;
  border: 1px solid v-bind("isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'") !important;
  border-radius: 50% !important;
  box-shadow: v-bind("isDarkMode ? '0 2px 4px rgba(0, 0, 0, 0.2)' : '0 2px 4px rgba(0, 0, 0, 0.05)'") !important;
  transition: var(--hover-transition) !important;
  transform: translateX(50%);
}

:deep(.n-layout-toggle-button:hover) {
  background: var(--secondary-gradient) !important;
  transform: translateX(50%) scale(1.1);
}

:deep(.n-layout-toggle-bar) {
  background-color: v-bind("isDarkMode ? '#9ca3af' : '#64748b'") !important;
  transition: var(--hover-transition) !important;
}

:deep(.n-layout-toggle-button:hover .n-layout-toggle-bar) {
  background-color: #3b82f6 !important;
}

/* 添加页面切换动画 */
:deep(.fade-slide-up-enter-active),
:deep(.fade-slide-up-leave-active) {
  transition: all 0.3s ease-out;
}

:deep(.fade-slide-up-enter-from),
:deep(.fade-slide-up-leave-to) {
  opacity: 0;
  transform: translateY(20px);
}
</style> 