<template>
  <div class="login" >
    <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px" class="form">
      <h3>登录页面</h3>
      <el-form-item label="用户名" label-width="80px" prop="username">
        <el-input class="item"  v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" label-width="80px" prop="password">
        <el-input class="item" type="password" v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {DEFAULT_LANGUAGE} from '../utils/constants';
import {saveLocalStorage} from "../utils/utils";

export default {
  data() {
    return {
      form: {
        username: 'zhangsht',
        password: '!QAZ1qaz'
      },
      rules: {
        username: [
          {required: true, message: '用户名不能为空', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur'},
          {min: 6, max: 20, message: '密码的长度是6到20位', trigger: 'blur'}
        ]
      },
      msg: '',
      ready: false
    };
  },
  beforeCreate() {
      console.log(process.env.VUE_APP_API_SYS+"/isLogin")
      this.$axios.get(process.env.VUE_APP_API_SYS+"/isLogin").then(response => {
        if (!response.success) {
          this.ready = true;
        } else {
          window.location.href = "/"
        }
      })
  },
  created() {
    // this.$axios.get("/api/isLogin").then(res =>{
    //   if(!res.success){
    //     this.ready = true;
    //   }else{
    //     window.location.refs = "/"
    //   }
    // }),
    document.addEventListener("keydown",this.watchEnter);
  },
  destroyed() {
      //移除监听回车按键
      document.removeEventListener("keydown", this.watchEnter);
    },
  methods: {
      //监听回车按钮事件
      watchEnter(e){
        //获取被按下的键值
        let kyeNum = e.which;
        //判断如果用户按下了回车键（keycody=13）
        if(kyeNum === 13){
          // 按下回车按钮要做的事
          this.submitForm('form');
        }
      },
      submitForm(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.$axios.post(process.env.VUE_APP_API_SYS+"/signin",this.form
            ).then(res => {
              saveLocalStorage(res);
              let language = res.data.language;
              if (!language) {
                this.$axios({
                  methods: 'get',
                  url: process.env.VUE_APP_API_SYS+'/language'
                }).then(res => {
                  language = res.data;
                  localStorage.setItem(DEFAULT_LANGUAGE, language);
                  // window.location.href = "/"
                  })
                } else {
                  // this.$router.replace({name: "index"})
                  window.location.href = "/"
                }
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
};
</script>
<style scoped>
  .login {
    background-color: #bcdef3;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .form {
    width: 40%;
    margin-bottom: 20vh;
    background-color: white;
    border-radius: 2px;
    padding: 5% 3%;
  }
  .item {
    width: 75%;
  }
</style>