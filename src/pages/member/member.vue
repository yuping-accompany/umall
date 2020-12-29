<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="用户编号" width="180"></el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <v-add :info="info" ref="add" :list="list" @init="init"></v-add>
  </div>
</template>

<script>
import vAdd from "./components/add";
import { memberList } from "../../utils/http";
export default {
  components: {
    vAdd,
  },
  data() {
    return {
      list: [],
      info: {
        isshow: false,
      },
    };
  },
  mounted() {
    //会员列表
    this.init()
  },
  methods: {
    edit(uid) {
      this.info.isshow = true;
      this.$refs.add.getOne(uid);
    },
    init() {
      memberList().then((res) => {
        if (res.data.code === 200) {
          this.list = res.data.list;
        }
      });
    },
  },
};
</script>

<style>
</style>