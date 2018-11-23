<template>
    <div class="list-index">
        <el-row class="index-module bg-shadow" :gutter="20">
            <el-col :span="3"><router-link class="link-a" :to="{name:'runList'}">设备运行列表</router-link></el-col>
            <el-col :span="3"><router-link class="link-a" :to="{name:'IDused'}">试用ID使用记录</router-link></el-col>
            <el-col :span="3"><router-link class="link-a" :to="{name:'authManage'}">授权码管理</router-link></el-col>
        </el-row>
        <el-dropdown size="small" split-button type="primary" plain trigger="hover">
            管理员
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
        <router-view class="list-index-rv"></router-view>
    </div>
</template>

<script>
export default {
    methods:{
        logout(){
            window.localStorage.removeItem("S_LOGIN_MESSAGE");
            this.$router.push({name:'login'})
        }
    }
}
</script>

<style lang="less">
    .list-index {
        position: relative;
        .list-index-rv {
            box-sizing: border-box;
            padding: 20px;
        }
        .index-module {
            background: #fff;
            margin:0 !important;
            // border-bottom: 1px solid #c0c4cc;
            padding:20px 0 20px 20px;
            box-sizing: border-box;
            // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
        .router-link-active {
            background:#409EFF !important;
        }
        .link-a {
            display: block;
            padding: 10px;
            background: #999;
            color:white;
            text-align: center;
            border-radius: 5px;
            box-sizing: border-box;
            transition: background 0.3s ease-in;
        }
        
        .el-dropdown {
            position: absolute;
            top: 10px;
            right: 10px;
            // width: 90px;
            // padding: 10px;
            // border-radius: 4px;
            // transition:background 0.4s ease-out;
        }
    }
</style>
