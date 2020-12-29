<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <!-- 表格 -->
    <v-list :list="list" @init="init" @edit="edit"></v-list>

    <!-- 弹框添加 -->
    <v-add :info="info" @init="init" ref="add"></v-add>

    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      @current-change="changePage"
      class="page"
    ></el-pagination>
  </div>
</template>

<script>
import vList from "./components/list";
import vAdd from "./components/add";
import { page, manageList } from "../../utils/http";
export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      info: {
        isshow: false,
        isadd: true,
      },

      list: [],
      //总页数
      total: 0,
      //每页的条数
      pageSize: 2,
      //当前页码
      page:1
    };
  },
  methods: {
    willAdd() {
      this.info.isshow = true;
      this.info.isadd = true;
    },
     //管理员列表（分页）
    getlist(){
       manageList({ page: this.page, size:this.pageSize }).then((res) => {
        if (res.data.code == 200) {
            /*
          如果删除了最后一页的最后一条，那么当前页就会取到空数组；
          这个时候如果有上一页的话，就应该取上一页
          */
         if(res.data.list.length==0&&this.page>1){
           this.page--
           this.getlist()
           return
         }
          this.list = res.data.list;
        }
      });
    },
    init() {
      //一进来就调用
      this.getPage()
      //一进来就调用
     this.getlist()
    },
    changePage(ev){
      this.page=ev,
       this.getlist()
    },
    //编辑
    edit(uid) {
      //弹框出现
      this.info.isshow = true;
      this.info.isadd = false;

      //触发add中的getOne()
      this.$refs.add.getOne(uid);
    },
    //管理员总数（用于计算分页）
    getPage() {
      //管理员总数（用于计算分页）
      page().then((res) => {
        this.total = res.data.list[0].total;
      });
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style scoped>
.page {
  margin-top: 20px;
  text-align: right;
}
</style>