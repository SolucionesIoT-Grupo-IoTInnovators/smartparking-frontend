<script>
export default {
  name: "monthly-earnings-chart",
  props: {
    monthlyData: {
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
        labels: this.monthlyData.labels,
        datasets: [
          {
            label: this.$t("dashboard.monthlyIncomeChart.text2"),
            data: this.monthlyData.values,
            backgroundColor: documentStyle.getPropertyValue('--p-orange-500'),
            hoverBackgroundColor: documentStyle.getPropertyValue('--p-orange-400'),
            borderRadius: 6
          }
        ]
      };
    },
    setCharDataSimulated() {
      const documentStyle = getComputedStyle(document.body);

      return {
        labels: [
            this.$t("dashboard.monthlyIncomeChart.month.jan"),
            this.$t("dashboard.monthlyIncomeChart.month.feb"),
            this.$t("dashboard.monthlyIncomeChart.month.mar"),
            this.$t("dashboard.monthlyIncomeChart.month.apr"),
            this.$t("dashboard.monthlyIncomeChart.month.may"),
            this.$t("dashboard.monthlyIncomeChart.month.jun"),
            this.$t("dashboard.monthlyIncomeChart.month.jul"),
            this.$t("dashboard.monthlyIncomeChart.month.aug"),
            this.$t("dashboard.monthlyIncomeChart.month.sep"),
            this.$t("dashboard.monthlyIncomeChart.month.oct"),
            this.$t("dashboard.monthlyIncomeChart.month.nov"),
            this.$t("dashboard.monthlyIncomeChart.month.dec")
        ],
        datasets: [
          {
            label: this.$t("dashboard.monthlyIncomeChart.text2"),
            data: [1000, 1200, 1500, 1300, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300],
            backgroundColor: documentStyle.getPropertyValue('--p-orange-500'),
            hoverBackgroundColor: documentStyle.getPropertyValue('--p-orange-400'),
            borderRadius: 6
          }
        ]
      };
    },
    setChartOptions() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');

      // Calcular un valor máximo adecuado basado en los datos
      let maxValue = 2500;
      /**if (this.monthlyData && this.monthlyData.values) {
        maxValue = Math.max(...this.monthlyData.values);
        // Añadir un 20% adicional para mejorar la visualización
        maxValue = Math.ceil(maxValue * 1.2);
      } **/

      return {
        responsive: true,
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
            text: this.$t("dashboard.monthlyIncomeChart.text1"),
            color: textColor
          },
          tooltip: {
            callbacks: {
              title: (tooltipItems) => {
                return this.$t("dashboard.monthlyIncomeChart.month.month") + `: ${tooltipItems[0].label}`;
              },
              label: (tooltipItem) => {
                return this.$t("dashboard.monthlyIncomeChart.income") + `: S/ ${tooltipItem.raw.toFixed(2)}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: maxValue, // Establecer el valor máximo
            title: {
              display: true,
              text: this.$t("dashboard.monthlyIncomeChart.yAxis"),
              color: textColor
            },
            ticks: {
              color: textColor,
              callback: (value) => `S/ ${value}`
            }
          },
          x: {
            title: {
              display: true,
              text: this.$t("dashboard.monthlyIncomeChart.xAxis"),
              color: textColor
            },
            ticks: {
              color: textColor
            }
          }
        }
      };
    }
  },
  watch: {
    monthlyData: {
      handler() {
        if (this.monthlyData && this.monthlyData.labels) {
          this.chartData = this.setChartData();
          this.chartOptions = this.setChartOptions();
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    if (this.monthlyData && this.monthlyData.labels) {
      this.chartData = this.setCharDataSimulated();
      this.chartOptions = this.setChartOptions();
    }
  }
}
</script>

<template>
  <div class="card">
    <h3 class="text-center mb-3">{{ $t("dashboard.monthlyIncomeChart.title") }}</h3>
    <div class="chart-container" style="position: relative;">
      <pv-chart type="bar" :data="chartData" :options="chartOptions" v-if="chartData" :height="300"/>
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