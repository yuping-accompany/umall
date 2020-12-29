<template>
  <div>
    <!-- 这里面的closed是文档里面的 -->
    <el-dialog :title="info.isupdate?'添加角色':'修改角色'" :visible.sync="info.isshow" @closed="cancel">
      <el-form :model="user">
        <el-form-item label="角色名称" label-width="70px">
          <el-input v-model="user.rolename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色权限" label-width="70px">
          <el-tree
            :data="menuList"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            highlight-current
            :props="defaultProps"
          ></el-tree>
        </el-form-item>
        <el-form-item label="状态" label-width="70px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        {{user}}
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isupdate==1">确 定</el-button>
        <el-button type="primary" @click="update" v-else>编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { secMenu } from "../../../router/index";
import { roleAdd, roleEdit, roleUpdate ,menuList} from "../../../utils/http";
import { errAlert, successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        rolename: "",
        menus: [],
        status: 1,
      },
      menuList: [],
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  mounted(){
    menuList().then(res => {
      if (res.data.code == 200) {
        this.menuList = res.data.list;
      }
    });
  },
  methods: {
    //取消
    cancel() {
      if (!this.info.isupdate) {
        this.$refs.tree.setCheckedKeys([this.empty()]);
      }
      this.info.isshow = false;
    },
    empty() {
      this.user = {
        rolename: "",
        menus: [],
        status: 1,
      };
    },
    checkpre() {
      return new Promise((resolve) => {
        if (this.user.rolename === "") {
          errAlert("角色名称不能为空");
          return;
        }
        resolve()
      });
    },
    //点击确定按钮的时候
    add() {
      this.checkpre().then(() => {
        this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
        roleAdd(this.user).then((res) => {
          if (res.data.code === 200) {
            successAlert(res.data.msg);
            console.log(this.user);
            //弹框消失
            this.cancel();
            //弹框内容清空
            this.empty();
            //刷新页面
            this.$emit("init");
          }
        });
      });
    },
    //编辑的时候获取那条数据

    getOne(id) {
      roleEdit({ id: id }).then((res) => {
        this.user = res.data.list;
        this.$refs.tree.setCheckedKeys(JSON.parse(this.user.menus));
        console.log(this.user);
        //补id
        this.user.id = id;
      });
    },
    //修改数据
    update() {
      this.checkpre().then(() => {
        this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
        roleUpdate(this.user).then((res) => {
          console.log(this.user);
          if (res.data.code === 200) {
            successAlert(res.data.msg);
            //弹框消失
            this.info.isshow = false;
            //界面刷新
            this.$emit("init");
          }
        });
      });
    },
  },
};
</script>

<style>
</style>