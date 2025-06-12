<script>
export default {
  name: "average-duration-chart",
  props: {
    durationData: {
      type: Object,
      required: true,
      validator: (value) => {
        return value && value.labels && value.values;
      }
    }
  },
  data() {
    return {
      chartData: null,
      chartOptions: null
    }
  },
  methods: {
    setChartData() {
      const documentStyle = getComputedStyle(document.body);

      return {
        labels: this.durationData.labels,
        datasets: [
          {
            label: this.$t("dashboard.averageDurationChart.title2"),
            data: this.durationData.values,
            backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
            hoverBackgroundColor: documentStyle.getPropertyValue('--p-cyan-400'),
            borderRadius: 6
          }
        ]
      };
    },
    setChartDataSimulated() {
      const documentStyle = getComputedStyle(document.body);

      return {
        labels: [
          this.$t("dashboard.averageDurationChart.day.mon"),
          this.$t("dashboard.averageDurationChart.day.tue"),
          this.$t("dashboard.averageDurationChart.day.wed"),
          this.$t("dashboard.averageDurationChart.day.thu"),
          this.$t("dashboard.averageDurationChart.day.fri"),
          this.$t("dashboard.averageDurationChart.day.sat"),
          this.$t("dashboard.averageDurationChart.day.sun")
        ],
        datasets: [
          {
            label: this.$t("dashboard.averageDurationChart.text2"),
            data: [2.5, 3.0, 4.5, 2.0, 3.5, 4.0, 2.5],
            backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
            hoverBackgroundColor: documentStyle.getPropertyValue('--p-cyan-400'),
            borderRadius: 6
          }
        ]
      };
    },
    setChartOptions() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');

      // Calcular un valor máximo adecuado
      let maxValue = 0;
      if (this.durationData && this.durationData.values) {
        maxValue = Math.max(...this.durationData.values);
        maxValue = Math.ceil(maxValue * 1.2); // 20% adicional para mejor visualización
      }

      return {
        responsive: true,
        indexAxis: 'y',
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              color: textColor
            }
          },
          title: {
            display: true,
            text: this.$t("dashboard.averageDurationChart.text1"),
            color: textColor
          },
          tooltip: {
            callbacks: {
              title: (tooltipItems) => {
                return this.$t("dashboard.averageDurationChart.day.day") + `: ${tooltipItems[0].label}`;
              },
              label: (tooltipItem) => {
                return this.$t("dashboard.averageDurationChart.averageDuration") + `: ${tooltipItem.raw.toFixed(2)} horas`;
              }
            }
          }
        },
        scales: {
          y: {
            title: {
              display: true,
              text: this.$t("dashboard.averageDurationChart.yAxis"),
              color: textColor
            },
            ticks: {
              color: textColor
            }
          },
          x: {
            beginAtZero: true,
            max: 7,
            title: {
              display: true,
              text: this.$t("dashboard.averageDurationChart.xAxis"),
              color: textColor
            },
            ticks: {
              color: textColor,
              stepSize: 1,
              callback: (value) => `${value.toFixed(1)}h`
            }
          }
        }
      };
    }
  },
  watch: {
    durationData: {
      handler() {
        if (this.durationData && this.durationData.labels) {
          this.chartData = this.setChartData();
          this.chartOptions = this.setChartOptions();
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    if (this.durationData && this.durationData.labels) {
      this.chartData = this.setChartDataSimulated();
      this.chartOptions = this.setChartOptions();
    }
  }
}
</script>

<template>
  <div class="card">
    <h3 class="text-center mb-3">{{ $t("dashboard.averageDurationChart.title")}}</h3>
    <div class="chart-container" style="position: relative;">
      <pv-chart type="bar" :data="chartData" :options="chartOptions" :height="300" v-if="chartData"/>
      <div v-else class="text-center p-4">
        <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
        <p>Cargando datos...</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
}
</style>