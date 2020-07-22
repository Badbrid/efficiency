<template>
  <el-card class="table-card">
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
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.enable }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="是否自定义请求"
        prop="requestParams">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.requestParams }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="是否自定义响应"
        prop="responseResult">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.responseResult }}</span>
        </template>
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
    <tablePagination :change="initTableData" :current-page.sync="currentPage" :page-size.sync="pageSize" :total="total"/>
  </el-card>                           
</template>

<script>
  import tablePagination from '../common/pagination/TablePagination';
  export default {
    components: {
      tablePagination,
    },
    data() {
      return {
        currentPage: 1,
        pageSize: 5,
        total: 1,
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
            pageNo : this.currentPage,
            pageSize : this.pageSize,
          }
        }).then(res =>{
          if(res.success){
            this.tableData = res.data.list;
            this.total = res.data.total;
            // this.pageSize = res.data.pageSize;
            this.pageNo = res.data.pageNo;
            // this.currentPage = res.data.page;
          }
        })
      }
    },
  }
</script>