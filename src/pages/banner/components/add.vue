<template>
  <div class="form">
    <el-dialog :title="info.isadd?'轮播图添加':'轮播图修改'" :visible.sync="info.isshow" @closed="cancel">
      <el-form :model="user">
        <el-form-item label="标题" label-width="70px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="70px">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
import { bannerAdd, bannerEdit ,bannerUpdate} from "../../../utils/http";
import path from "path";
export default {
  props: ["info"],
  data() {
    return {
      dialogVisible: false,
      disabled: false,
      user: {
        title: "",
        img: null,
        status: 1,
      },
      //图片地址
      imgUrl: "",
    };
  },
  methods: {
    //取消
    cancel() {
        if(!this.info.isadd){
            this.empty()
        }
      this.info.isshow = false;
    },
    empty() {
      this.imgUrl = "";
      this.user = {
        title: "",
        img: null,
        status: 1,
      };
    },
    //添加
    add() {
      bannerAdd(this.user).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          //弹框消失
          this.cancel();
          //清空
          this.empty();
          //刷新
          this.$emit("init");
        }
      });
    },
    changeImg(ev) {
      let file = ev.raw;
      //图片大小
      if (file.size > 2 * 1024 * 1024) {
        errAlert("文件超过2M");
        return;
      }
      //图片后缀名
      let arr = [".jpg", ".jpeg", ".gif", ".png"];
      let extname = path.extname(file.name);
      if (!arr.some((item) => item === extname)) {
        errAlert("请上传图片格式文件");
        return;
      }
      this.imgUrl = URL.createObjectURL(file);
      this.user.img = file;
    },

    //编辑
    getOne(id) {
      bannerEdit({ id: id }).then((res) => {
        if (res.data.code === 200) {
          this.user = res.data.list;
          this.user.id = id;
          this.imgUrl = this.$pre + this.user.img;
        }
      });
    },

    //修改
    update(){
        bannerUpdate(this.user).then(res=>{
            if(res.data.code===200){
               successAlert(res.data.msg)
               //
               this.cancel()
               this.empty()
               this.$emit("init")
            }
        })
    }
  },
};
</script>

<style scoped lang="stylus" >
/* element-ui的样式 */
/* 穿透 */
.form >>>.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
