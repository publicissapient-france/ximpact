<template>
  <section class="customers">
    <h1>Clients</h1>
    <el-table
      :data="customers"
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
      <el-table-column
        prop="company"
        label="Entreprise">
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
  import CustomerService from './CustomerService';

  export default {
    data() {
      return {
        customers: CustomerService.customers,
      };
    },
    mounted() {
      CustomerService.fetchCustomers();
    },
  };
</script>

<style scoped>
  .customers {
    margin: 15px 10px;
    padding: 40px 20px 50px;
    background: #ffffff;
    border-radius: 3px;
  }

  h1 {
    margin-bottom: 60px;
  }
</style>
