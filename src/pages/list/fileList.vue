<template>
  <div class="fileUpload-m">
    <div class="line-l bg-shadow">
      <el-form
        :model="fileForm"
        :rules="rules"
        ref="fileForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="版本名称" prop="name">
          <el-input v-model="fileForm.name" placeHoleder="请填写版本名称"></el-input>
        </el-form-item>
        <el-form-item label="版本号" prop="version">
          <el-input v-model="fileForm.version" placeHoleder="请填写版本号"></el-input>
        </el-form-item>
        <el-form-item label="级别" prop="model">
            <el-select v-model="fileForm.model" placeholder="请选择级别">
                <el-option
                v-for="item in levelList"
                :key="item.id"
                :label="item.label"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="终端类型" prop="imei">
            <el-select v-model="fileForm.imei" placeholder="请选择终端类型">
                <el-option
                v-for="item in appTypes"
                :key="item.id"
                :label="item.label"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="版本描述" prop="pageDesp">
          <el-input v-model="fileForm.pageDesp" placeHoleder="请填写版本描述"></el-input>
        </el-form-item>
        <el-form-item label="文件" prop="url">
          <upload-file></upload-file>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native="submitForm('fileForm')">立即创建</el-button>
          <el-button @click.native="resetForm('fileForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    uploadFile: resolve => {
      require(["@/components/upload"], resolve);
    }
  },
  data() {
    var regPhone = /^[1][3,4,5,7,8][0-9]{9}$/;
    var validatePhone = (rule, value, callback) => {
      console.log(rule, value, callback);
      if (!value || !value.trim()) {
        callback(new Error("代理名称不能为空"));
      } else if (!regPhone.test(value)) {
        callback(new Error("暂时只支持手机号格式,请输入正确的手机号格式"));
      } else {
        callback();
      }
    };
    return {
        levelList:[
            {
                label:'普通级别',
                id:1
            },
            {
                label:'一般级别',
                id:2
            }
        ],
        appTypes:[
            {
                label:'IOS',
                id:1
            },
            {
                label:'Android',
                id:2
            }
        ],
      //   "{\n\"pkg\":\"PACKAGE1\",\n\"version\":\"1\",\n\"model\":\"18927434956\",\n\"imei\":\"123456\"\n}"
      fileForm: {
        name: "",
        version: "",
        model: "",
        imei: "",
        pageDesp: "",
        url: ""
      },
      rules: {
        // phone: [
        //   { required: true, validator: validatePhone, trigger: "change" }
        // ],
        name: [{ required: true, message: "请输入代理name", trigger: "blur" }],
        version: [
          { required: true, message: "请输入代理version", trigger: "blur" }
        ],
        model: [
          { required: true, message: "请输入代理model", trigger: "change" }
        ],
        url: [{ required: true, message: "请输入代理url", trigger: "blur" }],
        imei: [{ required: true, message: "请输入代理imei", trigger: "blur" }],
        pageDesp: [
          { required: true, message: "请输入代理pageDesp", trigger: "blur" }
        ]
      }
    };
  },
  created() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log('yes')
        } else {
          console.log("error submit!!");
          this.$message.warning('请先填写完参数~')
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
.fileUpload-m {
  .line-l {
    padding: 10px 10px 10px 15px;
    border-radius: 4px;
    background: #fff;
  }
}
</style>

