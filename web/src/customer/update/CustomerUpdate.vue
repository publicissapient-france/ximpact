<template>
  <el-card class="box-card">
    <h1>Éditer {{customerForm.firstName}} {{customerForm.lastName}}</h1>
    <el-form :model="customerForm" :rules="customerRules" ref="customerForm" label-width="120px">
      <el-form-item label="Prénom" prop="firstName">
        <el-input placeholder="Entrez le prénom du Client" v-model="customerForm.firstName"></el-input>
      </el-form-item>
      <el-form-item label="Nom" prop="lastName">
        <el-input placeholder="Entrez le nom du Client" v-model="customerForm.lastName"></el-input>
      </el-form-item>
      <el-form-item label="Entreprise" prop="email">
        <el-input placeholder="Entrez l'entreprise du Client" v-model="customerForm.company"></el-input>
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input placeholder="Entrez l'adresse du Client" v-model="customerForm.email"></el-input>
      </el-form-item>
      <el-row type="flex" class="button" justify="end">
        <el-button type="primary" @click="onSubmitClick('customerForm')">OK</el-button>
      </el-row>
    </el-form>
  </el-card>
</template>

<script>
  import CustomerService from '../CustomerService';

  export default {
    data() {
      return {
        customerForm: this.$store.state.customer,
        customerRules: {
          firstName: [
            {
              required: true,
              message: 'Veuillez saisir le prénom du Client',
              trigger: 'blur',
            },
          ],
          lastName: [
            {
              required: true,
              message: 'Veuillez saisir le nom du Client',
              trigger: 'blur',
            },
          ],
          company: [
            {
              required: true,
              message: 'Veuillez saisir l\'entreprise du Client',
              trigger: 'blur',
            },
          ],
          email: [
            {
              required: true,
              message: 'Veuillez saisir l\'email valide du Client',
              trigger: 'blur',
            },
            {
              type: 'email',
              message: 'Veuillez saisir un email valide',
              trigger: 'blur,change',
            },
          ],
        },
      };
    },
    methods: {
      onSubmitClick(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            return CustomerService.updateCustomer(this.$store.state.customer)
              .then(() => this.$message({
                message: 'Client mis à jour ;) !',
                type: 'success',
              }))
              .catch(error => this.$message({
                message: `Une erreur s'est produite :( essayez à nouveau plus tard. ${error.message}`,
                type: 'error',
              }));
          }
          return false;
        });
      },
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  h1 {
    margin-bottom: 60px;
  }
</style>
