<template>
  <el-card class="table-card">
    <el-table border
      @cell-dblclick="celldblclick"
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
        :show-overflow-tooltip="true"
        prop="reqParams">
      </el-table-column>
      <el-table-column
        label="自定义响应结果"
        :show-overflow-tooltip="true"
        prop="respResult">
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        width="160"
        align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
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
  // import { mapState, mapMutations, mapGetters } from 'vuex';
  export default {
    components: {
      tablePagination,
    },
      data() {
        return {
          currentPage: 1,
          pageSize: 10,
          total: 1,
          pageNo: 1,
          tableData: [],
          // sourceUrl:'',
          // targetUrl:''
          formInline: {
                    sourceUrl: '',
                    targetUrl: ''
                } 
        }
      },
    // computed: mapState({
    //     configList: state => state.proxyConfig.configList,
    //     tableDataReload: state => state.proxyConfig.tableDataReload
    // }),
    // computed:{
    //     ...mapState({
    //         configList: state => state.proxyConfig.configList,
    //         tableDataReload: state => state.proxyConfig.tableDataReload
    //     }),
    //     ...mapGetters('proxyConfig',{
    //         configList1: 'doneConfigList',
    //     })
    // },
    activated() {
        this.initTableData();
    },
    // watch: {
    //   configList: function (tableDataReload) {
    //   // 检查是否需要刷新页面
    //   if (tableDataReload) {
    //     this.initTableData(),
    //     // 重新将刷新设为false
    //     // this.$store.dispatch('proxyConfig/setReload')
    //     this.setTableDataReload()
    //   }
    // }
    // },
    methods: {
        // 添加mutations方法映射
        // ...mapMutations(['setTableDataReload']),
        handleEdit(index, row) {
          this.$newDialog({
            data: {
               row:row,callback:this.updateConfig
            }
          }
          )
        },
        handleDelete(index, row) {
          this.$confirm('确定要删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.delete(process.env.VUE_APP_API_LOG+"/proxy/config/del",{
                  params:{
                    id : row.id,
                  }}).then(res =>{
                    if(res.success){
                      this.initTableData();
                    }
                  })
               }).catch(() => {
                this.$info('已取消删除');
            });   
        },
        initTableData(){
          this.$axios.get(process.env.VUE_APP_API_LOG+"/proxy/config/list",{
            params:{
              pageNo : this.currentPage,
              pageSize : this.pageSize,
              sourceUrl : this.formInline.sourceUrl,
              targetUrl : this.formInline.targetUrl
            }
          }).then(res =>{
            if(res.success){
              this.tableData = res.data.list;
              this.total = res.data.total;
              this.pageNo = res.data.pageNo;
            }
          })
        },
        //双击复制内容
        celldblclick (row, column) {
            this.$copyText(row[column.property]).then(e=> {
                console.log(e)
                this.onCopy()
            }, function (e) {
                console.log(e)
                this.onError()
            })
        },
        onCopy() {
            this.$notify({title: '成功', message: '复制成功！', type: 'success', offset: 50, duration: 800})
        },
        onError() {
            this.$notify({title: '失败', message: '复制失败！', type: 'error', offset: 50, duration: 800})
        },
        monitoring() { // 监听事件
          this.$on('queryMethod', (res) => {
              this.formInline.sourceUrl = res.sourceUrl;
              this.formInline.targetUrl = res.targetUrl;
              this.initTableData();
          })
        },
        updateConfig() {
          this.initTableData();
        }
      },
      mounted: function () {
        this.monitoring() // 注册监听事件
    },
  }
</script>
<style lang="sass" scoped>

</style>