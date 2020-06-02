<template>
    <div class="page-article" v-if="model">
        <div class="d-fx py-3 px-2" style="border-bottom: 1px solid gainsboro;">
            <div @click="tui" class="iconfont icon-Backblack text-bule"></div>
            <div class="flex-1 pl-2 text-bule text-overflow">
                <strong>{{model.title}}</strong>
            </div>
            <div class="text-grey">2020</div>
        </div>
        <div v-html="model.body" class="px-3 fs-xl body"></div>
        <div class="p-3 bottom">
            <div class="d-fx ai-center">
                <i class="iconfont icon-menu"></i>
                <strong class="text-bule fs-lg ml-1">相关资讯</strong>
            </div>
            <div>
                <router-link tag="div"
                v-for="item in model.related"
                :key="item._id"
                :to="`/article/${item._id}`"
                class="py-1 pt-2 fs-sm"
                >{{item.title}}</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            id:{ required:true  }
        },
        data(){
            return {
                model: null
            }
        },
        watch:{
            id:'articleList'
        },
        created(){
            this.articleList()
        },
        methods:{
            async articleList(){
                const res = await this.$http.get(`/article/${this.id}`)
                this.model = res.data
            },
            tui(){
                this.$router.push('/')
            }
        }
    }
</script>

<style>
    .body{
        line-height: 25px;
    }
    .body img{
        width: 100%;
    }
    .bottom{
        border-top: 1px solid gainsboro;
    }
</style>