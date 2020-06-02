<template>
    <div>
        <h2 style="margin-bottom: 20px;">{{ id ? '编辑' : '新增' }}英雄</h2>
        <el-form @submit.native.prevent="save" label-width="80px">
            <el-tabs type="border-card">
                <el-tab-pane label="基础信息">
                    <el-form-item label="英雄名称">
                        <el-input v-model="model.name"></el-input>
                    </el-form-item>
                    <el-form-item label="英雄称号">
                        <el-input v-model="model.title"></el-input>
                    </el-form-item>
                    <el-form-item enctype="multipart/form-data" label="英雄头像">
                        <el-upload class="avatar-uploader" 
                            :action="$http.defaults.baseURL + '/upload'"
                            :show-file-list="false" 
                            :headers="uploadAuth()"
                            :on-success="res => $set(this.model,'avatar',res.url)">
                            <img v-if="model.avatar" :src="model.avatar" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon" style="line-height: 178px;"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="类型">
                        <!-- multiple 多选 -->
                        <el-select v-model="model.categories" multiple>
                            <el-option v-for="item in category" :key="item._id" :label="item.name" :value="item._id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="难度">
                        <el-rate style="margin-top: 0.6rem;" :max='10' v-model="model.scores.difficult"></el-rate>
                    </el-form-item>
                    <el-form-item label="技能">
                        <el-rate style="margin-top: 0.6rem;" :max='10' v-model="model.scores.skills"></el-rate>
                    </el-form-item>
                    <el-form-item label="攻击">
                        <el-rate style="margin-top: 0.6rem;" :max='10' v-model="model.scores.attack"></el-rate>
                    </el-form-item>
                    <el-form-item label="生存">
                        <el-rate style="margin-top: 0.6rem;" :max='10' v-model="model.scores.survive"></el-rate>
                    </el-form-item>
                    <el-form-item label="出装推荐">
                        <el-select v-model="model.items1" multiple>
                            <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="使用技巧">
                        <el-input type="textarea" v-model="model.usageTips"></el-input>
                    </el-form-item>
                    <el-form-item label="对抗技巧">
                        <el-input type="textarea" v-model="model.battleTips"></el-input>
                    </el-form-item>
                    <el-form-item label="团战思路">
                        <el-input type="textarea" v-model="model.teamTips"></el-input>
                    </el-form-item>
                </el-tab-pane>

                <el-tab-pane label="技能">
                    <el-button @click="model.skills.push({})"><i class="el-icon-plus"></i>添加技能</el-button>
                    <el-row type="flex" style="flex-wrap: wrap;">
                        <el-col :md="11" style="margin: 2rem;padding: 1rem;border: 1px solid gainsboro;" v-for="(item,i) in model.skills" :key="i">
                            <el-form-item label="技能名称">
                                <el-input v-model="item.name" ></el-input>
                            </el-form-item>
                            <el-form-item label="技能图标">
                                <el-upload class="avatar-uploader" 
                                    :action="$http.defaults.baseURL + '/upload'"
                                    :show-file-list="false"
                                    :headers="uploadAuth()" 
                                    :on-success="res => $set(item,'icon',res.url)">
                                    <img v-if="item.icon" :src="item.icon" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon" style="line-height: 178px;"></i>
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="技能描述">
                                <el-input type="textarea" v-model="item.description"></el-input>
                            </el-form-item>
                            <el-form-item label="技能提示">
                                <el-input type="textarea" v-model="item.tips"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <!-- splice删除  ()里前面为要删除的id，后面是要删除的数量 -->
                                <el-button type="danger" 
                                @click="model.skills.splice(i,1)">删除</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-tab-pane>

                <el-form-item style="margin-top: 1rem;">
                    <el-button type="primary" native-type="submit">保存</el-button>
                    <el-button type="danger" @click="tui">取消</el-button>
                </el-form-item>
            </el-tabs>


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
                category: [],
                items: [],
                model: {
                    scores: {},
                    skills: [],
                },
            }
        },
        created() {
            this.lisItem();
            this.lisCategory();
            this.id && this.lis();
        },
        methods: {
            // avatarImg(res) {
            //     this.$set(this.model, 'avatar', res.url)
            // },
            async lis() {
                const res = await this.$http.get(`/rest/hero/${this.id}`)
                // this.model = res.data
                this.model = Object.assign({}, this.model, res.data)
            },
            async lisCategory() {
                const res = await this.$http.get(`/rest/category`)
                this.category = res.data
            },
            async lisItem() {
                const res = await this.$http.get(`/rest/item`)
                this.items = res.data
            },
            async save() {
                let res
                if (this.id) {
                    await this.$http.put(`/rest/hero/${this.id}`, this.model)
                } else {
                    await this.$http.post('/rest/hero', this.model)
                }
                this.$router.push('/hero/list')
                this.$message({
                    message: '保存成功',
                    type: 'success'
                });
            },
            tui() {
                this.$router.push('/hero/list')
            }
        }
    }
</script>

<style>
    
</style>