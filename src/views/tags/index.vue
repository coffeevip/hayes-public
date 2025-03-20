<template>
  <div class="tags-container">
    <n-card class="table-card">
      <template #header>
        <n-space vertical>
          <n-space justify="space-between" align="center">
            <div class="title-section">
              <n-icon size="24" class="title-icon">
                <leaf-outline />
              </n-icon>
              <span class="card-title">{{ farmName }}{{ t('menu.tagManagement') }}</span>
            </div>
            <n-space>
              <n-tooltip trigger="hover">
                <template #trigger>
                  <n-button @click="handleAddRow" type="primary" class="action-button">
                    <template #icon>
                      <n-icon>
                        <add-outline />
                      </n-icon>
                    </template>
                    {{ t('common.add') }}
                  </n-button>
                </template>
                {{ t('common.add') }}
              </n-tooltip>
              
              <n-tooltip trigger="hover">
                <template #trigger>
                  <n-button @click="handleSave" type="success" class="action-button">
                    <template #icon>
                      <n-icon>
                        <save-outline />
                      </n-icon>
                    </template>
                    {{ t('common.save') }}
                  </n-button>
                </template>
                {{ t('common.save') }}
              </n-tooltip>
            </n-space>
          </n-space>
          
          <div class="search-section">
            <n-input
              v-model:value="searchText"
              :placeholder="t('common.search')"
              clearable
              class="search-input"
            >
              <template #prefix>
                <n-icon>
                  <search-outline />
                </n-icon>
              </template>
            </n-input>
            <div class="search-tip" v-if="searchText">
              {{ t('common.found') }} {{ filteredTableData.length }} {{ t('common.records') }}
            </div>
          </div>
        </n-space>
      </template>

      <n-data-table
        :columns="columns"
        :data="filteredTableData"
        :pagination="pagination"
        :bordered="true"
        class="data-table"
        :row-class-name="rowClassName"
      />
    </n-card>

    <n-modal v-model:show="showColumnModal" preset="dialog" :title="t('table.addColumn')">
      <n-form
        ref="columnFormRef"
        :model="columnForm"
        :rules="columnRules"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
      >
        <n-form-item :label="t('table.columnName')" path="title">
          <n-input v-model:value="columnForm.title" :placeholder="t('table.pleaseInputColumnName')" />
        </n-form-item>
        <n-form-item :label="t('table.columnType')" path="type">
          <n-select
            v-model:value="columnForm.type"
            :options="columnTypeOptions"
            :placeholder="t('table.pleaseSelectColumnType')"
          />
        </n-form-item>
      </n-form>
      <template #action>
        <n-space>
          <n-button @click="showColumnModal = false">{{ t('common.cancel') }}</n-button>
          <n-button type="primary" @click="handleColumnSubmit">{{ t('common.confirm') }}</n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { h, ref, computed, watch, inject } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { Ref } from 'vue'
import { 
  NCard, 
  NButton, 
  NDataTable, 
  NSpace, 
  NModal, 
  NForm, 
  NFormItem, 
  NInput,
  NIcon,
  NSelect,
  NInputNumber,
  NDatePicker,
  NTooltip,
  useMessage
} from 'naive-ui'
import { 
  AddOutline,
  SaveOutline,
  TrashOutline,
  SearchOutline,
  LeafOutline,
  CalendarOutline,
  PersonOutline,
  CardOutline,
  HomeOutline,
  PricetagOutline
} from '@vicons/ionicons5'

const route = useRoute()
const { t, locale } = useI18n()
const message = useMessage()
const isDarkMode = inject<Ref<boolean>>('isDarkMode', ref(false))

interface TableColumn {
  title: string
  key: string
  type: string
}

interface TableData {
  id: number
  name: string
  cardNumber: string
  greenhouseNumber: string
  tagNumber: string
  status: string
  floweringTime: number | null
  harvestTime: number | null
  [key: string]: string | number | null  // 添加索引签名
}

const farmName = computed(() => {
  switch (route.name) {
    case 'hayes-tags':
      return t('menu.hayesFarm')
    case 't1005-tags':
      return t('menu.t1005Farm')
    case 'p2-tags':
      return t('menu.p2Farm')
    default:
      return ''
  }
})

