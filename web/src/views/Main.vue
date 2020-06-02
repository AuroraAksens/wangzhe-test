<template>
    <div>
        <div class="topbar bg-black py-2 px-3 d-fx ai-center">
            <img src="../assets/logo.png" height="25px">
            <div class="pl-1 flex-1">
                <div class="text-whire">王者荣耀</div>
                <div class="text-grey-1 fs-xxs">团队成就更多</div>
            </div>
            <button type="button" class="btn bg-primary py-1">立即下载</button>
        </div>
        <div class="bg-primary py-2">
            <div class="nav nav-inverse jc-around py-2">
                <div class="nav-item active">
                    <router-link class="nav-link" tag="div" to="/">首页</router-link>
                </div>
                <div class="nav-item">
                    <router-link class="nav-link" tag="div" to="/">攻略中心</router-link>
                </div>
                <div class="nav-item">
                    <router-link class="nav-link" tag="div" to="/">赛事中心</router-link>
                </div>
            </div>
        </div>
        
        <router-view ></router-view>
    </div>
</template>


<script>
export default {

}
</script>

<style>
.topbar{
    position: sticky;
    top: 0;
    z-index: 100;
}
</style>