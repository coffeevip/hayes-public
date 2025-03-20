<template>
  <div class="login-container">
    <div class="login-background"></div>
    <n-card class="login-card hover-float">
      <div class="login-header bounce-in">
        <n-icon size="64" color="#3b82f6">
          <deer-icon />
        </n-icon>
        <h2>{{ t('system.title') }}</h2>
      </div>
      <n-form
        ref="formRef"
        :model="formValue"
        :rules="rules"
        class="fade-slide-up"
      >
        <n-form-item :path="'username'" :label="t('system.username')">
          <n-input v-model:value="formValue.username" :placeholder="t('system.pleaseInputUsername')">
            <template #prefix>
              <n-icon><person-outline /></n-icon>
            </template>
          </n-input>
        </n-form-item>
        <n-form-item :path="'password'" :label="t('system.password')">
          <n-input
            v-model:value="formValue.password"
            type="password"
            :placeholder="t('system.pleaseInputPassword')"
            @keyup.enter="handleSubmit"
          >
            <template #prefix>
              <n-icon><lock-closed-outline /></n-icon>
            </template>
          </n-input>
        </n-form-item>
        <n-space vertical size="large" style="width: 100%">
          <n-button type="primary" block @click="handleSubmit" class="hover-scale">
            {{ t('system.login') }}
          </n-button>
          <n-dropdown
            :options="languageOptions"
            @select="handleLanguageChange"
            trigger="hover"
          >
            <n-button quaternary block class="language-toggle">
              <n-icon size="18" style="margin-right: 8px">
                <language-outline />
              </n-icon>
              {{ languageOptions.find(item => item.key === locale)?.label }}
            </n-button>
          </n-dropdown>
        </n-space>
      </n-form>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, defineComponent, h, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { NCard, NForm, NFormItem, NInput, NButton, NIcon, NSpace, NDropdown } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { PersonOutline, LockClosedOutline, LanguageOutline } from '@vicons/ionicons5'
import { setLanguage } from '@/i18n'
import type { Ref } from 'vue'

const router = useRouter()
const message = useMessage()
const { t, locale } = useI18n()
const formRef = ref()
const formValue = ref({
  username: '',
  password: ''
})

// 获取主题状态
const isDarkMode = inject<Ref<boolean>>('isDarkMode')

// 语言选项
const languageOptions = [
  {
    label: '简体中文',
    key: 'zh-CN',
    icon: () => h(NIcon, null, { default: () => h(LanguageOutline) })
  },
  {
    label: 'English',
    key: 'en-US',
    icon: () => h(NIcon, null, { default: () => h(LanguageOutline) })
  }
]

// 切换语言
const handleLanguageChange = (key: 'zh-CN' | 'en-US') => {
  setLanguage(key)
}

const rules = {
  username: {
    required: true,
    message: t('system.pleaseInputUsername'),
    trigger: 'blur'
  },
  password: {
    required: true,
    message: t('system.pleaseInputPassword'),
    trigger: 'blur'
  }
}

