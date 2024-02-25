<template>
  <div class="paper-contain">
    <div class="paper-item-order-fake">
      <div class="paper-item-order">
          <a-card title="试卷名称">
            <a-card-meta title="总分：30.5 时长：120分钟" class="paper-info"></a-card-meta>
            <div class="trms-split"></div>
            <div class="paper-info">
              <a-tag color="green">1</a-tag>
              <a-tag>2</a-tag>
              <a-tag>3</a-tag>
            </div>
            <div class="trms-split"></div>
            <div class="paper-info">
              <div class="remain-time">
                <label>剩余时间：</label>
                <label class="remain-time-content">120分钟</label>
              </div>

            </div>
          </a-card>
      </div>
    </div>
    <div class="paper-question-content">
      <a-card title="选择题">
        <a-tag>多选题</a-tag>
        <a-card-meta title="timu1"></a-card-meta>
        <a-radio><a-card-meta description="A"></a-card-meta></a-radio>
        <a-card-meta description="B"></a-card-meta>
        <a-card-meta description="C"></a-card-meta>
        <a-card-meta description="D"></a-card-meta>
      </a-card>
      <a-card title="判断题">
        <a-tag>多选题</a-tag>
        <a-card-meta title="timu1"></a-card-meta>
        <a-radio><a-card-meta description="A"></a-card-meta></a-radio>
        <a-card-meta description="B"></a-card-meta>
        <a-card-meta description="C"></a-card-meta>
        <a-card-meta description="D"></a-card-meta>
      </a-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {baseHandler} from "@/layouts/default/setting/handler";
// baseHandler(HandlerEnum.FULL_CONTENT, true);
import {useRoute} from "vue-router";

import {ref, reactive, defineExpose, nextTick, defineProps, computed, onMounted} from 'vue';
import {HandlerEnum} from "@/layouts/default/setting/enum";
import {defHttp} from "@/utils/http/axios";

const confirmLoading = ref<boolean>(false);
const route = useRoute()
const data = reactive<Record<string, any>>({
  titleItems: {},
  name:'',
  limitEndTime:'',
  limitStartTime:'',
  suggestTime:'',

});
onMounted(()=>{
  init()
})
function init() {
  let id = route.query.id
  if (id) {
    confirmLoading.value=true
    defHttp.get({url: '/trms/trmsExamPaper/queryById?id=' + id, params: {}}).then((res) => {
      data.name=res.name
      data.suggestTime=res.suggestTime
      data.titleItems=JSON.parse(res.titleItems)
      // Object.assign(formData,res)
      confirmLoading.value=false
    });
  }

}
let answer = reactive({
  answerItems: [{itemOrder: ""}]
})

// function formatSeconds(theTime) {
//   return formatSeconds(theTime)
// }
</script>

<style scoped>
.paper-contain {
  display: flex;
  flex-direction: row;
  background-color: #798fab;
  padding: 20px 90px;
  min-height: 100%;
}

.paper-item-order {
  width: 270px;
  height: 100%;
  position: fixed;
  z-index: 999;
  background-color: #0a9fe5;
}

.paper-item-order-fake {
  width: 270px;
  height: 100%;
}

.paper-question-content {
  flex: 1;
  /*background-color: #c42a2a;*/
  margin-left: 20px;
}
.trms-split{
  width: 100%;
  border-bottom: 1px solid #E6E6E6;
}
.paper-info{
  font-size: 14px;
  padding: 10px 0;
}
.remain-time {
  padding: 15px 0;
  text-align: center;
}
.remain-time-content{
  margin-top: 5px;
  font-size: 18px;
  line-height: 22px;
  color: red;
  font-weight: 400;
}
</style>
