<template>
  <section class="impact-form">
    <el-card class="box-card">
      <h1>Créer un impact</h1>
      <el-form :model="impactForm" :rules="impactRules" ref="impactForm" label-width="120px">
        <el-form-item label="Xebian" prop="xebian">
          <el-autocomplete
            placeholder="Email du Xebian"
            :fetch-suggestions="queryXebians"
            :trigger-on-focus="false"
            v-model="impactForm.xebian"
            @select="onSelectXebian"></el-autocomplete>
        </el-form-item>
        <el-form-item label="Contact (client)" prop="customer">
          <el-autocomplete
            placeholder="Email du contact"
            :fetch-suggestions="queryCustomers"
            :trigger-on-focus="false"
            v-model="impactForm.customer"
            @select="onSelectCustomer"></el-autocomplete>
        </el-form-item>
        <el-form-item label="Impact" prop="impact">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="Entrez un impact pour le Xebian chez ce Client."
            v-model="impactForm.impact">
          </el-input>
        </el-form-item>
        <el-row type="flex" class="button" justify="end">
          <el-button type="primary" @click="onSubmitClick('impactForm')">OK</el-button>
          <el-button @click="onResetClick('impactForm')">Vider les champs</el-button>
        </el-row>
      </el-form>
    </el-card>
  </section>
</template>

<script>
  import _ from 'lodash';
  import ImpactService from '../ImpactService';
  import CustomerService from '../../customer/CustomerService';
  import XebianService from '../../xebian/XebianService';

  export default {
    name: 'impact-creation',
    data() {
      return {
        impactForm: {
          customer: '',
          xebian: '',
          impact: '',
        },
        impactRules: {
          customer: [
            {
              required: true,
              message: 'Veuillez saisir l\'email valide d\'un Client',
              trigger: 'blur',
            },
            {
              type: 'email',
              message: 'Veuillez saisir un email valide',
              trigger: 'blur,change',
            },
          ],
          xebian: [
            {
              required: true,
              message: 'Veuillez saisir l\'email valide d\'un Xebian',
              trigger: 'blur',
            },
            {
              type: 'email',
              message: 'Veuillez saisir un email valide',
              trigger: 'blur,change',
            },
          ],
          impact: [
            {
              required: true,
              message: 'Veuillez saisir un impact.',
              trigger: 'blur',
            },
          ],
        },
        xebians: ImpactService.xebians,
        customers: ImpactService.customers,
      };
    },
    methods: {
      queryCustomers(query, cb) {
        let customers = _.filter(
          this.customers,
          customer => customer.email.toLowerCase().indexOf(query.toLowerCase()) >= 0);
        customers = _.map(customers, (customer) => {
          const value = customer.email;
          return {
            value,
          };
        });
        return cb(customers);
      },
      queryXebians(query, cb) {
        let xebians = _.filter(
          this.xebians,
          xebian => xebian.email.toLowerCase().indexOf(query.toLowerCase()) >= 0);
        xebians = _.map(xebians, (customer) => {
          const value = customer.email;
          return {
            value,
          };
        });
        return cb(xebians);
      },
      onSelectCustomer() {
      },
      onSelectXebian() {
      },
      onSubmitClick(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            return this.checkCustomer()
              .then(customer => this.checkXebian()
                .then(xebian => ImpactService.createImpact(xebian, customer, this.impactForm.impact)))
              .then(() => this.$message({
                message: 'Impact créé ;) !',
                type: 'success',
              }))
              .then(() => ImpactService.fetchData())
              .catch(error => this.$message({
                message: `Une erreur s'est produite :( essayez à nouveau plus tard. ${error.message}`,
                type: 'error',
              }));
          }
          return false;
        });
      },
      onResetClick(formName) {
        this.$refs[formName].resetFields();
      },
      checkCustomer() {
        const customer = _.find(this.customers, c => c.email === this.impactForm.customer);
        if (customer) {
          return Promise.resolve(customer);
        }
        return CustomerService.createCustomer(this.impactForm.customer);
      },
      checkXebian() {
        const xebian = _.find(this.xebians, x => x.email === this.impactForm.xebian);
        if (xebian) {
          return Promise.resolve(xebian);
        }
        return XebianService.createXebian(this.impactForm.xebian);
      },
      checkImpact() {
        return Promise.resolve(this.impactForm.impact);
      },
    },
    mounted() {
      ImpactService.fetchData();
    },
  };
</script>
<style scoped>
  .impact-form {
    margin: 15px 10px;
    background: #ffffff;
    border-radius: 3px;
  }

  h1 {
    margin-bottom: 60px;
  }

  .button {
    margin-top: 60px;
  }
</style>
