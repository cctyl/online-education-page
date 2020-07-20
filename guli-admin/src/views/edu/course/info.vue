<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="最终发布"/>
    </el-steps>

    <el-form label-width="120px">

      <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"/>
      </el-form-item>

      <!-- 所属分类  -->
      <!-- 一级分类 -->
      <el-form-item label="课程类别">
        <el-select
          @change="subjectLevelOneChanged"
          v-model="courseInfo.subjectParentId"
          placeholder="请选择">
          <el-option
            v-for="subject in subjectNestedList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"/>
        </el-select>

        <!-- 二级分类 -->
        <el-select v-model="courseInfo.subjectId" placeholder="请选择">
          <el-option
            v-for="subject in subSubjectList"
            :key="subject.value"
            :label="subject.title"
            :value="subject.id"/>
        </el-select>
      </el-form-item>


      <!-- 课程讲师  -->
      <el-form-item label="课程讲师">
        <el-select
          v-model="courseInfo.teacherId"
          placeholder="请选择">
          <el-option
            v-for="teacher in teacherList"

            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"/>
        </el-select>
      </el-form-item>


      <el-form-item label="总课时">
        <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数"/>
      </el-form-item>

      <!-- 课程简介  -->
      <el-form-item label="课程简介">
        <el-input v-model="courseInfo.desc" placeholder="课程介绍"/>
      </el-form-item>


      <!-- 课程封面 TODO -->


      <el-form-item label="课程价格">
        <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="免费课程请设置为0元"/>
        元
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存并下一步</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import course from '@/api/edu/course'
  import teacher from "@/api/edu/teacher";
  import subject from "@/api/edu/subject";

  export default {
    name: "info",
    data() {
      return ({
        saveBtnDisabled: false,
        teacherList: [],

        courseInfo: {
          title: '',
          subjectId: '',
          subjectParentId: '',
          teacherId: '',
          lessonNum: 0,
          description: '',
          cover: '',
          price: 0,
        },

        subjectNestedList: [],//一级分类列表
        subSubjectList: []//二级分类列表

      })
    },
    created() {
      this.getTeacherList();
      this.getOneSubjectList();
    },
    methods: {
      //当选择一级分类的时候，就触发这个方法
      subjectLevelOneChanged(value) {
        console.log(value)
        for (let i = 0; i < this.subjectNestedList.length; i++) {
          if (this.subjectNestedList[i].id === value) {
            this.subSubjectList = this.subjectNestedList[i].children
            this.courseInfo.subjectId = ''
          }
        }
      },

      //获取一级分类数据
      getOneSubjectList() {

        subject.getAllSubject().then(
          result => {
            this.subjectNestedList = result.data.list;
          }
        ).catch(
          result => {
            console.log(result);
          }
        );
      },
      saveOrUpdate() {

        course.saveCourse(this.courseInfo).then(
          result => {
            if (result.code == 20000) {
              var id = result.data.id;
              this.$message({
                type: "success",
                message: "课程信息添加成功"

              });
              this.$router.push(({path: `/course/chapter/${id}`}))
            } else {

              this.$message({
                type: "error",
                message: "添加失败"

              });


            }

          }
        );
      },

      //获取讲师数据
      getTeacherList() {

        teacher.getAllTeacher().then(
          result => {

            this.teacherList = result.data.items;
          }
        );
      }
    }
  }
</script>

<style scoped>

</style>
