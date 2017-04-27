<template>
  <div id="app">
    <div v-if="topBar">
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
        topBar: this.topBarVisible(),
      };
    },
    watch: {
      $route() {
        this.topBar = this.topBarVisible();
      },
    },
    methods: {
      topBarVisible() {
        return this.$route.name !== 'signin' && this.$route.name !== 'feedbacks';
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
