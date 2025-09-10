<template>
  <Layout>
    <div class="container mt-4">
        <!-- Diet Interventions -->
        <div class="mt-4" v-if="plans.length">
          <h5>🥗 Diet Interventions</h5>
          <div class="row">
            <div class="col-md-6 mb-3" v-for="(p, i) in plans" :key="i">
              <div class="card h-100 shadow-sm">
                <div class="card-body">
                  <h6 class="card-title">{{ p.title }}</h6>
                  <p class="text-muted small">{{ p.details.description }}</p>
                  <ul class="list-group list-group-flush mt-2">
                    <li v-for="(step, j) in p.details.steps" :key="j" class="list-group-item small">
                      {{j+1}}. {{ step }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

      <div v-else class="alert alert-info mt-3">
        No saved plans yet. Chat with your coach to create some!
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "../../base-layout/layout";
import { userService } from "@/apis/user.service";

export default {
  name: "PlansPage",
  components: { Layout },
  data() {
    return {
      plans: []
    };
  },
  computed: {

  },
  async mounted() {
    const res = await userService.getPlans("6898e6b079b5c9e68fb4a9e2","diet_intervention");
    if (res.status) {
      this.plans = res.data || [];
    }
  }
};
</script>
