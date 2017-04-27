<template>
  <section class="xebian">
    <el-card class="box-card">
      <h1>Xebian / {{xebian.firstname}} {{xebian.lastname}}</h1>
      <ul v-for="(impact, key) in xebian.impacts" :key="key">
        <span class="impact-desc">{{impact.description}}</span>
        <div class="badges">
          <span class="badge badge0">{{impact.customer.firstname}} {{impact.customer.lastname}}</span>
          <span class="badge badge1">{{impact.updated_at}}</span>
        </div>
        <li v-for="(feedback, key) in impact.feedbacks" :key="key">
          {{feedback.comment}}
          <div class="badges" v-if="feedback.comment">
            <span class="badge badge1">{{feedback.updated_at}}</span>
          </div>
        </li>
      </ul>
    </el-card>
    <div class="xebian-edition">
      <xebian-update></xebian-update>
    </div>
  </section>
</template>

<script>
  import XebianService from './XebianService';
  import XebianUpdate from './update/XebianUpdate';

  export default {
    data() {
      return {
        xebian: this.$store.state.xebian,
        activeImpact: 0,
      };
    },
    components: {
      'xebian-update': XebianUpdate,
    },
    mounted() {
      XebianService.getXebian(this.$route.params.id, this.$store);
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .xebian {
    margin: 15px 10px;
    border-radius: 3px;
  }

  h1 {
    margin-bottom: 60px;
  }

  ul {
    list-style: none;
    padding-left: 0;

    .impact-desc {
      font-weight: 700;
    }

    .badge {
      display: inline-block;
      font-size: 10px;
      padding: 2px 5px;
      border-radius: 3px;

      &.badge0 {
        background: #bab7c9;
        color: #ffffff;
      }

      &.badge1 {
        background: #9894ad;
        color: #ffffff;
      }
    }

    .badges {
      margin-bottom: 20px;
    }

    li {
      font-weight: 400;
      margin-top: 10px;
    }
  }

  .xebian-edition {
    margin: 15px 0;
  }

  .item-title {

  }
</style>
