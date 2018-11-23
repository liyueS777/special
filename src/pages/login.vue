<template>
  <div class="login-wrap" :style="{backgroundImage:'url(' + bgImg + ')'}">
    <div class="login bg-shadow">
          <h2>欢迎来到后台管理系统</h2>
          <el-form :model="ruleForm" label-position="left" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="用户名" prop="phone" class="ll">
                  <el-input v-model="ruleForm.phone" class="ii"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password" class="ll">
                  <el-input v-model="ruleForm.password" type="password" class="ii" @keyup.enter.native="submitForm('ruleForm')"></el-input>
              </el-form-item>
              <el-form-item style="text-align:center" class="action">
                  <el-button type="primary" @click.native="submitForm('ruleForm')" size="mini">立即创建</el-button>
                  <el-button @click="resetForm('ruleForm')" size="mini">重置</el-button>
              </el-form-item>
          </el-form>
      </div>
  </div>
    
</template>

<script>
import { login } from '@/config/api'
export default {
  data() {
    return {
      bgImg:require('../assets/img/bg1.jpg'),
      ruleForm: {
        phone:"",
        password:''
      },
      rules: {
        phone: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        //   { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
        //   { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // login(this.ruleForm)
          // .then(res=>{

          // })
          // .catch(e=>{

          // })
          this.$router.push({name:"runList"})
        } else {
          console.log("error submit!!");
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

<style lang="less">
  .login-wrap {
    height: 100%;
    position: relative;
    background-repeat:no-repeat;
    background-size: cover;
    .login {
      h2 {
        font-size: 18px;
        text-align: center;
        margin-bottom: 15px;
        font-weight: 600;
      }
        width: 310px;
        padding: 20px;
        // border: 1px solid #000;
        border-radius:4px;
        position: absolute;
        top:50%;
        left:50%;
        background: #fff;
        transform:translate(-50%,-50%);
        .ll {
          >label {
            width: 68px !important;
          }
          >div {
            margin-left:68px !important;
          }
        }
        .action {
          >div {
            margin-left: 0 !important;
          }
        }
    }
  }
    

</style>
