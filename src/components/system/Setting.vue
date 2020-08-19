<template>
  <effic-container>
    <effic-aside-container>
      <current-user/>
      <el-divider/>
      <h1>设置</h1>
      <setting-menu/>
    </effic-aside-container>

    <effic-main-container>
      <keep-alive>
        <router-view/>
      </keep-alive>
    </effic-main-container>
  </effic-container>
</template>

<script>
  import CurrentUser from "./CurrentUser";
  import SettingMenu from "./SettingMenu"; 
  import EfficAsideContainer from "../common/setting/EfficAsideContainer";
  import EfficContainer from "../common/setting/EfficContainer";
  import EfficMainContainer from "../common/setting/EfficMainContainer";

  export default {
    name: "Setting",
    components: {EfficMainContainer, EfficContainer, EfficAsideContainer, CurrentUser, SettingMenu},
  }
</script>

<style scoped>
  .ms-aside-container {
    height: calc(100vh - 40px);
    padding: 20px;
  }

  .ms-main-container {
    height: calc(100vh - 40px);
  }

  h1 {
    font-size: 20px;
    font-weight: 500;
  }

</style>

