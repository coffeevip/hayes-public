<template>
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <router-view />
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { NMessageProvider, NConfigProvider } from 'naive-ui'
import { ref, computed, watch, provide } from 'vue'
import { darkTheme } from 'naive-ui'

// 主题状态
const isDarkMode = ref(localStorage.getItem('theme') === 'dark')
const theme = computed(() => isDarkMode.value ? darkTheme : null)

// 监听主题变化并保存
watch(isDarkMode, (newValue) => {
  localStorage.setItem('theme', newValue ? 'dark' : 'light')
})

// 提供主题变量供其他组件使用
provide('isDarkMode', isDarkMode)

// 主题覆盖
const themeOverrides = computed(() => ({
  common: {
    primaryColor: '#3b82f6',
    primaryColorHover: '#60a5fa',
    primaryColorPressed: '#2563eb',
    borderRadius: '8px'
  },
  Card: {
    color: isDarkMode.value ? '#1f2937' : '#ffffff',
    borderRadius: '12px',
    boxShadow: isDarkMode.value
      ? '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.3)'
      : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)'
  },
  Button: {
    textColor: isDarkMode.value ? '#f3f4f6' : '#1e293b',
    borderRadius: '8px',
    heightMedium: '40px',
    fontSizeMedium: '14px',
    paddingMedium: '0 20px'
  },
  Input: {
    borderRadius: '8px',
    heightMedium: '40px'
  }
}))
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

#app {
  height: 100%;
}

:root {
  --primary-gradient: linear-gradient(135deg, #3b82f6 0%, #60a5fa 50%, #2563eb 100%);
  --secondary-gradient: v-bind("isDarkMode.value ? 'linear-gradient(135deg, #111827 0%, #1f2937 100%)' : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'");
  --hover-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --bounce-transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* 主题切换过渡 */
* {
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}

/* 全局动画类 */
.hover-float {
  transition: var(--hover-transition);
}

.hover-float:hover {
  transform: translateY(-8px);
}

.hover-scale {
  transition: var(--bounce-transition);
}

.hover-scale:hover {
  transform: scale(1.05);
}

.bounce-in {
  animation: bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.1);
  }
  80% {
    opacity: 1;
    transform: scale(0.89);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.fade-slide-up {
  animation: fadeSlideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes fadeSlideUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 暗色主题样式 */
.dark {
  --secondary-gradient: var(--secondary-gradient-dark);
  color-scheme: dark;
}

/* 亮色主题样式 */
.light {
  --secondary-gradient: var(--secondary-gradient-light);
  color-scheme: light;
}
</style> 