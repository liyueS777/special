
<template>
    <div class="authManage">
        <el-row class="authManage-module bg-shadow" :gutter="20">
            <el-col :span="3"><div class="num">授权码总数：{{authCodeData.totalCount}}</div></el-col>
            <el-col :span="3"><div class=" num">已使用总数：{{authCodeData.usedCount}}</div></el-col>
            <el-col :span="3"><div class="num">未使用总数：{{authCodeData.unusedCount}}</div></el-col>
        </el-row>
        <el-row class="authManage-module bg-shadow" :gutter="20">
            <el-col :span="3"><div class="num">上月生成：{{authCodeData.lastMonthCreateCount}}</div></el-col>
            <!-- <el-col :span="3"><div class="num">上月续费：{{authCodeData.totalCount}}</div></el-col> -->
            <el-col :span="3"><div class="num">本月生成 ：{{authCodeData.thisMonthCreateCount}}</div></el-col>
            <!-- <el-col :span="3"><div class="num">本月续费：{{authCodeData.totalCount}}</div></el-col> -->
        </el-row>
        <div class="line-l bg-shadow">
            <!-- <el-input style="width:300px;margin-right:10px;" placeholder="请输入用户手机号查询" v-model="phone" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" size="mini"></el-button>
            </el-input> -->
            <el-button size="medium" type="success" @click.native="createAuthCode">生成授权码</el-button>
        </div>
        <el-table
                      header-row-class-name="myTablee"
                      :header-cell-style="getRowClass"
                      :fit="true"
                      border
                      stripe
                      class="authManagetData bg-shadow"
                      ref="multipleTable"
                      :data="authManageList"
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
                          label="授权码"
                          min-width="140"
                          show-overflow-tooltip
                          >
                          <template slot-scope="scope">{{ scope.row.invitationCode }}</template>
                          
                      </el-table-column>
                      <el-table-column
                          align="center"
                          header-align="center"
                          prop="deadline"
                          label="认证码"
                          min-width="140"
                          show-overflow-tooltip
                          >
                          <template slot-scope="scope">
                            {{ scope.row.verificationCode }}
                          </template>
                      </el-table-column>
                      <el-table-column
                          align="center"
                          header-align="center"
                          prop="num"
                          label="生成时间"
                          show-overflow-tooltip>
                          
                          <template slot-scope="scope">
                              {{ scope.row.creatTime | translateToDate }}
                          </template>
                          
                      </el-table-column>
                      <el-table-column
                          align="center"
                          header-align="center"
                          prop="status"
                          show-overflow-tooltip
                          label="使用时间">
                          <template slot-scope="scope">
                            {{ scope.row.activateTime | translateToDate }}
                          </template>
                      </el-table-column>
                      <!-- <el-table-column
                          align="center"
                          header-align="center"
                          prop="action"
                          label="页面操作"
                          >
                          <template slot-scope="scope">
                            <el-button size="mini" @click.native="goToArea(scope.row)">进入儿童管理详情</el-button>
                          </template>
                      </el-table-column> -->
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
    </div>
</template>

<script>
import { getAuthCodeData,getAuthCodeList,createInvitationCode } from "@/config/api";
export default {
  data() {
    return {
      authCodeData: {
        lastMonthCreateCount: 0,
        thisMonthCreateCount: 0,
        totalCount: 0,
        unusedCount: 0,
        usedCount: 0
      },

      phone: "",
      authManageList: [],
      pageSize: 10,
      currentPage: 1,
      totalCount: 0
    };
  },
  created() {
    this.getAuthCodeData();
    this.getAuthCodeList(this.currentPage,this.pageSize)
  },
  methods: {
    createAuthCode(){
      this.$confirm('本次生成授权码一次生成 10 个', '提示', {
          distinguishCancelAndClose: true,
          type: "warning",
          confirmButtonText: '开始生成',
          cancelButtonText: '取消'
        })
          .then(() => {
            createInvitationCode({count:10})
            .then(res=>{
              this.$message({
                  type: 'success',
                  message: res.code==1?'生成授权码操作成功~':'生成授权码操作异常'
              });
              res.code ==1 && this.getAuthCodeList(this.currentPage,this.pageSize)
            })
            .catch(e=>{
              this.$message({
                  type: 'success',
                  message: '数据异常，请稍后重试'
              })
            })


          })
          .catch(action => {
            this.$message({
              type: 'info',
              message: action === 'cancel'
                ? '已取消本次操作'
                : '已取消本次操作'
            })
          });
    },
    getAuthCodeList(page,limit){
      getAuthCodeList({
        page,
        limit,
      })
      .then(res => {
          if (res.code == 1) {
            this.authManageList = res.data.invitationCodeList;
            this.totalCount = res.data.totalCount
          } else {
            this.$message.warning("查询授权码列表异常~");
          }
        })
        .catch(e => {
          this.$message.warning("查询授权码列表异常~");
        });
    },
    getAuthCodeData() {
      getAuthCodeData()
        .then(res => {
          if (res.code == 1) {
            this.authCodeData = res.data
          } else {
            this.$message.warning("查询授权码数据统计异常~");
          }
        })
        .catch(e => {
          this.$message.warning("查询授权码数据统计异常~");
        });
    },
    handleRunlist(page) {
      console.log(page);
      this.currentPage = page
      this.getAuthCodeList(page,this.pageSize)
    },
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "background:#409eff;color:#fff";
      } else {
        return "";
      }
    }
  }
};
</script>

<style lang="less">
.authManage {
  .authManage-module {
    margin-left: 0 !important;
    margin-right: 0 !important;
    margin-bottom: 10px;
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
  .authManagetData {
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

