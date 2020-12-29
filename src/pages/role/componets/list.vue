<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="角色编号" width="180"></el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="address" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">开启</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @config="del(scope.row.id)">删除</del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { roleDel } from "../../../utils/http";
import { successAlert } from "../../../utils/alert";

export default {
  props: ["list"],
  methods: {
    //删除
    del(id) {
      roleDel({ id: id }).then((res) => {
        successAlert(res.data.msg);
        this.$emit("init");
      });
    },
    //编辑
    edit(id) {
      this.$emit("edit", id);
    },
  },
};
</script>

<style>
</style>