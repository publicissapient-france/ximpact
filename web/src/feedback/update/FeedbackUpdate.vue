<template>
  <section class="feedback-form">
    <el-card class="box-card">
      <h1>Créer un feedback</h1>
      <p>
        Bonjour <b>{{feedback.customer.firstname}}</b>,
      </p>
      <p>
        Veuillez saisir un feedback concernant l'impact de <b>{{feedback.xebian.firstname}}</b> :
      </p>
      <p>
        <i>{{feedback.impact.description}}</i>
      </p>
      <el-form :model="feedback" ref="feedbackForm">
        <el-form-item label="Commentaire(s)" prop="comment">
          <el-input type="textarea" :rows="2"
                    placeholder="Entrez un commentaire à propos de l'atteinte de l'impact par le Xebian"
                    v-model="feedback.comment">
          </el-input>
        </el-form-item>
        <el-row type="flex" class="button" justify="end">
          <el-button type="primary" @click="onSubmitClick('feedbackForm')">OK</el-button>
        </el-row>
      </el-form>
    </el-card>
  </section>
</template>

<script>
  import FeedbackService from '../FeedbackService';

  export default {
    data() {
      return {
        feedback: this.$store.state.feedback,
      };
    },
    methods: {
      onSubmitClick() {
        return FeedbackService.update(this.feedback)
          .then(() => this.$message({
            message: 'Feedback créé ;) !',
            type: 'success',
          }))
          .catch(error => this.$message({
            message: `Une erreur s'est produite :( essayez à nouveau plus tard. ${error.message}`,
            type: 'error',
          }));
      },
    },
    mounted() {
      FeedbackService.get(this.$route.params.token, this.$store);
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .feedback-form {
    margin: 15px 10px;
    background: #ffffff;
    border-radius: 3px;
  }

  h1 {
    margin-bottom: 60px;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      margin-top: 10px;
    }
  }
</style>
