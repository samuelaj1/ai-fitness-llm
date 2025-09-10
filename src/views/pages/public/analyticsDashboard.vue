<template>
  <Layout>
    <div class="container mt-4">
      <h4>📊 Behavioral Analytics</h4>

      <div class="row">
        <div class="col-md-6">
          <MoodChart :data="moodData" v-if="moodData"/>
        </div>
        <div class="col-md-6">
          <EngagementChart :data="engagementData" v-if="engagementData"/>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-md-6">
          <GoalChart v-if="goalData" :data="goalData"/>
        </div>
        <div class="col-md-6">
          <ComBChart :data="combData" v-if="combData"/>
        </div>
      </div>
    </div>
  </Layout>
</template>


<script>
import Layout from "../../base-layout/layout";
import MoodChart from "@/components/moodChart.vue";
import EngagementChart from "@/components/engagementChart.vue";
import GoalChart from "@/components/goalDashboardChart.vue";
import ComBChart from "@/components/comBChart.vue";
import {userService} from "@/apis/user.service";

export default {
  components: {MoodChart, EngagementChart, GoalChart, ComBChart, Layout},
  data() {
    return {
      userId: '6898e6b079b5c9e68fb4a9e2',
      moodData: null,
      engagementData: null,
      goalData: null,
      combData: null
    };
  },
  methods: {
    getMood() {
      userService.getMood(this.userId).then((res) => {
        if (res.status) {
          this.moodData = res.data;
        }
      })
    },
    getEngagement() {
      userService.getEngagement(this.userId).then((res) => {
        if (res.status) {
          this.engagementData = res.data;
        }
      })
    },
    getGoals() {
      userService.getGoals(this.userId).then((res) => {
        if (res.status) {
          this.goalData = res.data;
        }
      })
    },
    getComB() {
      userService.getComB(this.userId).then((res) => {
        if (res.status) {
          this.combData = res.data;
        }
      })
    }
  },
  async mounted() {
    this.getMood();
    this.getEngagement();
    this.getGoals();
    this.getComB();
  }
};
</script>

