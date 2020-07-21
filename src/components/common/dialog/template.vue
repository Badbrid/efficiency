<template>
    <el-dialog title="添加代理配置" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="接口地址" :label-width="formLabelWidth">
                <el-input v-model="form.sourceUrl" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="目标地址" :label-width="formLabelWidth">
                <el-input v-model="form.targetUrl" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否启用" :label-width="formLabelWidth">
                <el-select v-model="form.enable" placeholder="请选择是否启用">
                    <el-option label="是" value="ture"></el-option>
                    <el-option label="否" value="false"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否自定义请求" :label-width="formLabelWidth">
                <el-input v-model="form.reqParams" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否自定义响应" :label-width="formLabelWidth">
                <el-input v-model="form.respResult" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="自定义请求" :label-width="formLabelWidth">
                <el-input v-model="form.resquestParams" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="自定义响应" :label-width="formLabelWidth">
                <el-input v-model="form.responseResult" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确定</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
    name: "dialogN",
    data() {
      return {
        dialogFormVisible: true,
        form: {
          sourceUrl: '',
          targetUrl: '',
          enable: '',
          reqParams: '',
          respResult: '',
          resquestParams: '',
          responseResult: ''
        },
        formLabelWidth: '120px'
      }
   },
   activated() {
   }
}
</script>
<style>
</style>
