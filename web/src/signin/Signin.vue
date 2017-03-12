<!--suppress JSUnresolvedFunction -->
<template>
  <section id="signin">
    <h1>X-Impact</h1>
    <p>Veuillez vous connecter avec votre adresse <code>*@xebia.fr</code>.</p>
    <div class="g-signin2" data-onsuccess="onSignin"></div>
    <p>Hi {{user.firstname}} ({{user.email}})!</p>
    <el-button @click="goToNewImpact" type="primary">Créer un nouvel impact</el-button>
  </section>
</template>

<script>
  import {
    Button,
  } from 'element-ui';
  import 'element-ui/lib/theme-default/index.css';
  import UserService from './UserService';

  window.onSignin = (googleUser) => {
    const profile = googleUser.getBasicProfile();
    UserService.bindProfile(
      profile.getGivenName(),
      profile.getEmail(),
    );
  };

  export default {
    name: 'Signin',
    data() {
      return {
        user: UserService.user,
      };
    },
    components: {
      'el-button': Button,
    },
    methods: {
      goToNewImpact(event) {
        event.preventDefault();
        this.$router.push('/impact/creation');
      },
    },
  };
</script>

<style scoped>
</style>