const DeerIcon = defineComponent({
  name: 'DeerIcon',
  render() {
    return h('svg', 
      { 
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 512 512',
        style: 'fill: currentColor'
      },
      [
        // 鹿头轮廓
        h('path', {
          d: 'M256 64c-35.3 0-64 28.7-64 64v48c0 8.8 7.2 16 16 16h96c8.8 0 16-7.2 16-16v-48c0-35.3-28.7-64-64-64z',
          style: 'fill: currentColor; opacity: 0.9'
        }),
        // 鹿角 - 左
        h('path', {
          d: 'M192 128c0-12.8 2.6-25 7.4-36.1C183.4 102.8 160 132.5 160 168v64c0 8.8 7.2 16 16 16s16-7.2 16-16v-64c0-13.3 10.7-24 24-24',
          style: 'fill: currentColor; opacity: 0.85'
        }),
        // 鹿角 - 右
        h('path', {
          d: 'M320 128c0-12.8-2.6-25-7.4-36.1C328.6 102.8 352 132.5 352 168v64c0 8.8-7.2 16-16 16s-16-7.2-16-16v-64c0-13.3-10.7-24-24-24',
          style: 'fill: currentColor; opacity: 0.85'
        }),
        // 眼睛 - 左
        h('circle', {
          cx: '208',
          cy: '192',
          r: '16',
          style: 'fill: currentColor; opacity: 0.95'
        }),
        // 眼睛 - 右
        h('circle', {
          cx: '304',
          cy: '192',
          r: '16',
          style: 'fill: currentColor; opacity: 0.95'
        }),
        // 鼻子
        h('path', {
          d: 'M256 224c-17.7 0-32 14.3-32 32v16c0 17.7 14.3 32 32 32s32-14.3 32-32v-16c0-17.7-14.3-32-32-32z',
          style: 'fill: currentColor; opacity: 0.8'
        }),
        // 装饰线条
        h('path', {
          d: 'M144 168c-8.8 0-16 7.2-16 16v32c0 70.7 57.3 128 128 128s128-57.3 128-128v-32c0-8.8-7.2-16-16-16h-16c-8.8 0-16 7.2-16 16v32c0 44.2-35.8 80-80 80s-80-35.8-80-80v-32c0-8.8-7.2-16-16-16h-16z',
          style: 'fill: currentColor; opacity: 0.7'
        })
      ]
    )
  }
})

const handleSubmit = () => {
  formRef.value?.validate((errors: any) => {
    if (!errors) {
      if (formValue.value.username === 'admin' && formValue.value.password === 'admin') {
        localStorage.setItem('token', 'demo-token')
        router.push('/')
      } else {
        message.error(t('system.loginError'))
      }
    }
  })
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--secondary-gradient);
  position: relative;
  overflow: hidden;
}

.login-background {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: v-bind("isDarkMode ? 'radial-gradient(circle at 10% 20%, rgba(96, 165, 250, 0.15) 0%, transparent 20%), radial-gradient(circle at 90% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 20%), radial-gradient(circle at 50% 50%, rgba(96, 165, 250, 0.1) 0%, transparent 50%)' : 'radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 20%), radial-gradient(circle at 90% 80%, rgba(96, 165, 250, 0.1) 0%, transparent 20%), radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)'");
  animation: backgroundFloat 20s ease-in-out infinite;
}

@keyframes backgroundFloat {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(-2%, 2%); }
  50% { transform: translate(2%, -2%); }
  75% { transform: translate(-2%, -2%); }
}

.login-card {
  width: 400px;
  backdrop-filter: blur(10px);
  background: v-bind("isDarkMode ? 'rgba(31, 41, 55, 0.7)' : 'rgba(255, 255, 255, 0.9)'");
  border: 1px solid v-bind("isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(59, 130, 246, 0.1)'");
  box-shadow: v-bind("isDarkMode ? '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(59, 130, 246, 0.1)'");
  transition: var(--hover-transition);
}

.login-card:hover {
  box-shadow: v-bind("isDarkMode ? '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(59, 130, 246, 0.2)'");
}

.login-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
}

.login-header h2 {
  margin: 24px 0 0;
  text-align: center;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.4;
}

:deep(.n-input) {
  height: 44px;
}

:deep(.n-input-wrapper) {
  transition: var(--hover-transition);
}

:deep(.n-input-wrapper:hover) {
  transform: translateX(4px);
}

:deep(.n-button) {
  height: 44px;
  font-size: 16px;
  margin-top: 24px;
  background: var(--primary-gradient);
  transition: var(--bounce-transition);
}

:deep(.n-form-item-label) {
  font-weight: 500;
  color: v-bind("isDarkMode ? '#9ca3af' : '#64748b'");
}

:deep(.n-input-prefix) {
  color: v-bind("isDarkMode ? '#9ca3af' : '#64748b'");
}

.language-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  color: v-bind("isDarkMode ? '#9ca3af' : '#64748b'");
  transition: var(--hover-transition);
  border: 1px solid v-bind("isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'");
}

.language-toggle:hover {
  color: v-bind("isDarkMode ? '#f3f4f6' : '#1e293b'");
  background: var(--secondary-gradient);
  transform: translateY(-2px);
}
</style> 