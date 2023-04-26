<template>
    <!-- :model="form"  :  在form中定义数据 -->
    <el-form ref="form" label-width="70px" :inline="true" class="login-container" :model="form" :rules="rules">
        <h3 class="login_title">系统登录</h3>
        <!--prop:对应的校验规则,prop="username"要和rules中的字段名称一一对应。 -->
        <el-form-item label="用户名" prop="username">
            <!-- 数据的双向绑定 -->
            <el-input v-model="form.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密  码" prop="password">
            <!-- 数据的双向绑定 -->
            <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="submit" style="margin-left: 105px; margin-top: 10px" type="primary">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import Mock from "mockjs";
import Cookie from "js-cookie";
import { getMenu } from "../api";
export default {
    data() {
        return {
            form: {
                username: "",
                password: "",
            },
            // 在rules中定义校验规则
            rules: {
                username: [
                    {
                        required: true,
                        trigger: "blur",
                        message: "请输入用户名",
                    },
                ],
                password: [
                    {
                        required: true,
                        trigger: "blur",
                        message: "请输入密码",
                    }
                ]
            }
        }
    },
    methods: {
        // 登录 获取form数据
        submit() {
            // token信息，通过mock模拟数据。
            // 获取随机数
            // const token = Mock.Random.guid()

            // form表单的校验通过
            this.$refs.form.validate((valid) => {
                if (valid) {
                    getMenu(this.form).then(({ data }) => {
                        console.log(data)
                        if (data.code === 20000) {
                            // 将token信息存入cookie用于不同页面间的通信
                            // cookie属性名，值
                            Cookie.set('token', data.data.token);

                            // 获取菜单的数据，存入store中
                            this.$store.commit('setMenu',data.data.menu)
                            this.$store.commit('addMenu',this.$router)
                            // 跳转到首页
                            this.$router.push("/home");
                        }else{
                            this.$message.error(data.data.message)
                        }
                    })
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.login-container {
    width: 350px;
    border: 1px solid #eaeaea;
    margin: 80px auto;
    padding: 35px 35px 15px 35px;
    background-color: white;
    border-radius: 15px;
    box-shadow: 0 0 25px #cac6c6;
    // box-sizing: border-box就是将border和padding数值包含在width和height之内，
    // 这样的好处就是修改border和padding数值盒子的大小不变。
    box-sizing: border-box;

    .login_title {
        text-align: center;
        margin-bottom: 40px;
        color: #505458;
    }

    .el-input {
        width: 198px;
    }
}
</style>
