<template>
  <div>
    <el-dialog :title="info.isadd?'添加管理员':'修改管理员'" :visible.sync="info.isshow" @closed="cancel">
      <el-form :model="user">
        <el-form-item label="所属角色" label-width="70px">
          <el-select v-model="user.roleid" placeholder="选择所属角色">
            <el-option :label="item.rolename" :value="item.id" v-for="item in list" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" label-width="70px">
          <el-input placeholder="请输入用户名" v-model="user.username" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="70px">
          <el-input placeholder="请输入密码" v-model="user.password" show-password clearable></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="70px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        {{user}}
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isadd">确 定</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { errAlert, successAlert } from "../../../utils/alert";
import {roleList, manageAdd, manageEdit, manageUpdate } from "../../../utils/http";
export default {
  props: ["info"],
  data() {
    return {
      list:[],
      user: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
    };
  },
  methods: {
    //取消
    cancel() {
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    //清空
    empty() {
      this.user = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    checkpre() {
      return new Promise((resolve) => {
        if (this.user.roleid === "") {
          errAlert("所属角色不能为空");
          return;
        }
        if (this.user.username === "") {
          errAlert("用户名不能为空");
          return;
        }
        if (this.user.password === "") {
          errAlert("密码不能为空");
          return;
        }
        resolve();
      });
    },
    //添加
    add() {
      this.checkpre().then(() => {
        manageAdd(this.user).then((res) => {
          if (res.data.code === 200) {
            //弹窗消失
            this.info.isshow = false;
            //清空
            this.empty();
            //刷新页面
            this.$emit("init");
          }
        });
      });
    },
    //编辑
    getOne(uid) {
      manageEdit({ uid: uid }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          this.user.password = "";
        }
      });
    },
    //更新
    update() {
      this.checkpre().then(() => {
        manageUpdate(this.user).then((res) => {
          if (res.data.code == 200) {
            successAlert(res.data.msg);
            //弹框消失
            this.info.isshow = false;
            //内容清空
            this.empty();
            //刷新界面
            this.$emit("init");
          }
        });
      });
    },
  },
  mounted() {
     roleList().then(res=>{
      if(res.data.code==200){
        this.list=res.data.list
      }
    })
  },
};
</script>

<style>
</style>