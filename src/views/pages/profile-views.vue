<template>
  <BaseDashboardLayout>
    <template v-slot:title>
      <h4 class="title mb-5 font-weight-bold">Profile Views</h4>
    </template>
    <div class="row mt-4 mb-5">
      <div class="col-md-8">
        <div v-if="isLoading">
          <div v-for="i in 2" :key="i">
            <div class="card mb-3">
              <div class="card-body">
                <div class="lines shine"/>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="card mb-3" v-for="(view, i) in profileViews" :key="i">
            <div class="card-body">
              <h5 class="text-capitalize mb-3">{{ view.viewer.name }}</h5>
              <!--              <p class="fw-light"><i class="bi bi-pin-map"></i> Cheltenham</p>-->
              <div class="d-flex justify-content-between align-items-center">
                <router-link to="/new-leads" class="btn btn-primary btn-sm">View leads</router-link>
                <div class="fw-light"><small>Viewed on {{ view.created_at | toFormattedDate }}</small></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseDashboardLayout>
</template>

<script>
import BaseDashboardLayout from '../base-layout/tradesperson-dashboard';
import appConfig from "../../../app.config.json";
import {userService} from "@/apis/user.service";

export default {
  page: {
    title: "Profile Views",
    meta: [{name: "description", content: appConfig.description}]
  },
  data() {
    return {
      profileViews: [],
      isLoading: false,
      user: this.$store.getters.GET_USER_INFO
    };
  },
  components: {
    BaseDashboardLayout
  },
  methods: {
    getProfileViews() {
      this.isLoading = true;
      userService.getProfileViews(this.user.id).then((res) => {
        this.isLoading = false;
        const {status, message, extra} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true});
          return;
        }
        this.profileViews = extra;
      });
    }
  },
  created() {
    this.getProfileViews();
  },
  mounted() {
    $('#company-description').addClass('active')
  },
};
</script>

<style scoped>

</style>
