<template>
    <div>
        <h2 style="margin-bottom: 20px;">{{ id ? '编辑' : '添加' }}装备</h2>
        <el-form @submit.native.prevent="save" label-width="80px">
            <el-form-item label="装备名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <!-- 使用form提交数据时，如果需要提交的数据中含有图片、音视频等，
            需要给form添加enctype="multipart/form-data"属性，如果不加，
            默认以enctype="application/x-www-form-urlencoded"编码传输 -->
            <el-form-item enctype="multipart/form-data" label="装备图片">
                <!--                   调用axios的http     defaults为默认参数里面有个baseURL
                    action  提交接口    $http.defaults.baseURL
                    :show-file-list    是否显示已上传文件列表
                    :on-success        成功之后做什么
                    :before-upload     上传之前做什么
                 -->
                <el-upload class="avatar-uploader" 
                    :action="$http.defaults.baseURL + '/upload'"
                    :show-file-list="false" 
                    :headers="uploadAuth()"
                    :on-success="iconImg">
                    <img v-if="model.avatar" :src="model.avatar" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon" style="line-height: 178px;"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
                <el-button type="danger" @click="tui">取消</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
    export default {
        props: {
            id: {}
        },
        data() {
            return {
                model: {},
            }
        },
        created() {
            this.id && this.lis();
        },
        methods: {
             iconImg(res) {
                // vue的显示赋值 跟下面的作用一样   并且跟模型字段有关联
                 this.$set(this.model,'avatar', res.url)
                // this.model = res.url;
            },
            async lis() {
                const res = await this.$http.get(`/rest/item/${this.id}`)
                this.model = res.data
            },
            async save() {
                let res
                if (this.id) {
                    await this.$http.put(`/rest/item/${this.id}`, this.model)
                } else {
                    await this.$http.post('/rest/item', this.model)
                }
                this.$router.push('/item/list')
                this.$message({
                    message: '保存成功',
                    type: 'success'
                });
            },
            tui() {
                this.$router.push('/item/list')
            }
        }
    }
</script>

<style>
    
</style>