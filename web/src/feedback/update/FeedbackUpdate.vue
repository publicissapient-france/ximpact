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
      <el-form :model="feedbackForm" ref="feedbackForm">
        <el-form-item label="Commentaire(s)" prop="comment">
          <el-input type="textarea" :rows="2"
                    placeholder="Entrez un commentaire à propos de l'atteinte de l'impact par le Xebian"
                    v-model="feedbackForm.comment">
          </el-input>
        </el-form-item>
        <el-form-item label="Badge(s)" prop="badges">
          <br/>
          <ul>
            <li v-for="(badge, index) in feedback.badges">
              <el-card>
                <h3>{{badge.label}}</h3>
                <p>
                  <i>{{badge.description}}</i>
                </p>
                <el-switch
                  v-model="feedbackForm.badges[index]"
                  on-color="#13ce66"
                  on-text="Oui"
                  off-text="Non"
                  off-color="#ff4949">
                </el-switch>
              </el-card>
            </li>
          </ul>
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
        feedbackForm: {
          comment: this.$store.state.feedback.comment,
          badges: [],
        },
      };
    },
    methods: {
      onSubmitClick() {
        this.feedback.comment = this.feedbackForm.comment;
        return FeedbackService.update(this.feedback);
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
