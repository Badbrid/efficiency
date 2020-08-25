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

            <!--Changing user password in personal settings-->
            <el-dialog title="修改密码" :visible.sync="editPasswordVisible" width="30%" left>
                <el-form :model="ruleForm" label-position="right" label-width="120px" size="small" 
                        ref="editPasswordForm" class="demo-ruleForm">
                    <el-form-item label="旧密码" prop="password" style="margin-bottom: 29px"
                        :rules="[{required: true, message: '请输入旧密码', trigger: 'blur'}]">
                        <el-input v-model="ruleForm.password" autocomplete="off" show-password/>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newpassword"
                        :rules="[
                            {required: true, message: '请输入新密码', trigger: 'blur'},
                            {
                                required: true,
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/,
                                message: '有效密码：8-16位，英文大小写字母+数字+特殊字符（可选）',
                                trigger: 'blur'
                            }
                        ]">
                        <el-input type="password" v-model="ruleForm.newpassword" autocomplete="off" show-password></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="editPasswordVisible = false">取消</el-button>
                    <el-button type="primary" @click="editUserPassword('editPasswordForm')">确定</el-button>
                </div>
            </el-dialog>
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
            updatePasswordPath: '/user/update/password',
            tableData: [],
            editPasswordVisible : false,
            ruleForm: {}
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
            this.editPasswordVisible = true;
        },
        editUserPassword(editPasswordForm){
            this.$refs[editPasswordForm].validate((valid) =>{
                if(valid){
                    this.$axios.post(process.env.VUE_APP_API_SYS+this.updatePasswordPath,this.ruleForm).then(res =>{
                        if(res.success){
                            this.$success('修改密码成功');
                            this.editPasswordVisible = false;
                            this.$refs[editPasswordForm].resetFields();
                        }
                    })
                }
            })
        }
    }
}
</script>
<style>
</style>
