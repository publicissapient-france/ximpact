<template>
  <section class="xebian">
    <el-card class="box-card">
      <h1>Xebian / {{xebian.firstName}} {{xebian.lastName}}</h1>
      <el-collapse v-model="activeImpact" accordion>
        <el-collapse-item v-for="(impact, key) in xebian.impacts" :key="key" :name="key">
          <template slot="title">
            {{impact.description}}
            <span style="float: right; margin-right: 10px">Auchan</span>
          </template>
          <ul>
            <li v-for="(feedback, key) in impact.feedbacks" :key="key">
              {{feedback.comment}}
              <span style="float: right">02/2017</span>
            </li>
          </ul>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </section>
</template>

<script>
  import XebianService from './XebianService';

  export default {
    data() {
      return {
        xebian: XebianService.xebian,
        activeImpact: 0,
      };
    },
    mounted() {
      XebianService.getXebian(this.$route.params.id);
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .xebian {
    margin: 15px 10px;
    background: #ffffff;
    border-radius: 3px;
  }

  ul {
    list-style: none;
    padding-left: 0;

    li {
      border-bottom: solid 1px #f0f0f0;
      margin-bottom: 20px;
    }
  }
</style>
