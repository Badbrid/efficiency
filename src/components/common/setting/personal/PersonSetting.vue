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

            <!--Modify personal details-->
            <el-dialog title="编辑个人信息" :visible.sync="updateVisible" width="30%"
                    :destroy-on-close="true" @close="handleClose">
                <el-form :model="form" label-position="right" label-width="100px" size="small" :rules="rule"
                        ref="updateUserForm">
                    <el-form-item label="ID" prop="id">
                        <el-input v-model="form.id" autocomplete="off" :disabled="true"/>
                    </el-form-item>
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="form.name" autocomplete="off"/>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="form.email" autocomplete="off"/>
                    </el-form-item>
                    <el-form-item label="电话" prop="phone">
                        <el-input v-model="form.phone" autocomplete="off"/>
                    </el-form-item>
                </el-form>
                <template v-slot:footer>
                    <el-button @click="closeDialog('updateUserForm')">取消</el-button>
                    <el-button type="primary" @click="updateUser('updateUserForm')">确定</el-button>
                </template>
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
            updatePersonal: '/user/update/personal',
            tableData: [],
            editPasswordVisible : false,
            ruleForm: {},
            form:{},
            updateVisible: false,
            rule: {
                name: [
                    {required: true, message: '请输入用户姓名', trigger: 'blur'},
                    {min: 2, max: 10, message: '长度在 {2} 到 {50} 个字符', trigger: 'blur'},
                        {
                        required: true,
                        pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
                        message: '格式错误(不支持特殊字符，且不能以\'-\'开头结尾)',
                        trigger: 'blur'
                        }
                ],
                phone: [
                    {
                    required: false,
                    pattern: '^1(3|4|5|7|8)\\d{9}$',
                    message: '手机号码格式不正确',
                    trigger: 'blur'
                    }
                ],
                email: [
                    {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {
                        required: true,
                        pattern: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9]+\.)+[A-Za-z]{2,6}$/,
                        message: '邮箱格式不正确',
                        trigger: 'blur'
                        }
                ],
            }
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
            this.updateVisible = true;
            this.form = row;
        },
        editPassword(row) {
            this.editPasswordVisible = true;
        },
        closeDialog(updateUserForm){
            this.updateVisible = false;
            this.$refs[updateUserForm].resetFields();
        },
        handleClose(){

        },
        updateUser(updateUserForm){
            this.$refs[updateUserForm].validate((valid) =>{
                if(valid){
                    this.$axios.post(process.env.VUE_APP_API_SYS+this.updatePersonal,this.form).then(res =>{
                        if(res.success){
                            this.$success('修改个人信息成功');
                            this.updateVisible = false;
                            this.initTableData();
                            this.$refs[updateUserForm].resetFields();
                        }
                    })
                }
            })
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
