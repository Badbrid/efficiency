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
          type="text"
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
        this.$prompt('请输入邮箱', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的邮箱是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
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