<template>
    <div class="fn-clear" >
        <div class="left-box">
            <div class="logo">
                <a href="/">
                    <img src="@/assets/logo.png" alt="test" width="60"/>
                </a>
            </div>
            <el-menu mode="horizontal" menu-trigger="click"
                class="el-menu-demo"
                :default-active="activeIndex"
                @select="handleSelect"
                router>

                <el-menu-item index="/testProcess" v-permission="['admin']">
                    测试流程
                </el-menu-item>
                <el-menu-item index="/api" v-permission="['admin']">
                    接口测试
                </el-menu-item>
                <el-menu-item index="/logProxy" onselectstart="return false"
                            v-permission="['admin','test_user','test_viewer']">
                    日志代理
                </el-menu-item>
                <el-menu-item index="/systemSetting" onselectstart="return false">
                    系统设置
                </el-menu-item>
                <el-menu-item index="/testPlatform"><a href="http://testplat.internal.mob.com/daily" target="_blank" style="text-decoration:none;">测试平台</a></el-menu-item>
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
            activeIndex: '/'
        }
    },
    created() {
    },
    watch: {
        '$route'(to) {
            if (to.matched.length > 0) {
            this.activeIndex = to.matched[0].path;
            }
            this.handleSelect(this.activeIndex);
        }
    },
    mounted() {
        if (this.$route.matched.length > 0) {
            this.activeIndex = this.$route.matched[0].path;
        }
    },
    methods: {
        handleSelect(index) {
            this.activeIndex = index
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
