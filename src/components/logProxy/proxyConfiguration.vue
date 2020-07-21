<template>
    <div class="container">
        <div class="top">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item >
                    <el-input v-model="formInline.sourceUrl" placeholder="接口地址"></el-input>
                </el-form-item>
                <el-form-item >
                    <el-input v-model="formInline.targetUrl" placeholder="代理接口地址"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button  @click="onAdd">增加代理配置</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onClear">清除记录</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="bottom">
            <keep-alive>
            <config-table/>
            </keep-alive>
        </div>
    </div>
</template>
<script>
    import ConfigTable from './configTable';
    export default {
        components: {
            ConfigTable
        },
        data() {
        return {
            formInline: {
                sourceUrl: '',
                targetUrl: '',
            }
        }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      onAdd() {
        this.$newDialog({
        data:{
          list: []
        }
      }, (data)=>{
        // this.$message({type: "info", message: JSON.stringify(data)})
      })
      }
    }
  }
</script>

<style lang="scss" scoped>
// @import "../../sass/components/wrap.scss";
</style>