<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="活动名称" sortable width="180"></el-table-column>
       <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
           
          <del-btn @config="del(scope.row.id)">删除</del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { successAlert } from '../../../utils/alert';
import {cateDel} from "../../../utils/http"
export default {
    // props:["list"],
    computed:{
      ...mapGetters({
        "list":"cate/list"
      })
    },
  methods:{
    ...mapActions({
      "reqlist":"cate/reqList"
    }),
      //删除
      del(id){
          cateDel({id:id}).then(res=>{
              if(res.data.code==200){
                  successAlert(res.data.msg)
                  //刷新页面
                  // this.$emit("init")
                  this.reqlist()
              }
          })
      },
      //编辑
      edit(id){
          this.$emit("edit",id)
      }
  }
};
</script>

<style scoped>
.img{
    width: 80px;
    height: 80px;
}
</style>