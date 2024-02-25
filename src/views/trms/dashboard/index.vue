<template>
  <div class="p-4">
    <GrowCard :loading="loading" class="enter-y"/>
    <a-card title="状态">
      <template #cover>
        <div class="space-align-container">
          <a-space :size="[8, 18]" wrap style="margin: 5%;">
            <Gauge :chartData="{ name: '负载', value:loadAvgInfo }" height="200px"
                   width="200px"></Gauge>
          </a-space>

          <a-space :size="[8, 18]" wrap style="margin: 5%;">
            <Gauge :chartData="{ name: 'cpu', value:cpuInfo }" height="200px"
                   width="200px"></Gauge>
          </a-space>
          <a-space :size="[8, 18]" wrap style="margin: 5%;">
            <Gauge :chartData="{ name: '内存', value:memoryInfo }" height="200px"
                   width="200px"></Gauge>
          </a-space>
          <a-space :size="[8, 18]" wrap style="margin: 5%;" v-for="disk in diskInfo">
            <Gauge :chartData="{ name: disk.name, value:disk.restPPT }" height="200px"
                   width="200px"></Gauge>
          </a-space>
        </div>
      </template>


    </a-card>


    <!--        <SiteAnalysis class="!my-4 enter-y" :loading="loading" />-->
    <!--        <div class="md:flex enter-y">-->
    <!--          <VisitRadar class="md:w-1/3 w-full" :loading="loading" />-->
    <!--          <VisitSource class="md:w-1/3 !md:mx-4 !md:my-0 !my-4 w-full" :loading="loading" />-->
    <!--          <SalesProductPie class="md:w-1/3 w-full" :loading="loading" />-->
    <!--        </div>-->
  </div>
</template>
<script lang="ts" setup>
import {ref} from 'vue';
import GrowCard from './components/GrowCard.vue';
import Gauge from './components/Gauge.vue';
import {defHttp} from "@/utils/http/axios";

const loading = ref(true);
const cpuInfo = ref<string | null>('0');
const loadAvgInfo = ref<string | null>('0');
const memoryInfo = ref<string | null>('0');
const diskInfo = ref([])
getCpuInfo()
getDiskInfo()
getMemInfo()
getLoadAvg()
setInterval(() => {
  getCpuInfo()
  getMemInfo()
  getLoadAvg()
}, 2000);
setInterval(() => {
  getDiskInfo()
}, 20000);

function getCpuInfo() {
  defHttp.get({url: '/actuator/metrics/system.cpu.usage'}, {isTransformResponse: false}).then(res => {
    cpuInfo.value = (res.measurements[0].value * 100).toFixed(2);
  })
}

function getMemInfo() {
  defHttp.get({url: '/trms/actuator/redis/memory'}, {isTransformResponse: false}).then(res => {
    const mem = JSON.parse(res.result)[0]
    memoryInfo.value = (parseInt(mem.Used) / parseInt(mem.Total) * 100).toFixed(2);
  })
}

function getLoadAvg() {
  defHttp.get({url: '/trms/actuator/redis/loadavg'}, {isTransformResponse: false}).then(res => {
    let values = res.result.match(/[\d.\/]+/g); // 提取所有数字和点、斜杠
    if (values && values.length > 0) {
      let firstValue = parseFloat(values[0]); // 转换第一个值为浮点数
      loadAvgInfo.value= (firstValue * 100).toFixed(2);
    }
  })
}

function getDiskInfo() {
  defHttp.get({url: '/sys/actuator/redis/queryDiskInfo'}, {isTransformResponse: false}).then(res => {
    diskInfo.value = res.result
  })
}

setTimeout(() => {
  loading.value = false;
}, 500);
</script>
