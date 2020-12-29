<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <!-- 表单 -->
    <v-list :list="list" @init="init" @edit="edit"></v-list>
    <!-- 弹窗 -->
    <v-add :info="info" @init="init" ref="add"></v-add>
  </div>
</template>

<script>
import vList from "./components/list";
import vAdd from "./components/add";
import { bannerList } from "../../utils/http";
export default {
  data() {
    return {
      info: {
        isshow: false,
        isadd:false
      },
      list: [],
    };
  },
  components: {
    vList,
    vAdd,
  },
  methods: {
    willAdd() {
      this.info.isshow = true;
      this.info.isadd = true;
    },
    init() {
      bannerList().then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.list;
        }
      });
    },
    //编辑
    edit(id){
      this.info.isshow=true
      this.info.isadd=false
      this.$refs.add.getOne(id)
    }
  },
  mounted() {
    this.init()
  },
};
</script>

<style>
</style>