<template>
    <div>
        <h2 style="margin-bottom: 20px;">{{ id ? '编辑' : '新建' }}管理员</h2>
        <el-form @submit.native.prevent="save" label-width="150px">  
            <el-form-item label="账号">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="model.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
                <el-button type="danger" @click="tui" >取消</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
    export default {
        props:{
            id:{}
        },
        data() {
            return {
                model: {
                },
            }
        },
        created(){
            this.id && this.lis();
        },
        methods: {
            async lis(){
                const res= await this.$http.get(`/rest/admin/${this.id}`)
                this.model = Object.assign({}, this.model , res.data)
            },
            async save() {
                let res 
                if(this.id){
                    await this.$http.put(`/rest/admin/${this.id}`, this.model)
                } else{
                    await this.$http.post('/rest/admin', this.model)
                }
                this.$router.push('/admin/list')
                this.$message({
                    message: '保存成功',
                    type: 'success'
                });
            },
            tui(){
                this.$router.push('/admin/list')
            }
        }
    }
</script>