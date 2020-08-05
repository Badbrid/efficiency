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
                    <el-button type="primary" @click="onAdd()">增加代理配置</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onClear">清除记录</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="bottom">
            <keep-alive>
            <config-table ref="upConfigTable"/>
            </keep-alive>
        </div>
    </div>
</template>
<script>
    import ConfigTable from './configTable';
    // import Bus from '../api/common/bus.js';
    export default {
        components: {
            ConfigTable
        },
        data() {
            return {
                formInline: {
                    sourceUrl: '',
                    targetUrl: ''
                }   
            }
        },
        methods: {
            onSubmit() {
                // this.$store.dispatch('proxyConfig/addSearchUrl', this.formInline);
                // Bus.$emit('val', this.formInline)
                this.$refs.upConfigTable.$emit('queryMethod',this.formInline)
            },
            onAdd() {
                this.$newDialog({
                    data:{
                        list: [],callback:this.updateConfig
                    }
                })
            },
            onClear() {
                console.log(this)
            },
            updateConfig() {
                this.$message({type: "info", message: "添加成功"})
                this.$refs.upConfigTable.initTableData();
            }
        }
    }
</script>

<style lang="scss" scoped>
// @import "../../sass/components/wrap.scss";
</style>