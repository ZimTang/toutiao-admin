<template>
  <!-- 准备容器 -->
  <div ref="myRef" style="width:600px;height:400px;"></div>
  <h2>百度地图示例1</h2>
  <MapDemo/>
  <h2>百度地图示例2</h2>
  <BMapDemo/>
</template>

<script>
// 引入echarts
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
import MapDemo from './components/map-demo.vue'
import BMapDemo from './components/Bmap-demo.vue'
export default {
  name: 'FansIndex',
  components: {
    MapDemo,
    BMapDemo
  },
  setup () {
    const myRef = ref(null)

    onMounted(() => {
      console.log(myRef.value)
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(myRef.value)

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    })
    return {
      myRef
    }
  }
}
</script>
