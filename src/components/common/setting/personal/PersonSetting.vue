<template>
    <div >
        <el-card class="table-card" >
            <template v-slot:header>
                <div>
                    <el-row type="flex" justify="space-between" align="middle">
                        <span class="title">个人信息</span>
                    </el-row>
                </div>
            </template>

            <!--Personal information menu-->
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="id" label="ID"/>
                <el-table-column prop="name" label="姓名"/>
                <el-table-column prop="email" label="邮箱"/>
                <el-table-column prop="phone" label="电话"/>
                <el-table-column prop="createTime" label="创建时间">
                    <template v-slot:default="scope">
                        <span>{{ scope.row.createTime | timestampFormatDate }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template v-slot:default="scope">
                        <effic-table-operator-button tip="编辑信息" icon="el-icon-edit"
                                                type="primary" @exec="edit(scope.row)"/>
                        <effic-table-operator-button tip="修改密码" icon="el-icon-s-tools"
                                                type="success" @exec="editPassword(scope.row)"/>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>
<script>
import { getCurrentUser } from '../../../../utils/utils';
import EfficTableOperatorButton from '../../button/EfficTableOperatorButton';
export default {
    components: {EfficTableOperatorButton},
    data() {
        return {
            tableData: [],
        }
    },
    activated() {
        this.initTableData();
    },
    methods: {
        initTableData() {
            this.$axios.get(process.env.VUE_APP_API_SYS+"/user/info/"+this.currentUser().id).then(res =>{
                let dataList = [];
                dataList[0] = res;
                this.tableData = dataList;
                console.log(this.tableData)
            })
        },
        currentUser: () => {
            return getCurrentUser();
        },
        edit(row) {
            
        },
        editPassword(row) {
            
        },
    }
}
</script>
<style>
</style>
