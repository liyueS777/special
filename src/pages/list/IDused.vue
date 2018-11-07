<template>
    <div class="IDused">
        <el-row class="IDused-module bg-shadow" :gutter="20">
            <el-col :span="3"><div class="num">设备总数：5689</div></el-col>
            <el-col :span="3"><div class="num">设备总数：5689</div></el-col>
            <el-col :span="3"><div class="num">设备总数：5689</div></el-col>
        </el-row>
        <div class="line-l bg-shadow">
            <el-button size="mini" type="success" @click.native="create">创建试用ID</el-button>
        </div>
        <el-table
            header-row-class-name="myTablee"
            :header-cell-style="getRowClass"
            :fit="true"
            border
            stripe
            class="IDusedListData bg-shadow"
            ref="multipleTable"
            :data="IDusedList"
            tooltip-effect="dark">
            <el-table-column
            row-class-name="rdd"
                align="center"
                header-align="center"
                type="index"
                width="60"
                label="编号"
                >
            </el-table-column>
            <el-table-column
                align="center"
                header-align="center"
                prop="account"
                label="代理名称"
                width="120"
                show-overflow-tooltip
                >
                <template slot-scope="scope">{{ 1 }}</template>
                
            </el-table-column>
            <el-table-column
                align="center"
                header-align="center"
                prop="deadline"
                label="试用ID"
                >
                <template slot-scope="scope">
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                header-align="center"
                prop="num"
                label="最近使用时间"
                show-overflow-tooltip>
                
                <template slot-scope="scope">
                    
                </template>
                
            </el-table-column>
            <el-table-column
                align="center"
                header-align="center"
                prop="status"
                label="账号状态">
                <template slot-scope="scope">
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                header-align="center"
                prop="action"
                label="操作"
                >
                <template slot-scope="scope">
                <el-button size="mini" type="primary">启动</el-button>
                <el-button size="mini" type="danger">停止</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @current-change="handleRunlist"
            :page-size="pageSize"
            class="pages bg-shadow"
            background
            :current-page="currentPage"
            layout="total,prev, pager, next"
            :total="totalPage">
        </el-pagination>
        <!-- 新增 镇 村 编辑村 的模态框 addTeacherListVisible -->
        <el-dialog title="创建试用ID" :close-on-click-modal="false" :visible.sync="IDusedVisible">
          <div class="handleArea">
            <el-form :model="createIDusedForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="试用ID" prop="id">
                  <el-input v-model="createIDusedForm.id" placeHoleder="请输入ID"></el-input>
              </el-form-item>
              <el-form-item label="代理名称" prop="name">
                  <el-input v-model="createIDusedForm.name" placeHoleder="请输入代理名称"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
  data() {
    return {
      phone: "",
      IDusedList: [1, 2, 3, 4],
      pageSize: 10,
      currentPage: 1,
      totalPage: 4,
      IDusedVisible: false,
      createIDusedForm: {
        name: "",
        id: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入代理名称", trigger: "change" }
        ],
        id: [{ required: true, message: "请输入代理id", trigger: "change" }]
      }
    };
  },
  methods: {
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "background:#498e26;color:#fff";
      } else {
        return "";
      }
    },
    create() {
      this.IDusedVisible = true;
      this.createIDusedForm.id &&
        this.createIDusedForm.name &&
        this.resetForm("ruleForm");
    },
    handleRunlist(page) {
      console.log(page);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("okok submit!!");
          this.$message.success("创建成功");
          setTimeout(() => {
            this.IDusedVisible = false;
          }, 1000);
          //   this.$axios({
          //     method: "post",
          //     url: this.$HostMz + "infor/editManager",
          //     data: {
          //       accessToken: this.$store.getters.getUserInfo.accessToken,
          //       id: this.ruleForm2.id,
          //       name: this.ruleForm2.name,
          //       phone: this.ruleForm2.phone,
          //       type: this.ruleForm2.role
          //     }
          //   }).then(res => {
          //     if (res.data.errcode == 0 || res.data.errcode == 1) {
          //       this.handleEditRoleVisible = false;

          //       this.getChildrenList(
          //         this.currentPage_Children,
          //         this.pageSize_Children,
          //         this.area.id
          //       );
          //     }
          //   });
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
.IDused {
  .IDused-module {
    margin-left: 0 !important;
    margin-right: 0 !important;
    margin-bottom: 20px;
    background: #fff;
    padding: 10px;
    .el-col {
      text-align: center;
      .num {
        background: #3ac5e6;
        height: 30px;
        line-height: 30px;
        border-radius: 4px;
        color: #fff;
      }
    }
  }
  .IDusedListData {
    margin: 20px auto;
    border-radius: 4px;
  }
  .line-l {
    padding: 10px 10px 10px 15px;
    border-radius: 4px;
    background: #fff;
  }
  .pages {
    text-align: right;
    padding: 10px;
    border-radius: 4px;
    background: #fff;
  }
}
</style>

