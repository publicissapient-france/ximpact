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
    name: 'app',
    components: {
      'top-bar': TopBar,
    },
  };
</script>

<style>
  body {
    background: #f1f1f1;
    margin: 0;
    padding: 0;
    font-family: 'Gudea', sans-serif;
  }

  .wrapper {
    max-width: 1024px;
    margin: auto;
  }
</style>
