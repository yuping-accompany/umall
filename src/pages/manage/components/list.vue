<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="用户编号" width="180"></el-table-column>
      <el-table-column prop="username" label="用户名" width="180"></el-table-column>
      <el-table-column prop="rolename" label="所属角色"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          <del-btn @config="del(scope.row.uid)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { successAlert } from "../../../utils/alert";
import {manageDel} from "../../../utils/http"
export default {
  props: ["list"],
  data() {
    return {
    };
  },
  methods: {
    //删除
    del(uid) {
      manageDel({ uid: uid }).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.$emit("init")
        }
      });
    },
    //编辑
    edit(uid){
      this.$emit("edit",uid)
    }
  },
};
</script>

<style scoped>
</style>