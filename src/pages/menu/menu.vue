<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <!-- 表格 -->
    <v-list :list="list" @init="init" @edit="edit"></v-list>
    <!-- 弹框                         父组件接受     父组件要调用子组件的方法-->
    <v-add :info="info" :list="list" @init="init" ref="add"></v-add>
  </div>
</template>

<script>
import vList from "./components/list";
import vAdd from "./components/add";
import { menuList } from "../../utils/http";
export default {
  data() {
    return {
      info: {
        isshow: false,
        addorupdate: true,
      },
      list: [],
    };
  },
  components: {
    vList,
    vAdd,
  },
  methods: {
    // 添加
    willAdd() {
      this.info.isshow = true;
      this.info.addorupdate = true;
    },
    init() {
      menuList().then((res) => {
        this.list = res.data.list;
        localStorage.setItem("list", JSON.stringify(res.data.list))
        
      });
    },
    //编辑
    edit(id) {
      //弹框出现
      this.info.isshow = true;
      this.info.addorupdate = false;
      //父组件要调用子组件的方法
      this.$refs.add.getOne(id);
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
</style>