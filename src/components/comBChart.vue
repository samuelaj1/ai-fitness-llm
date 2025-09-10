<template>
  <div class="card">
    <div class="card-body">
      <h6>COM-B Breakdown</h6>
      <canvas ref="combChart"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js';

export default {
  name: "ComBChart",
  props: { data: { type: Object, default: () => ({ capability: 1, opportunity: 1, motivation: 1 }) } },
  methods:{
    renderChart() {
      const ctx = this.$refs.combChart.getContext("2d");

      this.chart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["Capability", "Opportunity", "Motivation"],
          datasets: [{
            data: [this.data.capability, this.data.opportunity, this.data.motivation],
            backgroundColor: ["#17a2b8", "#ffc107", "#28a745"]
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
