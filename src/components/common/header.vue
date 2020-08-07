<template>
    <div class="fn-clear" >
        <div class="left-box">
            <div class="logo">
                <a href="/">
                    <img src="@/assets/logo.png" alt="test" width="60"/>
                </a>
            </div>
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item v-for="(item,key) in menuList" :key="key" :index="item.route">
                    {{item.name}}
                </el-menu-item>
            </el-menu>
        </div>
        <div class="avatar">
            <header-user/>
        </div>
    </div>
</template>
<script>
import HeaderUser from "./HeaderUser";

export default {
    components:{HeaderUser},
    name: "appHeader",
    data() {
        return {
            activeIndex: "testProcess",
            menuList: [
                {index: 1, name: "测试流程", route: "testProcess"},
                {index: 2, name: "接口测试", route: "api"},
                {index: 3, name: "日志代理", route: "logProxy"},
                {index: 4, name: "系统设置", route: "systemSetting"}
            ]
        }
    },
    created() {
        this.activeIndex = this.$route.matched[0].name;
    },
    methods: {
        handleSelect(route){
            //    this.activeIndex = route
            this.$router.push({name: route})
        }
    }
}
</script>
<style lang="scss" scoped>
.fn-clear {
    justify-content: space-between;
    .left-box {
        display: flex;
    }
}
// .avatar {
//     background-color: blue;
//     width:60px;
//     margin-left: 10px;
// }
</style>
