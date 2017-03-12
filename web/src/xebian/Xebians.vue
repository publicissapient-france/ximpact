<template>
  <section class="xebians">
    <h1>Xebians</h1>
    <el-table
      :data="xebians"
      border
      stripe>
      <el-table-column
        prop="email"
        label="Email">
      </el-table-column>
      <el-table-column
        prop="firstName"
        label="Nom">
      </el-table-column>
      <el-table-column
        prop="lastName"
        label="Prénom">
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
  import XebianService from './XebianService';

  export default {
    data() {
      return {
        xebians: XebianService.xebians,
      };
    },
    mounted() {
      XebianService.fetchXebians();
    },
  };
</script>

<style scoped>
  .xebians {
    margin: 15px 10px;
    padding: 40px 20px 50px;
    background: #ffffff;
    border-radius: 3px;
  }

  h1 {
    margin-bottom: 60px;
  }
</style>
