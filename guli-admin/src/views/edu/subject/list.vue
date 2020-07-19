<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;"/>

    <el-tree
      ref="tree2"
      :data="data2"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />

  </div>
</template>

<script>
  import subject from "@/api/edu/subject"
  export default {
    name: "list",
    data() {
      return {
        filterText: '',
        data2: [],
        defaultProps: {
          children: 'children', //与data2中的属性一一对应
          label: 'title'
        }
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val)
      }
    },
    created() {
      this.getAllSubjectInfo();
    },

    methods: {
      //检索 节点名
      filterNode(value, data) {
        if (!value) return true
        return data.title.indexOf(value) !== -1
      },
      getAllSubjectInfo(){

        subject.getAllSubject().then(
          result => {
            console.log(JSON.stringify(result));
            this.data2= result.data.list;
          }
        ).catch(

        );
      }
    }
  }
</script>

<style scoped>

</style>
