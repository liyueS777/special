<template>
    <div class="runList">
        <el-row class="runList-module bg-shadow" :gutter="20">
            <el-col :span="3"><div class="num">设备总数：5689</div></el-col>
            <el-col :span="3"><div class="num">设备总数：5689</div></el-col>
            <el-col :span="3"><div class="num">设备总数：5689</div></el-col>
        </el-row>
        <el-row class="runList-module bg-shadow" :gutter="20">
            <el-col :span="3"><div class="num">设备总数：5689</div></el-col>
            <el-col :span="3"><div class="num">设备总数：5689</div></el-col>
            <el-col :span="3"><div class="num">设备总数：5689</div></el-col>
        </el-row>
        <div class="line-l bg-shadow">
            <el-input style="width:300px;margin-right:10px;;" placeholder="请输入用户手机号查询" v-model="phone" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" size="mini"></el-button>
            </el-input>
            <el-button size="medium" plain type="primary">导出数据</el-button>
            <el-button size="medium" plain type="success">导出全部数据</el-button>
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
                          label="用户账号"
                          width="120"
                          show-overflow-tooltip
                          >
                          <template slot-scope="scope">{{ 1 }}</template>
                          
                      </el-table-column>
                      <el-table-column
                          align="center"
                          header-align="center"
                          prop="deadline"
                          label="有效截止时间"
                          >
                          <template slot-scope="scope">
                          </template>
                      </el-table-column>
                      <el-table-column
                          align="center"
                          header-align="center"
                          prop="num"
                          label="续费次数"
                          show-overflow-tooltip>
                          
                          <template slot-scope="scope">
                              
                          </template>
                          
                      </el-table-column>
                      <el-table-column
                          align="center"
                          header-align="center"
                          prop="status"
                          label="程序状态">
                          <template slot-scope="scope">
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
                      :total="totalPage">
                    </el-pagination>
    </div>
</template>

<script>
export default {
  data() {
    return {
      phone: "",
      runList: [1, 2, 3, 4],
      pageSize: 10,
      currentPage: 1,
      totalPage: 2
    };
  },
  methods: {
    handleRunlist(page) {
      console.log(page);
    },
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "background:#498e26;color:#fff";
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
        height: 30px;
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
