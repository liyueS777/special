<template>
  <div class="addDevice">
    <div class="line-l bg-shadow">
      <el-form
        :model="fileForm"
        :rules="rules"
        ref="fileForm"
        label-width="100px"
        class="file-ruleForm"
      >
        <el-form-item label="设备号" prop="equipment">
          <el-input v-model="fileForm.equipment" placeholder="请填写设备号"></el-input>
        </el-form-item>
        <el-form-item label="imei" prop="imei">
          <el-input v-model="fileForm.imei" placeholder="请填写imei"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click.native="submitForm('fileForm')">立即提交</el-button>
          <el-button size="small" @click.native="resetForm('fileForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
      title="提交后-信息展示"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :show-close="false"
      @close="close"
      width="40%"
      >
      <span>设备号： {{fileForm.equipment}}</span><br>
      <span>imei:   {{fileForm.imei}}</span><br>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { commitEquipment } from '@/config/api'
export default {
  data() {

    return {
        dialogVisible:false,
      fileForm: {
        equipment: "",
        imei: "",
      },
      rules: {
        equipment: [{ required: true, message: "请输入设备号", trigger: "blur" }],
        imei: [{ required: true, message: "请输入imei", trigger: "blur" }],
      }
    };
  },
  created() {},
  methods: {
    close(){
      this.$router.push('/')
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log('yes',this.fileForm);
          commitEquipment(this.fileForm)
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
.addDevice {
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

