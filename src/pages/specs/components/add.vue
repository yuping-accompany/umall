<template>
  <div>
    <el-dialog :title="info.add?'商品规格添加':'商品规格修改'" :visible.sync="info.isshow" @closed="cancel">
      <el-form :model="user">
        <el-form-item label="规格名称" label-width="70px">
          <el-input v-model="user.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="规格属性" label-width="100px" v-for="(item,index) in strArr" :key="index">
          <div class="spacsAdd">
            <el-input v-model="item.value" class="ipt"></el-input>
            <el-button type="primary" class="btn" v-if="index==0" @click="addStr">新增规格属性</el-button>
            <el-button type="danger" class="btn" v-else @click="delArr(index)">删除</el-button>
          </div>
        </el-form-item>
        <el-form-item label="状态" label-width="70px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        {{user}}
        {{strArr}}
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
import { mapActions, mapGetters } from "vuex";
import { errAlert, successAlert } from "../../../utils/alert";
import { specsAdd, specsEdit, specsUpdate } from "../../../utils/http";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        specsname: "",
        attrs: "[]",
        status: 1,
      },
      strArr: [{ value: "" }],
    };
  },
  computed: {
    ...mapGetters({
      list: "specs/list",
    }),
  },
  methods: {
    //取消
    cancel() {
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    //新增规格属性
    addStr() {
      this.strArr.push({ value: "" });
    },
    //新增规格的删除
    delArr(index) {
      this.strArr.splice(index, 1);
    },
    //清空
    empty() {
      this.user = {
        specsname: "",
        attrs: [],
        status: 1,
      };
      this.strArr = [{ value: "" }];
    },
    ...mapActions({
      reqList: "specs/reqList",
      reqTotal: "specs/reqTotal",
    }),
    checkspecs() {
      return new Promise((resolve) => {
        if (this.user.specsname == "") {
          errAlert("规格名称不能为空");
          return;
        }
        if (this.strArr.some((item) => item.value === "")) {
          errAlert("请输入规格属性");
          return;
        }
        resolve();
      });
    },
    //添加
    add() {
      this.checkspecs().then(() => {
        this.user.attrs = JSON.stringify(
          this.strArr.map((item) => {
            return item.value;
          })
        );
        specsAdd(this.user).then((res) => {
          if (res.data.code == 200) {
            successAlert(res.data.msg);
            //弹框消失
            this.cancel();
            //清空
            this.empty();
            //刷新页面
            this.reqList();
            this.reqTotal();
          }
        });
      });
    },
    //编辑
    getOne(id) {
      specsEdit({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list[0];
          this.user.attrs = JSON.parse(this.user.attrs);
          this.strArr = this.user.attrs.map((item) => ({ value: item }));
        }
      });
    },
    //修改
    update() {
      this.checkspecs().then(() => {
        this.user.attrs = JSON.stringify(
          this.strArr.map((item) => {
            return item.value;
          })
        );
        specsUpdate(this.user).then((res) => {
          if (res.data.code == 200) {
            successAlert(res.data.msg);
            this.cancel();
            this.empty();
            this.reqList();
          }
        });
      });
    },
  },
};
</script>

<style scoped>
.spacsAdd {
  display: flex;
}
.btn {
  width: auto;
}
.ipt {
  flex: 1;
}
</style>>
</style>