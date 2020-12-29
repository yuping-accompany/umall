<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>

    <!-- 表格 -->
    <v-list :list="list" @init="init" @edit="edit"></v-list>
    <!-- 弹框 -->
    <v-add :info="info" @init="init" ref="add"></v-add>
  </div>
</template>

<script>
import vList from "./componets/list";
import vAdd from "./componets/add";
import { roleList } from "../../utils/http";
export default {
  data() {
    return {
      info: {
        //弹框是否显示
        isshow: false,
        isupdate:true,
      },
       list: [],
    };
  },
  components: {
    vList,
    vAdd,
  },
  methods: {
    //点击添加
    willAdd() {
      this.info.isshow = true;

      this.info.isupdate = true
    },
    //表格后端请求数据封装（刷新）
    init() {
      roleList().then((res) => {
        this.list = res.data.list;
        // console.log(this.list);
        localStorage.setItem("isrole",JSON.stringify(res.data.list))
      });
    },

    //编辑
    edit(id){
      //弹框展示
      this.info.isshow=true

      this.info.isupdate=false
      //父组件调用子组件的方法
      this.$refs.add.getOne(id)


    }
  },
  mounted(){
    //表格刷新
     this.init()
  }
};
</script>

<style>
</style>