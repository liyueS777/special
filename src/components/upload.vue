<template>
  <div class="upload">
    <el-upload
      class="upload-demo"
      action="/v1/uploadFileInfo"
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
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ]
    };
  },
  methods: {
    handleChange(file, fileList) {
        console.log('change:',file, fileList)
      this.fileList3= fileList.slice(-3);
    },
    uploadSuccess(response, file, fileList) {
      console.log("成功", response, file, fileList);
    },
    uploadError(err, file, fileList) {
      console.log("error", err, file, fileList);
    },
    uploadBefore(file) {
      console.log("上船之前", file);
      var file = file;
      var type = file.name.split(".");
      var lastName = type[type.length - 1];
      if (lastName == "apk" || lastName == "APK") {
        
      }else {
        console.log("go");
        this.$message.warning("上传的文件类型必须是apk文件");
        return false;
      }
    },
    uploadRemove(file, fileList) {
      console.log("移除", file, fileList, this.fileList);
    },
    uploadLimit() {
      this.$message.warning("已达到最大上传数量限制，请先移除已上传的文件列表");
    }
  }
};
</script>

<style lang="less">
</style>
