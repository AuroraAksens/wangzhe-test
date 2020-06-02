<template>
    <div>
        <h2 style="margin-bottom: 20px;">{{ id ? '编辑' : '新建' }}分类</h2>
        <el-form @submit.native.prevent="save" label-width="80px">
            <el-form-item label="上级分类">
                <el-select v-model="model.parent">
                    <!-- :label为渲染的数据
                         :value为保存的数据 -->
                    <el-option v-for="item in parents"
                        :key="item._id"
                        :label="item.name"
                        :value="item._id">
                    </el-option>
                </el-select>
                
            </el-form-item>
            <el-form-item label="分类名称">
                <el-input v-model="model.name"></el-input>
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
                model: {},
                parents:[]
            }
        },
        created(){
            this.lisParents()
            this.id && this.lis();
        },
        methods: {
            async lis(){
                const res= await this.$http.get(`/rest/category/${this.id}`)
                this.model = res.data
            },
            async lisParents(){
                const res = await this.$http.get(`/rest/category`)
                this.parents = res.data
            },
            async save() {
                let res 
                if(this.id){
                    await this.$http.put(`/rest/category/${this.id}`, this.model)
                } else{
                    await this.$http.post('/rest/category', this.model)
                }
                this.$router.push('/category/list')
                this.$message({
                    message: '保存成功',
                    type: 'success'
                });
            },
            tui(){
                this.$router.push('/category/list')
            }
        }
    }
</script>