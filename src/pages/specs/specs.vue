<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <!-- 表单 -->
    <v-list @edit="edit"></v-list>

    <!-- 弹框 -->
    <v-add :info="info" ref="add"></v-add>
  </div>
</template>

<script>
import vList from "./components/list"
import vAdd from "./components/add"
export default {
  data(){
    return{
      info:{
        isshow:false,
        isadd:true
      }
    }
  },
  components:{
    vList,
    vAdd
  },
  methods:{
    willAdd(){
      this.info.isshow=true
      this.info.isadd=true
    },
    //编辑
    edit(id){
      this.info.isshow=true
      this.info.isadd=false
      this.$refs.add.getOne(id)
    }
  }
}
</script>

<style>

</style>