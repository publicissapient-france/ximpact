<template>
  <div id="app">
    <div v-if="!signin">
      <top-bar></top-bar>
    </div>
    <div class="wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import 'element-ui/lib/theme-default/index.css';

  export default {
    data() {
      return {
        signin: false,
      };
    },
    watch: {
      $route() {
        this.signin = this.$route.path === '/signin';
      },
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  $light-grey: #f5f5f5;
  body {
    background: $light-grey;
    margin: 0;
    padding: 0;
    font-family: 'Gudea', sans-serif;
  }

  .wrapper {
    max-width: 1024px;
    margin: auto;
  }
</style>
