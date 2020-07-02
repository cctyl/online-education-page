<template>
  <div class="app-container">
    讲师列表
    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
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

      <el-table-column prop="name" label="名称" width="80"/>


      <el-table-column label="头衔" width="80">
      <template slot-scope="scope">
        {{ scope.row.level===1?'高级讲师':'首席讲师' }}
      </template>
    </el-table-column>

      <el-table-column prop="intro" label="资历"/>

      <el-table-column prop="gmtCreate" label="添加时间" width="160"/>

      <el-table-column prop="sort" label="排序" width="60"/>

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/edu/teacher/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>

          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>


<script>
  import teacher from '@/api/edu/teacher'

  export default {
    name: "list",
    data() {
      return {
        list: null,//讲师数据
        total: 0,//总记录数
        page: 1,//当前页
        limit: 10,//每页记录数
        teacherQuery: {
          //条件封装对象
        }


      }
    },
    created() {
      this.getList();
    },
    methods: {
      //创建具体的方法，调用teacher.js中定义的方法
      getList() {

        teacher.getTeacherListPage(this.page, this.limit, this.teacherQuery)
          .then(resopnse => {
            //请求成功
            this.total = resopnse.data.total;
            this.list = resopnse.data.items;
            console.log(JSON.stringify(resopnse));

          })
          .catch(error => {
            //请求失败
            console.log(JSON.stringify(error));
          });
      }

    }


  }
</script>

<style scoped>

</style>
