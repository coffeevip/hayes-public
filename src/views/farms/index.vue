<template>
  <div class="farm-container">
    <n-card>
      <template #header>
        <n-space justify="space-between">
          <span>{{ t('menu.farmManagement') }}</span>
          <n-button type="primary" @click="handleAddFarmer">
            <template #icon>
              <n-icon>
                <add-outline />
              </n-icon>
            </template>
            {{ t('farmer.new') }}
          </n-button>
        </n-space>
      </template>

      <n-data-table
        :columns="columns"
        :data="tableData"
        :pagination="pagination"
        :bordered="false"
      />
    </n-card>

    <n-modal v-model:show="showModal" preset="dialog" :title="t('farmer.new')">
      <n-form
        ref="formRef"
        :model="formValue"
        :rules="rules"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
      >
        <n-form-item :label="t('farmer.name')" path="name">
          <n-input v-model:value="formValue.name" :placeholder="t('farmer.pleaseInputName')" />
        </n-form-item>
        <n-form-item :label="t('farmer.cardNo')" path="cardNo">
          <n-input v-model:value="formValue.cardNo" :placeholder="t('farmer.pleaseInputCardNo')" />
        </n-form-item>
        <n-form-item :label="t('farmer.areaNo')" path="areaNo">
          <n-input v-model:value="formValue.areaNo" :placeholder="t('farmer.pleaseInputAreaNo')" />
        </n-form-item>
        <n-form-item :label="t('farmer.greenhouseNo')" path="greenhouseNo">
          <n-input v-model:value="formValue.greenhouseNo" :placeholder="t('farmer.pleaseInputGreenhouseNo')" />
        </n-form-item>
        <n-form-item :label="t('farmer.phone')" path="phone">
          <n-input v-model:value="formValue.phone" :placeholder="t('farmer.pleaseInputPhone')" />
        </n-form-item>
      </n-form>
      <template #action>
        <n-space>
          <n-button @click="showModal = false">{{ t('common.cancel') }}</n-button>
          <n-button type="primary" @click="handleSubmit">{{ t('common.confirm') }}</n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
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
  useMessage
} from 'naive-ui'
import { AddOutline } from '@vicons/ionicons5'

interface Farmer {
  id: number
  name: string
  cardNo: string
  areaNo: string
  greenhouseNo: string
  phone: string
}

const route = useRoute()
const message = useMessage()
const { t } = useI18n()

const showModal = ref(false)
const formRef = ref()
const formValue = ref({
  name: '',
  cardNo: '',
  areaNo: '',
  greenhouseNo: '',
  phone: ''
})

const rules = {
  name: {
    required: true,
    message: t('farmer.pleaseInputName'),
    trigger: 'blur'
  },
  cardNo: {
    required: true,
    message: t('farmer.pleaseInputCardNo'),
    trigger: 'blur'
  },
  areaNo: {
    required: true,
    message: t('farmer.pleaseInputAreaNo'),
    trigger: 'blur'
  },
  greenhouseNo: {
    required: true,
    message: t('farmer.pleaseInputGreenhouseNo'),
    trigger: 'blur'
  },
  phone: {
    required: true,
    message: t('farmer.pleaseInputPhone'),
    trigger: 'blur'
  }
}

const columns = [
  {
    title: t('farmer.name'),
    key: 'name'
  },
  {
    title: t('farmer.cardNo'),
    key: 'cardNo'
  },
  {
    title: t('farmer.areaNo'),
    key: 'areaNo'
  },
  {
    title: t('farmer.greenhouseNo'),
    key: 'greenhouseNo'
  },
  {
    title: t('farmer.phone'),
    key: 'phone'
  },
  {
    title: t('table.actions'),
    key: 'actions',
    render(row: Farmer) {
      return h(NSpace, null, {
        default: () => [
          h(
            NButton,
            {
              size: 'small',
              onClick: () => handleEdit(row)
            },
            { default: () => t('common.edit') }
          ),
          h(
            NButton,
            {
              size: 'small',
              type: 'error',
              onClick: () => handleDelete(row)
            },
            { default: () => t('common.delete') }
          )
        ]
      })
    }
  }
]

const tableData = ref<Farmer[]>([])
const pagination = {
  pageSize: 10
}

const handleAddFarmer = () => {
  showModal.value = true
}

const handleSubmit = () => {
  formRef.value?.validate((errors: any) => {
    if (!errors) {
      const newFarmer: Farmer = {
        ...formValue.value,
        id: Date.now()
      }
      tableData.value.push(newFarmer)
      message.success(t('farmer.addSuccess'))
      showModal.value = false
      formValue.value = {
        name: '',
        cardNo: '',
        areaNo: '',
        greenhouseNo: '',
        phone: ''
      }
    }
  })
}

const handleEdit = (row: Farmer) => {
  // TODO: 实现编辑功能
  message.info(t('farmer.editInProgress'))
}

const handleDelete = (row: Farmer) => {
  tableData.value = tableData.value.filter(item => item.id !== row.id)
  message.success(t('farmer.deleteSuccess'))
}
</script>

<style scoped>
.farm-container {
  min-height: 100%;
}
</style> 