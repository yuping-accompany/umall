<template>
  <el-button type="danger" @click="del">删除</el-button>
</template>

<script>
export default {
  methods: {
    del() {
      this.$confirm("你确定删除吗?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        confirmButtonClass:"el-button--danger",
        type: "warning",
      }).then(() => {
        this.$emit("config");
      });
    },
  },
};
</script>

<style scoped>
.el-button--danger {
  color: #fff;
  background-color: #f56c6c;
  border-color: #f56c6c;
}
</style>