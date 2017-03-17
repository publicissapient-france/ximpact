<template>
  <section class="xebians">
    <el-card class="box-card">
      <h1>Xebians</h1>
      <el-table
        :data="xebians"
        border
        stripe
        @row-click="onRowClick">
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
    </el-card>
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
    methods: {
      onRowClick(xebian) {
        this.$router.push(`/xebians/${xebian.id}`);
      },
    },
    mounted() {
      XebianService.fetchXebians();
    },
  };
</script>

<style scoped>
  .xebians {
    margin: 15px 10px;
    background: #ffffff;
    border-radius: 3px;
  }

  h1 {
    margin-bottom: 60px;
  }
</style>
