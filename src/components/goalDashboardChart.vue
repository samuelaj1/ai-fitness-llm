<template>
  <div class="card">
    <div class="card-body">
      <h6>Goal Completion Rate</h6>
      <canvas ref="goalChart"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js';


export default {
  name: "GoalDashboardChart",
  props: { data: { type: Object, default: () => ({ total: 0, completed: 0, rate: 0 }) } },
  methods:{
    renderChart(){
        const canvas = this.$refs.goalChart;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");

        if (this.chart) this.chart.destroy();

        this.chart = new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: ["Completed", "Remaining"],
            datasets: [{
              data: [this.data.completed, this.data.total - this.data.completed],
              backgroundColor: ["#007bff", "#e0e0e0"]
            }]
          },
          options: { responsive: true }
        });

    }
  },
  mounted() {
    this.renderChart();
  },
  beforeUnmount() {
    if (this.chart) this.chart.destroy();
  },
};
</script>
