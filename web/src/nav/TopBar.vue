<template>
  <el-menu router theme="dark" class="top-bar" :default-active="active" mode="horizontal">
    <el-menu-item index="/xebians">Xebians</el-menu-item>
    <el-menu-item index="/customers">Clients</el-menu-item>
    <el-menu-item index="/impacts/create">Créer un impact</el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    data() {
      return {
        active: this.$route.path,
      };
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .top-bar {
    border-radius: 0;
  }
</style>
