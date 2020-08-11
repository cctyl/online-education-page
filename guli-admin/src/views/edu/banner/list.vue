<template>
  <div class="app-container">


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

      <el-table-column prop="title" label="标题" />




      <el-table-column prop="imageUrl" label="图片链接"  width="400"/>
      <el-table-column prop="linkUrl" label="跳转链接"/>

      <el-table-column prop="gmtCreate" label="添加时间" />

      <el-table-column prop="sort" label="排序" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/banner/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>

          <el-button type="danger" size="mini" icon="el-icon-delete"
                     @click="removeBannerById(scope.row.id,scope.row.title)">删除
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
  import bannerApi from '@/api/edu/banner.js'

  export default {
    name: "list",
    data() {
      return {
        list: null,//讲师数据
        total: 0,//总记录数
        page: 1,//当前页
        limit: 10,//每页记录数





      }
    },
    created() {
      this.getList();
    },
    methods: {
      //创建具体的方法，调用teacher.js中定义的方法

      //获取讲师数据
      getList(page = 1) {
        this.page = page;
        bannerApi.getBannerListPage(this.page, this.limit)
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




      //删除讲师
      removeBannerById(bannerId, title) {

        this.$confirm(`真的要删除banner：${title}吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {


          bannerApi.removeBannerById(bannerId).then(
            response => {
              console.log(JSON.stringify(response));
              this.getList();

            }
          ).catch(
            error => {
              console.log(JSON.stringify(error));

            }
          );

          this.$message({
            type: 'success',
            message: '删除成功!'
          });

        });


      },


    }


  }
</script>

<style scoped>

</style>
