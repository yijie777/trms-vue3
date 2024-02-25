<template>
  <div class="space-align-container">
    <div class="space-align-block">
      <PageWrapper  >
        <a-space direction="vertical" :size="12" style="margin: 10px">
          <a-row>
            <a-radio-group v-model:value="search.paperType" button-style="outline" name="试卷类型">
              <a-radio-button value="a" class="trms-radio">固定试卷</a-radio-button>
              <a-radio-button value="b" class="trms-radio">时段试卷</a-radio-button>
            </a-radio-group>
          </a-row>
          <a-row>
            <a-radio-group v-model:value="search.subjectId" button-style="outline" name="考试学科">
              <a-radio-button :value="subject.subjectName" class="trms-radio"
                              v-for="(subject,index) in data.subjectList">{{ subject.subjectName }}
              </a-radio-button>
            </a-radio-group>
          </a-row>
        </a-space>


          <a-row :gutter="16">
            <a-col :span="6" class="gutter-row" v-for="(examPaper,index) in data.examPaperList">
              <a-card hoverable style="width: 300px;" :title="examPaper.name">
                <p>学科：{{ examPaper.subjectId_dictText }}</p>
                <p>题数：{{ examPaper.questionCount }}</p>
                <p>总分：{{ examPaper.score }}</p>
                <p>开始时间：{{ examPaper.limitStartTime }}</p>
                <p>结束时间：{{ examPaper.limitEndTime }}</p>
                <p>考试时长：{{ examPaper.suggestTime }}(分钟)</p>
                <a-space>
                  <div class="space-align-block">
                    <router-link :to="{path:'/exam/do',query:{id:examPaper.id}}">
                      <a-button type="primary">
                        开始答题
                      </a-button>
                    </router-link>

                  </div>
                </a-space>
              </a-card>
            </a-col>
          </a-row>



      </PageWrapper>


    </div>
  </div>







</template>

<script lang="ts" setup>
import {defineComponent, ref, reactive} from 'vue';
import {defHttp} from "@/utils/http/axios";
import {paperList, subjectList} from "@/views/trms/student/exam/paper/api";
import {PageWrapper} from "@/components/Page";

let data = reactive({
  examPaperList: [],
  subjectList: []
})
let search = reactive({
  paperType: '',
  subjectId: ''
})


subjectList({}).then((res) => {
  data.subjectList = res.records
  console.log( res.records )
})
paperList({}).then((res) => {
  data.examPaperList = res.records
})
</script>

<style scoped>
.trms-radio {
  margin-right: 24px;
  padding: 2px 8px;
  line-height: 20px;
  border-radius: 4px;
  height: 28px;
}

.gutter-example :deep(.ant-row > div) {
  background: transparent;
  border: 0;
}

.gutter-box {
  background: #00a0e9;
  padding: 5px 0;
}
</style>
