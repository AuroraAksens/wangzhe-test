<template>
    <div class="card mt-3 p-3 bg-whire">
        <div class="card-header d-fx">
            <i class="iconfont fs-xl" :class="`icon-${icon}`"></i>
            <div class="flex-1 fs-xl px-2">{{title}}</div>
            <i class="iconfont icon-menu1 fs-xl" ></i>
        </div>
        <div class="card-body pt-3">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            title:{type:String , required:true},
            icon:{type:String , required:true},
        }
    }
</script>

<style>
    .card{
        border-bottom: 1px solid gainsboro;
        border-top: 1px solid gainsboro;
    }
</style>