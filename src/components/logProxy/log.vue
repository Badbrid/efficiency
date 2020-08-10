<template>
  <div class="log">
    <div class="heard">
      <div class="top">
        <el-form :inline="true" :model="formInlog" class="demo-form-inline" label-width="auto">
          <el-form-item >
            <el-date-picker v-model="formInlog.startDate" type="date"  placeholder="开始日期"></el-date-picker>
          </el-form-item>
          <el-form-item >
            <el-date-picker v-model="formInlog.endDate" type="date"  placeholder="结束日期"> </el-date-picker>
          </el-form-item>
          <el-form-item >
            <el-input v-model="formInlog.sourceUrl" placeholder="接口地址" prefix-icon="el-icon-search"></el-input>
          </el-form-item>
          <el-form-item >
            <el-input v-model="formInlog.targetUrl" placeholder="目标地址" prefix-icon="el-icon-search"></el-input>
          </el-form-item>
          <el-form-item >
            <el-input v-model="formInlog.requestPlaintext" placeholder="请求参数明文" prefix-icon="el-icon-search"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onClear">清除记录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="buttom">
      <keep-alive>
        <log-table ref="upLogTable"/>
      </keep-alive>
    </div>
  </div>
</template>
<script>
  import LogTable from './logTable';
  export default {
    components:{
      LogTable
    },
    data() {
      return {
        formInlog: {
          startDate: '',
          endDate: '',  
          sourceUrl: '',
          targetUrl: '',
          requestPlaintext: ''
        },
      }
    },
    methods: {
      onSubmit() {
        this.$refs.upLogTable.updataLogTable(this.formInlog);
      },
      onClear() {
        this.$axios.post(process.env.VUE_APP_API_LOG+"/proxy/log/clear",this.formInlog).then(res =>{
          if(res.success){
            this.formInlog = {};
            this.$refs.upLogTable.updataLogTable(this.formInlog);
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>