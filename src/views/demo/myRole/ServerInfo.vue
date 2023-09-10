<template>
  <div class="expand" :style="'width:' + width + 'px'">
    <div class="expand-header">
      <div class="expand-header-title">{{ title }}</div>
      <!-- ant-Design 的图标 -->
      <DownCircleOutlined
        :class="isExpand ? 'expand-header-iconexpand' : 'expand-header-icon'"
        @click="isExpand = !isExpand"
      />
    </div>
    <div
      :class="isExpand ? 'expand-contentexpand' : 'expand-content'"
      :style="isExpand ? 'height:' + height + 'px' : ''"
    >
      <slot  name="main"></slot>
    </div>
  </div>

</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {DownCircleOutlined} from '@ant-design/icons-vue';



export default defineComponent({
  name: 'Expand',
  components: {DownCircleOutlined},
  props: {
    width: {
      // 内容宽度
      type: Number,
      default: 300,
    },
    height: {
      // 内容高度
      type: Number,
      default: 200,
    },
    title: {
      // 标题
      type: String,
      default: '标题',
    },

  },
  data() {
    return {
      isExpand: true
    }
  },
  mounted() {

  },
  methods: {},


});
</script>
<style scoped>
.expand {
  border: 1px solid #eeeeee;
  border-radius: 4px;
}

.expand .expand-header {
  height: 40px;
  padding: 0 15px;
  background: #eeeeee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px 4px 0 0;
}

.expand .expand-header .expand-header-title {
  font-size: 16px;
}

.expand .expand-header .expand-header-icon {
  font-size: 18px;
  transform: rotate(-180deg);
  transition: all 0.3s;
}

.expand .expand-header .expand-header-iconexpand {
  font-size: 18px;
  transform: rotate(0deg);
  transition: all 0.3s;
}

.expand .expand-contentexpand {
  transition: all 0.5s;
  overflow: hidden;
}

.expand .expand-content {
  height: 0;
  overflow: hidden;
  transition: all 0.5s;
}

</style>
