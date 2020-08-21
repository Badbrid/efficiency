<template>
  <el-dropdown size="medium" @command="handleCommand" class="align-right">
    <span class="dropdown-link">
      <el-avatar 
        fit="cover"
        icon="el-icon-user-solid">
      </el-avatar>
    </span>
    <template v-slot:dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="personal">个人信息</el-dropdown-item>
        <el-dropdown-item command="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>

    <!-- <about-us ref="aboutUs"/> -->
  </el-dropdown>
</template>

<script>
  // import {getCurrentUser} from "../../../../common/js/utils";

  export default {
    name: "user",
    computed: {
      // currentUser: () => {
      //   return getCurrentUser();
      // }
    },
    methods: {
      handleCommand(command) {
        switch (command) {
          case "personal":
            // TODO 优化路由跳转，避免重复添加路由
            this.$router.push('/systemSetting/personsetting').catch(error => error);
            break;
          case "logout":
            this.$axios.get(process.env.VUE_APP_API_SYS+"/loginOut").then(res =>{
              if(res.success){
                localStorage.clear();
                window.location.href = "/login";
              }
            });
            break;
          // case "about":
          //   this.$refs.aboutUs.open();
          //   break;
          default:
            break;
        }
      }
    }
  }
</script>

<style scoped>
  /* .dropdown-link {
    cursor: pointer;
    font-size: 12px;
    color: rgb(245, 245, 245);
    line-height: 40px;
  } */

  .align-right {
    float: right;
  }

  .el-avatar {
    margin-top: 10px;
  }

</style>