const columnTypeOptions = [
  {
    label: t('table.columnTypes.text'),
    value: 'text'
  },
  {
    label: t('table.columnTypes.number'),
    value: 'number'
  },
  {
    label: t('table.columnTypes.date'),
    value: 'date'
  },
  {
    label: t('table.columnTypes.select'),
    value: 'select'
  }
]

const showColumnModal = ref(false)
const columnFormRef = ref()
const columnForm = ref({
  title: '',
  type: 'text'
})

const columnRules = {
  title: {
    required: true,
    message: t('table.pleaseInputColumnName'),
    trigger: 'blur'
  },
  type: {
    required: true,
    message: t('table.pleaseSelectColumnType'),
    trigger: 'change'
  }
}

const userColumns = ref<TableColumn[]>([
  {
    title: t('table.name'),
    key: 'name',
    type: 'text'
  },
  {
    title: t('table.cardNumber'),
    key: 'cardNumber',
    type: 'text'
  },
  {
    title: t('table.greenhouseNumber'),
    key: 'greenhouseNumber',
    type: 'text'
  },
  {
    title: t('table.tagNumber'),
    key: 'tagNumber',
    type: 'text'
  },
  {
    title: t('table.status'),
    key: 'status',
    type: 'select'
  },
  {
    title: t('table.floweringTime'),
    key: 'floweringTime',
    type: 'date'
  },
  {
    title: t('table.harvestTime'),
    key: 'harvestTime',
    type: 'date'
  }
])

const getFarmPrefix = (routeName: string | null) => {
  switch (routeName) {
    case 'hayes-tags':
      return 'HAYES'
    case 't1005-tags':
      return 'T1005'
    case 'p2-tags':
      return 'P2'
    default:
      return 'FARM'
  }
}

const createNewRow = (): TableData => {
  const farmPrefix = getFarmPrefix(route.name as string)
  const tagNumber = `${farmPrefix}-` // 只生成农场前缀，后面让用户自己填写

  return {
    id: Date.now(),
    name: '',
    cardNumber: '',
    greenhouseNumber: '',
    tagNumber,
    status: 'growing',
    floweringTime: null,
    harvestTime: null
  }
}

const statusOptions = computed(() => [
  { label: t('status.growing'), value: 'growing' },
  { label: t('status.flowering'), value: 'flowering' },
  { label: t('status.harvested'), value: 'harvested' },
  { label: t('status.cleaned'), value: 'cleaned' }
])

