<template>
  <section class="customer">
    <customer-update></customer-update>
  </section>
</template>

<script>
  import CustomerUpdate from './update/CustomerUpdate';

  export default {
    components: {
      'customer-update': CustomerUpdate,
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .customer {
    margin: 15px 10px;
  }
</style>
