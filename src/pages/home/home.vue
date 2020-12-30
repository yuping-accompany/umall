<template>
  <div id="main"></div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "cate/reqList",
    }),
  },
  mounted() {
    this.reqList();
   
  },
  watch:{
    list:{
      handler(){
         var myChart = require("echarts").init(document.getElementById("main"));

    // 指定图表的配置项和数据
    var option = {
      title: {
        text: "商品分类",
      },
      tooltip: {},
      legend: {
        data: ["分类数量"],
      },
      xAxis: {
        data: this.list.map(item=>item.catename),
      },
      yAxis: {},
      series: [
        {
          name: "分类数量",
          type: "bar",
          data: this.list.map(item=>item.children?item.children.length:0)
        },
      ],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
      },
      deep:true
    }
  }
};
</script>

<style scoped>
#main {
  width: 80%;
  height: 500px;
  margin: 20px auto;
}
</style>