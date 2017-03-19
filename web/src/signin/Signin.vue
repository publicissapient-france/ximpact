<!--suppress JSUnresolvedFunction -->
<template>
  <section class="signin">
    <el-card class="box-card">
      <h1>X-Impact</h1>
      <p>Veuillez vous connecter avec votre adresse <code>*@xebia.fr</code></p>
      <div class="g-signin2" data-onsuccess="onSignin"></div>
    </el-card>
  </section>
</template>

<script>
  import Vue from 'vue';
  import store from 'store';
  import router from '../router';

  const vm = new Vue({
    methods: {
      checkProfile(profile) {
        const email = profile.getEmail();
        if (email.endsWith('@xebia.fr')) {
          store.set('user', {
            email,
          });
          this.$message({
            message: `Bienvenue ${profile.getGivenName()} :) !`,
            type: 'success',
          });
          setTimeout(() => router.push('/'), 1000);
        } else {
          store.remove('user');
          window.gapi.auth2.getAuthInstance().signOut();
          this.$message({
            message: 'Veuillez utiliser une adresse @xebia.fr',
            type: 'error',
          });
        }
      },
    },
  });

  window.onSignin = (googleUser) => {
    const profile = googleUser.getBasicProfile();
    vm.checkProfile(profile);
  };

  export default {};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .signin {
    margin: 10% auto 0 auto;
    width: 300px;
    text-align: center;

    h1 {
      margin: 30px 0 40px 0;
    }

    p {
      margin: 10px 0 20px 0;
    }

    .g-signin2 {
      margin: 50px auto 40px auto;
      width: 120px;
    }
  }
</style>
