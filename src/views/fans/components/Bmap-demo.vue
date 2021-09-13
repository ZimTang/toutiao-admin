<template>
  <div id="container" class="bmap"></div>
</template>

<script>
/* eslint-disable */
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
export default {
  name: 'BmapDemo',
  setup () {
    onMounted(() => {
      
    })
  },
  mounted(){
    var map = new window.BMapGL.Map("container")
    var point = new window.BMapGL.Point(116.404, 39.915)
    map.centerAndZoom(point, 15)
  }
}
</script>

<style lang="less" scoped>
.bmap{
  width:800px;
  height:600px;
  border:1px solid #000;
}
</style>
