<!--suppress JSUnresolvedFunction -->
<template>
  <section id="signin">
    <div class="g-signin2" data-onsuccess="onSignin"></div>
    <div>Hi {{user.firstname}} ({{user.email}})!</div>
  </section>
</template>

<script>
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
  };
</script>

<style scoped>
</style>
