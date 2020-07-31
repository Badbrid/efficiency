<template>
    <el-dialog title="添加代理配置" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rule" ref="createProxyForm">
            <el-form-item label="接口地址" :label-width="formLabelWidth" prop="sourceUrl1">
                <el-input v-model="form.sourceUrl" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="目标地址" :label-width="formLabelWidth" prop="targetUrl1">
                <el-input v-model="form.targetUrl" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否启用" :label-width="formLabelWidth" prop="enable1">
                <el-select v-model="form.enable" placeholder="请选择是否启用">
                    <el-option label="是" :value="true"></el-option>
                    <el-option label="否" :value="false"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否自定义请求" :label-width="formLabelWidth" prop="requestParams1">
                <el-input v-model="form.requestParams" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否自定义响应" :label-width="formLabelWidth" prop="responseResult1">
                <el-input v-model="form.responseResult" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="自定义请求" :label-width="formLabelWidth" prop="reqParams1">
                <el-input v-model="form.reqParams" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="自定义响应" :label-width="formLabelWidth" prop="respResult1">
                <el-input v-model="form.respResult" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="createConfig('createProxyForm')">确定</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
    name: "dialogN",
    data() {
      return {
        createPath: '/auto/proxy/config/add',
        dialogFormVisible: true,
        form: {
          sourceUrl: '',
          targetUrl: '',
          enable: '',
          reqParams: '',
          respResult: '',
          requestParams: '',
          responseResult: ''
        },
        formLabelWidth: '120px',
        rule: {
            sourceUrl: [
                {required: true, message: '接口地址不能为空', trigger: 'blur'},
            ],
            targetUrl: [
                {required: true, message: '目标地址不能为空', trigger: 'blur'},
            ],
            enable: [
                {required: true, message: '请选择是否启用', trigger: 'change'},
            ]
        }
      }
   },
   created() {
       console.log(this.$options.options.data)
       if(this.$options.options) {
           if(this.$options.options.data){
               this.form = this.$options.options.data.row;
           }
       }
   },
   activated() {
   },
   methods: {
       createConfig(createProxyForm) {
        //    console.log(createProxyForm)
           this.$refs[createProxyForm].validate((valid) =>{
               if(valid){
                   this.$axios.post(this.createPath,this.form).then(res =>{
                       if(res.success){
                           this.dialogFormVisible = false;
                       }
                   })
               }
           });
       },
   }
}
</script>
<style>
</style>
