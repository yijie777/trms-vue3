<template>
  <div class="md:flex">
    <template v-for="(item, index) in growCardList" :key="item.title">
      <Card
        size="small"
        :loading="loading"
        :title="item.title"
        class="md:w-1/4 w-full !md:mt-0 !mt-4"
        :class="[index + 1 < 4 && '!md:mr-4']"
        :canExpan="false">
        <div class="py-4 px-4 flex justify-between">
          <CountTo  :startVal="1" :endVal="item.value" class="text-2xl" />
          <Icon :icon="item.icon" :size="40" :color="item.color" />
        </div>
      </Card>
    </template>
  </div>
</template>
<script lang="ts" setup>
  import { CountTo } from '@/components/CountTo';
  import { Icon } from '/@/components/Icon';
  import { Tag, Card } from 'ant-design-vue';
  import {ref} from 'vue';
  interface GrowCardItem {
    icon: string;
    title: string;
    value?: number;
    color?: string;
  }
  import {
    getImageCount,
    getPaperCount,
    getQuestionCount,
    getSCCount
  } from "@/views/trms/dashboard/api";
  const growCardList= ref<GrowCardItem []>([]);
  getSCCount({}).then(res=>{
    growCardList.value.push({
      title: '实训数量',
      icon: 'oui:training',
      value: res,
      color: '#5f86c4',
    })
  })
  getImageCount({}).then(res=>{
    growCardList.value.push({
      title: '镜像数量',
      icon: 'logos:docker-icon',
      value: res,
      color: 'blue',
    })
  })
  getQuestionCount({}).then(res=>{
    growCardList.value.push({
      title: '题库数量',
      icon: 'icon-park-outline:file-question',
      value: res,
      color: 'orange',
    })
  })
  getPaperCount({}).then(res=>{
    growCardList.value.push({
      title: '试卷数量',
      icon: 'mingcute:paper-line',
      value: res,
      color: 'purple',
    })
  })

  defineProps({
    loading: {
      type: Boolean,
    },
  });
</script>
