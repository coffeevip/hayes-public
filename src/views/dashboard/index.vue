<template>
  <div class="dashboard-container">
    <n-grid :x-gap="16" :y-gap="16" :cols="4">
      <n-grid-item>
        <n-card title="农作物总数">
          <n-statistic label="当前种植" value="128" />
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card title="土地面积">
          <n-statistic label="总面积(亩)" value="1024" />
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card title="设备总数">
          <n-statistic label="在线设备" value="64" />
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card title="今日任务">
          <n-statistic label="待处理" value="12" />
        </n-card>
      </n-grid-item>
    </n-grid>

    <div class="chart-container">
      <n-card title="近7日数据统计" class="chart-card">
        <div class="chart-placeholder">
          图表区域（后续添加echarts）
        </div>
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NGrid, NGridItem, NCard, NStatistic } from 'naive-ui'
</script>

<style scoped>
.dashboard-container {
  padding: 16px;
}

.chart-container {
  margin-top: 16px;
}

.chart-card {
  height: 400px;
}

.chart-placeholder {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 14px;
}
</style> 