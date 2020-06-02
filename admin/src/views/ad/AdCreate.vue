<template>
    <div>
        <h2 style="margin-bottom: 20px;">{{ id ? '编辑' : '新建' }}广告位</h2>
        <el-form @submit.native.prevent="save" label-width="150px">  
            <el-form-item label="广告位名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="model.items.push({})"><i class="el-icon-plus"></i>添加广告位</el-button>
                    <el-row type="flex" style="flex-wrap: wrap;">
                        <el-col :md="24" style="margin: 2rem;padding: 1rem;border: 1px solid gainsboro;" v-for="(item,i) in model.items" :key="i">
                            <el-form-item label="广告链接(URL)">
                                <el-input v-model="item.url" ></el-input>
                            </el-form-item>
                            <el-form-item label="广告图片" style="margin-top: 1rem;">
                                <el-upload class="avatar-uploader" 
                                    :action="$http.defaults.baseURL + '/upload'"
                                    :headers="uploadAuth()"
                                    :show-file-list="false" 
                                    :on-success="res => $set(item,'image',res.url)">
                                    <img v-if="item.image" :src="item.image" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon" style="line-height: 178px;"></i>
                                </el-upload>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="danger" 
                                @click="model.items.splice(i,1)">删除</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
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
                    items:[]
                },
            }
        },
        created(){
            this.id && this.lis();
        },
        methods: {
            async lis(){
                const res= await this.$http.get(`/rest/ad/${this.id}`)
                this.model = Object.assign({}, this.model , res.data)
            },
            async save() {
                let res 
                if(this.id){
                    await this.$http.put(`/rest/ad/${this.id}`, this.model)
                } else{
                    await this.$http.post('/rest/ad', this.model)
                }
                this.$router.push('/ad/list')
                this.$message({
                    message: '保存成功',
                    type: 'success'
                });
            },
            tui(){
                this.$router.push('/ad/list')
            }
        }
    }
</script>