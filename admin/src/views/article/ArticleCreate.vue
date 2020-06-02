<template>
    <div>
        <h2 style="margin-bottom: 20px;">{{ id ? '编辑' : '新建' }}文章</h2>
        <el-form @submit.native.prevent="save" label-width="80px">
            <el-form-item label="所属分类">
                <el-select v-model="model.category" multiple >
                    <el-option v-for="item in category"
                        :key="item._id"
                        :label="item.name"
                        :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文章标题">
                <el-input v-model="model.title"></el-input>
            </el-form-item>
            <el-form-item label="文章标题">
                <!-- useCustomImageHandler 处理图像上传，而不是使用默认转换为Base64 -->
                <vue-editor useCustomImageHandler @image-added="handleImageAdded" v-model="model.body"></vue-editor>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
                <el-button type="danger" @click="tui" >取消</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
    import { VueEditor } from 'vue2-editor'

    export default {
        props:{
            id:{}
        },
        components:{
            VueEditor,
        },
        data() {
            return {
                model: {},
                category:[]
            }
        },
        created(){
            this.lisParents()
            this.id && this.lis();
        },
        methods: {
            async handleImageAdded(file, Editor, cursorLocation, resetUploader){
                // new FormData 为提交表单数据
                 const formData = new FormData();
                //  append('',file) ''里为后端定义的上传参数  file为这里的参数
                 formData.append("file",file);
                 const res = await this.$http.post('upload',formData);
                //  insertEmbed为插入一个元素   cursorLocation为光标的位置  "image"为在光标位置插入图片  res.data.url为图片的地址
                 Editor.insertEmbed(cursorLocation,"image", res.data.url);
                //  resetUploader重置上传器
                 resetUploader();
            },
            async lis(){
                const res= await this.$http.get(`/rest/article/${this.id}`)
                this.model = Object.assign({},this.model, res.data)
            },
            async lisParents(){
                const res = await this.$http.get(`/rest/category`)
                this.category = res.data
            },
            async save() {
                let res 
                if(this.id){
                    await this.$http.put(`/rest/article/${this.id}`, this.model)
                } else{
                    await this.$http.post('/rest/article', this.model)
                }
                this.$router.push('/article/list')
                this.$message({
                    message: '保存成功',
                    type: 'success'
                });
            },
            tui(){
                this.$router.push('/article/list')
            }
        }
    }
</script>