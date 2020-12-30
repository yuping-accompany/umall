<template>
  <div>
    <el-container>
      <el-aside width="202px">
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
          unique-opened
        >
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <div v-for="item in userInfo.menus" :key="item.id">
            <el-menu-item :index="item.url" v-if="!item.children">{{item.title}}</el-menu-item>
            <el-submenu :index="item.id +''" v-if="item.children">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item :index="i.url" v-for="i in item.children" :key="i.id">{{i.title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </div>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="header">
          <div class="headright">
            <span>{{userInfo.username}}</span>
            <el-button type="danger" @click="loginout">退出登录</el-button>
          </div>
        </el-header>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view class="con"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { successAlert } from "../../utils/alert";
export default {
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
    }),
  },
  methods: {
    ...mapActions({
      changuser: "changuser",
    }),
    loginout() {
      this.changuser({});
      successAlert("退出成功");
      this.$router.replace("/login");
    },
  },
};
</script>

<style scoped>
.el-menu-vertical-demo {
  height: 100vh;
}
.header {
  background: #b3c0d1;
}
.con {
  padding-top: 20px;
}
.headright {
  position: absolute;
  top: 10px;
  right: 10px;
}
.headright span {
  font-size: 16px;
}
</style>