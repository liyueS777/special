<template>
    <div class="login">
        <el-form :model="ruleForm" label-position="top" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password" type="password"></el-input>
            </el-form-item>
            <el-form-item style="text-align:center">
                <el-button type="primary" @click="submitForm('ruleForm')" size="mini">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')" size="mini">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        username:"",
        password:''
      },
      rules: {
        username: [
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

    .login {
        width: 300px;
        padding: 20px;
        border: 1px solid #000;
        border-radius:4px;
        position: absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
    }

</style>
