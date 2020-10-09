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
      <div id="view" class="chart" style="height:500px;width:100%"/>

    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import staticApi from '@/api/sta/staticis.js'

  export default {
    name: "chart",
    data() {

      return ({
        searchObj: {
          begin: '',
          end: ''
        },
        btnDisabled: false,
        viewList: [],
        loginList: [],
        registerList: [],
        courseList: [],
        dateList: [],

      })
    },

    methods: {
      showChart() {
        staticApi.getDailyCount(this.searchObj).then(result => {
          console.log(result);
          this.viewList = result.data.viewList;
          this.loginList = result.data.loginList;
          this.registerList = result.data.registerList;
          this.courseList = result.data.courseList;
          this.dateList = result.data.dateList;

          this.setChart();
        }).catch(reason => {

        });

      },

      setChart() {
        // 基于准备好的dom，初始化echarts实例
        this.viewChart = echarts.init(document.getElementById('view'));

        // 指定图表的配置项和数据
        var viewOption = {
          title: {
            text: '日统计'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['播放数', '登陆人数', '注册人数', '新增课程数']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },

          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.dateList
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '播放数',
              type: 'line',
              stack: '总量',
              data: this.viewList
            },
            {
              name: '登陆人数',
              type: 'line',
              stack: '总量',
              data: this.loginList
            },
            {
              name: '注册人数',
              type: 'line',
              stack: '总量',
              data: this.registerList
            },
            {
              name: '新增课程数',
              type: 'line',
              stack: '总量',
              data: this.courseList
            },

          ]
        };


        this.viewChart.setOption(viewOption);

      }
    }


  }
</script>

<style scoped>

</style>
