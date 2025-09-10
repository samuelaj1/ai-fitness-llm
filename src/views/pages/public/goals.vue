<template>
  <Layout>
    <div class="container mt-4">
      <h4>🎯 Goals</h4>

      <!-- Create via SMART Template -->
      <div class="card mt-3">
        <div class="card-body">
          <h6>Create from SMART Template</h6>
          <div class="row g-2">
            <div class="col-md-3">
              <select v-model="tpl.category" class="form-select">
                <option value="fitness">Fitness</option>
                <option value="diet">Diet</option>
                <option value="lifestyle">Lifestyle</option>
              </select>
            </div>
            <div class="col-md-3">
              <select v-model="tpl.type" class="form-select">
                <option value="short_term">Short-term</option>
                <option value="long_term">Long-term</option>
              </select>
            </div>
            <div class="col-md-3">
              <input v-model="tpl.targetDate" type="date" class="form-control" />
            </div>
            <div class="col-md-3">
              <button class="btn btn-primary w-100" @click="createFromTpl">Create</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Goals list -->
      <div class="mt-3" v-if="goals.length">
        <div class="accordion" id="goalAccordion">
          <div class="accordion-item mb-4" v-for="g in goals" :key="g._id">
            <h2 class="accordion-header" :id="'heading'+g._id">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse'+g._id">
                {{ g.title }} — <small class="ms-2 text-muted">{{ g.metric.currentValue }}/{{ g.metric.targetValue }} {{ g.metric.unit }}</small>
              </button>
            </h2>
            <div :id="'collapse'+g._id" class="accordion-collapse collapse" :aria-labelledby="'heading'+g._id" data-bs-parent="#goalAccordion">
              <div class="accordion-body">
                <div class="row">
                  <div class="col-md-8">
                    <p class="mb-1"><strong>Type:</strong> {{ g.type.replace('_',' ') }} | <strong>Category:</strong> {{ g.category }}</p>
                    <p class="mb-1"><strong>Timeline:</strong> {{ fmtDate(g.startDate) }} → {{ fmtDate(g.targetDate) }}</p>
                    <p class="mb-1"><strong>Status:</strong> <span :class="badge(g.status)">{{ g.status }}</span></p>

                    <div class="mt-2">
                      <p class="mb-1"><strong>SMART:</strong></p>
                      <ul class="mb-2">
                        <li><strong>S:</strong> {{ g.smart.specific }}</li>
                        <li><strong>M:</strong> {{ g.smart.measurable }}</li>
                        <li><strong>A:</strong> {{ g.smart.achievable }}</li>
                        <li><strong>R:</strong> {{ g.smart.relevant }}</li>
                        <li><strong>T:</strong> {{ g.smart.timeBound }}</li>
                      </ul>
                    </div>

                    <!-- Chart -->
                    <GoalChart
                        v-if="charts[g._id]"
                        :target="charts[g._id].target"
                        :unit="charts[g._id].unit"
                        :title="charts[g._id].title"
                        :metric="charts[g._id].metric"
                        :progressLogs="charts[g._id].progressLogs"
                    />
                  </div>

                  <div class="col-md-4">
                    <div class="card">
                      <div class="card-body">
                        <h6>Add Progress</h6>
                        <div class="input-group mb-2">
                          <input v-model.number="progress.value" type="number" class="form-control" placeholder="Value" />
                          <span class="input-group-text">{{ g.metric.unit }}</span>
                        </div>
                        <input v-model="progress.note" type="text" class="form-control mb-2" placeholder="Note (optional)" />
                        <button class="btn btn-success w-100" @click="addProgress(g)">Save Progress</button>
                        <button class="btn btn-outline-danger w-100 mt-2" @click="remove(g)">Delete Goal</button>
                      </div>
                    </div>
                  </div>
                </div> <!-- row -->
              </div>
            </div>
          </div> <!-- item -->
        </div>
      </div>

      <div v-else class="alert alert-info mt-3">No goals yet. Create one above!</div>
    </div>
  </Layout>
</template>

<script>
import Layout from '../../base-layout/layout';
import { userService } from "@/apis/user.service";

import GoalChart from '@/components/goalChart.vue';

export default {
  name: 'GoalsPage',
  components: { Layout, GoalChart },
  data() {
    return {
      userId: '6898e6b079b5c9e68fb4a9e2', // Samuel (temporary)
      goals: [],
      charts: {},
      tpl: { category: 'fitness', type: 'short_term', targetDate: '' },
      progress: { value: null, note: '' }
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    async load() {
      const res = await userService.listByUser(this.userId);
      if (res.status) {
        this.goals = res.data;
        // load charts
        for (const g of this.goals) {
          await this.loadChart(g._id);
        }
      }
    },
    async createFromTpl() {
      if (!this.tpl.targetDate) {
        alert('Please select a target date');
        return;
      }
      const res = await userService.createFromTemplate({
        userId: this.userId,
        category: this.tpl.category,
        type: this.tpl.type,
        targetDate: this.tpl.targetDate
      });
      if (res.status) {
        this.goals.unshift(res.data);
        await this.loadChart(res.data._id);
      }
    },
    async addProgress(goal) {
      if (!this.progress.value) return alert('Enter a progress value');
      const res = await userService.addProgress(goal._id, {
        value: this.progress.value,
        note: this.progress.note
      });
      if (res.status) {
        // update in-place
        const idx = this.goals.findIndex(g => g._id === goal._id);
        if (idx !== -1) this.goals[idx] = res.data;
        this.progress = { value: null, note: '' };
        await this.loadChart(goal._id);
      }
    },
    async loadChart(goalId) {
      const res = await userService.chart(goalId);
      if (res.status) this.$set(this.charts, goalId, res.data);
    },
    async remove(goal) {
      if (!confirm('Delete this goal?')) return;
      const res = await userService.deleteGoal(goal._id);
      if (res.status) {
        this.goals = this.goals.filter(g => g._id !== goal._id);
        this.$delete(this.charts, goal._id);
      }
    },
    fmtDate(d) {
      return new Date(d).toISOString().slice(0, 10);
    },
    badge(status) {
      return {
        'badge bg-success': status === 'completed',
        'badge bg-secondary': status === 'paused',
        'badge bg-primary': status === 'active'
      };
    }
  }
};
</script>
