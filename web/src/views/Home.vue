<template>
    <div>
        <!-- swiper -->
        <swiper :options="swiperOptions">
            <swiper-slide>
                <img class="w-100" src="../assets/wangzheIMG/58119a17e7c4bfd506d4f95a2e9eaf5c.png" alt="">
            </swiper-slide>
            <swiper-slide>
                <img class="w-100" src="../assets/wangzheIMG/3a349f0c3496eee4ec7276fe52ba5120.jpeg" alt="">
            </swiper-slide>
            <swiper-slide>
                <img class="w-100" src="../assets/wangzheIMG/ef5356f08710c9ab71265940a52f4e19.jpeg" alt="">
            </swiper-slide>
            <div class="swiper-pagination pagination-home text-right pr-3" slot="pagination"></div>
        </swiper>
        <!-- end of swiper -->

        <!-- nav-icons -->
        <div class="nav-icons bg-whire mt-3 pt-3 text-center">
            <div class="d-fx flex-w">
                <div class="nav-item mb-3">
                    <i class="sprite sprite-disclose"></i>
                    <div class="py-2">爆料站</div>
                </div>
                <div class="nav-item mb-3">
                    <i class="sprite sprite-story"></i>
                    <div class="py-2">故事站</div>
                </div>
                <div class="nav-item mb-3">
                    <i class="sprite sprite-shopping"></i>
                    <div class="py-2">周边商城</div>
                </div>
                <div class="nav-item mb-3">
                    <i class="sprite sprite-experience"></i>
                    <div class="py-2">体验服</div>
                </div>
                <div class="nav-item mb-3">
                    <i class="sprite sprite-new"></i>
                    <div class="py-2">新人专区</div>
                </div>
                <div class="nav-item mb-3">
                    <i class="sprite sprite-glory"></i>
                    <div class="py-2">荣耀·传承</div>
                </div>
                <div class="nav-item mb-3">
                    <i class="sprite sprite-simulation"></i>
                    <div class="py-2">模拟战资料库</div>
                </div>
                <div class="nav-item mb-3">
                    <i class="sprite sprite-campsite"></i>
                    <div class="py-2">王者营地</div>
                </div>
                <div class="nav-item mb-3">
                    <i class="sprite sprite-official"></i>
                    <div class="py-2">公众号</div>
                </div>
            </div>
            <div class="bg-light py-2">
                <i class="sprite sprite-shouqi"></i>
                收起
            </div>
        </div>
        <!-- end of nav-icons -->


        <!-- news card -->
        <m-list-card icon="menu" title="新闻资讯" :categories="newscard">
            <template #items="{cate}">
                <router-link tag="div" :to="`/article/${news._id}`" class="py-2 mt-2 fs-lg d-fx"
                v-for="(news, i) in cate.newList" 
                :key="i">
                    <span class="text-info">[{{news.categoryName}}]</span>
                    <span class="px-2">|</span>
                    <span class="flex-1 text-overflow">{{news.title}}</span>
                    <span class="text-grey">{{news.updatedAt | date}}</span>
                </router-link>
            </template>
        </m-list-card>
        <!-- end of news card -->

        <!-- hero card -->
        <m-list-card icon="card-hero" title="英雄列表" :categories="herocard">
            <template #items="{cate}">
                <div class="d-fx flex-w mt-2" style="margin: 0 -0.5rem;">
                    <div class="p-2 text-center" style="width: 20%;"
                        v-for="(hero, i) in cate.heroList" 
                        :key="i">
                        <img :src="hero.avatar" class="w-100">
                        <div>{{hero.name}}</div>
                    </div>
                </div>
            </template>
        </m-list-card>
        <!-- end of hero card -->

    </div>
</template>

<script>
    import dayjs from 'dayjs'

    export default {
        filters:{
            date(val){
                return dayjs(val).format('MM/DD')
            }
        },
        data() {
            return {
                swiperOptions: {
                    //开启循环模式
                    loop: true,
                    autoplay: {
                        //自动轮播
                        delay: 2000,
                        //当用户滑动图片后继续自动轮播
                        disableOnInteraction: false,
                    },
                    pagination: {
                        el: '.pagination-home',

                    },
                },
                newscard:[],
                herocard:[]
            }
        },
        methods:{
            async newList(){
                const res = await this.$http.get('/news/list')
                this.newscard = res.data
            },
            async heroList(){
                const res = await this.$http.get('/hero/list')
                this.herocard = res.data
            }
        },
        created(){
            this.newList();
            this.heroList()
        }
    }
</script>

<style lang="scss">
    @import '../assets/scss/home.scss';
</style>