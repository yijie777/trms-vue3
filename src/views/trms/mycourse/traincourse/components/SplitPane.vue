<template>
  <div ref="splitPane" class="split-pane" :class="direction" :style="{ flexDirection: direction }">
    <div class="pane pane-one" :style="lengthType + ':' + paneLengthValue">
      <slot name="one"></slot>
    </div>

    <div
      class="pane-trigger"
      :style="lengthType + ':' + triggerLengthValue"
      @mousedown="handleMouseDown"
    ></div>

    <div class="pane pane-two">
      <slot name="two" ></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
      direction: {
        type: String,
        default: 'row'
      },

      min: {
        type: Number,
        default: 10
      },

      max: {
        type: Number,
        default: 90
      }

  },
  data() {
    return {
      paneLengthPercent: 50, // 区域1宽度 (%)
      triggerLength: 10 // 滑动器宽度 （px）
    }
  },
  computed: {
    lengthType() {
      return this.direction === 'row' ? 'width' : 'height'
    },

    paneLengthValue() {
      return `calc(${this.paneLengthPercent}% - ${this.triggerLength / 2 + 'px'})`
    },

    triggerLengthValue() {
      return this.triggerLength + 'px'
    }
  },

  methods: {
    // 按下滑动器
    handleMouseDown(e) {
      document.addEventListener('mousemove', this.handleMouseMove)
      document.addEventListener('mouseup', this.handleMouseUp)

      if (this.direction === 'row') {
        this.triggerLeftOffset = e.pageX - e.srcElement.getBoundingClientRect().left
      } else {
        this.triggerLeftOffset = e.pageY - e.srcElement.getBoundingClientRect().top
      }
    },

    // 按下滑动器后移动鼠标
    handleMouseMove(e) {
      const clientRect = this.$refs.splitPane.getBoundingClientRect()
      let paneLengthPercent = 0

      if (this.direction === 'row') {
        const offset = e.pageX - clientRect.left - this.triggerLeftOffset + this.triggerLength / 2
        paneLengthPercent = (offset / clientRect.width) * 100
      } else {
        const offset = e.pageY - clientRect.top - this.triggerLeftOffset + this.triggerLength / 2
        paneLengthPercent = (offset / clientRect.height) * 100
      }

      if (paneLengthPercent < this.min) {
        paneLengthPercent = this.min
      }
      if (paneLengthPercent > this.max) {
        paneLengthPercent = this.max
      }

      this.paneLengthPercent = paneLengthPercent
    },


    // 松开滑动器
    handleMouseUp() {
      document.removeEventListener('mousemove', this.handleMouseMove)
    }
  }
}
</script>

<style scoped >
.split-pane {
  background: #ffffff;
  height: 100%;
  display: flex;
}
.split-pane.row .pane {
  height: 100%;
}
.split-pane.row .pane-trigger {
  height: 100%;
  cursor: col-resize;
}
.split-pane.column .pane {
  width: 100%;
}
.split-pane.column .pane-trigger {
  width: 100%;
  cursor: row-resize;
}
.split-pane .pane-one {
  background: #e8e8e8;
}
.split-pane .pane-trigger {
  background: #ddd;
}
.split-pane .pane-two {
  flex: 1;
  background: #ffffff;
}


</style>
