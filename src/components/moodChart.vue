<template>
  <div class="card">
    <div class="card-body">
      <h6>Mood Trends</h6>
      <canvas ref="moodChart"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js';

export default {
  name: "MoodChart",
  props: {data: {type: Array, default: () => []}},
  data() {
    return {
      chart: null
    };
  },
  methods: {
    renderChart() {
      const ctx = this.$refs.moodChart.getContext("2d");

      const labels = this.data.map(d => new Date(d.date).toLocaleDateString());
      const moods = this.data.map(d => d.mood);

      if (this.chart) this.chart.destroy();

      this.chart = new Chart(ctx, {
        type: "line",
        data: {
          labels,
          datasets: [{
            label: "Mood",
            data: moods,
            borderColor: "#007bff",
            backgroundColor: "rgba(0, 123, 255, 0.2)",
            fill: true
          }]
        },
        options: {responsive: true}
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
