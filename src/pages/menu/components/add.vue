<template>
  <div>
    <el-dialog :title="info.addorupdate?'添加菜单':'编辑菜单'" :visible.sync="info.isshow" @closed="cancel">
      <el-form :model="user">
        <el-form-item label="菜单名称" label-width="70px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" label-width="70px">
          <el-select v-model="user.pid" @change="topMenu" placeholder="请选择">
            <el-option :value="0" label="顶级菜单"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" label-width="70px">
          <el-radio v-model="user.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="user.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <el-form-item label="菜单图标" label-width="70px" v-if="user.type==1">
          <el-select v-model="user.icon">
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" label-width="70px" v-else>
          <el-select v-model="user.url">
            <!-- 所有二级地址 -->
            <el-option
              v-for="items in secMenu"
              :key="items.path"
              :value="'/'+items.path"
              :label="items.name+'--/'+ items.path"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label="状态" label-width="70px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="update" v-if="!info.addorupdate">修 改</el-button>
        <el-button type="primary" @click="add" v-else>确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addMenu, editMenu, updateMenu } from "../../../utils/http";
import { errAlert, successAlert } from "../../../utils/alert";
import { secMenu } from "../../../router/index";
export default {
  props: ["info", "list"],
  data() {
    return {
      user: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      icons: [
        "el-icon-setting",
        "el-icon-user-solid",
        "el-icon-camera-solid",
        "el-icon-s-platform",
        "el-icon-s-order",
      ],
      secMenu,
    };
  },
  methods: {
    //弹框消失
    cancel() {
      if (!this.info.addorupdate) {
        this.empty();
      }
      this.info.isshow = false;
    },
    //清空界面
    empty() {
      this.user = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    checkpre() {
      return new Promise((resolve) => {
        if (this.user.title === "") {
          errAlert("菜单名称不能为空");
        }
        resolve();
      });
    },
    //确定按钮
    add() {
      this.checkpre().then(() => {
        addMenu(this.user).then((res) => {
          if (res.data.code == 200) {
            successAlert(res.data.msg);
          }
          //弹框消失
          this.cancel();
          //界面初始化
          this.empty();
          //刷新界面
          this.$emit("init");
        });
      });
    },
    //顶级菜单判断
    topMenu() {
      if (this.user.pid == 0) {
        this.user.type = 1;
      } else {
        this.user.type = 2;
      }
    },
    //编辑
    getOne(id) {
      editMenu({ id: id }).then((res) => {
        if (res.data.code === 200) {
          this.user = res.data.list;
          //补id
          this.user.id = id;
        }
      });
    },
    update() {
      this.checkpre().then(() => {
        updateMenu(this.user).then((res) => {
          if (res.data.code === 200) {
            //弹成功信息
            successAlert(res.data.msg);
            //弹框消失
            this.cancel();
            //user恢复原样
            this.empty();
            //刷新页面
            this.$emit("init");
          }
        });
      });
    },
  },
};
</script>

<style scoped>
</style>