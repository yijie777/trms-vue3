<template>
  <div class="p-2">

    <div class="page">
      <SplitPane style="height: 1080px">
        <template v-slot:one>
          <div>
            <LeftModule :course_id="course_id" :stu_id="stu_id" @initTerminal="initTerminal"></LeftModule>
          </div>
        </template>

        <template v-slot:two>
          <div style="height: 100%">
            <!--            <Terminal :sshInfo="sshInfo"></Terminal>-->
            <Terminal ref="child1Container"></Terminal>
          </div>
        </template>

      </SplitPane>
    </div>


  </div>
</template>

<script lang="ts">



import Terminal from "@/views/demo/myRole/Terminal.vue";
import {ref} from 'vue';
import SplitPane from "@/views/demo/myRole/SplitPane.vue";
import LeftModule from "@/views/demo/myRole/LeftModule.vue";

export default {
  name: 'MyRole',
  computed: {},
  components: {LeftModule, SplitPane, Terminal},
  methods:{
    initTerminal(){
      this.$refs.child1Container.init();
    }
  },
  setup() {
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

    console.log("end")

    const paneLengthPercent = 30


    return {
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
  padding: 10px;
  background: #000;
}
</style>
