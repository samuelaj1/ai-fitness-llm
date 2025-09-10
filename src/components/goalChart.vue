<template>
  <div class="card mt-3">
    <div class="card-body">
      <h6 class="mb-3">{{ title }}</h6>
      <canvas ref="progressChart" height="140"></canvas>
      <div class="mt-2 small text-muted">Target: {{ target }} {{ unit }}</div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js';

export default {
  name: 'GoalChart',
  props: {
    labels: Array,
    data: Array,
    progressLogs: Array,
    target: Number,
    unit: String,
    title: String,
    metric: {
      type: Object,
      default: null
    }

  },
  methods:{
    renderChart() {

      const logs = this.progressLogs || [];

      // Transform backend response into labels + values
      const labels = logs.map(log =>
          new Date(log.date).toLocaleDateString()
      );
      const values = logs.map(log => log.value);

      const targetValue = this.metric?.targetValue || 100;


      // console.log("Rendering chart with labels:", labels, "and values:", values, "Target Value:", targetValue)
      // return

      const canvas = this.$refs.progressChart;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");

      if (this.chart) this.chart.destroy();

      this.chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Your Progress",
              data: values,
              borderColor: "#007bff",
              backgroundColor: "rgba(0, 123, 255, 0.2)",
              fill: true
            },
            {
              label: "Target Goal",
              data: Array(labels.length).fill(targetValue),
              borderColor: "#28a745",
              borderDash: [5, 5],
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: "Weekly Progress vs Goal"
          },
          tooltips: {
            mode: "index",
            intersect: false
          },
          hover: {
            mode: "nearest",
            intersect: true
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  max: 100,
                  callback: function(value) {
                    return value + "%"; // show % symbol
                  }
                }
              }
            ]
          }
        }
      });
    }
  },
  mounted() {
    this.renderChart();
  },
  beforeUnmount() {
    if (this.chart) this.chart.destroy();
  }
};
</script>
