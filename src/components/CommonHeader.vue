<template>
    <div class="header-container">
        <div class="l-content">
            <el-button @click="handleMenu" icon="el-icon-menu" size="mini"></el-button>
            <!-- 面包屑 -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{ item.label
                }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown @command="handleClick">
                <span class="el-dropdown-link">
                    <img class="user" src="../assets/images/cyy.jpg" alt="">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item command="cancel">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
// 引入辅助函数，具体看vuex
import { mapState } from 'vuex'
import Cookie from 'js-cookie'
export default {
    data() {
        return {}
    },
    methods: {
        handleMenu() {
            this.$store.commit('collapseMenu')
        },
        handleClick(command) {
            if (command === 'cancel') {
                console.log("登出")
                //清除cookie的token信息
                Cookie.remove('token')
                // 清楚cookie中的menu
                Cookie.remove('menu')
                // 跳转登陆页
                this.$router.push('/login')
            }

        }
    },
    computed: {
        // ES6扩展运算符
        ...mapState({
            tags: state => state.tab.tabsList
        })
    },
    mounted() {
        console.log(this.tags, 'tags')
    }
}
</script>
<style lang="less" scoped>
.header-container {
    padding: 0 20px;
    background-color: #333;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    color: white;
    font-size: 14px;
    margin-left: 10px;
}

.r-content {
    .user {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
}

.l-content {
    display: flex;
    align-items: center;

    // 样式的穿刺
    /deep/.el-breadcrumb__item {
        .el-breadcrumb__inner {

            // &并且，有el-breadcrumb_inner何is-link的时候
            // class="el-breadcrumb_inner is-link"
            &.is-link {
                color: rgb(127, 132, 132);
                margin-left: 10px;
            }
        }

        // 伪类     last-child:最后一个子元素
        &:last-child {
            .el-breadcrumb__inner {
                color: white;
                margin-left: 10px;
            }
        }
    }
}</style>