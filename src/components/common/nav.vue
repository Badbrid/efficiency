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
      activeNav: "dashboard",
      navList: [],
      navList1: [{name: "仪表盘", route: "dashboard" },{ name: "待办事项", route: "memo" }],
      navList2: [{ name: "产品管理", route: "product" }, { name: "目标设定", route: "kpi" }]
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
  position: absolute;
  top: 0;
  left: 0;
  width: 140px;
  height: 100%;
  border-right: 1px solid #e9e9e9;
  .navItems {
    .navItem{
      a{
        padding:0 20px;
        display: inline-block;
        width: 100%;
        height: 56px;
        line-height: 56px;
        font-size: 14px;
        color:#999;
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
  margin-left: 140px;
}
</style>