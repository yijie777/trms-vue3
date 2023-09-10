<template>
  <BasicModal v-bind="$attrs" title="Modal Title"  :defaultFullscreen="true" :showOkBtn="false" :showCancelBtn="false">
  <MyRole></MyRole>
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicModal } from '/@/components/Modal';
  import  MyRole  from '/@/views/demo/myRole/MyRole.vue'
  export default defineComponent({
    components: { BasicModal, MyRole},
    setup() {
      return {};
    },
  });
</script>
