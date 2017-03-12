<template>
  <el-menu theme="dark" class="top-bar" :default-active="active" @select="onItemClick" mode="horizontal">
    <el-menu-item index="2">Xebians</el-menu-item>
    <el-menu-item index="3">Clients</el-menu-item>
    <el-submenu index="1">
      <template slot="title">Impacts</template>
      <el-menu-item index="1-1">Créer un impact</el-menu-item>
      <el-menu-item index="1-2">Liste</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
  export default {
    name: 'top-bar',
    data() {
      return {
        active: '1',
      };
    },
    methods: {
      onItemClick(key) {
        switch (key) {
          case '2':
            this.$router.push('/xebians');
            break;
          case '3':
            this.$router.push('/customers');
            break;
          case '1-1':
            this.$router.push('/impact/creation');
            break;
          default:
            this.$router.push('/impacts');
            break;
        }
      },
    },
    mounted() {
      switch (this.$route.path) {
        case '/xebians':
          this.active = '2';
          break;
        case '/customers':
          this.active = '3';
          break;
        case '/impacts/creation':
          this.active = '1-1';
          break;
        default:
          this.active = '1-2';
          break;
      }
    },
  };
</script>

<style scoped>
  .top-bar {
    border-radius: 0;
  }
</style>
