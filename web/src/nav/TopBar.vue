<template>
  <el-menu router="true" theme="dark" class="top-bar" :default-active="active" @select="onItemClick" mode="horizontal">
    <el-menu-item index="/xebians">Xebians</el-menu-item>
    <el-menu-item index="/customers">Clients</el-menu-item>
    <el-submenu index="/impacts">
      <template slot="title">Impacts</template>
      <el-menu-item index="/impacts/creation">Créer un impact</el-menu-item>
      <el-menu-item index="/impacts">Liste</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
  export default {
    name: 'top-bar',
    data() {
      return {
        active: this.$route.path,
      };
    },
  };
</script>

<style scoped>
  .top-bar {
    border-radius: 0;
  }
</style>
