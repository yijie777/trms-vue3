<template>
  <div class="p-2">

<!--    <a-button @click="createContainer" size="large">创建docker容器</a-button>-->
<!--    <a-button @click="t1" size="large">一键启动HA</a-button>-->
<!--    <a-button @click="t2" size="large">检测Master</a-button>-->
<!--    <a-button @click="t3" size="large">重连</a-button>-->

    <div class="page">
      <SplitPane>
        <template v-slot:one>
          <div>
            <LeftModule :course_id="course_id" :stu_id="stu_id"></LeftModule>
          </div>
        </template>

        <template v-slot:two>
          <div style="height: 100%">
            <Terminal :sshInfo="sshInfo"></Terminal>
          </div>
        </template>

      </SplitPane>
    </div>


  </div>
</template>

<script lang="ts">


import {createHA, test1, test2, trmsStudentCourseList} from "@/views/demo/myRole/role.api";

import Terminal from "@/views/demo/myRole/Terminal.vue";
import {ref,onMounted} from 'vue';
// import Page from "@/views/demo/myRole/Page.vue";
import {useRoute} from "vue-router";
import LeftModule from "@/views/demo/myRole/LeftModule.vue";
import SplitPane from "@/views/demo/myRole/SplitPane.vue";

export default {
  name: 'MyRole',
  computed: {},

  components: {LeftModule, SplitPane, Terminal},
  setup: function () {
    // const sshInfo = ref({
    //   operate: 'connect',
    //   host: '101.35.193.165',
    //   port: 55555,
    //   username: 'root',
    //   password: '123456',
    //   userId: 1024
    // })
    /**
     * 接受参数
     */
    const stu_id = ref("e9ca23d68d884d4ebb19d07889727dae")
    const course_id = ref("1700053976482844673")
    let sshInfo = ref({
      operate: 'connect',
      host: '192.168.160.100',
      port: 11022,
      username: 'root',
      password: '123456',
      id: stu_id.value,
    })


    console.log("end")


    const paneLengthPercent = 30


    async function createContainer() {
      await createHA({
        id: stu_id.value,
        tag: "v3",
        network: "100net"
      })
    }

    async function t1() {
      sshInfo.value.operate = "START_HA"
      await test1(sshInfo.value)
    }

    function t2() {
      sshInfo.value.operate = "CHECK_HA_MASTER"
      test2(sshInfo.value)
    }

    function t3() {

    }

    function onSuccess() {
      reload()
    }

    function getTableActions(record): ActionItem[] {
      return [
        {
          label: '编辑',
          onClick: () => onEdit(record)
        }
      ]
    }

    const InitData = () => {
      const route = useRoute();
      const index = route.params;
      console.log(index.className)
      console.log(index.classid)

    }
    onMounted(() => {
      InitData()
    })

    return {
      createContainer,
      sshInfo,
      t1,
      t2,
      t3,
      paneLengthPercent,
      stu_id,
      course_id
    }
  },

};
</script>

<style scoped>
.page {
  height: 100%;
  background: #ffffff;
  margin: 0px;
}
</style>
