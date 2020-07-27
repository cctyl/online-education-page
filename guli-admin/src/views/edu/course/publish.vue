<template>
  <div class="app-container">

    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="3" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="提交审核"/>
    </el-steps>


    <div class="ccInfo">
      <img :src="coursePublish.cover">
      <div class="main">
        <h2>{{ coursePublish.title }}</h2>
        <p class="gray"><span>共{{ coursePublish.lessonNum }}课时</span></p>
        <p><span>所属分类：{{ coursePublish.subjectParentName }} — {{ coursePublish.subjectName }}</span></p>
        <p>课程讲师：{{ coursePublish.teacherName }}</p>

        <h3 class="red">￥{{ coursePublish.price }}</h3>
      </div>
    </div>

    <div>
      <el-button @click="previous">返回修改</el-button>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="publishCourse">发布课程</el-button>
    </div>

  </div>
</template>

<script>

  import courseApi from "@/api/edu/course.js";
  export default {
    name: "publish",
    data() {
      return ({
        saveBtnDisabled: false ,// 保存按钮是否禁用
        courseId: '',
        coursePublish:{

        },
      })
    },
    created() {
      if (this.$route.params && this.$route.params.id) {
        this.courseId = this.$route.params.id;
        this.getCourseInfo();

      }

    },
    methods: {
      previous() {
        this.$router.push(({path: '/course/chapter/1'}))
      },




      //获取课程确认信息
      getCourseInfo(){
        console.log("getCourseInfo--课程id是："+this.courseId);
        courseApi.getPublishCourseInfoById(this.courseId).then(
          result => {
            if (result.code==20000){

              this.coursePublish = result.data.courseInfo;

            }else {
              this.$message({
                type: "error",
                message: "出现错误："+result.message
              });
            }


          }
        ).catch(
          reason => {

            this.$message({
              type: "error",
              message: "出现严重错误："+reason
            });
          }
        );
      },


      //课程的最终发布
      publishCourse(){
        courseApi.publishCourseInfoById(this.courseId).then(
          result => {
            if (result.code==20000){

              this.$router.push({ path: '/course/list' })
            }else {
              this.$message({
                type: "error",
                message: "出现错误："+result.message
              });
            }


          }
        ).catch(
          reason => {

            this.$message({
              type: "error",
              message: "出现严重错误："+reason
            });
          }
        );

      },

    }

  }
</script>

<style scoped>
  .ccInfo {
    background: #f5f5f5;
    padding: 20px;
    overflow: hidden;
    border: 1px dashed #DDD;
    margin-bottom: 40px;
    position: relative;
  }
  .ccInfo img {
    background: #d6d6d6;
    width: 500px;
    height: 278px;
    display: block;
    float: left;
    border: none;
  }
  .ccInfo .main {
    margin-left: 520px;
  }

  .ccInfo .main h2 {
    font-size: 28px;
    margin-bottom: 30px;
    line-height: 1;
    font-weight: normal;
  }
  .ccInfo .main p {
    margin-bottom: 10px;
    word-wrap: break-word;
    line-height: 24px;
    max-height: 48px;
    overflow: hidden;
  }

  .ccInfo .main p {
    margin-bottom: 10px;
    word-wrap: break-word;
    line-height: 24px;
    max-height: 48px;
    overflow: hidden;
  }
  .ccInfo .main h3 {
    left: 540px;
    bottom: 20px;
    line-height: 1;
    font-size: 28px;
    color: #d32f24;
    font-weight: normal;
    position: absolute;
  }
</style>
