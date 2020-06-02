<template>
    <div>
        <el-card header="请先登录" class="login-card">
            <!-- @submit绑定点击按钮事件  native表示监听原生表单提交事件  prevent表示阻止表单的默认提交不要跳转页面 -->
            <el-form @submit.native.prevent="login" label-width="80px">
                <el-form-item label="用户名">
                    <el-input v-model="model.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input  v-model="model.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" native-type="submit">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    export default  {
        data(){
            return {
                model:{},
            }
        },
        methods:{
            async login(){
               const res =  await this.$http.post('/login' , this.model)
            //    localStorage为浏览器的存储 将后台传过来的token写入进去 (浏览器关闭了还存在)
               localStorage.token = res.data.token
            //    sessionStorage跟上面原理一样但是浏览器关闭自动清除不保存
            //    sessionStorage.token = res.data.token
            this.$router.push('/')
            this.$message({
                type : 'success',
                message: '登录成功'
            })
            }
        }
    }
</script>

<style>
    .login-card{
        width: 25rem;
        margin: 15rem auto;
    }
</style>