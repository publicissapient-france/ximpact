<template>
  <el-menu theme="dark" class="top-bar" :default-active="active" @select="onItemClick" mode="horizontal">
    <el-menu-item index="1">Impacts</el-menu-item>
    <el-menu-item index="2">Xebians</el-menu-item>
    <el-menu-item index="3">Clients</el-menu-item>
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
            this.$router.push('/clients');
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
        case '/clients':
          this.active = '3';
          break;
        default:
          this.active = '1';
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
