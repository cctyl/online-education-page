<template>
  <div class="app-container">
    <!--表单-->
    <el-form :inline="true" class="demo-form-inline">



      <el-form-item>
        <el-date-picker
          v-model="searchObj.begin"
          type="date"
          placeholder="选择开始日期"
          value-format="yyyy-MM-dd"/>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchObj.end"
          type="date"
          placeholder="选择截止日期"
          value-format="yyyy-MM-dd"/>
      </el-form-item>
      <el-button
        :disabled="btnDisabled"
        type="primary"
        icon="el-icon-search"
        @click="showChart()">查询
      </el-button>
    </el-form>

    <div class="chart-container">
      <div id="chart" class="chart" style="height:250px;width:100%"/>
      <div id="chart2" class="chart" style="height:250px;width:100%"/>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    name: "chart",
    data() {

      return ({
        searchObj: {},
        btnDisabled: false
      })
    },
    created() {
    },
    methods: {
      showChart() {
        // 基于准备好的dom，初始化echarts实例
        this.chart = echarts.init(document.getElementById('chart'))
        this.chart2 = echarts.init(document.getElementById('chart2'))


        // 指定图表的配置项和数据
        var option = {
          // x轴是类目轴（离散数据）,必须通过data设置类目数据
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          // y轴是数据轴（连续数据）
          yAxis: {
            type: 'value'
          },
          // 系列列表。每个系列通过 type 决定自己的图表类型
          series: [{
            // 系列中的数据内容数组
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            // 折线图
            type: 'line'
          }]
        }

        this.chart.setOption(option)
        this.chart2.setOption(option)
      }
    }


  }
</script>

<style scoped>

</style>
