<template>
  <section>
    <h1>Créer un impact</h1>
    <el-form>
      <el-form-item label="Contact (client)">
        <el-autocomplete
          placeholder="Email du contact"
          :trigger-on-focus="false"></el-autocomplete>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
  import ImpactService from './ImpactService';

  export default {
    name: 'ImpactCreation',
    data() {
      return {
        xebians: ImpactService.xebians,
        customers: ImpactService.customers,
      };
    },
    methods: {},
    mounted() {
      ImpactService.fetchData();
    },
  };
</script>

<style>

</style>
