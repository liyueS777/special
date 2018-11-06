
<template>
    <div class="authManage">
        <el-row class="authManage-module" :gutter="20">
            <el-col :span="3"><div class="num">设备总数：5689</div></el-col>
            <el-col :span="3"><div class="num">设备总数：5689</div></el-col>
            <el-col :span="3"><div class="num">设备总数：5689</div></el-col>
        </el-row>
        <el-row class="authManage-module" :gutter="20">
            <el-col :span="3"><div class="num">设备总数：5689</div></el-col>
            <el-col :span="3"><div class="num">设备总数：5689</div></el-col>
            <el-col :span="3"><div class="num">设备总数：5689</div></el-col>
        </el-row>
        <div class="line-l">
            <el-input style="width:300px;margin-right:10px;" placeholder="请输入用户手机号查询" v-model="phone" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" size="mini"></el-button>
            </el-input>
            <el-button size="medium" type="success">生成授权码</el-button>
        </div>
        <el-table
                      header-row-class-name="myTablee"
                      :header-cell-style="getRowClass"
                      :fit="true"
                      border
                      stripe
                      class="authManagetData"
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
                          width="120"
                          show-overflow-tooltip
                          >
                          <template slot-scope="scope">{{ 1 }}</template>
                          
                      </el-table-column>
                      <el-table-column
                          align="center"
                          header-align="center"
                          prop="deadline"
                          label="认证码"
                          >
                          <template slot-scope="scope">
                          </template>
                      </el-table-column>
                      <el-table-column
                          align="center"
                          header-align="center"
                          prop="num"
                          label="生成时间"
                          show-overflow-tooltip>
                          
                          <template slot-scope="scope">
                              
                          </template>
                          
                      </el-table-column>
                      <el-table-column
                          align="center"
                          header-align="center"
                          prop="status"
                          label="使用时间">
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
                      class="pages"
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
        authManageList:[1,2,3,4],
        pageSize:10,
        currentPage:1,
        totalPage:2
    };
  },
  methods:{
    handleRunlist(page){
        console.log(page)
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
.authManage {
  .authManage-module {
    margin-bottom: 10px;
    background: #fff;
    padding: 10px;
    .el-col {
      text-align: center;
      .num {
        background: #3ac5e6;
        height: 30px;
        line-height: 30px;
        border-radius:4px;
        color:#fff;
      }
    }
  }
  .authManagetData {
      margin: 20px auto;
      border-radius: 4px;
  }
  .line-l {
    padding:10px 10px 10px 15px;
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

