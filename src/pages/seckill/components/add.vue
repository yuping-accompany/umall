<template>
  <div>
    <el-dialog :title="info.isadd?'商品分类添加':'商品分类修改'" :visible.sync="info.isshow" @closed="cancel">
      <el-form :model="user">
        <el-form-item label="活动名称" label-width="70px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" label-width="70px">
          <el-time-picker
            is-range
            v-model="value1"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
          ></el-time-picker>
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
import { cateAdd, cateEdit, cateUpdate } from "../../../utils/http";
import path from "path";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      value1: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
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
  computed: {
    ...mapGetters({
      list: "cate/list",
      goodslist: "goods/list",
    }),
  },
  mounted() {
    this.reqgoodslist(true);
  },
  methods: {
    ...mapActions({
      reqlist: "cate/reqList",
      reqgoodslist: "goods/reqgoodslist",
    }),
    //   二级获取
    changelistid() {
      this.user.second_cateid = "";
      this.user.goodsid=""
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
        this.user.goodsid=""
        this.getthird()
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
      this.imgUrl = "";
      this.user = {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      };
    },
    checkpre() {
      return new Promise((resolve) => {
        if (this.user.pid === "") {
          errAlert("请选择上级分类");
          return;
        }
        if (this.user.catename == "") {
          errAlert("分类名称不能为空");
          return;
        }
        resolve();
      });
    },
    //添加
    add() {
      this.checkpre().then(() => {
        cateAdd(this.user).then((res) => {
          if (res.data.code == 200) {
            successAlert(res.data.msg);
            //弹框取消
            this.cancel();
            //列表清空
            this.empty();
            //数据刷新
            this.reqlist();
            // this.$emit("init");
          }
        });
      });
    },

    //上传文件
    changeImg(ev) {
      let file = ev.target.files[0];
      console.log(file);
      //大于2M提示不能上传 size是B
      if (file.size > 2 * 1024 * 1024) {
        errAlert("图片大小要小于2M");
        return;
      }
      //后缀名得是图片类型的
      //截取最后一个.后面的
      // let extname=file.name.slice(file.name.lastIndexOf('.'))
      //node自带的
      let extname = path.extname(file.name);
      console.log(extname);
      let arr = [".jpg", ".jpeg", ".gif", ".png"];
      if (!arr.some((item) => item === extname)) {
        errAlert("请上传图片格式");
        return;
      }

      //上传的文件生成地址
      this.imgUrl = URL.createObjectURL(file);
      this.user.img = file;
    },
    //编辑
    getOne(id) {
      cateEdit({ id: id }).then((res) => {
        if (res.data.code === 200) {
          this.user = res.data.list;
          //处理图片
          this.imgUrl = this.$pre + this.user.img;

          //补id
          this.user.id = id;
        }
      });
    },
    //修改
    update() {
      this.checkpre().then(() => {
        cateUpdate(this.user).then((res) => {
          if (res.data.code === 200) {
            successAlert(res.data.msg);
            //弹框消失
            this.info.isshow = false;
            //清空数据
            this.empty();
            //刷新界面
            // this.$emit("init");
            this.reqlist();
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