<template>
  <div class="runList">
    <el-row class="runList-module bg-shadow" :gutter="20">
      <el-col :span="3">
        <div class="num">设备总数：{{runDataMessage.totalCount}}</div>
      </el-col>
      <el-col :span="3">
        <div class="num">正常设备：{{runDataMessage.usableCount}}</div>
      </el-col>
      <el-col :span="3">
        <div class="num">过期设备：{{runDataMessage.overdueCount}}</div>
      </el-col>
    </el-row>
    <el-row class="runList-module bg-shadow" :gutter="20">
      <el-col :span="3">
        <div class="num">上月新激活：{{runDataMessage.lastMonthActivateCount}}</div>
      </el-col>
      <!-- <el-col :span="3"><div class="num">上月新授权：5689</div></el-col> -->
      <el-col :span="3">
        <div class="num">本月新激活：{{runDataMessage.thisMonthActivateCount}}</div>
      </el-col>
      <!-- <el-col :span="3"><div class="num">本月续费：5689</div></el-col> -->
    </el-row>
    <div class="line-l bg-shadow">
      <el-input
        style="width:300px;margin-right:10px;;"
        placeholder="请输入用户手机号查询"
        v-model.trim="phone"
        @input="whenNull"
        @keyup.native.enter="searchByPhone"
        class="input-with-select"
      >
        <el-button slot="append" icon="el-icon-search" size="mini" @click.native="searchByPhone"></el-button>
      </el-input>
      <!-- <el-button size="medium" plain type="primary">导出数据</el-button> -->
      <!-- <el-button size="medium" plain type="success">导出全部数据</el-button> -->
    </div>
    <el-table
      header-row-class-name="myTablee"
      :header-cell-style="getRowClass"
      :fit="true"
      border
      stripe
      class="runListData bg-shadow"
      ref="multipleTable"
      :data="runList"
      tooltip-effect="dark"
    >
      <el-table-column
        row-class-name="rdd"
        align="center"
        header-align="center"
        type="index"
        width="60"
        label="编号"
      ></el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        prop="account"
        label="用户账号"
        width="140"
        show-overflow-tooltip
      >
        <template slot-scope="scope">{{ scope.row.phone }}</template>
      </el-table-column>
      <el-table-column align="center" header-align="center" prop="deadline" label="激活时间">
        <template slot-scope="scope">{{ scope.row.activateTime | translateToDate }}</template>
      </el-table-column>

      <el-table-column
        align="center"
        header-align="center"
        prop="deadline"
        width="120"
        label="续费次数"
      >
        <template slot-scope="scope">{{ scope.row.renewCount }}</template>
      </el-table-column>
      <el-table-column align="center" header-align="center" prop="deadline" label="有效截止时间">
        <template slot-scope="scope">{{ scope.row.validTime | translateToDate }}</template>
      </el-table-column>
      <!-- <el-table-column
                          align="center"
                          header-align="center"
                          prop="num"
                          label="续费次数"
                          show-overflow-tooltip>
                          
                          <template slot-scope="scope">
                              
                          </template>
                          
      </el-table-column>-->
      <el-table-column align="center" header-align="center" prop="status" label="程序状态">
        <template
          slot-scope="scope"
        >{{ scope.row.equipmentState==0?'已过期':(scope.row.equipmentState==1?'未过期':'未激活') }}</template>
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
      </el-table-column>-->
    </el-table>
    <el-pagination
      @current-change="handleRunlist"
      :page-size="pageSize"
      class="pages bg-shadow"
      background
      :current-page="currentPage"
      layout="total,prev, pager, next"
      :total="totalCount"
    ></el-pagination>
  </div>
</template>

<script>
import {
  getRunList,
  getRunData,
  getEquipmentByPhone,
  getHeaD
} from "@/config/api";
const regNum = /^[0-9]*$/;
export default {
  data() {
    return {
      runDataMessage: {
        lastMonthActivateCount: 0,
        overdueCount: 0,
        thisMonthActivateCount: 0,
        totalCount: 0,
        usableCount: 0
      },

      //模糊查询字段
      searchFlag: false,
      phone: "",
      runList: [],
      pageSize: 10,
      currentPage: 1,
      totalCount: 0
    };
  },
  created() {
    this.getRunList(this.currentPage, this.pageSize, 1);
    this.getRunData();
  },
  methods: {
    //兼顾一下为空的时候用户不会点击搜索和回车
    whenNull(key) {
      console.log(1111, key);
      if (!key) {
        this.getRunList(1, this.pageSize, 1);
      }
    },
    searchByPhone() {
      // this.getRunList(1,this.pageSize,2)
      [1, 2, 3, 4, 5, 6].map(() => {
        getHeaD()
          .then(res => {
            if (res.code == 1) {
              this.$message("111");
            } else {
              this.$message("err1");
            }
          })
          .catch(err => {
            console.log('err1',err,'message' in err)
            'message' in err && this.$message.warning('yi')
          });
      });
    },
    getRunData() {
      getRunData()
        .then(res => {
          if (res.code == 1) {
            this.runDataMessage = res.data;
          } else {
            this.$message.warning("查询设备运数据统计异常~");
          }
        })
        .catch(e => {});
    },
    getRunList(page, limit, type) {
      var data = {
        page,
        limit
      };
      // 1 代表不进行模糊查询  2是进行模糊查询
      if (type == 2) {
        if (!this.phone || !this.phone.trim()) {
          // this.$message.warning('输入的内容不能为空，必须是数字类型~');
          // return;
        }
        if (!regNum.test(this.phone)) {
          this.$message.warning("输入的内容格式不正确，必须是数字类型~");
          return;
        }
        data["phone"] = this.phone;
      }
      getRunList(data)
        .then(res => {
          if (res.code == 1) {
            if (type == 2) {
              this.currentPage = 1;
              this.searchFlag = true;
            }
            this.runList = res.data.equipmentsList;
            this.totalCount = res.data.totalCount;
          } else {
            this.$message.warning("查询设备运行列表数据异常~");
          }
        })
        .catch(e => {});
    },
    handleRunlist(page) {
      console.log(page);
      this.currentPage = page;
      if (this.searchFlag && this.phone) {
        var type = 2;
      } else {
        var type = 1;
      }
      this.getRunList(page, this.pageSize, type);
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
.runList {
  .runList-module {
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
  .runListData {
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
