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
            label: 'Ingresos mensuales',
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
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [
          {
            label: 'Ingresos mensuales',
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
            text: 'Ingresos por mes',
            color: textColor
          },
          tooltip: {
            callbacks: {
              title: (tooltipItems) => {
                return `Mes: ${tooltipItems[0].label}`;
              },
              label: (tooltipItem) => {
                return `Ingresos: S/ ${tooltipItem.raw.toFixed(2)}`;
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
              text: 'Ingresos (S/)',
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
              text: 'Mes',
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
    <h3 class="text-center mb-3">Ingresos Mensuales</h3>
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