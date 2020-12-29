<template>
  <div>
    <el-dialog title="管理员修改" :visible.sync="info.isshow">
      <el-form :model="user">
        <el-form-item label="手机号" label-width="70px">
          <el-input v-model="user.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" label-width="70px">
          <el-input v-model="user.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="70px">
          <el-input v-model="user.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="70px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { errAlert, successAlert } from '../../../utils/alert';
import { memberEdit ,memberUpdate} from "../../../utils/http";
export default {
  props: ["info", "list"],
  data() {
    return {
      user: {
        nickname: "",
        password: "",
        phone: "",
        status: 1,
      },
    };
  },
  methods: {
    //取消
    cancel() {
      this.info.isshow = false;
    },
    getOne(uid) {
      memberEdit({ uid: uid }).then((res) => {
          if(res.data.code===200){
              this.user=res.data.list
              this.user.uid=uid
          }
      });
    },
    //修改
    update(){
         if(this.user.password===""){
            errAlert("密码不可以为空")
            return
        }
        memberUpdate(this.user).then(res=>{
            if(res.data.code===200){
                successAlert(res.data.msg)
                this.info.isshow=false
               
                this.$emit("init")
            }
        })
    }
  },
};
</script>

<style>
</style>