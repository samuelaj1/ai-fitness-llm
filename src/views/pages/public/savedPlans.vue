<template>
  <Layout>
    <div class="container mt-4">
      <h4>📋 My Saved Plans</h4>

      <div v-if="plans.length">
        <!-- Workout Plans -->
        <div class="mt-3" v-if="workoutPlans.length">
          <h5>🏋️ Workout Plans</h5>
          <div class="row">
            <div class="col-md-6 mb-3" v-for="(p, i) in workoutPlans" :key="i">
              <div class="card h-100 shadow-sm">
                <div class="card-body">
                  <h6 class="card-title">{{ p.title }}</h6>
                  <p class="text-muted small">{{ p.details.description }}</p>
                  <ul class="list-group list-group-flush mt-2">
                    <li v-for="(step, j) in p.details.steps" :key="j" class="list-group-item small">
                      {{ step }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Diet Interventions -->
        <div class="mt-3" v-if="dietInterventions.length">
          <h5>🥗 Diet Interventions</h5>
          <div class="row">
            <div class="col-md-6 mb-3" v-for="(p, i) in dietInterventions" :key="i">
              <div class="card h-100 shadow-sm">
                <div class="card-body">
                  <h6 class="card-title">{{ p.title }}</h6>
                  <p class="text-muted small">{{ p.details.description }}</p>
                  <ul class="list-group list-group-flush mt-2">
                    <li v-for="(step, j) in p.details.steps" :key="j" class="list-group-item small">
                      {{ step }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Diet Plans -->
        <!-- Diet Plans -->
        <div class="mt-3" v-if="dietPlans.length">
          <h5>🍴 Diet Plans</h5>
          <div class="row">
            <div class="col-md-6 mb-3" v-for="(p, i) in dietPlans" :key="i">
              <div class="card h-100 shadow-sm">
                <div class="card-body">
                  <!-- Title -->
                  <h6 class="card-title">{{ p.title }}</h6>

                  <!-- Description -->
                  <p class="text-muted small">{{ p.details.description }}</p>

                  <!-- Meals -->
                  <div v-for="(meal, j) in p.details.steps" :key="j" class="mt-3">
                    <p class="fw-bold">{{ meal.meal }}</p>
                    <ul class="list-group list-group-flush">
                      <li
                          v-for="(opt, k) in meal.options"
                          :key="k"
                          class="list-group-item small"
                      >
                        {{ opt }}
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="card-footer text-muted small">
                  Saved on: {{ new Date(p.createdAt).toLocaleDateString() }}
                </div>
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
    workoutPlans() {
      return this.plans.filter(p => p.type === "workout_plan");
    },
    dietInterventions() {
      return this.plans.filter(p => p.type === "diet_intervention");
    },
    dietPlans() {
      return this.plans.filter(p => p.type === "diet_plan");
    }
  },
  async mounted() {
    const res = await userService.getPlans("6898e6b079b5c9e68fb4a9e2");
    if (res.status) {
      this.plans = res.data || [];
    }
  }
};
</script>
