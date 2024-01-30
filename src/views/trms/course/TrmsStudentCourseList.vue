<template>
  <div>
    <PageWrapper>
      <a-button type="primary" class="my-4" @click="handleAdd"> 新建实训</a-button>
      <TrmsStudentCourseModal @register="register2"/>

      <div class="jeecg-basic-table-form-container">
        <BasicForm :schemas="schemas" ref="formElRef" :labelWidth="100" @submit="handleSubmit"/>
      </div>
      <a-collapse v-model:activeKey="activeKey" @change="changeActivekey">
        <a-collapse-panel key="1" header="This is panel header 1">
<!--          <a-space :size="[8, 18]" wrap style="margin: 5%;">-->
<!--            <template v-show="studentCourseList" v-model="studentCourseList"-->
<!--                      v-for="sc in studentCourseList"-->
<!--                      v-if="studentCourseList.length!==0">-->

<!--              <a-card hoverable style="width: 300px;">-->
<!--                <template #cover>-->
<!--                  <img-->
<!--                    :alt=sc.course.courseName-->
<!--                    :src=getFileAccessHttpUrl(sc.course.imageUrl)-->
<!--                    :width="200"-->
<!--                    :height="210"-->
<!--                  />-->
<!--                </template>-->
<!--                <a-card-meta :title=sc.group.groupName.concat(sc.course.courseName) description=" "-->
<!--                             align="center">-->
<!--                </a-card-meta>-->
<!--                <div class="space-align-container">-->
<!--                  <div class="space-align-block">-->
<!--                    <a-button type="primary">-->
<!--                      连接-->
<!--                    </a-button>-->
<!--                  </div>-->
<!--                  <div class="space-align-block">-->
<!--                    <a-button type="primary">-->
<!--                      重置-->
<!--                    </a-button>-->
<!--                  </div>-->

<!--                  <div class="space-align-block">-->
<!--                    <a-button type="primary" @click="deleteTrain(sc.id)">-->
<!--                      删除-->
<!--                    </a-button>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </a-card>-->

<!--            </template>-->

<!--          </a-space>-->

        </a-collapse-panel>
        <a-collapse-panel key="2" header="This is panel header 2">
          <p>{{ text }}</p>
        </a-collapse-panel>
        <a-collapse-panel key="3" header="This is panel header 3">
          <p>{{ text }}</p>
        </a-collapse-panel>
      </a-collapse>

    </PageWrapper>

  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {BasicForm, FormSchema, useForm} from '/@/components/Form/index';
import {CollapseContainer} from '@/components/Container';
import {useMessage} from '/@/hooks/web/useMessage';
import {PageWrapper} from '/@/components/Page';
import TrmsStudentCourseModal from "@/views/trms/course/components/TrmsStudentCourseModal.vue";
import {useModal} from "@/components/Modal";
import {list} from "@/views/trms/mycourse/MyCourse.api";
import {ref, reactive} from 'vue';

import {getFileAccessHttpUrl} from "@/utils/common/compUtils";
import {deleteOne} from "@/views/trms/course/TrmsStudentCourse.api";

const schemas: FormSchema[] = [

  {
    label: "实训任务",
    field: 'courseId',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: "trms_course,course_name,id"
    },
    colProps: {span: 6},
  },
  {
    label: "小组名称",
    field: 'groupId',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: "trms_group,group_name,id"
    },
    colProps: {span: 6},
  },
];

export default defineComponent({
  methods: {getFileAccessHttpUrl},
  components: {TrmsStudentCourseModal, BasicForm, CollapseContainer, PageWrapper},
  setup() {
    const activeKey = ref([]);
    const text = `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`;

    const changeActivekey = (key: string) => {
      console.log(key);
    };

    const {createMessage} = useMessage();

    const [register, {setProps}] = useForm({
      labelWidth: 120,
      schemas,
      actionColOptions: {
        span: 24,
      },
      fieldMapToTime: [['fieldTime', ['startTime', 'endTime'], 'YYYY-MM']],
    });

    const [register2, {openModal}] = useModal();

    function handleEdit() {
      openModal(true, {
        isUpdate: true,
        showFooter: true,
      });
    }

    async function deleteTrain(id) {
      console.log(id)
      await deleteOne({id: id}, handleSuccess);
    }

    function handleSuccess() {
      list({}).then((res) => {
        console.log(res)
        studentCourseList.value = []
        for (const i in res.records) {
          studentCourseList.value.push(res.records[i])

        }
      })
    }

    function handleAdd() {
      openModal(true, {
        isUpdate: false,
        showFooter: true,
      });
    }

    //新建map
    var studentCourseList = ref([]);
    list({}).then((res) => {
      var groupSCMap = {};
      for (const i in res.records) {
        //判断map中是否包含key为res.records[i].group.groupName的键值对
        if (groupSCMap[res.records[i].group.groupName] == null) {
          //如果不包含，新建一个数组，将studentCourseList赋值给数组
          var arr = []
          arr.push(res.records[i])
          //map中赋值key为res.records[i].group.groupName,value为arr
          groupSCMap[res.records[i].group.groupName] = arr
        } else {
          //如果包含，将studentCourseList赋值给数组
          groupSCMap[res.records[i].group.groupName].push(res.records[i])
        }
      }
      //将groupSCMap转化为studentCourseList
      for (const key in groupSCMap) {
        studentCourseList.value.push(groupSCMap[key])
      }
      console.log(studentCourseList.value)
    })

    return {
      register,
      schemas,
      handleSubmit: (values: Recordable) => {
        list(values).then((res) => {
          var groupSCMap = {};
          // studentCourseList.value=[]
          // for (const i in res.records) {
          //   studentCourseList.value.push(res.records[i])
          // }
          for (const i in res.records) {
            //判断map中是否包含key为res.records[i].group.groupName的键值对
            if (groupSCMap[res.records[i].group.groupName] == null) {
              //如果不包含，新建一个数组，将studentCourseList赋值给数组
              var arr = []
              arr.push(res.records[i])
              //map中赋值key为res.records[i].group.groupName,value为arr
              groupSCMap[res.records[i].group.groupName] = arr
            } else {
              //如果包含，将studentCourseList赋值给数组
              groupSCMap[res.records[i].group.groupName].push(res.records[i])
            }
          }
          //将groupSCMap转化为studentCourseList
          for (const key in groupSCMap) {
            studentCourseList.value.push(groupSCMap[key])
          }
        })
      },
      setProps,
      openModal,
      register2,
      handleAdd,
      handleEdit,
      deleteTrain,
      studentCourseList,
      activeKey,
      text,
      changeActivekey,
    };
  },
});
</script>
<style scoped>
.space-align-block {
  padding: 8px;
  flex: none;
}

.space-align-container {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}
</style>
