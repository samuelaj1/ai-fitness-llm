<template>
  <div class="card">
    <div class="card-body">
      <h6>Engagement Frequency</h6>
      <canvas ref="engagementChart"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js';

export default {
  name: "EngagementChart",
  props: { data: { type: Object, default: () => ({}) } },
  data() {
    return {
      chart: null
    };
  },
  methods:{
    renderChart() {
      const canvas = this.$refs.engagementChart;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");

      if (this.chart) this.chart.destroy();

      // Prepare data for the chart
      const labels = Object.keys(this.data);
      const values = Object.values(this.data);

      this.chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels,
          datasets: [{
            label: "Messages per Day",
            data: values,
            backgroundColor: "#28a745"
          }]
        },
        options: { responsive: true }
      });
      ;
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