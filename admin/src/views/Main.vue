<template>
  <div>
    <el-container direction="vertical" style="height: 100vh">
      <el-header style="text-align: right; font-size: 12px;background-color: rgb(164, 206, 248);">
          <i class="el-icon-user" style="margin-right: 15px"></i>
          <span style="margin-right: 2rem;font-size: 15px;">姚泽辉</span>
          <el-button type="danger" size="mini" @click="clearToken">退出</el-button>
      </el-header>
      <el-container style="height: 90%;">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <!-- unique-opened打开一个菜单时其他菜单关闭 -->
          <el-menu router  unique-opened>
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-files"></i>分类管理</template>
              <el-menu-item-group>
                <el-menu-item index="/category/create">新建分类</el-menu-item>
                <el-menu-item index="/category/list">分类列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-copy-document"></i>装备管理</template>
            <el-menu-item-group>
              <el-menu-item index="/item/create">添加装备</el-menu-item>
              <el-menu-item index="/item/list">装备列表</el-menu-item>
            </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-user-solid"></i>英雄管理</template>
            <el-menu-item-group>
              <el-menu-item index="/hero/create">新增英雄</el-menu-item>
              <el-menu-item index="/hero/list">英雄列表</el-menu-item>
            </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title"><i class="el-icon-tickets"></i>文章管理</template>
            <el-menu-item-group>
              <el-menu-item index="/article/create">新增文章</el-menu-item>
              <el-menu-item index="/article/list">文章列表</el-menu-item>
            </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title"><i class="el-icon-monitor"></i>广告位管理</template>
              <el-menu-item-group>
                <el-menu-item index="/ad/create">新增广告位</el-menu-item>
                <el-menu-item index="/ad/list">广告位列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title"><i class="el-icon-user"></i>管理员管理</template>
              <el-menu-item-group>
                <el-menu-item index="/admin/create">新增管理员</el-menu-item>
                <el-menu-item index="/admin/list">管理员列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view :key="$route.path"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
    data() {
      return {
      }
    },
    methods:{
      clearToken(){
        localStorage.clear()
        this.$router.push('/login')
        this.$message({
                    message: '退出成功',
                    type: 'success'
                });
      }
    }
  };
</script>