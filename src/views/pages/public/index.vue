<template>
  <Layout>
    <div class="container mt-5">
      <div class="card shadow-sm">
        <div class="card-body">
          <h3 class="mb-4 text-center">Welcome, Samuel 👋</h3>
          <p class="text-muted text-center">Please tell us a bit about your fitness journey so we can personalize your
            experience.</p>

          <form @submit.prevent="submitOnboarding">
            <div class="mb-3">
              <label class="form-label">Fitness Goals</label>
              <input type="text" class="form-control" v-model="form.goals"
                     placeholder="e.g., Lose weight, build muscle">
            </div>

            <div class="mb-3">
              <label class="form-label">Activity Level</label>
              <select class="form-select" v-model="form.activityLevel">
                <option disabled value="">Select...</option>
                <option>Sedentary</option>
                <option>Lightly active</option>
                <option>Moderately active</option>
                <option>Very active</option>
              </select>
            </div>

            <div class="mb-3">
              <label class="form-label">Preferred Workout Type</label>
              <input type="text" class="form-control" v-model="form.workoutType"
                     placeholder="e.g., Running, Weightlifting">
            </div>

            <div class="mb-3">
              <label class="form-label">Diet Preference</label>
              <input type="text" class="form-control" v-model="form.dietPreference"
                     placeholder="e.g., Vegetarian, Keto">
            </div>

            <div class="mb-3">
              <label class="form-label">Main Challenges</label>
              <textarea class="form-control" rows="3" v-model="form.challenges"
                        placeholder="e.g., Time, Motivation"></textarea>
            </div>

            <button type="submit" class="btn btn-primary w-100">Save & Continue</button>
          </form>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import appConfig from "../../../../app.config.json";
import {userService} from "@/apis/user.service";
import store from "@/store/store";
import Layout from '../../base-layout/layout';

export default {
  name: "OnBoarding",
  page: {
    title: "on-boarding",
    meta: [{name: "description", content: appConfig.description}]
  },
  data() {
    return {
      form: {
        goals: "",
        activityLevel: "",
        workoutType: "",
        dietPreference: "",
        challenges: ""
      }
    };
  },
  computed: {
    userRole() {
      const loggedUser = store.getters.GET_USER_INFO;
      if(!loggedUser){
        return '';
      }
      return loggedUser?.roles?.[0] || '';
    },

  },
  components: {
    Layout,
  },
  methods: {
  },
  created() {

  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  }
}
</script>

<style scoped>


.dropdown {
  position: absolute;
  background: white;
  border: 1px solid #ddd;
  width: 43%;
  z-index: 10;
  max-height: 400px;
  overflow-x: hidden;
  overflow-y: auto;
  left: 0;
}

.dropdown ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown li {
  padding: 18px 16px;
  cursor: pointer;
  color: #00A7AC;
}

.dropdown li:hover {
  background-color: #f8f9fa;
}


::placeholder {
  color: rgba(154, 153, 153, 0.3);
  opacity: 1;
}

.border-start{
  border-left: 3px solid #00A7AC !important;
}
</style>