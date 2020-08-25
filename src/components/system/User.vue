<template>
    <div>
        <el-card class="table-card">
            <template v-slot:header>
                <effic-table-header :condition.sync="condition" @search="search" @create="create"
                                create-tip="创建用户" title="用户"/>
            </template>

            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="id" label="ID"/>
                <el-table-column prop="name" label="姓名" width="200"/>
                <el-table-column label="角色" width="120">
                    <template v-slot:default="scope">
                        <el-tag type="primary" effect="dark" size="mini">{{scope.row.roleName}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="email" label="邮箱"/>
                <el-table-column prop="status" label="状态" width="120">
                    <template v-slot:default="scope">
                        <el-switch v-model="scope.row.status"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                active-value="1"
                                inactive-value="0"
                                @change="changeSwitch(scope.row)"
                        />
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间">
                    <template v-slot:default="scope">
                        <span>{{ scope.row.createTime | timestampFormatDate }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template v-slot:default="scope">
                        <effic-table-operator @editClick="edit(scope.row)" @deleteClick="del(scope.row)">
                            <template v-slot:behind>
                                <effic-table-operator-button tip="修改密码" icon="el-icon-s-tools"
                                                        type="success" @exec="editPassword(scope.row)"/>
                            </template>
                        </effic-table-operator>
                    </template>
                </el-table-column>
            </el-table>
            <tablePagination :change="search" :current-page.sync="currentPage" :page-size.sync="pageSize" :total="total"/>
        </el-card>

        <!--Create user-->
        <el-dialog title="创建用户" :visible.sync="createVisible" width="35%" @closed="handleClose"
                :destroy-on-close="true">
            <el-form :model="form" label-position="right" label-width="120px" size="small" :rules="rule" ref="createUserForm">
                <el-form-item label="ID" prop="id">
                <el-input v-model="form.id" autocomplete="off" placeholder="请输入ID (只支持数字、英文字母)"/>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name" autocomplete="off" placeholder="请输入用户姓名"/>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email" autocomplete="off" placeholder="请输入邮箱"/>
                </el-form-item>
                <el-form-item label="电话" prop="phone">
                <el-input v-model="form.phone" autocomplete="off" placeholder="请输入电话号码"/>
                </el-form-item>
                <el-form-item label="密码" prop="password" style="margin-bottom: 29px">
                <el-input v-model="form.password" autocomplete="new-password" show-password
                            placeholder="请输入密码"/>
                </el-form-item>
                <el-form-item label="角色" :label-width="formLabelWidth" prop="roles" 
                    :rules="{required: true, message: '请选择角色', trigger: 'change'}">
                    <el-select v-model="form.roles" placeholder="请选择角色" >
                        <el-option
                            v-for="item in userRole"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="createVisible = false">取消</el-button>
                <el-button type="primary" @click="createConfig('createUserForm')">确定</el-button>
            </div>
        </el-dialog>

        <!--Modify user-->
        <el-dialog title="修改用户" :visible.sync="updateVisible" width="35%" @closed="handleClose"
                :destroy-on-close="true">
            <el-form :model="form" label-position="right" label-width="120px" size="small" :rules="rule" ref="updateUserForm">
                <el-form-item label="ID" prop="id">
                    <el-input v-model="form.id" autocomplete="off" placeholder="请输入ID (只支持数字、英文字母)"/>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name" autocomplete="off" placeholder="请输入用户姓名"/>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email" autocomplete="off" placeholder="请输入邮箱"/>
                </el-form-item>
                <el-form-item label="电话" prop="phone">
                    <el-input v-model="form.phone" autocomplete="off" placeholder="请输入电话号码"/>
                </el-form-item>
                <!-- <div v-for="(rol, index) in form.role" :key="index"> -->
                    <el-form-item label="角色" prop="role"
                        :rules="{
                        required: true,
                        message: '请选择角色',
                        trigger: 'change'
                        }">
                        <el-select v-model="form.role.id" placeholder="请选择角色" @focus="getRoleList()">
                            <el-option
                                v-for="item in userRole"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                <!-- </div> -->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="close('updateUserForm')">取消</el-button>
                <el-button type="primary" @click="updateUser('updateUserForm')">确定</el-button>
            </div>
        </el-dialog>

        <!--Changing user password in system settings-->
        <el-dialog title="修改密码" :visible.sync="editPasswordVisible" width="30%" left>
            <el-form :model="ruleForm" label-position="right" label-width="120px" size="small" :rules="rule"
                    ref="editPasswordForm" class="demo-ruleForm">
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
                <el-form-item>
                    <el-input v-model="ruleForm.id" autocomplete="off" :disabled="true" style="display:none"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editPasswordVisible = false">取消</el-button>
                <el-button type="primary" @click="editUserPassword('editPasswordForm')">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import EfficTableOperatorButton from '../common/button/EfficTableOperatorButton';
import EfficTableOperator from '../common/button/EfficTableOperator';
import EfficTableHeader from '../common/setting/EfficTableHeader';
import tablePagination from '../common/pagination/TablePagination';
export default {
    components: { EfficTableOperatorButton,EfficTableOperator,EfficTableHeader,tablePagination },
    data() {
        return {
            queryPath: '/user/all/list',
            rolePath: '/user/role/list',
            createUserPath: '/user/add',
            deletePath: '/user/deleteUser',
            editPasswordPath: '/user/editPassword',
            currentPage: 1,
            pageSize: 10,
            total: 1,
            pageNo: 1,
            tableData: [],
            condition: "",
            createVisible: false,
            updateVisible: false,
            editPasswordVisible: false,
            formLabelWidth: '120px',
            userRole: [],
            form: {
                id:"",
                name:"",
                email:"",
                phone:"",
                password:"",
                roles: "",
                role: {
                    id: '',
                    name: ''
                }
            },
            ruleForm: {},
            rule: {
                id: [
                    {required: true, message: '请输入ID', trigger: 'blur'},
                    {min: 2, max: 50, message: '长度在 {2} 到 {50} 个字符', trigger: 'blur'},
                    {
                    required: true,
                    pattern: /^[a-zA-Z0-9]+$/,
                    message: '格式错误(不支持特殊字符，且不能以\'-\'开头结尾)',
                    trigger: 'blur'
                    }
                ],
                name: [
                    {required: true, message: '请输入用户姓名', trigger: 'blur'},
                    {min: 2, max: 50, message: '长度在 {2} 到 {50} 个字符', trigger: 'blur'},
                    {
                        required: true,
                        pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
                        message: '格式错误(不支持特殊字符，且不能以\'-\'开头结尾)',
                        trigger: 'blur'
                    },
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
                password: [
                    {required: true, message: '请输入密码', trigger: 'blur'},
                    {
                        required: true,
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/,
                        message: '有效密码：8-16位，英文大小写字母+数字+特殊字符（可选）',
                        trigger: 'blur'
                    }
                ],
            }
        }
    },
    methods: {
        edit(row) {
            this.updateVisible = true;
            this.form = Object.assign({},row);
            let url = "/user/user/role";
            this.$axios.get(process.env.VUE_APP_API_SYS+url + "/" + row.id).then(res =>{
                let data = res.data;
                let roles = data.roles[0];
                this.form.role = roles;
            });
        },
        editPassword(row) {
            this.editPasswordVisible = true;
            this.ruleForm = Object.assign({},row);
        },
        editUserPassword(editPasswordForm){
            this.$refs[editPasswordForm].validate((valid) =>{
                if(valid){
                    this.$axios.post(process.env.VUE_APP_API_SYS+this.editPasswordPath,this.ruleForm).then(res =>{
                        if(res.success){
                            this.$success('修改成功');
                            this.search();
                            this.editPasswordVisible = false;
                            this.$refs[editPasswordForm].resetFields();
                        }
                    })
                }
           });
        },
        del(row) {
            this.$confirm('确定要删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.delete(process.env.VUE_APP_API_SYS+this.deletePath,{
                    params:{
                        id : row.id,
                    }
                }).then((res) =>{
                    if(res.success){
                        this.$success('删除成功');
                        this.search();
                    }
                })
            }).catch(() => {
                this.$info('已取消删除');
            });
        },
        search() { 
            this.$axios.post(process.env.VUE_APP_API_SYS+this.queryPath+'/'+this.currentPage+'/'+this.pageSize+'/'+this.condition).then(res =>{
                if(res.success){
                    this.tableData = res.data.list;
                    this.total = res.data.total;
                    this.pageNo = res.data.pageNo;
                    let url = "/user/user/role";
                    for (let i = 0; i < this.tableData.length; i++) {
                        this.$axios.get(process.env.VUE_APP_API_SYS+url + "/" + this.tableData[i].id).then(res =>{
                            let data = res.data;
                            let roles = data.roles;
                            // let userRoles = result.userRoles;
                            this.$set(this.tableData[i], "role", roles);
                        });
                    }
                }
            })
        },
        create() {
            this.createVisible = true;
            try {
                    this.$refs['form'].resetFields()
                } catch (error) {
                    
                }
            this.getRoleList();
        },
        getRoleList(){
            this.$axios.get(process.env.VUE_APP_API_SYS+this.rolePath).then(res =>{
                this.userRole = res.data;
            })
        },
        close(updateUserForm){
            this.updateVisible = false;
        },
        handleClose() {
            this.form = {role: [{id: ''}]};
        },
        createConfig(createUserForm) {
            this.$refs[createUserForm].validate((valid) =>{
               if(valid){
                   this.$axios.post(process.env.VUE_APP_API_SYS+this.createUserPath,this.form).then(res =>{
                       if(res.success){
                           this.search();
                           this.createVisible = false;
                       }
                   })
               }
           });
        },
        activeRole(roleInfo) {
            return this.userRole.filter(function(role) {
                console.log(roleInfo)
                console.log(role)
                let value = true;
                if (!roleInfo.selects) {
                return true;
                }
                if (roleInfo.selects.length === 0) {
                value = true;
                }
                for (let i = 0; i < roleInfo.selects.length; i++) {
                if (role.id === roleInfo.selects[i]) {
                    value = false;
                }
                }
                return value;
            });
        }
    },
    activated() {
        this.search();
    }
}
</script>
<style>
</style>
