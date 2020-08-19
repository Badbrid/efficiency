<template>
  <el-menu menu-trigger="click" :default-active="$route.path" router>
    <el-submenu index="1" v-permission="['admin']">
      <template v-slot:title>
        <font-awesome-icon class="icon account" :icon="['far', 'address-card']" size="lg"/>
        <span>系统</span>
      </template>
      <el-menu-item index="/systemSetting/user">用户管理</el-menu-item>
    </el-submenu>
    <el-submenu index="4">
      <template v-slot:title>
        <font-awesome-icon class="icon" :icon="['far', 'user']" size="lg"/>
        <span>个人信息</span>
      </template>
      <el-menu-item index="/systemSetting/personsetting">个人设置</el-menu-item>
    </el-submenu>

  </el-menu>
</template>

<script>

  export default {
    name: "MsSettingMenu",
    
    mounted() {

    },
  }
</script>

<style scoped>
  .el-menu {
    border-right: 0;
  }

  .el-menu-item {
    height: 40px;
    line-height: 40px;
  }

  .icon {
    width: 24px;
    margin-right: 10px;
  }

  .account {
    color: #5a78f0;
  }

  .organization {
    color: #b33a5b;
  }

  .workspace {
    color: #44b349;
  }
</style>
