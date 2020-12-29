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
import{mapGetters, mapActions}from "vuex"
export default {
  data() {
    return {
      info: {
        isshow: false,
        isadd:true
      },
    };
  },
  components: {
    vList,
    vAdd,
  },
  computed:{
    ...mapGetters({
      goodslist:"goods/list"
    })
  },
  methods: {
    ...mapActions({
      reqgoodslist:"goods/reqgoodslist"
    }),
    //添加
    willAdd() {
      this.info.isshow = true;

      this.info.isadd=true
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
    // this.reqgoodslist()
  },
};
</script>

<style>
</style>