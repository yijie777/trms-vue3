<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts" setup>
import * as echarts from 'echarts';
import {defineComponent, PropType, ref, Ref, reactive, watchEffect, onMounted, watch} from 'vue';
import {EChartsType} from "echarts";
import {cloneDeep} from "lodash-es";
//
const props = defineProps({
  chartData: {
    type: Object as PropType<Object>,
    default: () => [],
  },
  option: {
    type: Object,
    default: () => ({}),
  },
  width: {
    type: String as PropType<string>,
    default: '50%',
  },
  height: {
    type: String as PropType<string>,
    default: 'calc(100vh - 78px)',
  },
});
const  computed = {
  syncChartData:{
    get(){
      return props.chartData
    },
  }
}
const chartRef=ref()
const option = reactive({
  series: [
    {
      type: 'gauge',
      radius: '80%', // 增加半径以更好地适应小尺寸
      startAngle: 90, // 开始角度
      endAngle: -270, // 结束角度
      pointer: {
        show: false // 隐藏指针
      },
      progress: {
        show: true,
        width: 8, // 减小进度条宽度
        // overlap: false,
        roundCap: true,
        //进度条颜色为32,165,58
        itemStyle: {
          color: props.chartData.value> 90 ? 'red' : (props.chartData.value> 80 ? '#e7ca28' : 'green')
        }
      },
      axisLine: {
        lineStyle: {
          width: 8 // 减小轴线宽度
        },
      },
      axisTick: {
        show: false // 隐藏刻度线
      },
      splitLine: {
        show: false // 隐藏分隔线
      },

      axisLabel: {
        distance: 15, // 减小标签距离
        color: '#999',
        fontSize: 8, // 减小字体大小
        show: false // 隐藏标签
      },
      anchor: {
        show: false, // 可能需要隐藏锚点以节省空间
      },
      title: {
        show: true, // 隐藏标题
        fontSize: 14, // 减小详情字体大小
      },
      detail: {
        valueAnimation: false,
        fontSize: 14, // 减小详情字体大小
        formatter: '{value}%',
        offsetCenter: [0, '-10%'], // 调整详情位置
      },
      data: [
        {
          value: 70,
          name: '本地磁盘',
        },
      ],
    },
  ],
});
var myChart = ref<EChartsType | null>(null);
onMounted(() => {
  init()
})

function init() {
  myChart.value = echarts.init(chartRef.value);
  props.option && Object.assign(option, cloneDeep(props.option));
  setOption();
}

function setOption() {
  option.series[0].data[0].name = props.chartData.name;
  option.series[0].data[0].value = props.chartData.value;
  //设置颜色
  option.series[0].progress.itemStyle.color = props.chartData.value > 90 ? 'red' : (props.chartData.value > 80 ? '#e7ca28' : 'green');
  myChart.value && myChart.value.setOption(option);
}
watch(() => props.chartData, () => {
  setOption();
})
</script>
