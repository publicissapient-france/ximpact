<template>
  <el-card class="box-card">
    <h1>Éditer {{xebianForm.firstName}} {{xebianForm.lastName}}</h1>
    <el-form :model="xebianForm" :rules="xebianRules" ref="xebianForm" label-width="120px">
      <el-form-item label="Prénom" prop="firstName">
        <el-input placeholder="Entrez le prénom du Xebian" v-model="xebianForm.firstName"></el-input>
      </el-form-item>
      <el-form-item label="Nom" prop="lastName">
        <el-input placeholder="Entrez le nom du Xebian" v-model="xebianForm.lastName"></el-input>
      </el-form-item>
      <el-form-item label="Email (Xebia)" prop="email">
        <el-input placeholder="Entrez l'adresse du Xebian" v-model="xebianForm.email"></el-input>
      </el-form-item>
      <el-row type="flex" class="button" justify="end">
        <el-button type="primary" @click="onSubmitClick('xebianForm')">OK</el-button>
      </el-row>
    </el-form>
  </el-card>
</template>

<script>
  import XebianService from '../XebianService';

  export default {
    data() {
      return {
        xebianForm: this.$store.state.xebian,
        xebianRules: {
          firstName: [
            {
              required: true,
              message: 'Veuillez saisir le prénom du Xebian',
              trigger: 'blur',
            },
          ],
          lastName: [
            {
              required: true,
              message: 'Veuillez saisir le nom du Xebian',
              trigger: 'blur',
            },
          ],
          email: [
            {
              required: true,
              message: 'Veuillez saisir l\'email valide du Xebian',
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
            return XebianService.updateXebian(this.$store.state.xebian)
              .then(() => this.$message({
                message: 'Xebian mis à jour ;) !',
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