const createColumns = () => {
  return [
    {
      title: t('table.name'),
      key: 'name',
      render: (row: TableData) => {
        return h('div', { class: 'column-with-icon' }, [
          h(NIcon, { size: 18 }, { default: () => h(PersonOutline) }),
          h(NInput, {
            value: row.name,
            onUpdateValue: (v: string) => {
              row.name = v
            },
            class: 'input-with-icon'
          })
        ])
      }
    },
    {
      title: t('table.cardNumber'),
      key: 'cardNumber',
      render: (row: TableData) => {
        return h('div', { class: 'column-with-icon' }, [
          h(NIcon, { size: 18 }, { default: () => h(CardOutline) }),
          h(NInput, {
            value: row.cardNumber,
            onUpdateValue: (v: string) => {
              row.cardNumber = v
            },
            class: 'input-with-icon'
          })
        ])
      }
    },
    {
      title: t('table.greenhouseNumber'),
      key: 'greenhouseNumber',
      render: (row: TableData) => {
        return h('div', { class: 'column-with-icon' }, [
          h(NIcon, { size: 18 }, { default: () => h(HomeOutline) }),
          h(NInput, {
            value: row.greenhouseNumber,
            onUpdateValue: (v: string) => {
              row.greenhouseNumber = v
            },
            class: 'input-with-icon'
          })
        ])
      }
    },
    {
      title: t('table.tagNumber'),
      key: 'tagNumber',
      render: (row: TableData) => {
        return h('div', { class: 'column-with-icon' }, [
          h(NIcon, { size: 18 }, { default: () => h(PricetagOutline) }),
          h(NInput, {
            value: row.tagNumber,
            onUpdateValue: (v: string) => {
              const farmPrefix = getFarmPrefix(route.name as string)
              if (!v.startsWith(`${farmPrefix}-`)) {
                v = `${farmPrefix}-${v.replace(`${farmPrefix}-`, '')}`
              }
              row.tagNumber = v
            },
            placeholder: t('table.tagNumberPlaceholder'),
            class: 'input-with-icon'
          })
        ])
      }
    },
    {
      title: t('table.status'),
      key: 'status',
      render: (row: TableData) => {
        return h('div', { class: 'column-with-icon' }, [
          h(NIcon, { size: 18 }, { default: () => h(LeafOutline) }),
          h(NSelect, {
            value: row.status,
            options: statusOptions.value,
            onUpdateValue: (v: string) => {
              row.status = v
            },
            class: 'select-with-icon'
          })
        ])
      }
    },
    {
      title: t('table.floweringTime'),
      key: 'floweringTime',
      render: (row: TableData) => {
        return h('div', { class: 'column-with-icon' }, [
          h(NIcon, { size: 18 }, { default: () => h(CalendarOutline) }),
          h(NDatePicker, {
            value: row.floweringTime,
            type: 'date',
            onUpdateValue: (v: number | null) => {
              row.floweringTime = v
            },
            class: 'date-picker-with-icon'
          })
        ])
      }
    },
    {
      title: t('table.harvestTime'),
      key: 'harvestTime',
      render: (row: TableData) => {
        return h('div', { class: 'column-with-icon' }, [
          h(NIcon, { size: 18 }, { default: () => h(CalendarOutline) }),
          h(NDatePicker, {
            value: row.harvestTime,
            type: 'date',
            onUpdateValue: (v: number | null) => {
              row.harvestTime = v
            },
            class: 'date-picker-with-icon'
          })
        ])
      }
    },
    {
      title: t('table.actions'),
      key: 'actions',
      render: (row: TableData) => {
        return h(NButton, {
          size: 'small',
          type: 'error',
          onClick: () => handleDeleteRow(row),
          class: 'delete-button'
        }, {
          default: () => t('common.delete'),
          icon: () => h(NIcon, null, { default: () => h(TrashOutline) })
        })
      }
    }
  ]
}

const columns = computed(() => createColumns())
const tableData = ref<TableData[]>([])
const pagination = {
  pageSize: 10
}

const handleAddRow = () => {
  tableData.value.push(createNewRow())
}

const handleDeleteRow = (row: TableData) => {
  const index = tableData.value.findIndex(item => item.id === row.id)
  if (index !== -1) {
    tableData.value.splice(index, 1)
  }
}

const handleAddColumn = () => {
  showColumnModal.value = true
}

const handleColumnSubmit = () => {
  columnFormRef.value?.validate((errors: any) => {
    if (!errors) {
      const key = columnForm.value.title.toLowerCase().replace(/\s+/g, '_')
      userColumns.value.push({
        title: columnForm.value.title,
        key,
        type: columnForm.value.type
      })
      
      // 为现有的所有行添加新列
      tableData.value.forEach(row => {
        row[key] = null
      })

      showColumnModal.value = false
      columnForm.value = {
        title: '',
        type: 'text'
      }
      message.success('添加列成功')
    }
  })
}

const handleSave = () => {
  // 验证必填字段
  const invalidRows = tableData.value.filter(row => !row.name || !row.cardNumber || !row.greenhouseNumber || !row.tagNumber)
  if (invalidRows.length > 0) {
    message.error('请填写完整的信息（名字、卡号、棚号、标签号为必填项）')
    return
  }
  
  // TODO: 这里添加保存到后端的逻辑
  message.success('保存成功')
}

const searchText = ref('')

// 添加过滤后的表格数据计算属性
const filteredTableData = computed(() => {
  if (!searchText.value) return tableData.value

  const searchLower = searchText.value.toLowerCase()
  return tableData.value.filter(row => {
    return (
      row.name.toLowerCase().includes(searchLower) ||
      row.cardNumber.toLowerCase().includes(searchLower) ||
      row.greenhouseNumber.toLowerCase().includes(searchLower) ||
      row.tagNumber.toLowerCase().includes(searchLower) ||
      row.status.toLowerCase().includes(searchLower)
    )
  })
})

// 添加行高亮效果
const rowClassName = (row: TableData) => {
  return 'table-row'
}

// 初始化一行数据
if (tableData.value.length === 0) {
  handleAddRow()
}

