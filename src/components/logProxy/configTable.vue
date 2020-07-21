<template>
  <el-table border
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="接口地址"
      prop="sourceUrl">
    </el-table-column>
    <el-table-column
      label="目标地址"
      prop="targetUrl">
    </el-table-column>
    <el-table-column
      label="是否启用"
      prop="enable">
    </el-table-column>
    <el-table-column
      label="是否自定义请求"
      prop="requestParams">
    </el-table-column>
    <el-table-column
      label="是否自定义响应"
      prop="responseResult">
    </el-table-column>
    <el-table-column
      label="自定义请求参数"
      prop="reqParams">
    </el-table-column>
    <el-table-column
      label="自定义响应结果"
      prop="respResult">
    </el-table-column>
    <el-table-column
      label="操作"
      align="center">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        pageNo: 1,
        tableData: []
      }
    },
    activated() {
      this.initTableData();
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      initTableData(){
        this.$axios.get("/auto/proxy/config/list",{
          params:{
            pageNo : 1
          }
        }).then(res =>{
          if(res.success){
            this.tableData = res.data;
          }
        })
      }
    },
  }
</script>