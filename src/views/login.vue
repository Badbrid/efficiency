<template>
  <div class="login">
    <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px" class="form">
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
  methods: {
      submitForm(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.$axios({
              methods: 'post',
              url: '/signin',
              data: this.form
            }).then(res => {
              let language = res.data.language;
              if (!language) {
                this.$axios({
                  methods: 'get',
                  url: '/language'
                }).then(res => {
                  language = res.data.language;
                  localStorage.setItem(DEFAULT_LANGUAGE, language);
                  window.location.href = "/"
                  })
                } else {
                  window.location.href = "/"
                }
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
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