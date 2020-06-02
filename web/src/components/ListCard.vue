<template>
    <m-card :icon="icon" :title="title">
        <div class="nav  jc-between pt-3"
        style="border-top: 1px solid rgb(231, 230, 230);">
            <div class="nav-item"  
                 :class="{active: active === i}"
                 v-for="(category,i) in categories" 
                 :key="i" 
                 @click="$refs.list.$swiper.slideTo(i)">
                <div>{{category.name}}</div>
            </div>
        </div>
        <!-- ref类似于HTML里的id -->
        <swiper ref="list" :options="{autoHeight:true}"  @slide-change="() => active = $refs.list.$swiper.realIndex" >
            <swiper-slide v-for="(category, i) in categories" :key="i">
                <slot name="items" :cate="category"></slot>
            </swiper-slide>
        </swiper>
    </m-card>
</template>

<script>
    export default {
        props:{
            icon:{type:String , required:true},
            title:{type:String , required:true},
            categories:{type:Array , required:true},
        },
        data(){
            return{
                active: 0,
            }
        },
    }
</script>

<style></style>