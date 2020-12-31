<template>
  <div>
    <el-dialog :title="info.isadd?'秒杀商品添加':'秒杀商品修改'" :visible.sync="info.isshow" @closed="cancel">
      <el-form :model="user">
        <el-form-item label="活动名称" label-width="70px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" label-width="70px">
          <el-date-picker
            v-model="value2"
            type="datetimerange"
            align="right"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00', '08:00:00']"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="一级分类" label-width="70px">
          <el-select v-model="user.first_cateid" placeholder="请选择" @change="changelistid">
            <!-- 数据遍历 -->
            <el-option v-for="item in list" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="70px">
          <el-select v-model="user.second_cateid" placeholder="请选择" @change="changelistthird">
            <!-- 数据遍历 -->
            <el-option v-for="i in secondArr" :key="i.id" :label="i.catename" :value="i.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" label-width="70px">
          <el-select v-model="user.goodsid" placeholder="请选择">
            <!-- 数据遍历 -->
            <el-option
              v-for="item in thirdArr"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="70px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        {{user}}
        {{value2}}
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
import { successAlert, errAlert } from "../../../utils/alert";
import { seckEdit, seckUpdate, seckAdd } from "../../../utils/http";
import path from "path";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      value2: [],
      user: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      //   二级获取
      secondArr: [],
      //三级获取
      thirdArr: [],
    };
  },
  filters: {
    formatDate: function (value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
    },
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
      goodslist: "goods/list",
      seckilllist: "seckill/list",
    }),
  },
  mounted() {
    this.reqlist();
    this.reqgoodslist(true);
  },
  methods: {
    ...mapActions({
      reqlist: "cate/reqList",
      reqgoodslist: "goods/reqgoodslist",
      reqSeckill: "seckill/reqSeckill",
    }),
    //   二级获取
    changelistid() {
      this.user.second_cateid = "";
      this.user.goodsid = "";
      this.getsecond();
    },
    getsecond() {
      let obj = this.list.find((item) => {
        return item.id == this.user.first_cateid;
      });
      //   console.log(obj);
      this.secondArr = obj ? obj.children : [];
    },
    //三级获取
    changelistthird() {
      this.user.goodsid = "";
      this.getthird();
    },
    getthird() {
      let obj = this.goodslist.filter((item) => {
        //  console.log(item.second_cateid);//5/7/10/5
        return item.second_cateid === this.user.second_cateid;
      });
      this.thirdArr = obj ? obj : [];
    },
    //取消
    cancel() {
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    //清空
    empty() {
      (this.user = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      }),
        //   二级获取
        (this.secondArr = []),
        //三级获取
        (this.thirdArr = []);
      this.value2 = [];
    },
    checkpre() {
      return new Promise((resolve) => {
        if (this.user.title === "") {
          errAlert("活动名称不能为空");
          return;
        }
        if (this.value2 === []) {
          errAlert("活动开始时间不能为空");
          return;
        }
        if (this.user.first_cateid == "") {
          errAlert("一级分类名称不能为空");
          return;
        }
        if (this.user.second_cateid == "") {
          errAlert("二级分类名称不能为空");
          return;
        }
        if (this.user.goodsid == "") {
          errAlert("商品名称不能为空");
          return;
        }
        resolve();
      });
    },
    //添加
    add() {
      this.checkpre().then(() => {
        this.user.begintime = Date.parse(this.value2[0]) + "";
        this.user.endtime = Date.parse(this.value2[1]) + "";
        seckAdd(this.user).then((res) => {
          if (res.data.code == 200) {
            successAlert(res.data.msg);
            //弹框取消
            this.cancel();
            //列表清空
            this.empty();
            //数据刷新
            this.reqSeckill();
          }
        });
      });
    },

    //编辑
    getOne(id) {
      seckEdit({ id: id }).then((res) => {
        if (res.data.code === 200) {
          this.user = res.data.list;
          this.user.begintime = this.$options.filters["formatDate"](
            JSON.parse(this.user.begintime)
          );
          this.user.endtime = this.$options.filters["formatDate"](
            JSON.parse(this.user.endtime)
          );
          this.value2.push(this.user.begintime, this.user.endtime);
          this.getsecond();
          this.getthird();
          //补id
          this.user.id = id;
        }
      });
    },
    //修改
    update() {
      this.checkpre().then(() => {
        this.user.begintime = Date.parse(this.value2[0]) + "";
        this.user.endtime = Date.parse(this.value2[1]) + "";
        seckUpdate(this.user).then((res) => {
          if (res.data.code === 200) {
            successAlert(res.data.msg);
            //弹框消失
            this.cancel();
            //清空数据
            this.empty();
            //刷新界面
            this.reqSeckill();
          }
        });
      });
    },
  },
};
</script>

<style scoped>
.my-img {
  width: 100px;
  height: 100px;
  border: 1px dashed #999;
  position: relative;
}
.my-img .plus {
  width: 100px;
  height: 100px;
  line-height: 100px;
  font-size: 30px;
  text-align: center;
}
.my-img .img {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
}
.my-img .ipt {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}
</style>