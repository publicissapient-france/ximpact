<template>
  <div id="app">
    <top-bar></top-bar>
    <div class="wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import TopBar from './nav/TopBar';

  export default {
    components: {
      'top-bar': TopBar,
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
