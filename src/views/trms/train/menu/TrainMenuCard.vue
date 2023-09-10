<template>
  <a-space :size="[8, 18]" wrap style="margin: 5%">
    <template v-show="classList" v-model="classList" v-for="i in classList" >
      <a-card hoverable style="width: 300px;">
        <template #cover>
          <img
            :alt=i.courseName
            :src=i.imageUrl
            :width="200"
            :height="210"
          />
        </template>
        <a-card-meta  :title=i.courseName :description=i.description align="center">
        </a-card-meta>
        <a-space style="margin-top: 10%;margin-left: 22%" >
          <a-button type="primary" @click="startTrain(i.id,i.courseName)" >
            操作
          </a-button>
          <a-col span="12"> <a-button type="primary" >
            学习
          </a-button></a-col>
        </a-space>
      </a-card>
    </template>
  </a-space>

<!--  <div class="px-10">-->
<!--    <classmodel @register="register" v-bind="$attrs" />-->
<!--  </div>-->
</template>

<script lang="ts" setup>
  import { onBeforeMount} from 'vue';
  import { useModal } from '/@/components/Modal';
  // import classmodel from './components/classmodel.vue';
  import  {ref,reactive } from 'vue';
  const [register, { openModal, setModalProps }] = useModal();
  import  {router} from "@/router";
  import {useGo} from "@/hooks/web/usePage";
  import {defHttp} from '/@/utils/http/axios';
  const classUrl='/trms/trmsCourse/list'

  const go = useGo();
  let classList= reactive([]);


  async  function  getclass() {
    defHttp.get({url:classUrl}).then(data=>{
      classList.push(...data.records)
      console.log(classList)
    })
  }
  function startTrain(classid: number,className:string) {
    go(`/myRole/${classid}&${className}`)
}
  onBeforeMount(()=>{
    getclass();
  });

</script>

<style scoped>

</style>
