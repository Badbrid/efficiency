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
                    <el-button type="primary" @click="onAdd">增加代理配置</el-button>
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
        this.$prompt('请输入邮箱', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputErrorMessage: '邮箱格式不正确',
          inputValue: "das"
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的邮箱是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
// @import "../../sass/components/wrap.scss";
</style>