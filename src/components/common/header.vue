<template>
    <div class="fn-clear" >
        <div class="logo">
            <a href="/">
                <img src="@/assets/logo.png" alt="test" width="100"/>
            </a>
        </div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item v-for="(item,key) in menuList" :key="key" :index="item.route">
                {{item.name}}
            </el-menu-item>
        </el-menu>
    </div>
</template>
<script>
export default {
    name: "appHeader",
   data() {
      return {
            activeIndex: "testProcess",
            menuList: [
                {index: 1, name: "测试流程", route: "testProcess"},
                {index: 2, name: "接口测试", route: "api"},
                {index: 3, name: "日志代理", route: "logProxy"}
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
<style>
</style>
