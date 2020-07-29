<template>
  <div class="app-container">
    <el-form :inline="true" :model="courseQuery" class="demo-form-inline">

      <el-form-item label="课程名称">
        <el-input v-model="courseQuery.title" placeholder="课程名称"></el-input>
      </el-form-item>
      <el-form-item label="最高价">
        <el-input v-model="courseQuery.maxPrice" placeholder="课程名称"></el-input>
      </el-form-item>
      <el-form-item label="最低价">
        <el-input v-model="courseQuery.minPrice" placeholder="课程名称"></el-input>
      </el-form-item>
      <!-- 课程讲师  -->
      <el-form-item label="课程讲师">
        <el-select
          v-model="courseQuery.teacherId"
          placeholder="请选择">
          <el-option
            v-for="teacher in teacherList"

            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"/>
        </el-select>
      </el-form-item>

      <el-form-item label="一级分类">
        <el-select
          @change="subjectLevelOneChanged"
          v-model="courseQuery.subjectParentId"
          placeholder="请选择">
          <el-option
            v-for="subject in subjectNestedList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"/>
        </el-select>
      </el-form-item>

      <el-form-item label="二级分类">
        <!-- 二级分类 -->
        <el-select v-model="courseQuery.subjectId" placeholder="请选择">
          <el-option
            v-for="subject in subSubjectList"
            :key="subject.value"
            :label="subject.title"
            :value="subject.id"/>
        </el-select>


      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="default" @click="resetData">清空</el-button>
      </el-form-item>

    </el-form>

    <!-- 表格 -->
    <el-table

      :data="list"

      border
      fit
      highlight-current-row>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="课程名称"/>

      <el-table-column prop="price" label="价格"/>


      <el-table-column prop="description" label="简介"/>

      <el-table-column prop="lessonNum" label="课时数"/>

      <el-table-column prop="subjectParentName" label="一级分类"></el-table-column>
      <el-table-column prop="subjectName" label="二级分类"></el-table-column>


      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/course/info/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>

          <el-button type="danger" size="mini" icon="el-icon-delete"
                     @click="removeCourseById(scope.row.id,scope.row.title)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />

  </div>
</template>


<script>
  import teacher from '@/api/edu/teacher'
  import course from '@/api/edu/course'
  import subject from "@/api/edu/subject";

  export default {
    name: "list",
    data() {
      return {
        list: null,//课程数据
        total: 0,//总记录数
        page: 1,//当前页
        limit: 10,//每页记录数
        subjectIdbak: '',
        subjectNestedList: [],//一级分类列表
        subSubjectList: [],//二级分类列表
        teacherList: [],
        courseQuery: {
          //条件封装对象
          subjectId: '',
          subjectParentId: '',
        },


      }
    },
    created() {
      this.getOneSubjectList();
      this.getTeacherList();
      this.getList();
    },
    methods: {
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

      //当选择一级分类的时候，就触发这个方法
      subjectLevelOneChanged(value) {

        console.log("执行了subjectLevelOneChanged");
        for (let i = 0; i < this.subjectNestedList.length; i++) {
          if (this.subjectNestedList[i].id === value) {
            this.subSubjectList = this.subjectNestedList[i].children
            this.courseQuery.subjectId = ''
          }
        }
        this.courseQuery.subjectId = this.subjectIdbak;

      },

      subjectLevelTwoChanged(value) {

        console.log("执行了subjectLevelTwoChanged---:" + value);
        console.log("此时courseQuery.subjectId:" + this.courseQuery.subjectId);

        this.courseQuery.subjectId = value;
      },

      //获取课程数据
      getList(page = 1) {
        this.page = page;
        course.getCourseListPage(this.page, this.limit, this.courseQuery)
          .then(resopnse => {
            if (resopnse.code == 20000) {
              //请求成功
              this.total = resopnse.data.total;
              this.list = resopnse.data.items;

            } else {
              this.$message({
                type: "error",
                message: "出现错误，查询数据失败"
              });
            }


          })
          .catch(error => {

            this.$message({
              type: "error",
              message: "出现错误，查询数据失败，error：" + error
            });

          });
      },

      //提交查询
      onSubmit() {
        this.getList(1);
      },

      //清空条件查询框数据
      resetData() {

        this.courseQuery = {
          subjectId: '',
          subjectParentId: ''
        };
        this.getList(1);
      },


      //获取讲师数据
      getTeacherList() {

        teacher.getAllTeacher().then(
          result => {

            this.teacherList = result.data.items;
          }
        );
      },

      //删除课程
      removeCourseById(courseId, name) {

        this.$confirm(`真的要删除课程：${name}吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {


          course.removeCourseById(courseId).then(
            response => {
              if (response.code == 20000) {
                this.getList();
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              } else {
                this.$message({
                  type: 'error',
                  message: '删除失败'
                });
              }


            }
          ).catch(
            error => {
              console.log(JSON.stringify(error));

            }
          );


        });


      },


    }


  }
</script>

<style scoped>

</style>
