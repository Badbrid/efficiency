<template>
    <el-card class="table-card">
        <el-table
            :data="tableData"
            border
            @cell-dblclick="celldblclick"
            style="width: 100%">
            <el-table-column
            prop="deviceId"
            label="设备Id"
            :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
            prop="sourceUrl"
            label="接口地址"
            :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
            prop="header"
            label="请求头"
            :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
            prop="requestPlaintext"
            label="请求参数明文"
            :show-overflow-tooltip="true"
            >
            <template slot-scope="scope">
                <span>{{scope.row.requestPlaintext | ellipsis3}}</span>
            </template>
            </el-table-column>
            <el-table-column
            prop="requestCiphertext"
            label="请求参数密文"
            :show-overflow-tooltip="true"
            >
            <template slot-scope="scope">
                <span>{{scope.row.requestCiphertext | ellipsis}}</span>
            </template>
            </el-table-column>
            <el-table-column
            prop="responsePlaintext"
            label="响应数据明文"
            :show-overflow-tooltip="true"
            >
            <template slot-scope="scope">
                <span>{{scope.row.responsePlaintext | ellipsis2}}</span>
            </template>
            </el-table-column>
            <el-table-column
            prop="responseCiphertext"
            label="响应数据密文"
            :show-overflow-tooltip="true"
            >
            <template slot-scope="scope">
                <span>{{scope.row.responseCiphertext | ellipsis}}</span>
            </template>
            </el-table-column>
            <el-table-column
            prop="requestTime"
            label="请求时间"
            >
            </el-table-column>
            <el-table-column
            prop="responseTime"
            label="响应时间"
            >
            </el-table-column>
        </el-table>
        <tablePagination :change="initLogTable" :current-page.sync="currentPage" :page-size.sync="pageSize" :total="total"/>
    </el-card>
</template>

<script>
    import tablePagination from '../common/pagination/TablePagination';
    export default {
        components: {
            tablePagination
        },
        filters: {
            ellipsis(value) {
                if (!value) return "";
                if (value.length > 4000) {
                return value.slice(0, 4000) + "...";
                }
                return value;
            },
            ellipsis2(value) {
                if (!value) return "";
                if (value.length > 4000) {
                return value.slice(0, 4000) + "...";
                }
                return value;
            },
            ellipsis3(value) {
                if (!value) return "";
                if (value.length > 4000) {
                return value.slice(0, 4000) + "...";
                }
                return value;
            }
        },
        data() {
            return {
                currentPage: 1,
                pageSize: 10,
                total: 1,
                pageNo: 1,
                tableData: [],
                formInlog: {
                    startDate: '',
                    endDate: '',  
                    sourceUrl: '',
                    targetUrl: '',
                    requestPlaintext: ''
                }
            }
        },
        activated() {
            this.initLogTable();
        },
        methods: {
            initLogTable() {
                this.$axios.get(process.env.VUE_APP_API_LOG+'/proxy/log/list',{
                    params:{
                        pageNo: this.currentPage,
                        pageSize: this.pageSize,
                        startDate: this.formInlog.startDate,
                        endDate: this.formInlog.endDate,
                        sourceUrl: this.formInlog.sourceUrl,
                        targetUrl: this.formInlog.targetUrl,
                        requestPlaintext: this.formInlog.requestPlaintext
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
            updataLogTable(formInlog) {
                this.formInlog = formInlog;
                console.log(this.formInlog);
                this.initLogTable();
            }

        }
    }
</script>
<style lang="scss">
.el-tooltip__popper{max-width: 80%;}
.el-notification{
  position: fixed;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
}

.el-notification.right{
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
}

.el-notification.left{
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
}
@keyframes notify {
  from {
    top: calc(50% - 300px);
  }
  to {
    top: 50% ;
  }
}
</style>