// 监听路由变化，更新标签号
watch(() => route.name, (newRouteName) => {
  if (tableData.value.length > 0) {
    const farmPrefix = getFarmPrefix(newRouteName as string)
    tableData.value = tableData.value.map(row => ({
      ...row,
      tagNumber: `${farmPrefix}-${row.tagNumber.split('-')[1] || ''}`
    }))
  }
}, { immediate: true })

// 监听语言变化，更新表格列和状态选项
watch(locale, () => {
  userColumns.value = [
    {
      title: t('table.name'),
      key: 'name',
      type: 'text'
    },
    {
      title: t('table.cardNumber'),
      key: 'cardNumber',
      type: 'text'
    },
    {
      title: t('table.greenhouseNumber'),
      key: 'greenhouseNumber',
      type: 'text'
    },
    {
      title: t('table.tagNumber'),
      key: 'tagNumber',
      type: 'text'
    },
    {
      title: t('table.status'),
      key: 'status',
      type: 'select'
    },
    {
      title: t('table.floweringTime'),
      key: 'floweringTime',
      type: 'date'
    },
    {
      title: t('table.harvestTime'),
      key: 'harvestTime',
      type: 'date'
    }
  ]
})
</script>

<style scoped>
.tags-container {
  padding: 24px;
  min-height: 100%;
  background-color: #f5f7fa;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.table-card {
  width: 90%;
  max-width: 1400px;
  margin: 0 auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.table-card:hover {
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.15);
}

.title-section {
  display: flex;
  align-items: center;
  gap: 8px;
}

.title-icon {
  color: #18a058;
}

.card-title {
  font-size: 18px;
  font-weight: 500;
  color: #2c3e50;
}

.action-button {
  transition: all 0.3s ease;
}

.action-button:hover {
  transform: translateY(-2px);
}

.data-table {
  margin-top: 16px;
}

.table-row {
  transition: all 0.3s ease;
}

.table-row:hover {
  background-color: #f8f9fa;
}

.column-with-icon {
  display: flex;
  align-items: center;
  gap: 8px;
}

.input-with-icon,
.select-with-icon,
.date-picker-with-icon {
  flex: 1;
}

.delete-button {
  transition: all 0.3s ease;
  opacity: 0.8;
}

.delete-button:hover {
  opacity: 1;
  transform: scale(1.05);
}

:deep(.n-data-table .n-data-table-td) {
  padding: 12px 8px;
}

:deep(.n-button) {
  display: flex;
  align-items: center;
  gap: 4px;
}

:deep(.n-data-table-td .n-input) {
  min-width: 120px;
}

:deep(.n-data-table-td .n-date-picker) {
  min-width: 160px;
}

:deep(.n-data-table-td .n-select) {
  min-width: 120px;
}

:deep(.n-select-menu) {
  min-width: 120px !important;
}

:deep(.n-card-header) {
  padding: 16px 24px;
  border-bottom: 1px solid #eee;
}

:deep(.n-card__content) {
  padding: 0;
}

:deep(.n-data-table-wrapper) {
  padding: 16px;
}

.search-section {
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 16px 0 8px;
}

.search-input {
  width: 100%;
  transition: all 0.3s ease;
}

:deep(.n-input) {
  height: 44px;
}

:deep(.n-input-wrapper) {
  background-color: v-bind("isDarkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(59, 130, 246, 0.05)'");
  border: 1px solid v-bind("isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(59, 130, 246, 0.1)'");
  transition: all 0.3s ease;
}

:deep(.n-input-wrapper:hover),
:deep(.n-input-wrapper:focus-within) {
  background-color: v-bind("isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(59, 130, 246, 0.08)'");
  border-color: v-bind("isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(59, 130, 246, 0.2)'");
  transform: translateY(-1px);
}

:deep(.n-input__input-el) {
  font-size: 15px;
  padding-left: 4px;
}

:deep(.n-input__prefix) {
  margin-right: 8px;
  color: v-bind("isDarkMode ? '#9ca3af' : '#3b82f6'");
}

:deep(.n-input__suffix) {
  margin-left: 8px;
  color: v-bind("isDarkMode ? '#9ca3af' : '#3b82f6'");
}

.search-tip {
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 4px;
  font-size: 13px;
  color: v-bind("isDarkMode ? '#9ca3af' : '#64748b'");
  opacity: 0.8;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.table-row {
  animation: fadeIn 0.3s ease;
}
</style> 