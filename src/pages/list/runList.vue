<template>
    <div class="runList">
        <el-row class="runList-module" :gutter="20">
            <el-col :span="3"><div class="num">设备总数：5689</div></el-col>
            <el-col :span="3"><div class="num">设备总数：5689</div></el-col>
            <el-col :span="3"><div class="num">设备总数：5689</div></el-col>
        </el-row>
        <el-row class="runList-module" :gutter="20">
            <el-col :span="3"><div class="num">设备总数：5689</div></el-col>
            <el-col :span="3"><div class="num">设备总数：5689</div></el-col>
            <el-col :span="3"><div class="num">设备总数：5689</div></el-col>
        </el-row>
        <el-input style="width:300px;margin-right:10px" placeholder="请输入用户手机号查询" v-model="phone" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" size="mini"></el-button>
        
        </el-input>
        <el-button size="medium">导出数据</el-button>
        <el-button size="medium">导出全部数据</el-button>
    </div>
</template>

<script>
export default {
    data(){
        return {
            phone:''
        }
    }
}
</script>

<style lang="less">
    .runList {
        .runList-module {
            margin-bottom: 10px;
            .el-col {
                text-align: center;
                .num {
                    background: #ebeef5;
                    padding-top: 10px;
                    padding-bottom: 10px;
                }
            }
        }
    }
    
</style>
