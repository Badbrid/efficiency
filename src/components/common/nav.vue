<template>
  <div>
    <div class="navBox">
      <ul class="navItems">
        <li v-for="(item,key) in navList4" :key="key" :class="['navItem',{'navItem-active': item.active}]">
          <router-link :to="{name: item.route}">
            <span>{{item.name}}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: "appNav",
  data() {
    return {
      isShowNav: true,
      activeNav: "log",
      navList: [],
      navList1: [{name: "代理日志", route: "log" },{ name: "接口代理配置", route: "proxyConfiguration" }],
      navList2: [{ name: "接口管理", route: "apiHome" }],
      navList3: [{ name: "测试管理", route: "testProcessName"}]
    };
  },
  computed:{
    navList4(){
      let routeName = this.$route.name;
      let navList = [];
      if (this.navList1.some(item => item.route === routeName)) {
        navList = this.navList1;
      } else if (this.navList2.some(item => item.route === routeName)) {
        navList = this.navList2;
      } else if (this.navList3.some(item => item.route === routeName)) {
        navList = this.navList3;
      }
      console.log(navList);
      
      navList.map(item => {
        if(item.route === routeName){
          item.active =  true;
        }else{
          item.active =  false;
        }
        return item;
      })
      return navList
    }
  },
  created() {
  },
  methods: {
  }
};
</script>
<style lang="scss" scoped>
.navBox {
  *{
    padding: 0;
    margin: 0;
  }
  // position: absolute;
  float: left;
  margin-right: 10px;
  top: 0;
  left: 0;
  width: 150px;
  height: 100%;
  border-right: 1px solid #e9e9e9;
  .navItems {
    list-style: none;
    padding-inline-start: 16px;
    .navItem{
      a{
        text-decoration: none;
        // padding:0 20px;
        // text-indent: 5px;
        text-align: center;
        display: inline-block;
        width: 100%;
        height: 56px;
        line-height: 56px;
        font-size: 14px;
        margin-bottom: 2px;
        color:#999;
        background-color: #ccc;
        &:hover{
          color: #10a296;
          font-weight: bold;
          background: rgba(#10a296, 0.05);
        }
      }
      &.navItem-active a{
        color: #10a296;
        background: rgba(#10a296, 0.1);
        &:hover{
          font-weight: initial;
        }
      }
    }
  }
}
.main {
  // margin-left: 10px;
  width: 100%;
  float: left;
}
</style>