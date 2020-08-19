<template>
  <div class="app fn-clear">
    <el-header height="61px">
      <app-header class="app-header"/>
    </el-header>
    <el-main>
      <router-view class="app-main"/>
      <el-footer height="40px">
        <p>Copyright © test.</p>
      </el-footer>
    </el-main>
  </div>
</template>

<script>
import AppHeader from './components/common/header';
export default {
  components: {AppHeader},
  data() {
    return {};
  }, 
  beforeCreate() {
    this.$axios.get(process.env.VUE_APP_API_SYS+"/isLogin").then(res =>{
      if(res.success){
        // this.$setLang(res.data);
      } else {
        window.location.href= '/login.html';
      }
    })
    .catch(() =>{
      window.location.href= '/login.html';
    })
  }
}
</script>

<style lang="scss" scope>
.app{
  overflow: hidden;
  height:100%;
}
.app-header{
  display: flex;
}
.el-footer{
  margin: 0 auto;
  padding: 0;
  // min-width: 800px;
  // max-width: 1200px;
}
.el-header{
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  width: 100%;
  border-bottom: 1px solid #e9e9e9;
  .app-header{
    height: 60px;
  }
}
.el-main{
  height: 830px;
  position: relative;
  margin-top: 60px;
  background-color: #f5f5f5;
  .app-main{
    display: flex;
    min-height: 500px;
  }
}
.el-footer{
  line-height: 40px;
  color: #999;
  text-align: center;
}
</style>
