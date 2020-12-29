<template>
  <div>
    <el-table
      :data="goodslist"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="商品编号" sortable></el-table-column>
      <el-table-column prop="goodsname" label="商品名称" sortable width="180"></el-table-column>
       <el-table-column prop="price" label="商品价格" sortable width="180"></el-table-column>
        <el-table-column prop="market_price" label="市场价格" sortable width="180"></el-table-column>
        
      <el-table-column  label="图片">
          <template slot-scope="scope">
              <img :src="$pre+scope.row.img" alt="" v-if="scope.row.img!=='null'" class="img">

          </template>
      </el-table-column>
       <el-table-column prop="catename" label="是否新品" sortable width="180">
          <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.isnew===1">是</el-button>
          <el-button type="info" v-else>否</el-button>
        </template>
       </el-table-column>
        <el-table-column prop="catename" label="是否热卖" sortable width="180">
           <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.ishot===1">是</el-button>
          <el-button type="info" v-else>否</el-button>
        </template>
        </el-table-column>
       <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作"  width="180">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
           
          <del-btn @config="del(scope.row.id)">删除</del-btn>
        </template>
      </el-table-column>
    </el-table>
     <!-- 分页 -->
    <el-pagination background layout="prev, pager, next" 
    :total="total"
    :page-size="size"
    @current-change="changePage"
    ></el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { successAlert } from '../../../utils/alert';
import {goodsDel} from "../../../utils/http"
export default {
    // props:["list"],
    computed:{
      ...mapGetters({
        goodslist:"goods/list",
        //总数
        total:"goods/total",
        //一页得数
        size:"goods/size"
      })
    },
  methods:{
    ...mapActions({
     reqgoodslist:"goods/reqgoodslist",
     reqTotal:"goods/reqTotal",
     changePage:"goods/changePage"
    }),
      //删除
      del(id){
          goodsDel({id:id}).then(res=>{
              if(res.data.code==200){
                  successAlert(res.data.msg)
                  //刷新页面
                  
                  this.reqgoodslist()
                  this.reqTotal()
              }
          })
      },
      //编辑
      edit(id){
          this.$emit("edit",id)
      }
  },
  mounted(){
    this.reqgoodslist()
    this.reqTotal()
  }
};
</script>

<style scoped>
.img{
    width: 80px;
    height: 80px;
}
</style>