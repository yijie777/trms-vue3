<template>
  <div>
      <!--引用表格-->
     <BasicTable bordered size="middle" :loading="loading" rowKey="id" :canResize="false" :columns="trmsDockerContainerPortsColumns" :dataSource="dataSource" :pagination="false">
        <!--字段回显插槽-->
        <template #htmlSlot="{text}">
           <div v-html="text"></div>
        </template>
        <template #fileSlot="{text}">
           <span v-if="!text" style="font-size: 12px;font-style: italic;">无文件</span>
           <a-button v-else :ghost="true" type="primary" preIcon="ant-design:download-outlined" size="small" >下载</a-button>
        </template>
      </BasicTable>
    </div>
</template>

<script lang="ts" setup>
  import {ref,watchEffect} from 'vue';
  import {BasicTable} from '/@/components/Table';
  import {trmsDockerContainerPortsColumns} from '../TrmsDockerContainer.data';
  import {trmsDockerContainerPortsList} from '../TrmsDockerContainer.api';

  const props = defineProps({
    id: {
       type: String,
       default: '',
     },
  })

  const loading = ref(false);
  const dataSource = ref([]);

  watchEffect(() => {
      props.id && loadData(props.id);
   });

   function loadData(id) {
         dataSource.value = []
         loading.value = true
          trmsDockerContainerPortsList({id}).then((res) => {
           if (res.success) {
              dataSource.value = res.result.records
           }
         }).finally(() => {
           loading.value = false
         })
    }
</script>
