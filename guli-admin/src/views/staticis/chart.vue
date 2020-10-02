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
      <div id="view" class="chart" style="height:250px;width:100%"/>
      <div id="login" class="chart" style="height:250px;width:100%"/>
      <div id="register" class="chart" style="height:250px;width:100%"/>
      <div id="course" class="chart" style="height:250px;width:100%"/>
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
          begin:'',
          end:''
        },
        btnDisabled: false,
        viewList:[],
        loginList:[],
        registerList:[],
        courseList:[],
        dateList:[],

      })
    },

    methods: {
      showChart(){
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
        this.loginChart = echarts.init(document.getElementById('login'))
        this.registerChart = echarts.init(document.getElementById('register'))
        this.courseChart = echarts.init(document.getElementById('course'))
        // 指定图表的配置项和数据
        var viewOption = {
          title: {
            text: '日播放数'
          },
          // x轴是类目轴（离散数据）,必须通过data设置类目数据
          xAxis: {
            type: 'category',
            data: this.dateList
          },
          // y轴是数据轴（连续数据）
          yAxis: {
            type: 'value'
          },
          // 系列列表。每个系列通过 type 决定自己的图表类型
          series: [{
            // 系列中的数据内容数组
            data: this.viewList,
            // 折线图
            type: 'line'
          }]
        };
        var loginOption = {
          title: {
            text: '日登陆数'
          },
          // x轴是类目轴（离散数据）,必须通过data设置类目数据
          xAxis: {
            type: 'category',
            data: this.dateList
          },
          // y轴是数据轴（连续数据）
          yAxis: {
            type: 'value'
          },
          // 系列列表。每个系列通过 type 决定自己的图表类型
          series: [{
            // 系列中的数据内容数组
            data: this.loginList,
            // 折线图
            type: 'line'
          }]
        };
        var registerOption = {
          title: {
            text: '日注册人数'
          },
          // x轴是类目轴（离散数据）,必须通过data设置类目数据
          xAxis: {
            type: 'category',
            data: this.dateList
          },
          // y轴是数据轴（连续数据）
          yAxis: {
            type: 'value'
          },
          // 系列列表。每个系列通过 type 决定自己的图表类型
          series: [{
            // 系列中的数据内容数组
            data: this.registerList,
            // 折线图
            type: 'line'
          }]
        };
        var courseOption = {
          title: {
            text: '日新增课程数'
          },
          // x轴是类目轴（离散数据）,必须通过data设置类目数据
          xAxis: {
            type: 'category',
            data: this.dateList
          },
          // y轴是数据轴（连续数据）
          yAxis: {
            type: 'value'
          },
          // 系列列表。每个系列通过 type 决定自己的图表类型
          series: [{
            // 系列中的数据内容数组
            data: this.courseList,
            // 折线图
            type: 'line'
          }]
        };

        this.viewChart.setOption(viewOption);
        this.loginChart.setOption(loginOption);
        this.registerChart.setOption(registerOption);
        this.courseChart.setOption(courseOption);
      }
    }


  }
</script>

<style scoped>

</style>
