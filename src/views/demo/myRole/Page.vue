<template>
  <div class="page">
    <SplitPane>
      <template v-slot:one>
        <div>
          区域一
        </div>
      </template>

      <template v-slot:two>
        <div style="height: 100%">
          <Terminal :sshInfo="sshInfo"></Terminal>
        </div>
      </template>

    </SplitPane>
  </div>
</template>

<script>
import SplitPane from './SplitPane.vue'
import Terminal from "@/views/demo/myRole/Terminal.vue";
import {ref} from "vue";

export default {
  components: {
    Terminal,
    SplitPane
  },
  data() {
    return {
      paneLengthPercent: 30,
      sshInfo: {
        operate: 'connect',
        host: '192.168.160.100',
        port: 11022,
        username: 'root',
        password: '123456',
      }
    }
  }
}
</script>

<style scoped>
.page {
  height: 100%;
  padding: 10px;
  background: #000;
}
</style>

