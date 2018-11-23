<template>
    <div class="IDused">
        <el-row class="IDused-module bg-shadow" :gutter="20">
            <el-col :span="3"><div class="num">试用ID总数：{{dataStatics.totalCount}}</div></el-col>
            <el-col :span="3"><div class="num">正常ID数量：{{dataStatics.useableCount}}</div></el-col>
            <el-col :span="3"><div class="num">停用ID数量数：{{dataStatics.unusableCount}}</div></el-col>
            <el-col :span="3"><div class="num">上月试用次数：{{dataStatics.lastMonthCount}}</div></el-col>
            <el-col :span="3"><div class="num">本月试用次数：{{dataStatics.thisMonthCount}}</div></el-col>
        </el-row>
        <div class="line-l bg-shadow">
            <el-button size="mini" type="success" @click.native="createID">创建试用ID</el-button>
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
                min-width="140"
                show-overflow-tooltip
                >
                <template slot-scope="scope">{{ scope.row.phone }}</template>
                
            </el-table-column>
            <el-table-column
                align="center"
                header-align="center"
                prop="deadline"
                label="试用ID"
                min-width="140"
                show-overflow-tooltip
                >
                <template slot-scope="scope">
                  {{ scope.row.trialAcount }}
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                header-align="center"
                prop="num"
                label="最近使用时间"
                show-overflow-tooltip>
                
                <template slot-scope="scope">
                    {{ scope.row.updateTime | translateToDate }}
                </template>
                
            </el-table-column>
            <el-table-column
                align="center"
                header-align="center"
                prop="status"
                label="账号状态">
                <template slot-scope="scope">
                  {{ scope.row.useable==0?'不可用':'可用' }}
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                header-align="center"
                prop="action"
                label="操作"
                >
                <template slot-scope="scope">
                <el-button size="mini" type="primary" v-if="scope.row.useable==0" @click.native="operateUserId(scope.row.id,scope.row.useable==1?0:1)">启动</el-button>
                <el-button size="mini" type="danger" v-else @click.native="operateUserId(scope.row.id,scope.row.useable==1?0:1)">停止</el-button>
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
            :total="totalCount">
        </el-pagination>
        <!-- 新增 镇 村 编辑村 的模态框 addTeacherListVisible -->
        <el-dialog title="创建试用ID" :close-on-click-modal="false" :visible.sync="IDusedVisible" @close="closeModel">
          <div class="handleArea">
            <el-form :model="createIDusedForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="试用ID" prop="trialAccount">
                  <el-input v-model="createIDusedForm.trialAccount" placeHoleder="请输入ID" disabled></el-input>
              </el-form-item>
              <el-form-item label="代理名称" prop="phone">
                  <el-input v-model="createIDusedForm.phone" placeHoleder="请输入代理名称"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
              </el-form-item>
            </el-form>
          </div>
        </el-dialog>
    </div>
</template>

<script>
import { getTrialAccounts, getStatistics,createTrialAccounts,postTrialID,operationTrialAccounts } from "@/config/api";
export default {
  data() {
    var regPhone=/^[1][3,4,5,7,8][0-9]{9}$/;
    var validatePhone = (rule, value, callback) => {
      console.log(rule, value, callback)
        if (!value || !value.trim()) {
          callback(new Error('代理名称不能为空'));
        } else if (!regPhone.test(value)) {
          callback(new Error('暂时只支持手机号格式,请输入正确的手机号格式'));
        } else {
          callback();
        }
    };
    return {
      closeGetDataFlag:false,
      dataStatics: {
        lastMonthCount: 0,
        thisMonthCount: 0,
        totalCount: 0,
        unusableCount: 0,
        useableCount: 0
      },
      phone: "",
      IDusedList: [],
      pageSize: 10,
      currentPage: 1,
      totalCount: 0,
      IDusedVisible: false,
      createIDusedForm: {
        phone: "",
        trialAccount: ""
      },
      rules: {
        phone: [
          { required: true, validator: validatePhone, trigger: "change" }
        ],
        trialAccount: [{ required: true, message: "请输入代理id", trigger: "change" }]
      }
    };
  },
  created() {
    this.getStatistics();
    this.getTrialAccounts(this.currentPage,this.pageSize)
  },
  methods: {
    operateUserId(id,targetUseable){
      operationTrialAccounts({
        id,
        useable:targetUseable
      })
      .then(res=>{
        if(res.code==1){
          this.getTrialAccounts(this.currentPage,this.pageSize)
        }else {
          this.$message.warning('操作异常，请稍后再试~')
        }
      })
      .catch(e=>{
        this.$message.warning('操作异常，请稍后再试~')
      })
    },
    getStatistics() {
      getStatistics()
        .then(res => {
          if (res.code == 1) {
            this.dataStatics = res.data
          } else {
            this.$message.warning("查询试用ID数据统计异常~");
          }
        })
        .catch(e => {
          this.$message.warning("查询试用ID数据统计异常~");
        });
    },
    getTrialAccounts(page,limit) {
      getTrialAccounts({
        page,limit
      })
        .then(res => {
          if (res.code == 1) {
            this.IDusedList = res.data.trialAccountsList
            this.totalCount = res.data.totalCount
          } else {
            this.$message.warning("查询试用ID列表数据异常~");
          }
        })
        .catch(e => {
          this.$message.warning("查询试用ID列表数据异常~");
        });
    },
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "background:#409eff;color:#fff";
      } else {
        return "";
      }
    },
    closeModel(k){
      console.log(k,'环比了');
      this.resetForm("ruleForm");
      this.closeGetDataFlag && this.getTrialAccounts(this.currentPage,this.pageSize)
    },
    createID() {
      this.closeGetDataFlag = false
      this.IDusedVisible = true;
      // this.createIDusedForm.phone &&
      //   this.createIDusedForm.trialAccount &&
      //   this.resetForm("ruleForm");
      createTrialAccounts()
      .then(res=>{
        if(res.code==1){
          this.createIDusedForm.trialAccount = res.data
        }else {
          this.IDusedVisible = false;
          this.$message.warning('试用ID生成异常，请稍后重试~')
        }
      })
      .catch(e=>{
        this.IDusedVisible = false;
        this.$message.warning('试用ID生成异常，请稍后重试~')
      })
    },
    handleRunlist(page) {
      this.currentPage =page
      this.getTrialAccounts(page,this.pageSize)
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          postTrialID(this.createIDusedForm)
          .then(res=>{
            if(res.code==1){
              this.closeGetDataFlag = true;
              this.IDusedVisible = false;
            }else {
              this.$message.success("创建异常，请稍后再试");
            }
          })
          .catch(e=>{
            this.$message.warning("创建异常，请稍后再试");
          })
          
          
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
        // height: 30px;
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

