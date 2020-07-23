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
        <tinymce :height="300" v-model="courseInfo.description"/>
      </el-form-item>


      <!-- 课程封面  -->

      <el-form-item label="课程封面">

        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API+'/eduoss/fileoss/uploadAvatar'"
          class="avatar-uploader">
          <img :src="courseInfo.cover">
        </el-upload>

      </el-form-item>


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
  import Tinymce from '@/components/Tinymce'

  export default {

    components: {Tinymce},

    name: "info",
    data() {
      return ({
        saveBtnDisabled: false,
        teacherList: [],
        BASE_API: process.env.BASE_API,
        courseId:'',
        subjectIdbak:'',
        courseInfo: {
          title: '',
          subjectId: '',
          subjectParentId: '',
          teacherId: '',
          lessonNum: 0,
          description: '',
          cover: 'https://online-tyl-edu.oss-cn-shenzhen.aliyuncs.com/2020/07/21/184d2bc6b81746b2846b2355963a806cu=3561855691,1585773787&fm=26&gp=0.jpg',
          price: 0,
        },

        subjectNestedList: [],//一级分类列表
        subSubjectList: []//二级分类列表

      })
    },
    created() {
      this.getOneSubjectList();
      if (this.$route.params && this.$route.params.id) {
        this.courseId = this.$route.params.id;

        this.getCourseInfoById(this.courseId);

      }


      this.getTeacherList();

    },

    methods: {
      //上传成功
      handleAvatarSuccess(res, file) {
        //得到文件地址
        this.courseInfo.cover = res.data.url;
      },
      //上传之前
      beforeAvatarUpload(file) {
        //规定文件类型和文件大小

        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },

      //当选择一级分类的时候，就触发这个方法
      subjectLevelOneChanged(value) {


        for (let i = 0; i < this.subjectNestedList.length; i++) {
          if (this.subjectNestedList[i].id === value) {
            this.subSubjectList = this.subjectNestedList[i].children
            this.courseInfo.subjectId = ''
          }
        }
        this.courseInfo.subjectId=this.subjectIdbak;

      },

      //根据ID查询课程信息
      getCourseInfoById(id){
        course.getCourseInfoById(id).then(
          result => {

            this.courseInfo=result.data.courseInfo;
            this.subjectIdbak=result.data.courseInfo.subjectId;
            console.log("课程简介数据："+this.courseInfo.description);

            this.subjectLevelOneChanged(this.courseInfo.subjectParentId);// 手动触发 二级分类选择方法
          }
        );
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
        console.log("this.courseId="+this.courseId);
        if (this.courseId!==''){

          //id有值，应当是第一次编写
          course.updateCourseInfo(this.courseInfo,this.courseId).then(
            result => {
              if (result.code==20000){

                this.$message({
                  type: "success",
                  message: "课程信息修改成功"

                });
                this.$router.push(({path: `/course/chapter/${this.courseId}`}))
              }
            }
          );

        }else {
          //id无值，应当是修改数据
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
        }

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
  .tinymce-container {
    line-height: 29px;
  }
</style>
