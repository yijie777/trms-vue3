<template>
  <div>
    <iframe src="https://192.168.160.100:6901/" id="mobsf" scrolling="no" frameborder="0" style="position:absolute;"></iframe>
  </div>
</template>

<script lang="ts">


export default {
  data () {
    return {
    }
  },
  mounted(){
    /**
     * iframe-宽高自适应显示
     */
    function changeMobsfIframe(){
      const mobsf = document.getElementById('mobsf');
      const deviceWidth = document.body.clientWidth;
      const deviceHeight = document.body.clientHeight;
      mobsf.style.width = (Number(deviceWidth)-240) + 'px'; //数字是页面布局宽度差值
      mobsf.style.height = (Number(deviceHeight)-100) + 'px'; //数字是页面布局高度差
    }

    changeMobsfIframe()

    window.onresize = function(){
      changeMobsfIframe()
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
