<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <!-- 弹框 -->
    <v-add :info="info" ref="add"></v-add>

    <!-- 表单 -->
    <v-list @edit="edit"></v-list>
  </div>
</template>

<script>
import vList from "./components/list";
import vAdd from "./components/add";
// import { cateList } from "../../utils/http";
import{mapGetters, mapActions}from "vuex"
export default {
  data() {
    return {
      info: {
        isshow: false,
        isadd:true
      },
      // list: [],
    };
  },
  components: {
    vList,
    vAdd,
  },
  computed:{
    ...mapGetters({
      "list":"cate/list"
    })
  },
  methods: {
    ...mapActions({
      "reqlist":"cate/reqList"
    }),
    //添加
    willAdd() {
      this.info.isshow = true;

      this.info.isadd=true
    },
    init() {
      //分类列表
      this.reqlist()
      // cateList({ istree: true }).then((res) => {
      //   if (res.data.code == 200) {
      //     this.list = res.data.list;
      //   }
      // });
    },
    //编辑
    edit(id){
      //弹框出现
      this.info.isshow=true
      this.info.isadd=false
      this.$refs.add.getOne(id)
    }
  },
  mounted() {
    // this.init()
     this.reqlist()
  },
};
</script>

<style>
</style>