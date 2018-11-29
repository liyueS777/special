<template>
  <div class="upload">
    <el-upload
      class="upload-demo"
      action="/v1/uploadFile"
      :on-change="handleChange"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      name="file"
      :before-upload="uploadBefore"
      :on-remove="uploadRemove"
      :file-list="fileList"
      :on-exceed="uploadLimit"
      :limit="1"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <!-- <div slot="tip" class="el-upload__tip" style="color:red">Tips: 只能上传apk文件~</div> -->
    </el-upload>
  </div>
</template>

<script>
export default {
  props: {
    fileList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      // fileList: []
    };
  },
  methods: {
    handleChange(file, fileList) {
      console.log("change:", file, fileList);
      this.fileList3 = fileList.slice(-3);
    },
    uploadSuccess(response, file, fileList) {
      console.log("成功", response);
      if (response.code == 1) {
        // this.fileList[0] = { name: file.name, url: response.data.url };
        console.log(this.fileList);
        this.$emit("uploadSuccess", {
          type: "1",
          data: {
            url: response.data.url,
            name:file.name
          }
        });
      } else {
        this.$message.warning("上传异常，请稍后再试~");
      }
    },
    uploadError(err, file, fileList) {
      console.log("error", err, file, fileList);
      this.$message.warning("上传异常，请稍后再试~");
    },
    uploadBefore(file) {
      console.log("上船之前", file);
      var file = file;
      var type = file.name.split(".");
      var lastName = type[type.length - 1];
      if (file.size == 0) {
        this.$message.warning("上传的文件大小不能是0，请检查文件是否为空~");
        return false;
      }
      if (lastName == "apk" || lastName == "APK") {
      } else {
        console.log("go");
        this.$message.warning("上传的文件类型必须是apk文件");
        return false;
      }
    },
    uploadRemove(file, fileList) {
      console.log("移除", file, fileList, this.fileList);
      // this.fileList = [];
      this.$emit("uploadRemove", {
        type: 1,
        data: {}
      });
    },
    uploadLimit() {
      this.$message.warning("已达到最大上传数量限制，请先移除已上传的文件列表");
    }
  }
};
</script>

<style lang="less">
</style>
