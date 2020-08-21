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
                <el-form-item label="角色" :label-width="formLabelWidth" prop="roles">
                    <el-select v-model="form.roles" placeholder="请选择角色">
                        <el-option
                            v-for="item in form.roles"
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
            currentPage: 1,
            pageSize: 10,
            total: 1,
            pageNo: 1,
            tableData: [],
            condition: "",
            createVisible: false,
            formLabelWidth: '120px',
            form: {
                id:"",
                name:"",
                email:"",
                phone:"",
                password:"",
                roles: [{
                    id: "",
                    name:"",
                }]
            },
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
            
        },
        editPassword(row) {
            
        },
        del(row) {
            
        },
        search() { 
            this.$axios.post(process.env.VUE_APP_API_SYS+this.queryPath+'/'+this.currentPage+'/'+this.pageSize+'/'+this.condition).then(res =>{
                    if(res.success){
                        this.tableData = res.data.list;
                        this.total = res.data.total;
                        this.pageNo = res.data.pageNo;
                    }
                })
        },
        create() {
            this.createVisible = true;
            this.$axios.get(process.env.VUE_APP_API_SYS+this.rolePath).then(res =>{
                console.log(res.data)
                this.form.roles = res.data;
            })
        },
        handleClose() {
            
        },
        createConfig(createUserForm) {
            this.$refs[createUserForm].validate((valid) =>{
               if(valid){
                   
               }
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
