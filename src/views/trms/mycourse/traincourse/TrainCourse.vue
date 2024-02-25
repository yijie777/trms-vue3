<template>
    <div class="p-2">
      <div class="page">

        <SplitPane >

          <template v-slot:one>
            <div>
              <LeftModule :sc="sc"
                          @initTerminal="initTerminal"></LeftModule>
              <div class="exit">
                <slot name="exit"></slot>
              </div>
            </div>
          </template>

          <template v-slot:two>
            <Terminal ref="child1Container"></Terminal>
<!--                        <iframe src="https://192.168.160.132:6080/vnc.html?password=123456" style="height:100%; width:100%;margin:0;border:0;"> </iframe>-->

          </template>

        </SplitPane>
      </div>
    </div>



</template>

<script lang="ts">


import Terminal from "@/views/trms/mycourse/traincourse/components/Terminal.vue";
import SplitPane from "@/views/trms/mycourse/traincourse/components/SplitPane.vue";
import LeftModule from "@/views/trms/mycourse/traincourse/components/LeftModule.vue";
import {FullscreenExitOutlined} from '@ant-design/icons-vue';
import {FadeTransition, ScaleTransition} from "@/components/Transition";

export default {
  name: 'MyRole',
  computed: {},
  components: {
    ScaleTransition,
    FadeTransition, LeftModule, SplitPane, Terminal, FullscreenExitOutlined},
  methods: {
    initTerminal() {
      this.$refs.child1Container.init();
    }
  },
  data() {
    return {
      paneLengthPercent: 30
    }
  },
  props: {
    sc: {},
  },


};
</script>

<style scoped>
.page {
  height: 100%;
  padding: 5px;
  background: #ddd;
}

.exit {
  position: absolute;
  left: 20px;
  top: 20px;
  width: 30px;
  height: 30px;
}
</style>
