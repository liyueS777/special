<template>
  <div class="fileUpload-m">
    <div class="line-l bg-shadow">
      <el-form
        :model="fileForm"
        :rules="rules"
        ref="fileForm"
        label-width="100px"
        class="file-ruleForm"
      >
        <el-form-item label="版本名称" prop="versionName">
          <el-input v-model.trim="fileForm.versionName" placeholder="请填写版本名称"></el-input>
        </el-form-item>
        <el-form-item label="版本号" prop="versionNumber">
          <el-input v-model.trim="fileForm.versionNumber" placeholder="请填写版本号"></el-input>
        </el-form-item>
        <!-- <el-form-item label="级别" prop="model">
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
        </el-form-item> -->
        <el-form-item label="版本描述" prop="desc">
          <el-input v-model.trim="fileForm.desc" placeholder="请填写版本描述"></el-input>
        </el-form-item>
        <el-form-item label="文件" prop="url">
          <upload-file :fileList="fileList" @uploadSuccess="handleUploadSuccess" @uploadRemove="handleUploadRemove"></upload-file>
        </el-form-item>
        <el-form-item label="文件包名称" prop="packageName">
          <el-input v-model.trim="fileForm.packageName" placeholder="请填写文件包名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click.native="submitForm('fileForm')">立即提交</el-button>
          <el-button size="small" @click.native="resetForm('fileForm')">重置</el-button>
        </el-form-item>

      </el-form>
    </div>
    <!-- <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button> -->
    <el-dialog
      title="提交后-信息展示"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :show-close="false"
      @close="close"
      width="40%"
      >
      <span>版本名称： {{fileForm.versionName}}</span><br>
      <span>版本号：   {{fileForm.versionNumber}}</span><br>
      <span v-if="!!fileForm.desc.trim()">版本描述： {{fileForm.desc}}</span><br>
      <span>文件路径： {{fileForm.url}}</span><br>
      <span>文件包名称: {{fileForm.packageName}}</span><br>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { uploadFileInfo } from '@/config/api'
export default {
  components: {
    uploadFile: resolve => {
      require(["@/components/upload"], resolve);
    }
  },
  data() {
    var regInterg = /^[0-9]*[1-9][0-9]*$/;
    var validateVersionNumber = (rule, value, callback) => {
      console.log(rule, value, callback);
      if (!value || !value.trim()) {
        callback(new Error("版本号不能为空"));
      }
      else if (!regInterg.test(value)) {
        callback(new Error("版本号必须是正整数,请输入正确的版本号格式"));
      }else if(value.indexOf('.')>-1){
        callback(new Error("版本号必须是正整数,不能有小数点"));
      }  
      else {
        callback();
      }
    };
    var validateUrl = (rule, value, callback) => {
      console.log(rule, value, callback);
      if (!value || !value.trim()) {
        callback(new Error("上传的文件不能为空"));
      }
      else {
        callback();
      }
    };
    return {
        dialogVisible:false,
        fileList:[],
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
        versionName: "",
        versionNumber: "",
        // model: "",
        // imei: "",
        desc: "",
        url: "",
        packageName:''
      },
      rules: {
        // versionName: [{ required: true, message: "请输入版本名称", trigger: "blur" }],
        versionNumber: [
          { required: true, validator:validateVersionNumber, trigger: "blur" }
        ],
        // model: [
        //   { required: true, message: "请输入代理model", trigger: "change" }
        // ],
        url: [{ required: true, validator:validateUrl, trigger: "blur" }],
        // imei: [{ required: true, message: "请输入代理imei", trigger: "blur" }],
        // desc: [
        //   { required: true, message: "请先填写版本描述", trigger: "blur" }
        // ],
        packageName: [
          { required: true, message: "请先填写文件包名称", trigger: "blur" }
        ]
      }
    };
  },
  created() {},
  methods: {
    close(){
      this.$router.push('/')
    },
    handleUploadSuccess(res){
      console.log('onSueess:',res);
      this.fileForm.url = res.data.url;
      this.fileList[0] = {name:res.data.name,url:res.data.url}
    },
    handleUploadRemove(res){
      console.log('onRemove:',res);
      this.fileForm.url = '';
      this.fileList = [];
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log('yes',this.fileForm);
          uploadFileInfo(this.fileForm)
          .then(res=>{
            if(res.code==1){
              this.$message.success('数据提交成功~~');
              this.dialogVisible = true;
            }else {
              this.$message.warning('数据提交异常，请稍后再试~~')
            }
          })
          .catch(err=>{
            this.$message.warning('数据提交异常，请稍后再试~~')
          })
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
::placeholder{
    color:red;
}
.fileUpload-m {
  .line-l {
    padding: 10px 10px 10px 15px;
    border-radius: 4px;
    background: #fff;
  }
  .file-ruleForm {
      width:600px;
  }
}
</style>

