<template>
  <div class="app-container">
    <el-form :inline="true" :model="teacherQuery" class="demo-form-inline">

      <el-form-item label="名称">
        <el-input v-model="teacherQuery.name" placeholder="名称"></el-input>
      </el-form-item>

      <el-form-item label="级别">
        <el-select v-model="teacherQuery.level" placeholder="级别">
          <el-option label="首席讲师" value="2"></el-option>
          <el-option label="高级讲师" value="1"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择开始日期" v-model="teacherQuery.begin"
                          style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择结束日期" v-model="teacherQuery.end"
                          style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
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

  export default {
    name: "list",
    data() {
      return {
        list: null,//讲师数据
        total: 0,//总记录数
        page: 1,//当前页
        limit: 5,//每页记录数

        teacherQuery: {
          //条件封装对象
          name: '',
          level: '',
          begin: null, //开始日期
          end: null, //结束日期
        },



      }
    },
    created() {
      this.getList();
    },
    methods: {
      //创建具体的方法，调用teacher.js中定义的方法

      getList(page = 1) {
        this.page = page;
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
      },

      onSubmit(){
        this.getList(1);
      }

    }


  }
</script>

<style scoped>

</style>
