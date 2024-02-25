<template>
  <div>
    <PageWrapper>
      <a-button type="primary" class="my-4" @click="handleAdd"> 新建实训</a-button>
      <TrmsStudentCourseModal @register="register2"/>

      <div class="jeecg-basic-table-form-container">
        <BasicForm :schemas="schemas" ref="formElRef" :labelWidth="100" @submit="handleSubmit"/>
      </div>
      <a-collapse v-model:activeKey="activeKey" @change="changeActivekey">

        <a-collapse-panel v-for="(value, key,index) in groupSCMap" :key="index" :header="key">
          <a-space :size="[8, 18]" wrap style="margin: 5%;">
            <template v-show="value" v-model="value"
                      v-for="sc in value"
                      v-if="value.length!==0">

              <a-card hoverable style="width: 302px;border: 2px solid #e7e7e7">
                <template #cover>
                  <!--                 让以下两个元素显示在一行-->
                  <div class="space-align-container">
                    <Gauge :chartData="{ name: 'cpu', value: sc.cpu }" height="150px"
                           width="150px"></Gauge>
                    <Gauge :chartData="{ name: '内存', value: sc.memPerc }" height="150px"
                           width="150px"></Gauge>
                  </div>
                </template>
                <a-card-meta :title=sc.course.courseName description=" "
                             align="center">
                </a-card-meta>
                <div class="space-align-container">
                  <div class="space-align-block">
                    <a-button type="primary">
                      连接
                    </a-button>
                  </div>
                  <div class="space-align-block">
                    <a-button type="primary">
                      重置
                    </a-button>
                  </div>

                  <div class="space-align-block">
                    <a-button type="primary" @click="deleteTrain(sc.id)">
                      删除
                    </a-button>
                  </div>
                </div>
              </a-card>

            </template>

          </a-space>
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
import Gauge from "@/views/trms/course/components/Gauge.vue";
import {getUserData} from "@/views/system/usersetting/UserSetting.api";
import Stomp from 'stompjs'

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
  components: {Gauge, TrmsStudentCourseModal, BasicForm, CollapseContainer, PageWrapper},

  setup() {
    const activeKey = ref(['0']);

    const changeActivekey = (key: string) => {
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
    var item = ref({})
    item.value = {
      "name": "master",
      "value": 74,
    }

    const [register2, {openModal}] = useModal();

    function handleEdit() {
      openModal(true, {
        isUpdate: true,
        showFooter: true,
      });
    }

    async function deleteTrain(id) {
      await deleteOne({id: id}, handleSuccess);
    }

    function handleSuccess() {
      groupSCMap.value = {};
      handleList()
    }

    function handleAdd() {
      openModal(true, {
        isUpdate: false,
        showFooter: true,
      });
    }


    function getWebSocket() {
      getUserData().then((async res => {
        if (res.success) {
          if (res.result) {
            const userId = res.result.id
          }
        }
      }))
      //生成随机userId
      const userId = Math.floor(Math.random() * 100000);

      let sockUrl = window._CONFIG['domianURL'].replace("https://", "ws://").replace("http://", "ws://") + "/web-terminal"
      //建立websocket连接
      const socket = new WebSocket(sockUrl + "?" + userId);
      var stompClient = Stomp.over(socket)
      stompClient.connect({}, (res) => {
        stompClient.subscribe('/topic/' + userId, (frame) => {
          //frame.body需要转换为json
          const containerMap = JSON.parse(frame.body).reduce((map, item) => {
            map[item.containerId] = {
              cpu: item.cpu.replace('%', ''),
              memPerc: item.memPerc.replace('%', '')
            };
            return map;
          }, {});
          //遍历groupSCMap
          for (const i in groupSCMap.value) {
            //遍历groupSCMap中的value
            for (const j in groupSCMap.value[i]) {
              //判断containerMap中是否包含key为groupSCMap.value[i][j].containerId的键值对
              const containerIds = groupSCMap.value[i][j].containerList.split(",")
              groupSCMap.value[i][j].cpu = 0.00
              groupSCMap.value[i][j].memPerc = 0.00
              for (const k in containerIds) {
                if (containerMap[containerIds[k]] != null) {
                  //如果包含，将containerMap中的值赋值给groupSCMap中的value
                  groupSCMap.value[i][j].cpu += parseFloat(containerMap[containerIds[k]].cpu)
                  groupSCMap.value[i][j].memPerc += parseFloat(containerMap[containerIds[k]].memPerc)
                }
              }
              // 对累加结果进行四舍五入
              groupSCMap.value[i][j].cpu = parseFloat((groupSCMap.value[i][j].cpu / 8).toFixed(2));
              groupSCMap.value[i][j].memPerc = parseFloat(groupSCMap.value[i][j].memPerc.toFixed(2));

            }
          }
        })
        stompClient.send('/containerOccupancy', {}, JSON.stringify({"userId": userId,}))
      }, (err) => {
        console.log('失败：' + err)
      })
      stompClient.debug = null
    }


    //新建map
    var groupSCMap = ref({});

    function handleList() {
      list({}).then((res) => {
        for (const i in res.records) {
          //判断map中是否包含key为res.records[i].group.groupName的键值对
          if (groupSCMap.value[res.records[i].group.groupName] == null) {
            //如果不包含，新建一个数组，将studentCourseList赋值给数组
            var arr = []
            arr.push(res.records[i])
            //map中赋值key为res.records[i].group.groupName,value为arr
            groupSCMap.value[res.records[i].group.groupName] = arr
          } else {
            //如果包含，将studentCourseList赋值给数组
            groupSCMap.value[res.records[i].group.groupName].push(res.records[i])
          }
        }

      })
    }

    handleList()
    getWebSocket()

    return {
      register,
      schemas,
      handleSubmit: (values: Recordable) => {
        list(values).then((res) => {
          groupSCMap.value = {};
          handleList()
        })
      },
      setProps,
      openModal,
      register2,
      handleAdd,
      handleEdit,
      deleteTrain,
      handleList,
      groupSCMap,
      activeKey,
      changeActivekey,
      getWebSocket,
      item
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
