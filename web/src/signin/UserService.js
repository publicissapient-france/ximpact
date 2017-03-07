export default {
  user: {
    firstname: '',
    email: '',
  },
  bindProfile(firstname, email) {
    this.user.firstname = firstname;
    this.user.email = email;
  },
};
