<template>
  <div class="login-wrap" :style="{backgroundImage:'url(' + bgImg + ')'}">
    <div class="login bg-shadow">
          <h2>欢迎来到后台管理系统</h2>
          <el-form :model="ruleForm" label-position="left" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="用户名" prop="phone" class="ll">
                  <el-input v-model="ruleForm.phone" class="ii" @keyup.enter.native="submitForm('ruleForm')"></el-input>
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
import md5 from 'md5'
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
  created(){
    console.log('loginnnnnnnnnnn:',this.$route,this.$route.query.redirect)
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var u = this.ruleForm.phone
          var p = md5(this.ruleForm.password)
          login({
            phone:u,
            password:p
          })
          .then(res=>{
            console.log(res)
            if(res.code==1){
              window.localStorage.setItem("S_LOGIN_MESSAGE",JSON.stringify({
                phone:this.ruleForm.phone
              }));
              this.$router.push({path:this.$route.query.redirect?this.$route.query.redirect:"/list/runList"});
              this.$message.success("登陆成功~")
            }else {
              this.$message.warning('用户名或密码错误')
            }
          })
          .catch(e=>{
            console.log(123,e)
            this.$message.warning('登陆请求异常，请稍后再试~')
          })
          
        } else {
          this.$message.warning("请输入完整信息~再登陆")
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
